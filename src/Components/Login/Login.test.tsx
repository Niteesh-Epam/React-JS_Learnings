import React from "react";
import {
  render,
  getByRole,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import LoginPage from "./Login";
import {
  BrowserRouter,
  useActionData,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import ProductsData from "../../Store/ProductContext";
import userEvent from "@testing-library/user-event";

describe("Login page test Case", () => {
  const email = [];
  test("render test fields are there or not", async () => {
    const FAKE_EVENT = { email: "test@example.com", password: "12345" };
    const routes = [
      {
        path: "/login",
        element: <LoginPage />,
        loader: () => FAKE_EVENT,
      },
    ];

    const router = createMemoryRouter(routes, { initialEntries: ["/login"] });
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      screen.getByRole("button");
      screen.getByLabelText("Your email:");
      screen.getByLabelText("Your message:");
    });
    expect(screen.getByRole("button")).toHaveTextContent("Submit");
    expect(screen.getByLabelText("Your email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Your message:")).toBeInTheDocument();
  });

  test("click Submit to get Error", async () => {
    const FAKE_EVENT = { email: "test@example.com", password: "12345" };
    const routes = [
      {
        path: "/login",
        element: <LoginPage />,
        loader: () => FAKE_EVENT,
      },
    ];

    const router = createMemoryRouter(routes, { initialEntries: ["/login"] });
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      screen.getByRole("button");
      screen.getByLabelText("Your email:");
      screen.getByLabelText("Your message:");
    });

    const emaiInput = screen.getByLabelText("Your email:");
    const passwordInput = screen.getByLabelText("Your message:");
    userEvent.type(emaiInput, FAKE_EVENT.email);
    userEvent.type(passwordInput, FAKE_EVENT.password);
    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(screen.getByLabelText("Your email:")).toHaveValue(
      "test@example.com"
    );
    await waitFor(() => {
      const errorMessage = screen.queryByText(
        "User Doesnot Exist / Incorrect email or Password",
        { exact: false }
      );
    });
  });

  //   test("pack size and price present on the screen", () => {});
});
