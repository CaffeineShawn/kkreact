import { gql } from '@apollo/client'

export const FRAGMENT_VOTES_ON_POST = gql`
  fragment PostVotes on Post {
    votes {
      totalCount
      viewerCanUpvote
      viewerHasUpvoted
    }
  }
`

export const FRAGMENT_VOTES_ON_COMMENT = gql`
  fragment CommentVotes on Comment {
    votes {
      totalCount
      viewerCanUpvote
      viewerHasUpvoted
    }
  }
`
