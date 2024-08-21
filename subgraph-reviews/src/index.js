import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";
import { resolvers } from "./resolvers.js";
import { buildSubgraphSchema } from "@apollo/subgraph";
import ReviewsDB from "./datasources/reviews.js";

const typeDefs = gql(
  readFileSync(path.resolve("./reviews.graphql"), {
    encoding: "utf-8",
  })
);

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
          reviewsDb: new ReviewsDB(),
        },
      };
    },
    listen: {
      port: 4002,
    },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
