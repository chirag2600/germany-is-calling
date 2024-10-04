import React, { useState, useMemo } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useFetchData from "../../hooks/use-fetch-data";
import SearchBar from "../search/SearchBar";
import Loader from "../ui/Loader";
import "./CatList.css";

function CatList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1); // For pagination
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order
  const [limit] = useState(10); // Number of cats per page
  const APIKEY = process.env.REACT_APP_CAT_API_KEY;

  // Memoize the params object to prevent unnecessary re-fetching
  const params = useMemo(
    () => ({
      limit: limit,
      page: page - 1, // API uses 0-based indexing for pages
      has_breeds: 1,
      api_key: APIKEY,
    }),
    [page, limit, APIKEY] // Dependencies that should trigger refetch
  );

  const {
    data: cats,
    loading,
    error,
  } = useFetchData("https://api.thecatapi.com/v1/images/search", params);

  // Filter and sort cats based on search query and sort order
  const filteredCats = (cats || [])
    .filter(
      (cat) =>
        cat.breeds &&
        cat.breeds.length > 0 &&
        cat.breeds[0]?.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const breedA = a.breeds?.[0]?.name?.toLowerCase() || "";
      const breedB = b.breeds?.[0]?.name?.toLowerCase() || "";
      if (sortOrder === "asc") return breedA.localeCompare(breedB);
      return breedB.localeCompare(breedA);
    });

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="error-message">
        Error fetching cats: {error.message || "Something went wrong"}
      </p>
    );

  // Pagination controls
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="cat-list-container">
      <SearchBar
        query={searchQuery}
        setQuery={setSearchQuery}
        placeholder="Search by breed..."
      />

      {/* Sorting controls */}
      <div className="sort-controls">
        <label>Sort by Breed: </label>
        <button
          className="sort-button"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? <FaSortAlphaUp /> : <FaSortAlphaDown />}
        </button>
      </div>

      {/* Cat list */}
      <div className="cat-list">
        {filteredCats.map((cat) => (
          <div key={cat.id} className="cat-card">
            <Link to={`/cat/${cat.id}`}>
              <div className="cat-card-img">
                <img
                  src={cat.url || "default-image-url.jpg"}
                  alt={cat.breeds?.[0]?.name || "Cat"}
                />
              </div>
              <div className="cat-card-info">
                <h3>{cat.breeds?.[0]?.name || "Unknown Breed"}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={page === 1}>
          <FaChevronLeft /> Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={filteredCats.length < limit}>
          Next <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default CatList;
