import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchData from "../../hooks/use-fetch-data";
import "./CatDetail.css";

function CatDetail() {
  const { id } = useParams();
  const APIKEY = process.env.REACT_APP_CAT_API_KEY;

  // Use useMemo to prevent API key recreation causing unnecessary refetches
  const params = useMemo(
    () => ({
      api_key: APIKEY,
    }),
    [APIKEY]
  );

  const {
    data: cat,
    loading,
    error,
  } = useFetchData(`https://api.thecatapi.com/v1/images/${id}`, params);

  if (loading) return <p>Loading cat details...</p>;
  if (error) return <p>Error fetching cat details: {error.message}</p>;

  return (
    <div className="cat-detail">
      <Link to="/" className="back-link">
        ← Back to list
      </Link>

      <img src={cat.url} alt={cat.breeds[0]?.name || "Cat"} />

      {cat.breeds[0] ? (
        <div className="breed-info">
          <h2>{cat.breeds[0].name}</h2>
          <p>
            <strong>Origin:</strong> {cat.breeds[0].origin}
          </p>
          <p>
            <strong>Temperament:</strong> {cat.breeds[0].temperament}
          </p>
          <p>
            <strong>Life Span:</strong> {cat.breeds[0].life_span} years
          </p>
          <p>
            <strong>Description:</strong> {cat.breeds[0].description}
          </p>
          <p>
            <strong>Weight:</strong> {cat.breeds[0].weight.imperial} lbs
          </p>
          <p>
            <strong>Adaptability:</strong> {cat.breeds[0].adaptability}
          </p>
          <p>
            <strong>Affection Level:</strong> {cat.breeds[0].affection_level}
          </p>
          <p>
            <strong>Child Friendly:</strong> {cat.breeds[0].child_friendly}
          </p>
          <p>
            <strong>Dog Friendly:</strong> {cat.breeds[0].dog_friendly}
          </p>
        </div>
      ) : (
        <p>No breed information available.</p>
      )}
    </div>
  );
}

export default CatDetail;
