import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./pages/Products";

const RoutesWrapper = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<>home page</>} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
};

export default RoutesWrapper;
