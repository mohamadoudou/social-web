import { graphql } from "../../gql/gql";

export const voteMutation = graphql(`
  mutation Vote($value: Int!, $postId: Int!) {
    vote(value: $value, postId: $postId)
  }
`);
