import { gql } from '@apollo/client'

const DELETE_POST = gql`
    mutation DeletePost($postId: String!) {
        deletePost(postId: $postId) {
            createdAt
        }
    }
`
const DELETE_COMMENT = gql`
    mutation DeleteComment($commentId: String!) {
        deleteComment(commentId: $commentId) {
            createdAt
        }
    }
`
export { DELETE_POST, DELETE_COMMENT }
