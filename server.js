const express = require("express");
const cors = require("cors");

//Instantiate express (make an object)
const app = express();

var corOptions = {
  origin: "http://localhost:8081",
};

//midlewares
app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//routers

//Product router
const productRouter = require("./routes/productRouter.js");
app.use("/api/products", productRouter);
// .................

//Testing api
app.get("/", (req, res) => {
  res.json({ messagge: "Hello from API" });
});

//port
const PORT = process.env.PORT || 8081;

//server
app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
