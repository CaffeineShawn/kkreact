import React, { useRef, useState } from 'react'
import {
  ActionSheet,
  Dialog,
  Image,
  ImageViewer,
  InfiniteScroll
} from 'antd-mobile'
import { POSTS_WITH_RELAY } from '../graphql/queries/queries'
import { DELETE_POST } from '../graphql/mutations/delete'
import {
  PostsWithRelay,
  PostsWithRelayVariables,
  PostsWithRelay_postsWithRelay_edges
} from '../generated/PostsWithRelay'
import {
  DeletePost,
  DeletePostVariables
} from '../generated/DeletePost'
import { client, clientWithToken } from '../main'
import * as PostsWithRelayTypes from '../generated/PostsWithRelay'
import { Action } from 'antd-mobile/es/components/action-sheet'
import { message } from 'antd'

export default function InfinityScroll() {
  const [postsData, setPostsData] = useState<
    PostsWithRelay_postsWithRelay_edges[] | null
  >(null)
  const [hasMore, setHasMore] = useState(true)
  const [startCursor, setStartCursor] = useState<string | null>(null)
  const [actionSheetVisible, setActionSheetVisible] = useState(false)
  const deletePostRef = useRef<string | null>(null)
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
                postId: deletePostRef.current!
              },
              fetchPolicy: 'network-only'
            })
            if (res.data?.deletePost.createdAt) {
              deletePost(postsData!, deletePostRef.current!)
              message.success('已删除id为' + deletePostRef.current + '的帖子')
              console.log('已于' + res.data?.deletePost.createdAt + '删除id为' + deletePostRef.current + '的帖子')
            }
          })
          .catch(() => {
            message.info('已取消删除id为' + deletePostRef.current + '的帖子')
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

  return (
    <>
      <div className="pt-16 pb-4 px-3 font-sans text-left mx-auto md:w-5/12">
        {postsData &&
          postsData.map(
            ({
              node
            }: PostsWithRelayTypes.PostsWithRelay_postsWithRelay_edges) => (
              <div key={node?.id} className="mb-3 bg-gray-200 p-3 rounded-lg">
                <div>{node?.createdAt}</div>
                <div>
                  {node?.creator?.name ?? 'Anonymous'}: {node?.content}
                </div>

                {node?.images?.map((image: string, idx: number) => (
                  <Image
                    className="rounded-md my-1.5"
                    src={image}
                    key={image}
                    onClick={() => {
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
                <div>votes: {node?.votes.totalCount}</div>
                <div>reports: {node?.reports.totalCount}</div>
                <button
                  className={
                    'bg-red-500 text-white w-full font-bold py-2 rounded-md mt-2'
                  }
                  onClick={() => {
                    deletePostRef.current = node!.id
                    setActionSheetVisible(true)
                  }}
                >
                  Delete
                </button>
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
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  )
}
