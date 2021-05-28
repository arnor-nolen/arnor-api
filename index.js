import { GITHUB_TOKEN, GITHUB_URL, PORT } from "./src/settings.js";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: GITHUB_URL,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    fetch,
  }),
  cache: new InMemoryCache(),
});

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Language {
    name: String!
    color: String
  }
  type Repository {
    name: String!
    description: String
    createdAt: String!
    primaryLanguage: Language
    url: String!
  }
  type Node {
    nodes: [Repository]
  }
  type GithubInfo {
    login: String!
    name: String!
    avatarUrl: String
    bio: String
    company: String
    pinnedItems: Node!
  }

  type Query {
    ping: String!
    githubInfo: GithubInfo!
  }
`;

const ping = async () => "Pong!";

const githubInfo = async () => {
  const query = gql`
    query q1 {
      user(login: "arnor-nolen") {
        login
        name
        avatarUrl
        bio
        company
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              createdAt
              primaryLanguage {
                name
                color
              }
              url
            }
          }
          totalCount
        }
      }
    }
  `;
  return client.query({ query }).then((resp) => {
    const result = resp.data.user;
    return result;
  });
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    ping: ping,
    githubInfo: githubInfo,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, introspection: true });

// The `listen` method launches a web server.
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});