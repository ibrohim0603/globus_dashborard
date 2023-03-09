import React from "react";
import { Routes, Route } from "react-router-dom";
import Category from "./pages/Category";
import Products from "./pages/Products";
import Users from "./pages/Users";

const RoutesWrapper = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<>home page</>} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
};

export default RoutesWrapper;
