import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DogDetail from "./DogDetail";
import useFetchData from "../../hooks/use-fetch-data";

// Mock the useFetchData hook
jest.mock("../../hooks/use-fetch-data");

// Mock the environment variable for API key
process.env.REACT_APP_DOG_API_KEY = "test_api_key";

describe("DogDetail", () => {
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
        <DogDetail />
      </BrowserRouter>
    );

    const loadingMessage = screen.getByText(/Loading dog details.../i);
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
        <DogDetail />
      </BrowserRouter>
    );

    const errorMessage = screen.getByText(
      /Error fetching dog details: Failed to fetch data/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders dog details", () => {
    // Set up the mock to return dog data
    useFetchData.mockReturnValue({
      data: {
        url: "https://cdn2.thedogapi.com/images/abc123.jpg",
        breeds: [
          {
            name: "Bulldog",
            origin: "England",
            temperament: "Docile, Willful, Friendly",
            life_span: "8 - 10",
            description: "Bulldogs are gentle and friendly companions.",
            weight: { imperial: "50 - 60" },
            adaptability: 4,
            affection_level: 5,
            child_friendly: 3,
            dog_friendly: 4,
          },
        ],
      },
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <DogDetail />
      </BrowserRouter>
    );

    const dogName = screen.getByText(/Bulldog/i);
    expect(dogName).toBeInTheDocument();

    const dogImage = screen.getByAltText(/Bulldog/i);
    expect(dogImage).toBeInTheDocument();
    expect(dogImage).toHaveAttribute(
      "src",
      "https://cdn2.thedogapi.com/images/abc123.jpg"
    );

    expect(screen.getByText(/Origin: England/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Temperament: Docile, Willful, Friendly/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Life Span: 8 - 10 years/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Description: Bulldogs are gentle and friendly companions./i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Weight: 50 - 60 lbs/i)).toBeInTheDocument();
    expect(screen.getByText(/Adaptability: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Affection Level: 5/i)).toBeInTheDocument();
    expect(screen.getByText(/Child Friendly: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Dog Friendly: 4/i)).toBeInTheDocument();
  });

  test("renders 'No breed information available' message if no breed data", () => {
    // Set up the mock to return dog data with no breed information
    useFetchData.mockReturnValue({
      data: {
        url: "https://cdn2.thedogapi.com/images/abc123.jpg",
        breeds: [],
      },
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <DogDetail />
      </BrowserRouter>
    );

    const noBreedMessage = screen.getByText(/No breed information available./i);
    expect(noBreedMessage).toBeInTheDocument();
  });
});
