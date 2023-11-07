const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const product = require("./models/product");
const { url } = require("inspector");
mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("MONGOOSE CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO ERROR!!!!");
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/products", async (req, res) => {
  const products = await product.find({});
  res.render("products/index", { products });
});

app.get("/products/new", (req, res) => {
  res.render("products/new");
});

app.post("/products", async (req, res) => {
  const newProduct = new product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    const foundProduct = await product.findById(id);
    console.log(foundProduct);

    if (!foundProduct) {
      return res.status(404).send("Product not found");
    }

    res.render("products/edit", { product: foundProduct });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;

  const updateProduct = await product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
  });
  res.redirect(`/products/${updateProduct._id}`);
});

app.delete("/products/:id", async (req, res) => {
  const {id} = req.params;
   const deleteProduct = await product.findByIdAndDelete(id);
   res.redirect('/products');
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foundProduct = await product.findById(id);
    console.log(foundProduct);

    if (!foundProduct) {
      return res.status(404).send("Product not found");
    }
    res.render("products/show", { product: foundProduct });
    //     res.json(foundProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON 30000");
});
