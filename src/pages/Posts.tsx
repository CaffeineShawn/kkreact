import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import * as PostsWithRelayTypes from '../generated/PostsWithRelay'
import { Button, Image, ImageViewer } from 'antd-mobile'
export const POSTS_WITH_RELAY = gql`
query PostsWithRelay($first: Int, $after: String, $last: Int, $before: String) {
  postsWithRelay(first: $first, after: $after, last: $last, before: $before) {
    edges { 
      node {
        id
        content
        createdAt
        images
        creator { 
          id
          userId
          name
        }
        subject {
          id
          title
        }
        votes {
          totalCount
          viewerCanUpvote
          viewerHasUpvoted
        }
        reports {
          totalCount
        }
        delete {
          id
          createdAt
          creator {
            id
            userId
            name
          }
        }
        anonymous {
          id
          watermark
          creator {
            id
            userId
            name
          }
        }
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
`
const Posts = () => {
  const { data, loading, error } = useQuery(POSTS_WITH_RELAY, {
    variables: {
      first: 10
    }
  })
  const [visible, setVisible] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [viewingImgPostId, setViewingImgPostId] = useState('')

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error :(</div>
  if (!data) return <div>Not Found</div>

  return (
    <div className='flex-col'>
      <div className='px-3 font-sans text-left'>
        {data.postsWithRelay.edges.map(({ node }: PostsWithRelayTypes.PostsWithRelay_postsWithRelay_edges) => (
          <div key={node?.id} className='mb-3 bg-gray-200 p-3 rounded-lg'>
            <div>{node?.createdAt}</div>
            <div>{node?.creator?.name ?? 'Anonymous'}: {node?.content}</div>

              {node?.images?.map((image: string, idx: number) => (
                // onClick={() => setImgIndex(imgIndex => idx)}
                  <Image src={image} key={image} onClick={() => {
                    setVisible(true)
                    setImgIndex(imgIndex => idx)
                    setViewingImgPostId(() => node?.id)
                  }} />
              ))}
              {node?.images && node.images !== undefined &&
              <ImageViewer.Multi
                images={node?.images}
                visible={visible && viewingImgPostId === node?.id}
                defaultIndex={imgIndex}
                onClose={() => {
                  setVisible(false)
                }}
              /> }
                          {
              node?.subject && 
              <div className='w-24 rounded-lg my-2 px-1 text-center bg-white text-blue-600 font-bold'>
              #{ node?.subject!.title } 
              </div>
            }
            <div>votes: {node?.votes.totalCount}</div>
            <div>reports: {node?.reports.totalCount}</div>
            <Button size='middle' shape='default' fill='outline' color='danger' className='w-full bg-white' disabled={node?.delete != null} onClick={() => console.log(node?.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Posts
