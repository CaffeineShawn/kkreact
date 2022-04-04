/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PostVotes
// ====================================================

export interface PostVotes_votes {
  __typename: "VotesConnection";
  totalCount: number;
  viewerCanUpvote: boolean;
  viewerHasUpvoted: boolean;
}

export interface PostVotes {
  __typename: "Post";
  /**
   * 帖子的点赞
   */
  votes: PostVotes_votes;
}
