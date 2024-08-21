import { RESTDataSource } from "@apollo/datasource-rest";

export class ListingAPI extends RESTDataSource {
  baseURL = "https://rt-airlock-services-listing.herokuapp.com/";

  getFeaturedListings() {
    return this.get("featured-listings");
  }

  getListing(listingId) {
    return this.get(`listings/${listingId}`);
  }

  getAmenities(listingId) {
    return this.get(`listings/${listingId}/amenities`);
  }
}
