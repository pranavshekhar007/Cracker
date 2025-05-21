"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/Components/Navbar";
import PriceFilter from "@/app/Components/PriceFilter";

const products = [
  {
    id: 1,
    image:
      "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/chakker.png?resize=600%2C494&ssl=1",
    category: "Ground Chakkar",
    description: "Ground Chakkar Firecracker",
    price1: 250,
    price2: 200,
  },
  {
    id: 2,
    image:
      "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/Flower-Pot.png?w=1136&ssl=1",
    category: "Flower Pots",
    description: "Beautiful Flower Pots",
    price1: 300,
    price2: 250,
  },
  {
    id: 3,
    image:
      "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/sound.png?w=1136&ssl=1",
    category: "One Sound",
    description: "Loud One Sound Crackers",
    price1: 350,
    price2: 300,
  },
  {
    id: 4,
    image:
      "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/sparklers.png?w=1136&ssl=1",
    category: "Sparklers",
    description: "Sparkling Sparklers",
    price1: 150,
    price2: 120,
  },
  {
    id: 5,
    image:
      "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/Rocket.png?w=1136&ssl=1",
    category: "Novelties",
    description: "Exciting Novelties",
    price1: 400,
    price2: 350,
  },
  {
    id: 6,
    image:
      "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/kids.png?w=1136&ssl=1",
    category: "New Arrivals",
    description: "Latest New Arrivals",
    price1: 280,
    price2: 230,
  },
  {
    id: 7,
    image:
      "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/fountains.png?w=1136&ssl=1",
    category: "Choice of Fountain",
    description: "Beautiful Fountain Crackers",
    price1: 320,
    price2: 270,
  },
  {
    id: 8,
    image:
      "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/fatafat.png?w=1136&ssl=1",
    category: "Fatafat",
    description: "Quick Fatafat Crackers",
    price1: 200,
    price2: 160,
  },
  {
    id: 9,
    image:
      "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/fancy.png?w=1136&ssl=1",
    category: "Fancy",
    description: "Fancy Crackers",
    price1: 310,
    price2: 260,
  },
  {
    id: 10,
    image:
      "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/bomb.png?w=1136&ssl=1",
    category: "Bombs",
    description: "Explosive Bombs",
    price1: 400,
    price2: 350,
  },
  {
    id: 11,
    image:
      "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/bijili.png?w=1136&ssl=1",
    category: "Bijili",
    description: "Bright Bijili Crackers",
    price1: 280,
    price2: 230,
  },
  {
    id: 12,
    image:
      "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/30-shots.png?w=1136&ssl=1",
    category: "Multishots",
    description: "Multi-shot Fireworks",
    price1: 450,
    price2: 400,
  },
];

const categories = [
  "All",
  "Bijili",
  "Bombs",
  "Choice of Fountain",
  "Fancy",
  "Fatafat",
  "Flower Pots",
  "Ground Chakkar",
  "Gun Crackling",
  "Mudpot",
  "MultiShots",
  "New Arrivals",
  "Novelties",
  "One Sound",
  "Paper Out",
  "Peacock",
  "Premium Skyshot",
  "Sattai",
  "Sparklers",
  "Uncategorized",
];

const Page = () => {
  const params = useParams();
  // const searchParams = useSearchParams();
  const categoryFromUrl = decodeURIComponent(params.category);

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [showCount, setShowCount] = useState(10);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  // Filtered and sorted products using useMemo for performance
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    switch (sortOption) {
      case "high to low":
        filtered = filtered.slice().sort((a, b) => b.price2 - a.price2);
        break;
      case "low to high":
        filtered = filtered.slice().sort((a, b) => a.price2 - b.price2);
        break;
      case "release date":
        // Assuming products have a releaseDate field, else skip
        break;
      case "avg. rating":
        // Assuming products have rating field, else skip
        break;
      case "featured":
      default:
        // No sorting or default sorting
        break;
    }

    return filtered.slice(0, showCount);
  }, [selectedCategory, searchTerm, sortOption, showCount]);

  return (
    <>
      <Navbar />

      <div className="shop-page">
        <div className="shop-sections d-flex">
          <div className="category-section">
            <h5>Categories</h5>
            <div className="all-category mb-5">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className={`category d-flex justify-content-between ${
                    selectedCategory === cat ? "selected-category" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedCategory === cat ? "#6d0d0c" : "transparent",
                    color: selectedCategory === cat ? "white" : "black",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    userSelect: "none",
                  }}
                >
                  <p className="mb-0">{cat}</p>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/130/130884.png"
                    alt="arrow icon"
                    style={{
                      filter: selectedCategory === cat ? "invert(1)" : "none",
                      transition: "filter 0.3s ease",
                    }}
                  />
                </div>
              ))}
            </div>

            <PriceFilter />

            {/* Rating filter can be updated similarly if needed */}

            <div className="daily-sell1 daily-selling ">
              <h3 className="text-white">100% Natural & Organic Makhana.</h3>
              <p className="text-white">Get the best deal before close.</p>
              <div className="daily-shop d-flex gap-2 align-items-center justify-content-center my-3">
                <p className="fs-5 mb-0 text-white fs-6">Shop Now</p>
                <img src="/assets/next.png" alt="Next Icon" />
              </div>
            </div>
          </div>

          <div className="item-section">
            {/* product search bar */}
            <div className="d-flex gap-2 mb-3">
              <input
                className="product-search"
                placeholder="Search for products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="form-select form-select-sm w-auto"
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
              >
                <option value={10}>Show: 10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>

              <select
                className="form-select form-select-sm w-auto"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Sort by: Featured</option>
                <option value="high to low">Price: High to Low</option>
                <option value="low to high">Price: Low to High</option>
                <option value="release date">Release Date</option>
                <option value="avg. rating">Avg. Rating</option>
              </select>
            </div>

            <p className="product-quantity">
              {filteredProducts.length}{" "}
              <span className="quantity-p">Products found</span>
            </p>

            <div className="products">
              {filteredProducts.map((product) => (
                <div
                  className="shop-product-card d-flex flex-column justify-content-between"
                  key={product.id}
                >
                  <div>
                    <img
                      src={product.image}
                      alt={product.description}
                      className="product-img"
                    />
                    <p className="category1 mb-0">{product.category}</p>
                    <p className="description">{product.description}</p>
                    <div className="wishlist-icon">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png"
                        alt="wishlist"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="price d-flex gap-1">
                      <p className="shop-price2  fw-bold">
                        ₹{product.price2}.00
                      </p>
                      <p className="shop-price1 text-muted text-decoration-line-through">
                        ₹{product.price1}.00
                      </p>
                    </div>
                    <button className="shop-addCart-btn">+ Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
