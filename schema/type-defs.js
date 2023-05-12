const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        name: String!
        username: String!
        id: ID!
        age: Int!
        nationality: Nationality!
        friends: [User]
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
    }

    enum Nationality {
    CANADA
    CHINA
    INDIA
    GERMANY
    CHILE
    BRAZIL
    }
`;

module.exports = { typeDefs };