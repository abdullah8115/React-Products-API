require("dotenv").config();
const express = require("express");
const { json } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(json());

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  discount: Number,
  quantity: Number,
  tags: [String],
  image: String,
});

const Product = model("Product", productSchema);

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("image");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

app.post("/addproduct", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      try {
        const product = new Product({
          ...req.body,
          image: req.file ? req.file.path : "",
        });
        await product.save();
        res.status(201).send(product);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  });
});

app.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/updateproduct/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/removeproduct/:id", async function (req, res) {
  try {
    console.log(req.params.id);
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
