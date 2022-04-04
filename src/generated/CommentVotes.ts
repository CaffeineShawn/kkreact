/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentVotes
// ====================================================

export interface CommentVotes_votes {
  __typename: "VotesConnection";
  totalCount: number;
  viewerCanUpvote: boolean;
  viewerHasUpvoted: boolean;
}

export interface CommentVotes {
  __typename: "Comment";
  /**
   * 获取该评论下的点赞信息
   */
  votes: CommentVotes_votes;
}
