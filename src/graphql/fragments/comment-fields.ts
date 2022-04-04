import { gql } from '@apollo/client'

export const FRAGMENT_COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
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
    trendingComments(first: 2, offset: 0) {
      nodes {
        id
        content
        creator {
          userId
          name
          id
          avatarImageUrl
        }
      }
      totalCount
    }
  }
`
