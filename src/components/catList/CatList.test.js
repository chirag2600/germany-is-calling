import React from "react";
import { render, screen } from "@testing-library/react";
import CatList from "./CatList";
import { BrowserRouter } from "react-router-dom";

// Mock the useFetchData hook
jest.mock("../hooks/useFetchData", () => ({
  __esModule: true,
  default: () => ({
    data: [
      {
        id: "abc123",
        url: "https://cdn2.thecatapi.com/images/abc123.jpg",
        breeds: [{ name: "Abyssinian" }],
      },
    ],
    loading: false,
    error: null,
  }),
}));

test("renders cat list with cat cards", () => {
  render(
    <BrowserRouter>
      <CatList />
    </BrowserRouter>
  );

  // Check if the cat's name is rendered
  const catName = screen.getByText(/Abyssinian/i);
  expect(catName).toBeInTheDocument();

  // Check if the cat image is rendered correctly
  const catImage = screen.getByAltText(/Abyssinian/i); // Ensure that your image has this alt text in CatList
  expect(catImage).toBeInTheDocument();
});

test("renders loading state", () => {
  // Mock loading state
  jest.mock("../hooks/useFetchData", () => ({
    __esModule: true,
    default: () => ({
      data: [],
      loading: true,
      error: null,
    }),
  }));

  render(
    <BrowserRouter>
      <CatList />
    </BrowserRouter>
  );

  // Check if a loading indicator is present
  const loadingMessage = screen.getByText(/loading/i); // Assuming you have some loading text in your component
  expect(loadingMessage).toBeInTheDocument();
});

test("renders error message", () => {
  // Mock error state
  jest.mock("../hooks/useFetchData", () => ({
    __esModule: true,
    default: () => ({
      data: [],
      loading: false,
      error: "Failed to fetch data",
    }),
  }));

  render(
    <BrowserRouter>
      <CatList />
    </BrowserRouter>
  );

  // Check if an error message is rendered
  const errorMessage = screen.getByText(/failed to fetch data/i);
  expect(errorMessage).toBeInTheDocument();
});
