import { graphql } from "../../gql/gql";

export const loginMutation = graphql(`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
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
