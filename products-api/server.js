require('dotenv').config();
const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(json());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const { Schema, model } = mongoose;

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

app.put('/updateproduct/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/product/:id', async function(req, res){
  try {
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