import { gql } from '@apollo/client';

export const movieQuery = gql`
  query Film($filmId: ID) {
    film(id: $filmId) {
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
