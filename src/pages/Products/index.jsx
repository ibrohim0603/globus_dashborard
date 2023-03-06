import React from "react";
import { useGetData } from "../../utils/hooks";

const Products = () => {
  const products = useGetData(["products"], `/products?take=99999`, {});

  console.log(products);

  return <div>Products</div>;
};

export default Products;
