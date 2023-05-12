const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        name: String!
        username: String!
        id: ID!
        age: Int!
        nationality: String!
    }
    type Query {
        users: [User!]!
    }
`;

module.exports = { typeDefs };