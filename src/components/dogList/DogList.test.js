import React from "react";
import { render, screen } from "@testing-library/react";
import DogList from "./DogList";
import { BrowserRouter } from "react-router-dom";

// Mock the useFetchData hook
jest.mock("../hooks/useFetchData", () => ({
  __esModule: true,
  default: () => ({
    data: [
      {
        id: "xyz456",
        url: "https://cdn2.thedogapi.com/images/xyz456.jpg",
        breeds: [{ name: "Bulldog" }],
      },
    ],
    loading: false,
    error: null,
  }),
}));

test("renders dog list with dog cards", () => {
  render(
    <BrowserRouter>
      <DogList />
    </BrowserRouter>
  );

  // Check if the dog's name is rendered
  const dogName = screen.getByText(/Bulldog/i);
  expect(dogName).toBeInTheDocument();

  // Check if the dog image is rendered correctly
  const dogImage = screen.getByAltText(/Bulldog/i); // Ensure that your image has this alt text in DogList
  expect(dogImage).toBeInTheDocument();
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
      <DogList />
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
      <DogList />
    </BrowserRouter>
  );

  // Check if an error message is rendered
  const errorMessage = screen.getByText(/failed to fetch data/i);
  expect(errorMessage).toBeInTheDocument();
});
