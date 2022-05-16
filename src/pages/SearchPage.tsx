import React, { useRef, useState } from 'react'
import { client } from '../main'
import { SEARCH_POSTS } from '../graphql/queries/queries'
import { ActionSheet, Dialog, InfiniteScroll, SearchBar, Stepper } from 'antd-mobile'
import { PostView } from '../components/PostView'
import { BackTop, message } from 'antd'
import Request from '../utils/request'
import { Action } from 'antd-mobile/es/components/action-sheet'
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons'
import { DELETE_POST } from '../graphql/mutations/delete'
import {
  DeletePostMutation,
  DeletePostMutationVariables, Post,
  SearchPostsQuery,
  SearchPostsQueryVariables, SearchResultItemEdge
} from '../generated/globalTypes'
import { notAuthed } from '../utils/notAuthed'

export default function SearchPage() {
  const [keyword, setKeyword] = useState('')
  const [hasMoreResults, setHasMoreResults] = useState(true)
  const [results, setResults] = useState<Array<SearchResultItemEdge>>([])
  const [actionSheetVisible, setActionSheetVisible] = useState(false)
  const postRef = useRef<string | null>(null)
  const [addVotesMask, setAddVotesMask] = useState(false)
  const [voteCount, setVoteCount] = useState(1)
  const voteURL = import.meta.env.VITE_BASE_URL + '/vote/manual'
  const addVotesOnPost = new Request({
    method: 'GET',
    timeout: 2000,
    interceptors: {
      requestInterceptors: (config) => {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
        return config
      }
    }
  })
  const actions: Action[] = [
    {
      text: '确认删除',
      key: 'delete',
      description: '删除后数据不可恢复',
      danger: true,
      onClick: async () => {
        await Dialog.confirm({
          title: '警告',
          header: (<ExclamationCircleFilled style={{
            fontSize: 64,
            color: 'var(--adm-color-danger)'
          }}/>),
          content: '确认删除？'
        })
          .then(async () => {
            const res = await client.mutate<DeletePostMutation,
              DeletePostMutationVariables>({
                mutation: DELETE_POST,
                variables: {
                  postId: postRef.current!
                },
                fetchPolicy: 'network-only'
              })
            if (res.data?.deletePost.createdAt) {
              setResults((results) => {
                return results?.filter((result) => result?.node?.id !== postRef.current) ?? null
              }
              )
              message.success('已删除id为' + postRef.current + '的帖子')
              console.log(
                '已于' +
                res.data?.deletePost.createdAt +
                '删除id为' +
                postRef.current +
                '的帖子'
              )
            }
          })
          .catch((err) => {
            notAuthed(err)
          })
      }
    }
  ]

  async function fetchResults() {
    await client.query<SearchPostsQuery, SearchPostsQueryVariables>({
      query: SEARCH_POSTS,
      variables: {
        keyword: keyword,
        after: results?.length ? results[results.length - 1].cursor : null
      },
      fetchPolicy: 'network-only'
    }).then(({ data }) => {
      setResults((results) => [...results, ...(data.posts.edges as Array<SearchResultItemEdge>)]
      )
      console.log(results)
      setHasMoreResults(data.posts.pageInfo.hasNextPage)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      {addVotesMask && <div className="mask mask-gray overflow-hidden flex flex-col" onClick={(e) => {
        e.stopPropagation()
        setAddVotesMask(false)
      }}
      onScroll={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}>
        <div className="flex flex-col bg-white py-8 space-y-6 rounded-md my-auto mx-6 md:mx-auto md:w-5/12 px-3"
          onClick={e => e.stopPropagation()}>
          {/* <input className="my-auto border-2 border-amber-2 00" type="number" value={voteCount.toString(10)} onChange={val => setVoteCount(Number(val.target.value))}/> */}
          <div className="flex-initial font-bold text-xl mx-auto">增加点赞数量</div>
          <div className="flex-1"/>
          <Stepper className="flex-initial mx-auto" min={0} max={100} value={voteCount}
            onChange={val => setVoteCount(val)}/>
          <div className="flex-1"/>
          <button disabled={voteCount === 0} className="bg-purple-700 rounded-md py-1.5 font-bold text-white"
            onClick={e => {
              e.stopPropagation()
              setVoteCount(1)
              addVotesOnPost.instance.get(`${voteURL}?postId=${postRef.current}&count=${voteCount}`)
                .then(res => {
                  setAddVotesMask(false)
                  return res
                })
                .then(res => {
                  Dialog.confirm({
                    title: '点赞成功',
                    header: (<CheckCircleFilled style={{
                      fontSize: 64,
                      color: 'var(--adm-color-success)'
                    }}/>),
                    content: `成功点赞${res.data.successCount}次`
                  }).then(() => setVoteCount(0)).catch(err => console.log(err))
                })
            }
            }>Confirm
          </button>
        </div>
      </div>
      }
      {addVotesMask && (
        <div
          className="mask mask-gray overflow-hidden flex flex-col"
          onClick={(e) => {
            e.stopPropagation()
            setAddVotesMask(false)
            setVoteCount(1)
          }}
          onScroll={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          <div
            className="flex flex-col bg-white py-8 space-y-6 rounded-md my-auto mx-6 md:mx-auto md:w-5/12 px-3"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="flex-initial font-bold text-xl mx-auto">
              增加点赞数量
            </div>
            <div className="flex-1"/>
            <Stepper
              className="flex-initial mx-auto"
              min={0}
              max={100}
              value={voteCount}
              onChange={(val) => setVoteCount(val)}
            />
            <div className="flex-1"/>
            <button
              disabled={voteCount === 0}
              className="bg-purple-700 rounded-md py-1.5 font-bold text-white"
              onClick={(e) => {
                e.stopPropagation()
                addVotesOnPost.instance
                  .get(
                    `${voteURL}?postId=${postRef.current}&count=${voteCount}`
                  )
                  .then((res) => {
                    setAddVotesMask(false)
                    return res
                  })
                  .then((res) => {
                    Dialog.confirm({
                      title: '操作成功',
                      header: (
                        <CheckCircleFilled
                          style={{
                            fontSize: 64,
                            color: 'var(--adm-color-success)'
                          }}
                        />
                      ),
                      content: `成功点赞${res.data.successCount}次`,
                      onConfirm: () => setVoteCount(1)
                    })
                  }).catch((err) => {
                    notAuthed(err)
                  })
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
      <div className="pt-16 pb-4 px-3 font-sans text-left mx-auto md:w-5/12">
        <BackTop/>
        <div className="p-2 bg-white rounded-md mb-3">
          <SearchBar onChange={(e) => setKeyword(e)} onSearch={keyword => {
            const trimmed = keyword.trim()
            if (trimmed.length > 0) {
              setResults([])
              fetchResults()
                .then(message.success('获取搜索结果成功'))
            }
          }}/>
        </div>
        {
          results && results.map((result) => {
            const node = result.node as Post
            return (
              <PostView key={node.id} node={node} onVoteClick={e => {
                e.stopPropagation()
                postRef.current = node!.id
                setAddVotesMask(true)
              }}
              onDeleteClick={e => {
                e.stopPropagation()
                postRef.current = node!.id
                setActionSheetVisible(true)
              }
              } />
            )
          })
        }
      </div>
      <ActionSheet
        className="pb-1"
        visible={actionSheetVisible}
        actions={actions}
        cancelText="取消"
        onClose={() => setActionSheetVisible(false)}
      />
      <InfiniteScroll loadMore={fetchResults} hasMore={hasMoreResults}></InfiniteScroll>
    </>
  )
}
