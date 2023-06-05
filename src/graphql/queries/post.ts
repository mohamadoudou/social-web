import { graphql } from "../../gql/gql";

export const postQuery = graphql(`
  query Post($postId: Int!) {
    post(id: $postId) {
      id
      title
      text
      points
      voteStatus
      creatorId
      creator {
        email
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`);
