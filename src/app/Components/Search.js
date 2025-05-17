"use client";
import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query); // Callback to parent
    console.log("Search value:", query);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar d-none d-md-flex mx-4">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="form-control"
        style={{ minWidth: "200px" }}
      />
    </form>
  );
};

export default Search;
