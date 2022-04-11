import { gql } from '@apollo/client';

export const moviesQuery = gql`
  query allFilms {
    allFilms {
      edges {
        node {
          id
          title
          director
          releaseDate
        }
      }
    }
  }
`;
