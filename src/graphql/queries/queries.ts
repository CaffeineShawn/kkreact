import { gql } from '@apollo/client'
import { FRAGMENT_POST_FIELDS } from '../fragments/post-fields'

const WHO_AM_I = gql`
  query WhoAmI {
    whoAmI {
      ... on Admin {
        credential {
          createdAt
        }
          deletes {
              totalCount
              ... on DeletesConnection {
                  edges {
                      cursor
                      ... on DeleteEdge {
                          cursor
                          node {
                              id
                              to {
                                  ... on Post {
                                      creator {
                                          id
                                          name
                                          userId
                                      }
                                  }
                              }
                              createdAt

                          }
                      }
                  }
              }
          }
      }
    }
  }
`

const POSTS_WITH_RELAY = gql`
    ${FRAGMENT_POST_FIELDS}
    
    query PostsWithRelay(
        $first: Int
        $after: String
        $last: Int
        $before: String
    ) {
        post: postsWithRelay(first: $first, after: $after, last: $last, before: $before) {
            edges {
                node {
                    ...PostFields
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

const SEARCH_POSTS = gql`
    ${FRAGMENT_POST_FIELDS}

    query SearchPosts(
        $orderBy: ORDER_BY
        $first: Int
        $after: String
        $keyword: String!
    ) {
        posts: search(
            orderBy: $orderBy
            first: $first
            after: $after
            type: POST
            query: $keyword
        ) {
            pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
            }
            edges {
                cursor
                node {
                    ...PostFields
                }
            }
        }
    }
`

export { WHO_AM_I, POSTS_WITH_RELAY, SEARCH_POSTS }
