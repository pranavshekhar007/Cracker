"use client";
import { useState } from "react";
import MostProducts from "./MostProducts";
import ShopFromFarm from "./ShopFromFarm";

export default function SegmentedToggleWithContent({ productList }) {
  const [active, setActive] = useState("cloud");

  const handleToggle = (value) => {
    setActive(value);
  };

  return (
    // <div className="d-flex flex-column justify-content-center align-items-center">
    <div className="">
      {/* Toggle Switch */}
      <div
        className="segmented-toggle d-flex  p-1 mb-4"
        style={{ justifySelf: "center" }}
      >
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
          <MostProducts
            // productList={productList?.filter((v, i) => {
            //   return v?.specialAppearance?.includes("new Arrivals");
            // })}
            productList={productList}
          />
        </div>
      )}

      {active === "cloud" && (
        <div className="toggle-content">
          <ShopFromFarm
            productList={productList?.filter((v, i) => {
              return v?.specialAppearance?.includes("our shop");
            })}
          />
        </div>
      )}
    </div>
  );
}
