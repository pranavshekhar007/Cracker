"use client";
import { useState } from "react";
import MostProducts from "./MostProducts";
import ShopFromFarm from "./ShopFromFarm";

export default function SegmentedToggleWithContent() {
  const [active, setActive] = useState("cloud");

  const handleToggle = (value) => {
    setActive(value);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {/* Toggle Switch */}
      <div className="segmented-toggle d-flex p-1 mb-4">
        <div
          className={`toggle-option ${active === "gpu" ? "active" : ""}`}
          onClick={() => handleToggle("gpu")}
        >
          New Arrival
        </div>
        <div
          className={`toggle-option ${active === "cloud" ? "active" : ""}`}
          onClick={() => handleToggle("cloud")}
        >
          Kids Collection
        </div>
      </div>

      {/* Conditional Content */}
      {active === "gpu" && (
        <div className="toggle-content">
          <MostProducts />
        </div>
      )}

      {active === "cloud" && (
        <div className="toggle-content">
          <ShopFromFarm />
        </div>
      )}
    </div>
  );
}
