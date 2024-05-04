import React, { useState } from 'react';
import axios from 'axios';
import './dltprod.css';

const DeleteProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);

  const handleChange = (e) => {
    setProductId(e.target.value);
  };

  const handleFetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/product/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Error fetching product.');
    }
  };

  const handleDeleteProduct = async () => {
    try {
      if (!product) {
        alert('Please fetch the product first.');
        return;
      }
      await axios.delete(`http://localhost:3001/removeproduct/${productId}`);
      console.log('Product deleted successfully:', product);
      alert('Product has been deleted successfully!');
      setProductId(''); // Clear productId after successful delete
      setProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product.');
    }
  };

  return (
    <div className="container">
      <button onClick={() => setIsOpen(!isOpen)} className={`button ${!isOpen ? 'button-red' : ''}`}>
        {isOpen ? 'Cancel Delete' : 'Delete Product'}
      </button>
      {isOpen && (
        <div className="form">
          <label className="label">
            Product ID:
            <input
              type="text"
              name="productId"
              value={productId}
              onChange={handleChange}
              className="input"
            />
          </label>
          <div>
            <button onClick={handleFetchProduct} className="button">
              Fetch Product
            </button>
            {product && (
              <button onClick={handleDeleteProduct} className="button button-red">
                Confirm Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;