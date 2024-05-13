import React from "react";
import { data } from "../Utils/data";
import ProductsPage from "../Components/ProductsList/ProductsList";

const ProductsLayout = () => {
  return (
    <div>
      <ProductsPage products={data} />
    </div>
  );
};

export default ProductsLayout;
