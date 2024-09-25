export const resolvers = {
  Query: {
    recentReviews: async (_, __, { dataSources }) => {
      return dataSources.reviewsDb.getMostRecentReviews();
    },
  },
  Listing: {
    // Exercise: Contributing to an entity
    __resolveReference: (listing) => {
      return listing;
    },
    overallRating: ({ id }, __, { dataSources }) => {
      return dataSources.reviewsDb.getOverallRatingForListing(id);
    },
    reviews: ({ id }, __, { dataSources }) => {
      return dataSources.reviewsDb.getReviewsByListing(id);
    },
    // Exercise: Using requires/external
    moneyValueGuaranteed: (listing, _, { dataSources }) => {
      // Use this function: dataSources.reviewsDb.calculateMoneyValueGuarantee(
      //   listing.costPerNight,
      //   listing.id
      // )
    },
  },
  // Exercise: Reference an entity
  Review: {
    listing: (review) => {
      return { id: review.listingId };
    },
  },
};
