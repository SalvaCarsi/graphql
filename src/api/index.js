import product from "./product";
import auth from "./auth";
import merge from "lodash.merge";

const resolvers = merge({}, product.resolvers, auth.resolvers);
export default {
  resolvers,
  typeDefs: [product.typeDefs, auth.typeDefs].join(""),
  context: req => ({
    ...req,
    models: {
      product: product.model,
      user: auth.model
    }
  })
};
