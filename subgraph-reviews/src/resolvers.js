export const resolvers = {
  Query: {
    recentReviews: async (_, __, { dataSources }) => {
      return dataSources.reviewsDb.getMostRecentReviews();
    },
  },
};
