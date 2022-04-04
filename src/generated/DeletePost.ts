/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePost
// ====================================================

export interface DeletePost_deletePost {
  __typename: "Delete";
  createdAt: string;
}

export interface DeletePost {
  /**
   * 管理员或用户删除一个帖子
   */
  deletePost: DeletePost_deletePost;
}

export interface DeletePostVariables {
  postId: string;
}
