import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductState } from "../../Store/ProductContext";
import classes from "./ProductList.module.css";

export interface ProductVariant {
  size: string;
  price: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  image: string;
  variants: ProductVariant[];
}

interface ProductsPage {
  products: Product[];
}
const ProductsPage: React.FC<ProductsPage> = ({ products }) => {
  const navigate = useNavigate();
  const { handleAddItem, cartitems, variant, handleVariantChange } =
    useProductState();

  return (
    <div className={classes["products-container"]}>
      {products?.map(({ id, image, brand, name, variants }, index) => {
        const selectedPrice = variant[id] || variants[0];

        console.log(selectedPrice);
        return (
          <div
            key={id}
            className={classes.product}
            onClick={() => {
              navigate(`products/${id}`);
            }}>
            <img src={image} alt='product/images' />
            <div className={classes["product-details"]}>
              <div className={classes["product-naming"]}>
                <span className={classes["brand"]}>{brand}</span>
                <span className={classes["name"]}>{name}</span>
              </div>
              <select
                value={`${selectedPrice.size} - ${selectedPrice.price}`}
                onChange={(e) => {
                  e.stopPropagation();
                  let selectvalue = e.target.value;
                  handleVariantChange(
                    id,
                    variants.find(
                      (variant) =>
                        variant.size === selectvalue.split("-")[0].trim()
                    )!
                  );
                }}
                onClick={(e) => e.stopPropagation()}>
                {variants.map(({ size, price }) => {
                  return (
                    <option key={size}>
                      {size} - {price}
                    </option>
                  );
                })}
              </select>
              <span className={classes["price"]}>
                Rs- {selectedPrice?.price}
              </span>
              <button
                className={classes.listbutton}
                onClick={(e) => {
                  e.stopPropagation();
                  const buttonText =
                    cartitems.findIndex(
                      (item: any) =>
                        item.id === id && item.variant === selectedPrice.size
                    ) >= 0
                      ? "Go To Cart"
                      : "ADD to Cart";

                  if (buttonText !== "Go To Cart") {
                    handleAddItem({
                      id,
                      variant: selectedPrice.size,
                      price: selectedPrice.price,
                      name,
                      qty: 1,
                    });
                  } else {
                    navigate("/products/cart");
                  }
                }}>
                {cartitems.findIndex(
                  (item: any) =>
                    item.id === id && item.variant === selectedPrice.size
                ) >= 0
                  ? "Go To Cart"
                  : "ADD to Cart"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsPage;
