"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Review extends Model {}
  Review.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      rating: DataTypes.INTEGER,
      text: DataTypes.STRING,
      listingId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Review",
      timestamps: false,
    }
  );
  return Review;
};
