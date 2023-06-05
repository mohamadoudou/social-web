import { graphql } from "../../gql/gql";

export const changePasswordMutation = graphql(`
  mutation ChangePassword($newPassword: String!, $token: String!) {
    changePassword(newPassword: $newPassword, token: $token) {
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
