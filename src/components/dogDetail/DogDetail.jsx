import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchData from "../../hooks/use-fetch-data";
import "./DogDetail.css";

function DogDetail() {
  const { id } = useParams();
  const APIKEY = process.env.REACT_APP_DOG_API_KEY; // Make sure to set this in your .env file

  // Use useMemo to prevent API key recreation causing unnecessary refetches
  const params = useMemo(
    () => ({
      api_key: APIKEY,
    }),
    [APIKEY]
  );

  const {
    data: dog,
    loading,
    error,
  } = useFetchData(`https://api.thedogapi.com/v1/images/${id}`, params); // Change the endpoint to the dog API

  if (loading) return <p>Loading dog details...</p>;
  if (error) return <p>Error fetching dog details: {error.message}</p>;

  return (
    <div className="dog-detail">
      <Link to="/" className="back-link">
        ← Back to list
      </Link>

      <img src={dog.url} alt={dog.breeds[0]?.name || "Dog"} />

      {dog.breeds[0] ? (
        <div className="breed-info">
          <h2>{dog.breeds[0].name}</h2>
          <p>
            <strong>Origin:</strong> {dog.breeds[0].origin || "Unknown"}
          </p>
          <p>
            <strong>Temperament:</strong>{" "}
            {dog.breeds[0].temperament || "Not specified"}
          </p>
          <p>
            <strong>Life Span:</strong> {dog.breeds[0].life_span || "Unknown"}{" "}
            years
          </p>
          <p>
            <strong>Bred For:</strong>{" "}
            {dog.breeds[0].bred_for || "Not specified"}
          </p>
          <p>
            <strong>Breed Group:</strong>{" "}
            {dog.breeds[0].breed_group || "Not specified"}
          </p>
          <p>
            <strong>Weight:</strong>{" "}
            {dog.breeds[0].weight?.imperial || "Not specified"} lbs
          </p>
          <p>
            <strong>Height:</strong>{" "}
            {dog.breeds[0].height?.imperial || "Not specified"} in
          </p>
        </div>
      ) : (
        <p>No breed information available.</p>
      )}
    </div>
  );
}

export default DogDetail;
