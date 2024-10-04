import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  let query;
  let setQuery;

  beforeEach(() => {
    query = ""; // Initial query state
    setQuery = jest.fn((newQuery) => {
      query = newQuery; // Mock the state update function
    });
  });

  test("renders input with correct placeholder", () => {
    render(
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search for cats..."
      />
    );

    const input = screen.getByPlaceholderText(/Search for cats.../i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(""); // Initially, the input should be empty
  });

  test("updates query state on input change", () => {
    render(<SearchBar query={query} setQuery={setQuery} />);

    const input = screen.getByPlaceholderText(/Search.../i);

    // Simulate user typing in the input field
    fireEvent.change(input, { target: { value: "Siamese" } });

    // Assert that setQuery was called with the correct value
    expect(setQuery).toHaveBeenCalledWith("Siamese");
  });

  test("renders input with default placeholder if none provided", () => {
    render(<SearchBar query={query} setQuery={setQuery} />);

    const input = screen.getByPlaceholderText(/Search.../i);
    expect(input).toBeInTheDocument();
  });
});
