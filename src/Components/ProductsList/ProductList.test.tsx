import { render, fireEvent, waitFor } from "@testing-library/react";
import ProductsPage from "../ProductsList/ProductsList";
import { BrowserRouter } from "react-router-dom";
import { data } from "../../Utils/data";
import ProductsData from "../../Store/ProductContext";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("ProductsPage Component", () => {
  const products = [
    {
      id: "1",
      brand: "Brand A",
      name: "Product 1",
      image: "image1.jpg",
      variants: [
        { size: "S", price: "10" },
        { size: "M", price: "15" },
      ],
    },
    {
      id: "2",
      brand: "Brand B",
      name: "Product 2",
      image: "image2.jpg",
      variants: [
        { size: "L", price: "20" },
        { size: "XL", price: "25" },
      ],
    },
  ];

  test("Renders products correctly", () => {
    const { getByText, getAllByRole, getByRole } = render(
      <ProductsData>
        <BrowserRouter>
          <ProductsPage products={products} />
        </BrowserRouter>
      </ProductsData>
    );

    expect(getByText(/Product 1/i)).toBeInTheDocument();
    expect(getByText(/Brand A/i)).toBeInTheDocument();
    const selectElements = getAllByRole("combobox");
    expect(selectElements).toHaveLength(2);
    const buttonElements = getAllByRole("button");
    expect(buttonElements.length).toBe(2);
  });

  test("Click on Add to Cart", () => {
    const { getAllByRole, getByText } = render(
      <ProductsData>
        <BrowserRouter>
          <ProductsPage products={products} />
        </BrowserRouter>
      </ProductsData>
    );
    const button = getAllByRole("button");
    expect(button[0]).toHaveTextContent(/ADD to Cart/i);
    fireEvent.click(button[0]);
    expect(getByText(/Go to Cart/i)).toBeInTheDocument();
  });

  test("Select dropdown Value to Get Add to Cart", () => {
    const { getAllByRole } = render(
      <ProductsData>
        <BrowserRouter>
          <ProductsPage products={products} />
        </BrowserRouter>
      </ProductsData>
    );

    const selectElements = getAllByRole("combobox");
    fireEvent.click(selectElements[0]);
    expect(selectElements[0]).toHaveValue("S - 10");
  });

  test("Click on the Image to Navigate to Single product page", async () => {
    const { getAllByAltText, getByText } = render(
      <ProductsData>
        <BrowserRouter>
          <ProductsPage products={products} />
        </BrowserRouter>
      </ProductsData>
    );

    const image = getAllByAltText("product/images");
    expect(image.length).toBeGreaterThan(0);
    fireEvent.click(image[0]);
    await waitFor(() => {
      expect(mockedUsedNavigate).toHaveBeenCalledWith("products/1");
    });
  });
});
