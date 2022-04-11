import { gql } from '@apollo/client';

export const peopleQuery = gql`
  query allPeople($first: Int, $after: String) {
    allPeople(first: $first, after: $after) {
      totalCount
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
