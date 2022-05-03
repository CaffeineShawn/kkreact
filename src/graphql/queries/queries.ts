import { gql } from '@apollo/client'

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
    query PostsWithRelay(
        $first: Int
        $after: String
        $last: Int
        $before: String
    ) {
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
                        openId
                        unionId
                        avatarImageUrl
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
                    commentsWithRelay {
                        totalCount
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

export { WHO_AM_I, POSTS_WITH_RELAY }
