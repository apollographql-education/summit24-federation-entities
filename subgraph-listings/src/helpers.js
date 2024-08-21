export const validateFullAmenities = (amenityList) =>
  amenityList.some(hasOwnPropertyName);

const hasOwnPropertyName = (amenity) => "name" in amenity;
