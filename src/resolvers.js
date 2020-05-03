import Product from './models/product';

export const resolvers = {
  Query: {
    allProducts() {
      return [{ _id: "kdkdkd", name: "course", qty: 1 }];
    }
  },
  Mutation: {
    async createProduct(_, {input}) {
      return await Product.create(input);
    }
  }
};
