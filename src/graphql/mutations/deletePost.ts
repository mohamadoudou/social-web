import { graphql } from "../../gql/gql";

export const deletePostMutation = graphql(`
  mutation DeletePost($deletePostId: Int!) {
    deletePost(id: $deletePostId)
  }
`);
