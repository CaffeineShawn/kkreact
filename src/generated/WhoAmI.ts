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

export interface WhoAmI_whoAmI_Admin_deletes_nodes {
  __typename: "Delete";
  id: string;
}

export interface WhoAmI_whoAmI_Admin_deletes {
  __typename: "DeletesConnection";
  nodes: WhoAmI_whoAmI_Admin_deletes_nodes[];
}

export interface WhoAmI_whoAmI_Admin_credentials_nodes_to_privileges_nodes {
  __typename: "Privilege";
  id: string;
}

export interface WhoAmI_whoAmI_Admin_credentials_nodes_to_privileges {
  __typename: "PrivilegesConnection";
  nodes: WhoAmI_whoAmI_Admin_credentials_nodes_to_privileges_nodes[];
}

export interface WhoAmI_whoAmI_Admin_credentials_nodes_to {
  __typename: "Admin";
  /**
   * 当前管理员拥有的权限
   */
  privileges: WhoAmI_whoAmI_Admin_credentials_nodes_to_privileges;
}

export interface WhoAmI_whoAmI_Admin_credentials_nodes_creator {
  __typename: "Admin";
  name: string;
}

export interface WhoAmI_whoAmI_Admin_credentials_nodes {
  __typename: "ICredential";
  id: string;
  to: WhoAmI_whoAmI_Admin_credentials_nodes_to;
  creator: WhoAmI_whoAmI_Admin_credentials_nodes_creator;
}

export interface WhoAmI_whoAmI_Admin_credentials {
  __typename: "ICredentialsConnection";
  nodes: WhoAmI_whoAmI_Admin_credentials_nodes[];
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
  /**
   * 当前管理员认证过的其他管理员
   */
  credentials: WhoAmI_whoAmI_Admin_credentials;
}

export type WhoAmI_whoAmI = WhoAmI_whoAmI_UserWithPrivateProps | WhoAmI_whoAmI_Admin;

export interface WhoAmI {
  /**
   * 当前id对应的的用户画像
   */
  whoAmI: WhoAmI_whoAmI;
}
