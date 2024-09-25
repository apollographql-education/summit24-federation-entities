export const resolvers = {
  Query: {
    recentReviews: async (_, __, { dataSources }) => {
      return dataSources.reviewsDb.getMostRecentReviews();
    },
  },
  Listing: {
    // Exercise: Contributing to an entity
    __resolveReference: () => {
      // Add the Listing reference resolver here
    },
    overallRating: ({ id }, __, { dataSources }) => {
      // Use this function: dataSources.getOverallRatingForListing(listingId)
    },
    reviews: ({ id }, __, { dataSources }) => {
      // Use this function: dataSources.getReviewsByListing(listingId)
    },
  },
  // Exercise: Reference an entity
  Review: {
    listing: () => {
      // Hint: Use the parent parameter
      // Hint: What fields do you need to return an entity representation for a Listing?
    },
    // Exercise: Using Requires/external
    moneyValueGuaranteed: (listing, _, { dataSources }) => {
      // Use this function: dataSources.reviewsDb.calculateMoneyValueGuarantee(
      //   listing.costPerNight,
      //   listing.id
      // )
    },
  },
};
