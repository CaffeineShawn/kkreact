/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: "LoginResult";
  /**
   * token
   */
  token: string;
}

export interface Login {
  /**
   * 登录
   */
  login: Login_login;
}

export interface LoginVariables {
  userId: string;
  sign: string;
}
