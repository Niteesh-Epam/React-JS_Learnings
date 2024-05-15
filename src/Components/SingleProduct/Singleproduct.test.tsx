import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SingleProduct from "../SingleProduct/SingleProduct";
import { BrowserRouter } from "react-router-dom";
import ProductsData from "../../Store/ProductContext";

describe("SingleProduct", () => {
  const product = [
    {
      id: "1",
      brand: "Brand A",
      name: "Product A",
      image: "image-url",
      variants: [
        { size: "S", price: "10" },
        { size: "M", price: "12" },
      ],
    },
  ];
  test("renders product details correctly", () => {
    const { getByText, getByRole } = render(
      <ProductsData>
        <BrowserRouter>
          <SingleProduct product={product} />
        </BrowserRouter>
      </ProductsData>
    );

    expect(getByText(/Brand A/i)).toBeInTheDocument();
    expect(getByText(/Pack of Size/i)).toBeInTheDocument();
    expect(getByRole("button", { name: "ADD to Cart" })).toBeInTheDocument();
  });

  test("adds item to cart when 'ADD to Cart' button is clicked", () => {
    const { getByText, getByRole } = render(
      <ProductsData>
        <BrowserRouter>
          <SingleProduct product={product} />
        </BrowserRouter>
      </ProductsData>
    );

    fireEvent.click(getByText(/ADD to Cart/i));
    const button = getByRole("button");
    expect(button).toHaveTextContent(/Go to Cart/i);
  });

  test("pack size and price present on the screen", () => {
    const { getByText } = render(
      <ProductsData>
        <BrowserRouter>
          <SingleProduct product={product} />
        </BrowserRouter>
      </ProductsData>
    );
    product.forEach((item) => {
      item.variants.forEach((variant) => {
        expect(getByText(variant.size)).toBeInTheDocument();
      });
    });
  });
});
