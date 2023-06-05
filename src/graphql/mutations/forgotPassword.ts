import { graphql } from "../../gql/gql";

export const forgotPasswordMutation = graphql(`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`);
