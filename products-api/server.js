require('dotenv').config();
import express, { json } from 'express';
import { connect, Schema, model } from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const MONGO_URI = process.env.MONGO_URI;

connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  discount: Number,
  quantity: Number,
  tags: [String],
});

const Product = model('Product', productSchema);

app.post('/addproduct', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/updateproduct', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.body._id, req.body, { new: true });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/removeproduct', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.body._id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});