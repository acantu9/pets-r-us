// How should my data look like?

const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        favorites: [Pet]
    }

    type Auth {
      token: ID!
      user: User
    }

    type Pet {
        petId: ID!
        type: String
        breed: String
        size: String
        age: String
        gender: String
        spay: String
        image: String
    }

    input InputPet {
      petId: String
      type: String
        breed: String
        size: String
        age: String
        gender: String
        spay: String
        image: String
    }

    type Query {
      me: User
    }

    type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      savePet(newPet: InputPet): User
    } 
`;

module.exports = typeDefs;