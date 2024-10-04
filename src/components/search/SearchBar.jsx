import React from "react";
import "./SearchBar.css";

function SearchBar({ query, setQuery, placeholder }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
      />
    </div>
  );
}

export default SearchBar;
