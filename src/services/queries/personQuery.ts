import { gql } from '@apollo/client';

export const personQuery = gql`
  query Person($personId: ID) {
    person(id: $personId) {
      birthYear
      created
      edited
      eyeColor
      gender
      hairColor
      height
      homeworld {
        name
        population
      }
      name
      skinColor
    }
  }
`;
