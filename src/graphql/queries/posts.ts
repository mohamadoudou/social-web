import { graphql } from "../../gql/gql";

export const PostsQuery = graphql(`
  query Posts($limit: Int!, $cursor: String) {
    posts(limit: $limit, cursor: $cursor) {
      hasMore
      posts {
        id
        title
        text
        points
        voteStatus
        creatorId
        createdAt
        updatedAt
        creator {
          id
          username
        }
      }
    }
  }
`);
