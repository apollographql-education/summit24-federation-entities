import { validateFullAmenities } from "./helpers.js";

export const resolvers = {
  Query: {
    featuredListings: (_, __, { dataSources }) => {
      return dataSources.listingAPI.getFeaturedListings();
    },
    listing: (_, { id }, { dataSources }) => {
      return dataSources.listingAPI.getListing(id);
    },
  },
  Listing: {
    __resolveReference: (listing) => {
      // listing is the the entity representation
      // uncomment the console log below to check what is in the representation
      // console.log(listing);
      return dataSources.listingAPI.getListing(listing.id);
    },
    amenities: ({ id, amenities }, _, { dataSources }) => {
      return validateFullAmenities(amenities)
        ? amenities
        : dataSources.listingAPI.getAmenities(id);
    },
  },
};
