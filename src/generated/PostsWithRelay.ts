/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostsWithRelay
// ====================================================

export interface PostsWithRelay_postsWithRelay_edges_node_creator {
  __typename: "User";
  /**
   * id 自动生成
   */
  id: string;
  /**
   * 用户账号
   */
  userId: string;
  /**
   * 用户昵称
   */
  name: string;
}

export interface PostsWithRelay_postsWithRelay_edges_node_subject {
  __typename: "Subject";
  id: string;
  title: string;
}

export interface PostsWithRelay_postsWithRelay_edges_node_votes {
  __typename: "VotesConnection";
  totalCount: number;
  viewerCanUpvote: boolean;
  viewerHasUpvoted: boolean;
}

export interface PostsWithRelay_postsWithRelay_edges_node_reports {
  __typename: "ReportsConnection";
  totalCount: number;
}

export interface PostsWithRelay_postsWithRelay_edges_node_delete_creator {
  __typename: "Admin";
  id: string;
  userId: string;
  name: string;
}

export interface PostsWithRelay_postsWithRelay_edges_node_delete {
  __typename: "Delete";
  id: string;
  createdAt: string;
  /**
   * 删除的创建者
   */
  creator: PostsWithRelay_postsWithRelay_edges_node_delete_creator;
}

export interface PostsWithRelay_postsWithRelay_edges_node_anonymous_creator {
  __typename: "User";
  /**
   * id 自动生成
   */
  id: string;
  /**
   * 用户账号
   */
  userId: string;
  /**
   * 用户昵称
   */
  name: string;
}

export interface PostsWithRelay_postsWithRelay_edges_node_anonymous {
  __typename: "Anonymous";
  id: string;
  /**
   * 同一个用户的匿名信息在同一条帖子下面的 watermark 相同
   */
  watermark: string;
  /**
   * 匿名的创建者，只有创建者自己可见
   */
  creator: PostsWithRelay_postsWithRelay_edges_node_anonymous_creator | null;
}

export interface PostsWithRelay_postsWithRelay_edges_node {
  __typename: "Post";
  id: string;
  content: string;
  createdAt: string;
  images: string[] | null;
  /**
   * 帖子的创建者，当帖子是匿名帖子时，返回null
   */
  creator: PostsWithRelay_postsWithRelay_edges_node_creator | null;
  /**
   * 帖子所属的主题
   */
  subject: PostsWithRelay_postsWithRelay_edges_node_subject | null;
  /**
   * 帖子的点赞
   */
  votes: PostsWithRelay_postsWithRelay_edges_node_votes;
  /**
   * 帖子收到的举报
   */
  reports: PostsWithRelay_postsWithRelay_edges_node_reports;
  /**
   * 帖子未被删除时，此项为空
   */
  delete: PostsWithRelay_postsWithRelay_edges_node_delete | null;
  /**
   * 帖子的匿名信息，非匿名帖子此项为空
   */
  anonymous: PostsWithRelay_postsWithRelay_edges_node_anonymous | null;
}

export interface PostsWithRelay_postsWithRelay_edges {
  __typename: "PostEdge";
  node: PostsWithRelay_postsWithRelay_edges_node | null;
  cursor: string | null;
}

export interface PostsWithRelay_postsWithRelay_pageInfo {
  __typename: "PostPageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PostsWithRelay_postsWithRelay {
  __typename: "PostsConnectionWithRelay";
  edges: PostsWithRelay_postsWithRelay_edges[];
  pageInfo: PostsWithRelay_postsWithRelay_pageInfo;
}

export interface PostsWithRelay {
  /**
   * Relay分页版的posts接口
   */
  postsWithRelay: PostsWithRelay_postsWithRelay;
}

export interface PostsWithRelayVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
