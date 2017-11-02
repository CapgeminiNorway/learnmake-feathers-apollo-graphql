const typeDefinitions = `

scalar JSON
scalar Date

type User {
  _id: String!
  userid: String
  password: String
  createdAt: Date
}

type AuthPayload {
  token: String
  data: User
}

# the schema allows the following queries:
type Query {
  # user(_id: ID!): User
  user(userid: String!): User
  users: [User]
}

# this schema allows the following mutations:
type Mutation {
  signUp (
    userid: String!
    password: String!
  ): User

  logIn (
    userid: String!
    password: String!
  ): AuthPayload

}

# we need to tell the server which types represent the root query
# and root mutation types. We call them Query and Mutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;

export default [typeDefinitions]
