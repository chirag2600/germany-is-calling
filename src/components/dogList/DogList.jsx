import React, { useMemo, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useFetchData from "../../hooks/use-fetch-data"; // Adjust this path based on your directory structure
import SearchBar from "../search/SearchBar";
import Loader from "../ui/Loader";
import "./DogList.css"; // Create a CSS file for DogList styles

function DogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1); // For pagination
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order
  const [limit] = useState(10); // Number of dogs per page
  const APIKEY = process.env.REACT_APP_DOG_API_KEY; // Use the appropriate dog API key

  // Memoize the params object to prevent unnecessary re-fetching
  const params = useMemo(
    () => ({
      limit: limit,
      page: page - 1, // API uses 0-based indexing for pages
      api_key: APIKEY,
    }),
    [page, limit, APIKEY] // Dependencies that should trigger refetch
  );

  const {
    data: dogs,
    loading,
    error,
  } = useFetchData("https://api.thedogapi.com/v1/images/search", params); // Use the dog API URL

  // Filter and sort dogs based on search query and sort order
  const filteredDogs = (dogs || [])
    .filter(
      (dog) =>
        dog.breeds &&
        dog.breeds.length > 0 &&
        dog.breeds[0]?.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const breedA = a.breeds?.[0]?.name?.toLowerCase() || "";
      const breedB = b.breeds?.[0]?.name?.toLowerCase() || "";
      return sortOrder === "asc"
        ? breedA.localeCompare(breedB)
        : breedB.localeCompare(breedA);
    });

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="error-message">
        Error fetching dogs: {error.message || "Something went wrong"}
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
    <div className="dog-list-container">
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

      {/* Dog list */}
      <div className="dog-list">
        {filteredDogs.length > 0 ? (
          filteredDogs.map((dog) => (
            <div key={dog.id} className="dog-card">
              <Link to={`/dog/${dog.id}`}>
                <div className="dog-card-img">
                  <img
                    src={dog.url || "default-image-url.jpg"}
                    alt={dog.breeds?.[0]?.name || "Dog"}
                  />
                </div>
                <div className="dog-card-info">
                  <h3>{dog.breeds?.[0]?.name || "Unknown Breed"}</h3>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No dogs found for the selected search criteria.</p>
        )}
      </div>

      {/* Pagination controls */}
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={page === 1}>
          <FaChevronLeft /> Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={filteredDogs.length < limit}>
          Next <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default DogList;
