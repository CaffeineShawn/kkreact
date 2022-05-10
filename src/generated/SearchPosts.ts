/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ORDER_BY } from "./globalTypes";

// ====================================================
// GraphQL query operation: SearchPosts
// ====================================================

export interface SearchPosts_posts_pageInfo {
  __typename: "SearchResultItemPageInfo";
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface SearchPosts_posts_edges_node_User {
  __typename: "User" | "Comment" | "Subject";
}

export interface SearchPosts_posts_edges_node_Post_creator {
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
  /**
   * 微信openId,注册时传入微信code自动通过微信提供的接口获取获取
   */
  openId: string;
  /**
   * 微信unionId,注册时传入微信code自动通过微信提供的接口获取获取
   */
  unionId: string;
}

export interface SearchPosts_posts_edges_node_Post_subject {
  __typename: "Subject";
  id: string;
  title: string;
  description: string;
  avatarImageUrl: string;
}

export interface SearchPosts_posts_edges_node_Post_votes {
  __typename: "VotesConnection";
  totalCount: number;
  viewerCanUpvote: boolean;
  viewerHasUpvoted: boolean;
}

export interface SearchPosts_posts_edges_node_Post_reports {
  __typename: "ReportsConnection";
  totalCount: number;
}

export interface SearchPosts_posts_edges_node_Post_trendingComments_nodes_creator {
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

export interface SearchPosts_posts_edges_node_Post_trendingComments_nodes_anonymous_creator {
  __typename: "User";
  /**
   * id 自动生成
   */
  id: string;
}

export interface SearchPosts_posts_edges_node_Post_trendingComments_nodes_anonymous {
  __typename: "Anonymous";
  /**
   * 匿名的创建者，只有创建者自己可见
   */
  creator: SearchPosts_posts_edges_node_Post_trendingComments_nodes_anonymous_creator | null;
  /**
   * 同一个用户的匿名信息在同一条帖子下面的 watermark 相同
   */
  watermark: string;
}

export interface SearchPosts_posts_edges_node_Post_trendingComments_nodes_votes {
  __typename: "VotesConnection";
  totalCount: number;
  viewerCanUpvote: boolean;
  viewerHasUpvoted: boolean;
}

export interface SearchPosts_posts_edges_node_Post_trendingComments_nodes_comments {
  __typename: "CommentsConnection";
  totalCount: number;
}

export interface SearchPosts_posts_edges_node_Post_trendingComments_nodes {
  __typename: "Comment";
  id: string;
  content: string;
  createdAt: string;
  /**
   * 评论的创建者，评论是匿名评论时，creator为null
   */
  creator: SearchPosts_posts_edges_node_Post_trendingComments_nodes_creator | null;
  /**
   * 评论的匿名信息，非匿名评论，此项为null
   */
  anonymous: SearchPosts_posts_edges_node_Post_trendingComments_nodes_anonymous | null;
  /**
   * 获取该评论下的点赞信息
   */
  votes: SearchPosts_posts_edges_node_Post_trendingComments_nodes_votes;
  /**
   * 获取该评论下的所有评论
   */
  comments: SearchPosts_posts_edges_node_Post_trendingComments_nodes_comments;
}

export interface SearchPosts_posts_edges_node_Post_trendingComments {
  __typename: "CommentsConnection";
  nodes: SearchPosts_posts_edges_node_Post_trendingComments_nodes[];
  totalCount: number;
}

export interface SearchPosts_posts_edges_node_Post {
  __typename: "Post";
  id: string;
  content: string;
  createdAt: string;
  images: string[] | null;
  /**
   * 帖子的创建者，当帖子是匿名帖子时，返回null
   */
  creator: SearchPosts_posts_edges_node_Post_creator | null;
  /**
   * 帖子所属的主题
   */
  subject: SearchPosts_posts_edges_node_Post_subject | null;
  /**
   * 帖子的点赞
   */
  votes: SearchPosts_posts_edges_node_Post_votes;
  /**
   * 帖子收到的举报
   */
  reports: SearchPosts_posts_edges_node_Post_reports;
  /**
   * 按热度返回评论
   */
  trendingComments: SearchPosts_posts_edges_node_Post_trendingComments;
}

export type SearchPosts_posts_edges_node = SearchPosts_posts_edges_node_Post;

export interface SearchPosts_posts_edges {
  __typename: "SearchResultItemEdge";
  cursor: string | null;
  node: SearchPosts_posts_edges_node | null;
}

export interface SearchPosts_posts {
  __typename: "SearchResultItemConnection";
  pageInfo: SearchPosts_posts_pageInfo;
  edges: SearchPosts_posts_edges[];
}

export interface SearchPosts {
  /**
   * 简单的搜索
   */
  posts: SearchPosts_posts;
}

export interface SearchPostsVariables {
  orderBy?: ORDER_BY | null;
  first?: number | null;
  after?: string | null;
  keyword: string;
}
