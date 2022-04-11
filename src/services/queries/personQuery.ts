import { gql } from '@apollo/client';

export const personQuery = gql`
  query Person($personId: ID) {
    person(personID: $personId) {
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
