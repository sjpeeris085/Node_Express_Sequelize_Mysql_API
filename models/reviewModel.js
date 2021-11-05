const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
  const Review = Sequelize.define("review", {
    rating: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  return Review;
};
