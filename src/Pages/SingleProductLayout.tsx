import React from "react";
import SingleProduct from "../Components/SingleProduct/SingleProduct";
import { useParams } from "react-router";
import { data } from "../Utils/data";

const SingleProductLayout = () => {
  const { id } = useParams();

  const item = data.filter((item) => item.id === id);
  return (
    <div>
      <SingleProduct product={item} />
    </div>
  );
};

export default SingleProductLayout;
