import mongoose from "mongoose";
import { GraphQLServer } from "graphql-yoga";
import graphqlConfig from "./api";
import { makeExecutableSchema } from "graphql-tools";
import { applyMiddleware } from "graphql-middleware";
import { authMiddleware } from "./api/middlewares";

const PORT = 3000;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/gql_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const options = {
  tracing: true,
  debug: true,
  port: PORT,
  endpoint: "/graphql",
  playground: "/docs"
};

const schema = makeExecutableSchema({
  typeDefs: graphqlConfig.typeDefs,
  resolvers: graphqlConfig.resolvers
});

const protectedSchema = applyMiddleware(schema, authMiddleware);

const server = new GraphQLServer({
  schema: protectedSchema,
  context: graphqlConfig.context
});
server.start(options, () => console.log("Server is running on localhost:3000"));
