import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartPage from "./CartPage"; // Update the path to CartPage component
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import ProductsData, { useProductState } from "../../Store/ProductContext";

// Mock the useProductState hook
jest.mock("../../Store/ProductContext", () => ({
  __esModule: true,
  useProductState: jest.fn().mockImplementation(() => ({
    handleAddItem: jest.fn(),
    handleRemoveItem: jest.fn(),
    TotalAmount: 100,
    cartitems: [
      {
        id: "123",
        variant: "500ml",
        price: "100",
        name: "Ashirvad",
        qty: 2,
      },
    ],
  })),
}));

describe("CartPage", () => {
  test("renders cart items and total amount", () => {});
  test("renders cart items and total amount", () => {
    render(
      <ProductsData>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </ProductsData>
    );
    // Check if cart items are rendered
    expect(screen.getByText("Ashirvad")).toBeInTheDocument();
    expect(screen.getByText("Rs : 100")).toBeInTheDocument(); // Assuming the TotalAmount is rendered with the text 'Rs : 100'
  });
});
