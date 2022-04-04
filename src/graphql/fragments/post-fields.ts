import { gql } from '@apollo/client'

export const FRAGMENT_POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    content
    createdAt
    images
    creator {
      userId
      name
      id
      avatarImageUrl
    }
    subject {
      id
      title
      description
      avatarImageUrl
    }
    votes {
      totalCount
      viewerCanUpvote
      viewerHasUpvoted
    }
    trendingComments(first: 3) {
      nodes {
        id
        content
        createdAt
        creator {
          userId
          name
          id
          avatarImageUrl
        }
        anonymous {
          creator {
            id
          }
          watermark
        }
        votes {
          totalCount
          viewerCanUpvote
          viewerHasUpvoted
        }
        comments {
          totalCount
        }
      }
      totalCount
    }
  }
`
