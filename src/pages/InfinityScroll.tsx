import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  ReloadOutlined
} from '@ant-design/icons'
import { BackTop, message } from 'antd'
import {
  ActionSheet,
  Dialog,
  InfiniteScroll, Stepper
} from 'antd-mobile'
import { Action } from 'antd-mobile/es/components/action-sheet'
import React, { useRef, useState } from 'react'
import { DELETE_POST } from '../graphql/mutations/delete'
import { POSTS_WITH_RELAY } from '../graphql/queries/queries'
import { client, clientWithToken } from '../main'
import Request from '../utils/request'
import { PostView } from '../components/PostView'
import {
  DeletePostMutation,
  DeletePostMutationVariables,
  PostEdge,
  PostsConnectionWithRelay,
  QueryPostsWithRelayArgs
} from '../generated/globalTypes'

export default function InfinityScroll() {
  const [postsData, setPostsData] = useState<Array<PostEdge> | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
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
            const res = await clientWithToken.mutate<DeletePostMutation,
              DeletePostMutationVariables>({
                mutation: DELETE_POST,
                variables: {
                  postId: postRef.current!
                },
                fetchPolicy: 'network-only'
              })
            if (res.data?.deletePost.createdAt) {
              setPostsData((postsData) => postsData!.filter((edge) => edge.node?.id !== postRef.current)
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
          .catch(() => {
            message.info('已取消删除id为' + postRef.current + '的帖子')
          })
      }
    }
  ]

  async function loadMore() {
    await client
      .query<PostsConnectionWithRelay, QueryPostsWithRelayArgs>({
        query: POSTS_WITH_RELAY,
        variables: {
          first: 10,
          after: postsData?.length ? postsData[postsData.length - 1].cursor : null
        },
        fetchPolicy: 'network-only'
      })
      .then(res => res.data)
      .then(({ post }: any) => {
        const { edges, pageInfo } = post
        setPostsData(
          (postsData) => {
            if (postsData) {
              return [...postsData, ...edges]
            } else {
              return edges
            }
          })
        setHasMore(pageInfo.hasNextPage)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function fetchMore() {
    if (loading) {
      message.info('正在获取新帖子中，请稍后再试!')
      return
    }
    setLoading(true)
    await client
      .query<PostsConnectionWithRelay, QueryPostsWithRelayArgs>({
        query: POSTS_WITH_RELAY,
        variables: {
          first: 10,
          before: postsData?.at(0)?.cursor
        },
        fetchPolicy: 'network-only'
      })
      .then(res => res.data)
      .then(({ post }: any) => {
        const { edges } = post
        console.log('postsData', postsData)
        setPostsData((postsData) => {
          if (postsData === null) {
            return edges
          } else {
            const firstTen = postsData.slice(0, 10)
            const feed = edges.filter(
              (edge: PostEdge) =>
                !firstTen.some((post) => post?.node?.id === edge?.node?.id)
            )
            if (feed.length > 0) {
              message.success('新加载了' + feed.length + '条帖子')
            } else {
              message.info('没有新的帖子')
            }
            return [...feed, ...postsData]
          }
        })
      })
      .catch((err) => {
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
        <div
          className="flex flex-col py-2 bg-white mb-3 rounded-md text-center font-medium"
          onClick={(e) => {
            e.stopPropagation()
            fetchMore().then(() => setLoading(false))
          }}
        >
          <div className="inline-block pl-1">
            Fetch More <ReloadOutlined/>
          </div>
        </div>
        {postsData &&
          postsData.map(({ node }) => (
            <PostView key={node?.id} node={node!}
              onVoteClick={e => {
                e.stopPropagation()
                postRef.current = node!.id
                setAddVotesMask(true)
              }}
              onDeleteClick={e => {
                e.stopPropagation()
                postRef.current = node!.id
                setActionSheetVisible(true)
              }
              }/>
          )
          )}
      </div>
      <ActionSheet
        className="pb-1"
        visible={actionSheetVisible}
        actions={actions}
        cancelText="取消"
        onClose={() => setActionSheetVisible(false)}
      />
      <InfiniteScroll loadMore={loadMore} threshold={100} hasMore={hasMore}/>
    </>
  )
}
