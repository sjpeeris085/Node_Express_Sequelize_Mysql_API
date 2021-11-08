const express = require("express"); //require("express") return an method. we assign as express
const cors = require("cors");

const productRouter = require("./routes/productRouter");
const auth = require("./controllers/authController");
const user = require("./controllers/usersController");
//Instantiate express (make an object)
const app = express(); // express() return object. we assign it as app

var corOptions = {
  origin: "http://localhost:8081",
};

//midlewares
app.use(cors(corOptions));

//This belogns to requesat posessing pipe line. so we handling req and res by JSON format.
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//routers
app.use("/api/products", productRouter);
app.use("/api/auth", auth);
app.use("/api/users", user);
// .................

//Testing api
//app.get("/", (req, res) => {
// res.json({ messagge: "Hello from API" });
//});

//port
const PORT = process.env.PORT || 8081;

//server . this start listing on the given port
app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
