import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
/*
export const SAVE_PET = gql `
  mutation savePet($pet: SavedPetInput!)
    savePet(pet: $pet) {
      username
      email
      savedPets {
        type
        breed
        size
        age
        gender
        spay
        image
      }
    }
`;

export const REMOVE_PET = gql`
    mutation removePet($bookId: String!) {
      removePet(petId: $petId) {
        username
        email 
        savedPets {
          type
          breed
          size
          age
          gender
          spay
          image
        }
      }
    }
`;*/



