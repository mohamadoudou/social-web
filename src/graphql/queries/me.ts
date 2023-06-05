import { graphql } from "../../gql/gql";

export const meQuery = graphql(`
  query Me {
    me {
      id
      username
    }
  }
`);
