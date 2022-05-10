import React, { useState } from 'react'
import {
  SearchPosts,
  SearchPosts_posts_edges,
  SearchPosts_posts_edges_node_Post, SearchPostsVariables
} from '../generated/SearchPosts'
import { client } from '../main'
import { SEARCH_POSTS } from '../graphql/queries/queries'
import { InfiniteScroll, SearchBar } from 'antd-mobile'
import { PostView } from '../components/PostView'
import { message } from 'antd'

export default function SearchPage() {
  const [keyword, setKeyword] = useState('')
  const [hasMoreResults, setHasMoreResults] = useState(true)
  const [results, setResults] = useState<SearchPosts_posts_edges[] | null>(null)

  async function fetchResults() {
    await client.query<SearchPosts, SearchPostsVariables>({
      query: SEARCH_POSTS,
      variables: {
        keyword: keyword,
        after: results?.length ? results[results.length - 1].cursor : null
      },
      fetchPolicy: 'network-only'
    }).then((res) => {
      setResults((results) => {
        if (results === null) {
          return res.data.posts.edges
        } else {
          return [...results, ...res.data.posts.edges]
        }
      })
      console.log(results)
      setHasMoreResults(res.data.posts.pageInfo.hasNextPage)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <div className="pt-16 pb-4 px-3 font-sans text-left mx-auto md:w-5/12">
        <div className="p-2 bg-white rounded-md mb-3">
          <SearchBar onChange={(e) => setKeyword(e)} onSearch={keyword => {
            const trimmed = keyword.trim()
            if (trimmed.length > 0) {
              setResults(null)
              fetchResults()
                .then(message.success('获取搜索结果成功'))
            }
          }}/>
        </div>
        {
          results && results.map((result) => {
            const post = result.node as SearchPosts_posts_edges_node_Post
            return (
              <PostView key={post.id} node={post}/>
            )
          })
        }
      </div>
      <InfiniteScroll loadMore={fetchResults} hasMore={hasMoreResults}></InfiniteScroll>
    </>
  )
}
