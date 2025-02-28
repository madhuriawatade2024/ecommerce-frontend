import React, { useState, useEffect } from "react";
import "../styles.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "", address: "" });

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!userInfo.firstName || !userInfo.lastName || !userInfo.address) {
      alert("Please fill in all details");
      return;
    }

    // ✅ Define orderData before sending the request
    const orderData = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      address: userInfo.address,
      items: cart,
      total: cart.reduce((acc, item) => acc + item.price, 0),
    };

    fetch("https://ecommerce-backend.onrender.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Order placed successfully!");
        localStorage.removeItem("cart");
        setCart([]);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img
              src={`https://ecommerce-backend.onrender.com${item.image}`} // ✅ Use deployed backend URL
              alt={item.name}
              width="50"
            />
            <p>{item.name} - ${item.price}</p>
          </div>
        ))
      )}
      <h3>Total: ${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</h3>

      <h3>Enter Shipping Details</h3>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} required />

      <button className="add-to-cart" onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Cart;
