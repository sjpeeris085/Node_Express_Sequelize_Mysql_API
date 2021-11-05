const productController = require("../controllers/productController");

const router = require("express").Router();

router.post("/addProduct", productController.addProduct);

router.get("/getAllProduct", productController.getAllProducts);

router.get("/getPublishedProducts", productController.getPublishedProducts);

router.get(
  "/getAllProductTitlePrice",
  productController.getAllProductTitlePrice
);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
