import { graphql } from "../../gql/gql";

export const logoutMutation = graphql(`
  mutation Logout {
    logout
  }
`);
