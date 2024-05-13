import React from "react";
import { useNavigate } from "react-router";
import classes from "./SingleProduct.module.css";
import { useProductState } from "../../Store/ProductContext";

interface ProductVariant {
  size: string;
  price: string;
}

interface Product {
  id: string;
  brand: string;
  name: string;
  image: string;
  variants: ProductVariant[];
}
interface Productprops {
  product: Product[];
}

const SingleProduct: React.FC<Productprops> = ({ product }) => {
  const navigate = useNavigate();

  const { handleVariantChange, variant, cartitems, handleAddItem } =
    useProductState();

  return (
    <div>
      {product.map((item) => {
        const selectedVariant = variant[item.id] || item.variants[0];
        return (
          <div key={item.id} className={classes.productdetails}>
            <div className={classes["product-img"]}>
              <img src={item.image} alt='image' />
            </div>
            <div className={classes.productdescription}>
              <span>{item.brand}</span>
              <span>
                {item.name}-{selectedVariant.size}
              </span>
              <span>Rs - {selectedVariant.price}</span>
              <button
                className={classes.listbutton}
                onClick={(e) => {
                  e.stopPropagation();
                  const buttonText =
                    cartitems.findIndex(
                      (each: any) =>
                        each.id === item.id &&
                        each.variant === selectedVariant.size
                    ) >= 0
                      ? "Go To Cart"
                      : "ADD to Cart";

                  if (buttonText !== "Go To Cart") {
                    handleAddItem({
                      id: item.id,
                      variant: selectedVariant.size,
                      price: selectedVariant.price,
                      name: item.name,
                      qty: 1,
                    });
                  } else {
                    navigate("/products/cart");
                  }
                }}>
                {cartitems.findIndex(
                  (each: any) =>
                    each.id === item.id && each.variant === selectedVariant.size
                ) >= 0
                  ? "Go To Cart"
                  : "ADD to Cart"}
              </button>
              <p>Pack of Size</p>
              <div className={classes.variantblocks} id='variant-blocks'>
                {item.variants.map((each) => {
                  return (
                    <div
                      className={`${classes.variantblock} ${
                        selectedVariant.size === each.size ? classes.active : ""
                      }`}
                      onClick={(e) => handleVariantChange(item.id, each)}>
                      <span id='variantblock'>{each.size}</span>
                      <span>Rs - {each.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SingleProduct;
