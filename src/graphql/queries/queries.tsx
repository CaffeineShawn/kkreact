import { gql } from '@apollo/client'

export const DELETE_POST = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId) {
      createdAt
    }
  }
`
export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: String!) {
    deleteComment(commentId: $commentId) {
      createdAt
    }
  }
`

export const WHO_AM_I = gql`
  query WhoAmI {
    whoAmI {
      ... on Admin {
        credential {
          createdAt
        }
        deletes {
          nodes {
            id
          }
        }
        credentials {
          nodes {
            id
            to {
              privileges {
                nodes {
                  id
                }
              }
            }
            creator {
              name
            }
          }
        }
      }
    }
  }
`
