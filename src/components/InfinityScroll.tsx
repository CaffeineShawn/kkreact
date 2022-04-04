import React, { useState } from 'react'
import { InfiniteScroll, List } from 'antd-mobile'
import { POSTS_WITH_RELAY } from '../pages/Posts'
import { PostsWithRelay, PostsWithRelayVariables } from '../generated/PostsWithRelay'
import { client } from '../main'
export default () => {
  const [data, setData] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(true)
  async function loadMore() {
    const append = await client.query<PostsWithRelay, PostsWithRelayVariables>({
        query: POSTS_WITH_RELAY,
        variables: {
            first: 10,
            startCursor: startCursor
        }
    })
    setData(val => [...val, ...append])
    setHasMore(append.length > 0)
  }

  return (
    <>
      <List>
        {data.map((item, index) => (
          <List.Item key={index}>{item}</List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  )
}