/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteComment
// ====================================================

export interface DeleteComment_deleteComment {
  __typename: "Delete";
  createdAt: string;
}

export interface DeleteComment {
  /**
   * 管理员或用户删除一个评论
   */
  deleteComment: DeleteComment_deleteComment;
}

export interface DeleteCommentVariables {
  commentId: string;
}
