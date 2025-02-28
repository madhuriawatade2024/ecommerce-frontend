import React from "react";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>🛒 My E-Commerce</h1>
          <nav>
            <Link to="/">Products</Link>
            <Link to="/cart">Cart</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
