import { parseDate } from "../../utils/util";

export default {
  Query: {
    async allProducts(_, { first = 50, skip = 0, filter, orderBy }, ctx) {
      const query = filter ? { $or: [{ name: filter }] } : {};
      return await ctx.models.product
        .find(query)
        .select("_id name qty owner")
        .skip(skip)
        .limit(first)
        .sort(orderBy);
    },
    async findAllProducts(_, { first = 50, cursor }, ctx) {
      const query = {};
      if (cursor) {
        const date = parseDate(cursor);
        query.createdAt = {
          $lt: date
        };
      }
      return await ctx.models.product
        .find(query)
        .select("_id name qty createdAt owner")
        .limit(first)
        .sort('-createdAt');
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
