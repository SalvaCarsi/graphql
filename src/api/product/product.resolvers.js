export default {
  Query: {
    async allProducts(_, args, ctx) {
      return await ctx.models.product.find();
    },
    async getProduct(_, { _id }, ctx) {
      return await ctx.models.product.findById(_id);
    }
  },
  Mutation: {
    async createProduct(_, { input }, ctx) {
      return await ctx.models.product.create({ ...input, owner: ctx.userId });
    },
    async updateProduct(_, { _id, input }, ctx) {
      return await ctx.models.product.findByIdAndUpdate(_id, input, {
        new: true,
        useFindAndModify: false
      });
    },
    async deleteProduct(_, { _id }, ctx) {
      return await ctx.models.product.findOneAndDelete({ _id });
    }
  },
  Product: {
    async owner(product, args, ctx) {
      const owner = await ctx.models.user.findOne(
        { _id: product.owner },
        "id email"
      );

      return owner;
    }
  }
};
