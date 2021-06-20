import { PORT, EMAIL_ADDRESS, EMAIL_PASSWORD } from "./src/settings.js";
import { ApolloServer, gql } from "apollo-server";
import nodemailer from "nodemailer";
import {
  typeDefs as typeDefsScalar,
  resolvers as resolversScalar,
} from "graphql-scalars";
import client from "./src/apolloClient";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  ${typeDefsScalar.join("\n")}

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
  type Message {
    message: String!
  }

  type Query {
    ping: String!
    githubInfo: GithubInfo!
  }

  type Mutation {
    sendEmail(name: String!, email: EmailAddress!, message: String!): Message!
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

const sendEmail = async (_, { name, email, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: EMAIL_ADDRESS,
    to: EMAIL_ADDRESS,
    subject: "arnor.dev contact form",
    text: `This is an email from ${name} at ${email}.\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return { message: "Failed sending the message!", error };
    } else {
      return { message: `Message sent: ${info.response}` };
    }
  });
};

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    ping: ping,
    githubInfo: githubInfo,
  },
  Mutation: {
    sendEmail: sendEmail,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers: { ...resolversScalar, ...resolvers },
  introspection: true,
});

// The `listen` method launches a web server.
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
