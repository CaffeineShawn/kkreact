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
      openId
      unionId
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
    reports {
      totalCount
    }
    trendingComments(first: 10) {
      nodes {
        id
        content
        createdAt
        creator {
          userId
          name
          id
          unionId
          openId
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
