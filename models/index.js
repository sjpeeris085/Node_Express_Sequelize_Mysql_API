const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

//object initilize. (pass parameter to constructor)
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false, //hide errors
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log("Error " + err);
  });

const db = {}; // Empty object

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./productModel.js")(sequelize, DataTypes);
db.reviews = require("./reviewModel.js")(sequelize, DataTypes);
db.users = require("./users.js")(sequelize, DataTypes);

//realationships
db.products.hasMany(db.reviews, {
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
db.reviews.belongsTo(db.products);

db.sequelize
  .sync({ force: false }) //force :true - drop all tables before start
  .then(() => {
    console.log("yes re-sync done!");
  });

module.exports = db;
