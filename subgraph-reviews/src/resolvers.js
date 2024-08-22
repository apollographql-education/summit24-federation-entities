export const resolvers = {
  Query: {
    recentReviews: async (_, __, { dataSources }) => {
      return dataSources.reviewsDb.getMostRecentReviews();
    },
  },
  Listing: {
    __resolveReference(listing) {
      return listing;
    },
    overallRating: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getOverallRatingForListing(id);
    },
    reviews: ({ id }, _, { dataSources }) => {
      return dataSources.reviewsDb.getReviewsByListing(id);
    },
  },
  Review: {
    listing: (review) => {
      return { id: review.listingId };
    },
  },
};
