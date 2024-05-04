import React, { useState } from 'react';
import axios from 'axios';

// Inline CSS styles
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  label: {
    marginBottom: '10px',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    width: '300px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  popup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    zIndex: '1000',  // Ensure it sits on top of other content
  }
};

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    discount: 0,
    quantity: 0,
    tags: [],
  });
  const [showPopup, setShowPopup] = useState(false);
  const [productId, setProductId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setProduct({ ...product, tags: value.split(',').map(tag => tag.trim()) });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.title || !product.description) {
      alert('Title and description are required.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/addproduct', product);
      setProductId(response.data._id);  // Assuming response.data._id contains the new product ID
      setShowPopup(true);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(productId).then(() => {
      alert('Product ID copied to clipboard!');
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Title:<input type="text" name="title" onChange={handleChange} style={styles.input} /></label>
        <label style={styles.label}>Description:<input type="text" name="description" onChange={handleChange} style={styles.input} /></label>
        <label style={styles.label}>Price:<input type="number" name="price" onChange={handleChange} style={styles.input} /></label>
        <label style={styles.label}>Discount:<input type="number" name="discount" onChange={handleChange} style={styles.input} /></label>
        <label style={styles.label}>Quantity:<input type="number" name="quantity" onChange={handleChange} style={styles.input} /></label>
        <label style={styles.label}>Tags (comma separated):<input type="text" name="tags" onChange={handleChange} style={styles.input} /></label>
        <button type="submit" style={styles.button}>Add Product</button>
      </form>
      {showPopup && (
        <div style={styles.popup}>
          <p>Product ID: {productId}</p>
          <button onClick={handleCopy} style={styles.button}>Copy ID</button>
          <button onClick={() => setShowPopup(false)} style={styles.button}>Close</button>
        </div>
      )}
    </>
  );
};

export default AddProduct;