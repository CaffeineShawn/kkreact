import { CheckCircleFilled, CommentOutlined, HeartOutlined, ReloadOutlined, WarningOutlined } from '@ant-design/icons'
import { BackTop, message } from 'antd'
import {
  ActionSheet,
  Dialog,
  Image,
  ImageViewer,
  InfiniteScroll, Stepper
} from 'antd-mobile'
import { Action } from 'antd-mobile/es/components/action-sheet'
import React, { useRef, useState } from 'react'
import {
  DeletePost,
  DeletePostVariables
} from '../generated/DeletePost'
import * as PostsWithRelayTypes from '../generated/PostsWithRelay'
import {
  PostsWithRelay,
  PostsWithRelayVariables,
  PostsWithRelay_postsWithRelay_edges
} from '../generated/PostsWithRelay'
import { DELETE_POST } from '../graphql/mutations/delete'
import { POSTS_WITH_RELAY } from '../graphql/queries/queries'
import { client, clientWithToken } from '../main'
import { getTimeStr } from '../utils/cast2Str'
import Request from '../utils/request'

export default function InfinityScroll() {
  const [postsData, setPostsData] = useState<
    PostsWithRelay_postsWithRelay_edges[] | null
  >(null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [startCursor, setStartCursor] = useState<string | null>(null)
  const [actionSheetVisible, setActionSheetVisible] = useState(false)
  const postRef = useRef<string | null>(null)
  const [showMask, setShowMask] = useState(false)
  const [voteCount, setVoteCount] = useState(1)
  const voteURL = import.meta.env.VITE_BASE_URL + '/vote/manual'
  const addVotesOnPost = new Request({
    method: 'GET',
    timeout: 2000,
    interceptors: {
      requestInterceptors: config => {
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
        await Dialog.confirm({ content: '确认删除？' })
          .then(async () => {
            const res = await clientWithToken.mutate<DeletePost, DeletePostVariables>({
              mutation: DELETE_POST,
              variables: {
                postId: postRef.current!
              },
              fetchPolicy: 'network-only'
            })
            if (res.data?.deletePost.createdAt) {
              setPostsData(postsData => deletePost(postsData!, postRef.current!))
              message.success('已删除id为' + postRef.current + '的帖子')
              console.log('已于' + res.data?.deletePost.createdAt + '删除id为' + postRef.current + '的帖子')
            }
          })
          .catch(() => {
            message.info('已取消删除id为' + postRef.current + '的帖子')
          })
      }
    }
  ]

  function deletePost(
    postsData: PostsWithRelay_postsWithRelay_edges[],
    deletedPostId: string
  ): PostsWithRelay_postsWithRelay_edges[] {
    return postsData.filter((edge) => edge.node?.id !== deletedPostId)
  }

  async function loadMore() {
    await client
      .query<PostsWithRelay, PostsWithRelayVariables>({
        query: POSTS_WITH_RELAY,
        variables: {
          first: 10,
          after: startCursor
        }
      })
      .then((res) => {
        setPostsData((postsData) => {
          if (postsData === null) {
            return res.data.postsWithRelay.edges
          } else {
            return [...postsData, ...res.data.postsWithRelay.edges]
          }
        })
        setStartCursor(res.data.postsWithRelay.pageInfo.endCursor)
        setHasMore(res.data.postsWithRelay.pageInfo.hasNextPage)
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
    await client.query<PostsWithRelay, PostsWithRelayVariables>({
      query: POSTS_WITH_RELAY,
      variables: {
        first: 10,
        before: postsData?.at(0)?.cursor
      }
    })
      .then((res) => {
        setPostsData((postsData) => {
          if (postsData === null) {
            return res.data.postsWithRelay.edges
          } else {
            const firstTen = postsData.slice(0, 10)
            const feed = res.data.postsWithRelay.edges.filter((edge) => !firstTen.some((post) => post?.node?.id === edge?.node?.id))
            if (feed.length > 0) {
              message.success('新加载了' + feed.length + '条帖子')
            } else {
              message.info('没有新的帖子')
            }
            return [...feed, ...postsData]
          }
        })
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      { showMask && <div className="mask mask-gray overflow-hidden flex flex-col items-stretch" onClick={(e) => {
        e.stopPropagation()
        setShowMask(false)
      }}
      onScroll={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}>
        <div className="flex flex-col bg-white py-12 space-y-6 rounded-md my-auto mx-auto w-7/12 px-3" onClick={e => e.stopPropagation()}>
          {/* <input className="my-auto border-2 border-amber-2 00" type="number" value={voteCount.toString(10)} onChange={val => setVoteCount(Number(val.target.value))}/> */}
          <div className="flex-initial font-bold text-xl mx-auto">增加点赞数量</div>
          <div className="flex-1" />
          <Stepper className="flex-initial mx-auto" min={0} max={100} value={voteCount} onChange={val => setVoteCount(val)}/>
          <div className="flex-1" />
          <button className="bg-purple-700 rounded-md py-1.5 font-bold text-white" onClick={e => {
            e.stopPropagation()
            setVoteCount(1)
            addVotesOnPost.instance.get(`${voteURL}?postId=${postRef.current}&count=${voteCount}`)
              .then(res => {
                setShowMask(false)
                return res
              })
              .then(res => {
                Dialog.confirm({
                  header: (<CheckCircleFilled style={{
                    fontSize: 64,
                    color: 'var(--adm-color-success)'
                  }} />),
                  content: res.data.toString()
                }).catch(err => console.log(err))
              })
          }
          }>Confirm</button>
        </div>
      </div>
      }
      <div className="pt-16 pb-4 px-3 font-sans text-left mx-auto md:w-5/12">
        <BackTop />
        <div className="flex flex-col py-2 bg-white mb-3 rounded-md text-center font-medium" onClick={(e) => {
          e.stopPropagation()
          fetchMore().then(() => setLoading(false))
        }}><div className='inline-block pl-1'>Fetch More <ReloadOutlined /></div></div>
        {postsData &&
          postsData.map(
            ({
              node
            }: PostsWithRelayTypes.PostsWithRelay_postsWithRelay_edges) => (
              <div key={node?.id} onClick={() => console.log(node)} className={`mb-3 ${node?.creator?.unionId && node.creator.openId ? 'bg-pink-100' : 'bg-gray-200'} p-3 rounded-lg flex flex-row`}>
                <div className='flex flex-col mr-3'>
                  <img className='h-12 w-12 rounded-full' src={`${node?.creator?.avatarImageUrl ?? 'https://dev-1306842204.cos.ap-guangzhou.myqcloud.com/defaultAvatars/anonymous.jpg'}`}></img>
                </div>
                <div className='flex flex-col w-full flex-nowrap'>
                  <div className='flex flex-row'>
                    <div className='flex-initial font-bold'>{node?.creator?.name ?? 'Anonymous'}</div>
                    <div className='flex-wrap pl-1 font-medium text-gray-500'>
                      @{`${node?.creator?.id ?? 'Anonymous'} · ${getTimeStr(node?.createdAt!)}`}
                    </div>
                  </div>
                  <div>
                    {node?.content}
                  </div>

                  {node?.images?.map((image: string, idx: number) => (
                    <Image
                      className="rounded-md my-1.5"
                      src={image + '?imageMogr2/format/webp'}
                      key={image}
                      onClick={(e) => {
                        e.stopPropagation()
                        ImageViewer.Multi.show({
                          images: node?.images ?? [],
                          defaultIndex: idx
                        })
                      }}
                    />
                  ))}
                  {node?.subject && (
                    <div className="flex">
                      <div className="rounded-lg my-1.5 px-3 text-left bg-white text-blue-600 font-bold">
                      #{node?.subject!.title}
                      </div>
                    </div>
                  )}
                  <div className='flex flex-row pt-1'>
                    <div className='flex-initial'>
                      <CommentOutlined/>
                      <div className='inline-block ml-1'>
                        {node?.commentsWithRelay.totalCount}
                      </div>
                    </div>
                    <div className='mx-auto' onClick={(e) => {
                      e.stopPropagation()
                      postRef.current = node!.id
                      setShowMask(true)
                    }}>
                      <HeartOutlined/>
                      <div className='inline-block ml-1' >
                        {node?.votes.totalCount}
                      </div>
                    </div>
                    <div className='flex-initial' onClick={(e) => {
                      e.stopPropagation()
                      postRef.current = node!.id
                      setActionSheetVisible(true)
                    }}>
                      <WarningOutlined/>
                      <div className='inline-block ml-1'>
                        {node?.reports.totalCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      <InfiniteScroll loadMore={loadMore} threshold={100} hasMore={hasMore} />
    </>
  )
}
