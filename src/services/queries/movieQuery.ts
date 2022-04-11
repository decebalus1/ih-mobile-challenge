import { gql } from '@apollo/client';

export const moviesQuery = gql`
  query Film($filmId: ID) {
    film(filmID: $filmId) {
      created
      director
      edited
      episodeID
      id
      producers
      releaseDate
      title
      openingCrawl
    }
  }
`;
