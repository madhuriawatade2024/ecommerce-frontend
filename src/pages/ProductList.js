import React, { useState, useEffect } from "react";
import "../styles.css";


const ProductList = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("https://ecommerce-backend.onrender.com/api/products")
    .then((response) => response.json())
    .then((data) => setProducts(data))
    .catch((error) => console.error("Error fetching products:", error));
}, []);


  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <div>
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={`http://localhost:5000${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
            <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
