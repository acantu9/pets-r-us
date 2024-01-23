// How should my data look like?

const typeDefs = `
type Pet {
    type: String
}

type Query {
    pet: [
        Pet
    ]
}
`;

module.exports = typeDefs;