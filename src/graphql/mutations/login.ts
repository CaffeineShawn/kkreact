import { gql } from '@apollo/client'

export const LOGIN = gql`
	mutation Login($userId: String!, $sign: String!) {
		login(userId: $userId, sign: $sign) {
			token
		}
	}
`;
