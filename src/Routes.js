import React from "react";
import { Routes, Route } from "react-router-dom";

const RoutesWrapper = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<>home page</>} />
      </Routes>
    </>
  );
};

export default RoutesWrapper;
