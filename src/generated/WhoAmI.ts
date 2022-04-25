/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: WhoAmI
// ====================================================

export interface WhoAmI_whoAmI_UserWithPrivateProps {
  __typename: "UserWithPrivateProps";
}

export interface WhoAmI_whoAmI_Admin_credential {
  __typename: "ICredential";
  createdAt: string;
}

export interface WhoAmI_whoAmI_Admin_deletes_edges_node_to_Comment {
  __typename: "Comment" | "Subject" | "UserAuthenInfo";
}

export interface WhoAmI_whoAmI_Admin_deletes_edges_node_to_Post_creator {
  __typename: "User";
  /**
   * id 自动生成
   */
  id: string;
  /**
   * 用户昵称
   */
  name: string;
  /**
   * 用户账号
   */
  userId: string;
}

export interface WhoAmI_whoAmI_Admin_deletes_edges_node_to_Post {
  __typename: "Post";
  /**
   * 帖子的创建者，当帖子是匿名帖子时，返回null
   */
  creator: WhoAmI_whoAmI_Admin_deletes_edges_node_to_Post_creator | null;
}

export type WhoAmI_whoAmI_Admin_deletes_edges_node_to = WhoAmI_whoAmI_Admin_deletes_edges_node_to_Comment | WhoAmI_whoAmI_Admin_deletes_edges_node_to_Post;

export interface WhoAmI_whoAmI_Admin_deletes_edges_node {
  __typename: "Delete";
  id: string;
  /**
   * 被删除的对象
   */
  to: WhoAmI_whoAmI_Admin_deletes_edges_node_to;
  createdAt: string;
}

export interface WhoAmI_whoAmI_Admin_deletes_edges {
  __typename: "DeleteEdge";
  cursor: string | null;
  node: WhoAmI_whoAmI_Admin_deletes_edges_node | null;
}

export interface WhoAmI_whoAmI_Admin_deletes {
  __typename: "DeletesConnection";
  totalCount: number;
  edges: WhoAmI_whoAmI_Admin_deletes_edges[];
}

export interface WhoAmI_whoAmI_Admin {
  __typename: "Admin";
  /**
   * 管理员的凭证
   */
  credential: WhoAmI_whoAmI_Admin_credential | null;
  /**
   * 当前管理员的所有删除操作
   */
  deletes: WhoAmI_whoAmI_Admin_deletes;
}

export type WhoAmI_whoAmI = WhoAmI_whoAmI_UserWithPrivateProps | WhoAmI_whoAmI_Admin;

export interface WhoAmI {
  /**
   * 当前id对应的的用户画像
   */
  whoAmI: WhoAmI_whoAmI;
}
