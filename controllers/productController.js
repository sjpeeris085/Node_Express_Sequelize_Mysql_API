const db = require("../models");

//Create main model

const Product = db.products;
const Review = db.reviews;

//Main work

// 1. Create product
const addProduct = async (req, res) => {
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  const product = await Product.create(info);
  res.status(200).send(product);
};

// 2. get all products

const getAllProducts = async (req, res) => {
  let products = await Product.findAll({});
  res.status(200).send(products);
};

// 2.2 get all products titles and price

const getAllProductTitlePrice = async (req, res) => {
  let products = await Product.findAll({
    attributes: ["title", "price"],
  });
  res.status(200).send(products);
};

// 3. get single product by id
const getProductById = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ where: { id: id } });
  res.status(200).send(product);
};

// 4. update product
/*
    app.put("app/cources/:id", (req, res) => {
    1. Validate
      If invalid, return 400 - Bad request

    2. Look up the cource
      If not existing, returbn 404 - Not found

    3. Update cource
      Rerturn updated cource
    });
*/

const updateProduct = async (req, res) => {
  let id = req.params.id;
  const product = await Product.update(req.body, { where: { id: id } });

  res.status(200).send(product);
};

// 5. delete product

const deleteProduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy({ where: { id: id } });
  res.status(200).send("Product has been deleted.");
};

// 6. get published products
const getPublishedProducts = async (req, res) => {
  let products = await Product.findAll({ where: { published: true } });
  res.status(200).send(products);
};

module.exports = {
  addProduct,
  getAllProducts,
  getAllProductTitlePrice,
  getProductById,
  getPublishedProducts,
  updateProduct,
  deleteProduct,
};
