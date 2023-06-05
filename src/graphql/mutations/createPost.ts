import { graphql } from "../../gql/gql";

export const createPost = graphql(`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      title
      text
      id
      points
      creatorId
    }
  }
`);
