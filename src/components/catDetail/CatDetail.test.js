import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CatDetail from "./CatDetail";
import useFetchData from "../../hooks/use-fetch-data";

// Mock the useFetchData hook
jest.mock("../../hooks/use-fetch-data");

// Mock the environment variable for API key
process.env.REACT_APP_CAT_API_KEY = "test_api_key";

describe("CatDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    // Set up the mock to return a loading state
    useFetchData.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <CatDetail />
      </BrowserRouter>
    );

    const loadingMessage = screen.getByText(/Loading cat details.../i);
    expect(loadingMessage).toBeInTheDocument();
  });

  test("renders error message", () => {
    // Set up the mock to return an error state
    useFetchData.mockReturnValue({
      data: null,
      loading: false,
      error: { message: "Failed to fetch data" },
    });

    render(
      <BrowserRouter>
        <CatDetail />
      </BrowserRouter>
    );

    const errorMessage = screen.getByText(
      /Error fetching cat details: Failed to fetch data/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders cat details", () => {
    // Set up the mock to return cat data
    useFetchData.mockReturnValue({
      data: {
        url: "https://cdn2.thecatapi.com/images/abc123.jpg",
        breeds: [
          {
            name: "Abyssinian",
            origin: "Egypt",
            temperament: "Active, Energetic, Independent",
            life_span: "12 - 15",
            description: "Abyssinians are curious and playful.",
            weight: { imperial: "8 - 12" },
            adaptability: 5,
            affection_level: 4,
            child_friendly: 3,
            dog_friendly: 2,
          },
        ],
      },
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <CatDetail />
      </BrowserRouter>
    );

    const catName = screen.getByText(/Abyssinian/i);
    expect(catName).toBeInTheDocument();

    const catImage = screen.getByAltText(/Abyssinian/i);
    expect(catImage).toBeInTheDocument();
    expect(catImage).toHaveAttribute(
      "src",
      "https://cdn2.thecatapi.com/images/abc123.jpg"
    );

    expect(screen.getByText(/Origin: Egypt/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Temperament: Active, Energetic, Independent/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Life Span: 12 - 15 years/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Description: Abyssinians are curious and playful./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Weight: 8 - 12 lbs/i)).toBeInTheDocument();
    expect(screen.getByText(/Adaptability: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Affection Level: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Child Friendly: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Dog Friendly: 2/i)).toBeInTheDocument();
  });

  test("renders 'No breed information available' message if no breed data", () => {
    // Set up the mock to return cat data with no breed information
    useFetchData.mockReturnValue({
      data: {
        url: "https://cdn2.thecatapi.com/images/abc123.jpg",
        breeds: [],
      },
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <CatDetail />
      </BrowserRouter>
    );

    const noBreedMessage = screen.getByText(/No breed information available./i);
    expect(noBreedMessage).toBeInTheDocument();
  });
});
