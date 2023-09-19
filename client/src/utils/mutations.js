import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

// export const ADD_USER = gql`
//   mutation addUser(name: String!, email: String!, password: String!) {
//     addUser(profileId: $profileId, skill: $skill) {
//       _id
//       name
//       skills
//     }
//   }
// `;

export const SAVE_BOOK = gql`
  mutation saveBook(authors: String!, description: String!, title: String!, bookId: String!, image: String!, link: String!) {
    saveBook(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

// export const REMOVE_BOOK = gql`
//   mutation removeBook($skill: String!) {
//     removeBook(skill: $skill) {
//       _id
//       name
//       skills
//     }
//   }
// `;
