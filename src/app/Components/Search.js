"use client";
import React, { useState } from "react";

const Search = ({ onSearch, variant = "desktop" }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    console.log("Search value:", query);
  };

  const inputClass =
    variant === "desktop"
      ? "search-bar d-none d-md-flex mx-4"
      : "search-bar d-flex d-md-none mx-2"; // show only on mobile

  return (
    <form onSubmit={handleSubmit} className={inputClass}>
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
