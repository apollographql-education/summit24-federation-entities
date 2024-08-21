import { Sequelize, DataTypes } from "sequelize";
import config from "./sequelize/config/config.js";
import { v4 as uuidv4 } from "uuid";

import Review from "./sequelize/models/review.js";

const env = process.env.NODE_ENV || "development";
const configEnv = config[env];

class ReviewsDB {
  constructor() {
    this.db = this.initializeSequelizeDb();
  }

  db;

  initializeSequelizeDb() {
    let sequelize;

    sequelize = new Sequelize(
      configEnv.database,
      configEnv.username,
      configEnv.password,
      { dialect: "sqlite", storage: "src/datasources/reviews.db" }
    );

    const db = {
      Review: Review(sequelize, DataTypes),
      sequelize: sequelize,
      Sequelize: Sequelize,
    };

    return db;
  }

  async getReview(id) {
    return this.db.Review.findByPk(id);
  }

  async getAllReviews() {
    return this.db.Review.findAll();
  }

  async getMostRecentReviews() {
    return this.db.Review.findAll({ limit: 3 });
  }

  async getReviewsByListing(id) {
    return this.db.Review.findAll({ where: { listingId: id } });
  }

  async createReviewForListing({ listingId, text, rating }) {
    const review = await this.db.Review.create({
      id: uuidv4(),
      text,
      rating,
      listingId,
    });

    return review;
  }

  async getOverallRatingForListing(listingId) {
    const review = await this.db.Review.findOne({
      where: { listingId },
      attributes: [
        [
          this.db.sequelize.fn("AVG", this.db.sequelize.col("rating")),
          "avg_rating",
        ],
      ],
    });

    return review.getDataValue("avg_rating") || null;
  }

  async calculateMoneyValueGuarantee(listingCostPerNight, listingId) {
    const rating = await this.getOverallRatingForListing(listingId);
    if (rating != null) {
      return listingCostPerNight < 475 && rating >= 3.5;
    } else {
      return null;
    }
  }
}

export default ReviewsDB;
