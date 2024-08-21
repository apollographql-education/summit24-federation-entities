import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";
import { resolvers } from "./resolvers.js";
import { ListingAPI } from "./datasources/listing-api.js";
import { buildSubgraphSchema } from "@apollo/subgraph";

const typeDefs = gql(
  readFileSync(path.resolve("./listings.graphql"), {
    encoding: "utf-8",
  })
);

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          listingAPI: new ListingAPI({ cache }),
        },
      };
    },
    listen: { port: 4001 },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
