import React, { useState } from "react";
import axios from "axios";
import "./updprod.css";

const UpdateProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState({
    _id: "",
    title: "",
    description: "",
    price: 0,
    discount: 0,
    quantity: 0,
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "tags" ? value.split(",") : value,
    });
  };

  const handleCheck = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/product/${product._id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
      alert("Product not found or error fetching details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...product,
      tags: product.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      const response = await axios.put(
        "http://localhost:3001/updateproduct",
        productData
      );
      console.log("Product updated successfully:", productData);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleForm} className="button">
        {isOpen ? "Close Form" : "Update Product"}
      </button>
      {isOpen && (
        <form onSubmit={handleSubmit} className="form">
          <label className="label">
            ID:
            <input
              type="text"
              name="_id"
              value={product._id}
              onChange={handleChange}
              className="input"
            />
            <button type="button" onClick={handleCheck} className="button">
              Check
            </button>
          </label>
          <label className="label">
            Title:
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="label">
            Description:
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="label">
            Price:
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="label">
            Discount:
            <input
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="label">
            Quantity:
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="label">
            Tags (comma separated):
            <input
              type="text"
              name="tags"
              value={product.tags}
              onChange={handleChange}
              className="input"
            />
          </label>
          <button type="submit" className="button">
            Update Product
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProduct;