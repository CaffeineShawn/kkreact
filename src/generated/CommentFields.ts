/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CommentFields
// ====================================================

export interface CommentFields_creator {
  __typename: "User";
  /**
   * 用户账号
   */
  userId: string;
  /**
   * 用户昵称
   */
  name: string;
  /**
   * id 自动生成
   */
  id: string;
  /**
   * 用户头像链接
   */
  avatarImageUrl: string | null;
}

export interface CommentFields_anonymous_creator {
  __typename: "User";
  /**
   * id 自动生成
   */
  id: string;
}

export interface CommentFields_anonymous {
  __typename: "Anonymous";
  /**
   * 匿名的创建者，只有创建者自己可见
   */
  creator: CommentFields_anonymous_creator | null;
  /**
   * 同一个用户的匿名信息在同一条帖子下面的 watermark 相同
   */
  watermark: string;
}

export interface CommentFields_votes {
  __typename: "VotesConnection";
  totalCount: number;
  viewerCanUpvote: boolean;
  viewerHasUpvoted: boolean;
}

export interface CommentFields_trendingComments_nodes_creator {
  __typename: "User";
  /**
   * 用户账号
   */
  userId: string;
  /**
   * 用户昵称
   */
  name: string;
  /**
   * id 自动生成
   */
  id: string;
  /**
   * 用户头像链接
   */
  avatarImageUrl: string | null;
}

export interface CommentFields_trendingComments_nodes {
  __typename: "Comment";
  id: string;
  content: string;
  /**
   * 评论的创建者，评论是匿名评论时，creator为null
   */
  creator: CommentFields_trendingComments_nodes_creator | null;
}

export interface CommentFields_trendingComments {
  __typename: "CommentsConnection";
  nodes: CommentFields_trendingComments_nodes[];
  totalCount: number;
}

export interface CommentFields {
  __typename: "Comment";
  id: string;
  content: string;
  createdAt: string;
  /**
   * 评论的创建者，评论是匿名评论时，creator为null
   */
  creator: CommentFields_creator | null;
  /**
   * 评论的匿名信息，非匿名评论，此项为null
   */
  anonymous: CommentFields_anonymous | null;
  /**
   * 获取该评论下的点赞信息
   */
  votes: CommentFields_votes;
  /**
   * 按热度获取该评论下的所有评论
   */
  trendingComments: CommentFields_trendingComments;
}
