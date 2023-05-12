const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        name: String!
        username: String!
        id: ID!
        age: Int!
        nationality: Nationality!
    }

    type Query {
        users: [User!]!
    }

    enum Nationality {
    CANADA
    CHINA
    INDIA
    GERMANY
    CHILE
    }
`;

module.exports = { typeDefs };