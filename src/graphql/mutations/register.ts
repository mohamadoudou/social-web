import { graphql } from "../../gql/gql";

export const registerMutation = graphql(`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      user {
        id
        username
      }
      errors {
        field
        message
      }
    }
  }
`);
