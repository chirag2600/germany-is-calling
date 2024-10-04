/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader", () => {
  test("renders loader component", () => {
    render(<Loader />);

    // Ensure the loader div is in the document
    const loaderElement = screen.getByRole("status"); // Assuming the spinner has role="status"
    expect(loaderElement).toBeInTheDocument();

    // Ensure the spinner div is rendered
    const spinnerElement = loaderElement.querySelector(".spinner");
    expect(spinnerElement).toBeInTheDocument();
  });

  test("loader has correct class for styling", () => {
    render(<Loader />);

    // Ensure the loader div has the correct class name for styling
    const loaderElement = screen.getByRole("status");
    expect(loaderElement).toHaveClass("loader");

    const spinnerElement = loaderElement.querySelector(".spinner");
    expect(spinnerElement).toHaveClass("spinner");
  });
});
