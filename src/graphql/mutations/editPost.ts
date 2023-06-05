import { graphql } from "../../gql/gql";

export const updatePost = graphql(`
  mutation UpdatePost($updatePostId: Int!, $text: String!, $title: String!) {
    updatePost(
      id: $updatePostId
      text:  $text
      title: $title: String!
    ) {
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
