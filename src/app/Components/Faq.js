"use client";

import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const cardsData = [
  {
    title: "What is Green Crackers?",
    content:
      "Green crackers are environmentally friendly fireworks that produce less smoke and noise, ideal for conscious celebrations.",
  },
  {
    title: "Best-Selling Crackers in India",
    content:
      "Sparklers, flower pots, and ground spinners remain all-time favorites during Diwali and weddings.",
  },
  {
    title: "How to Start a Crackers Business",
    content:
      "Begin with proper licenses, find reputed suppliers, create seasonal campaigns, and ensure safety compliance.",
  },
  {
    title: "What Licenses Are Needed?",
    content:
      "You’ll need an explosives license, GST registration, and local trade permits to legally run a firecracker business.",
  },
  {
    title: "How to Store Firecrackers Safely?",
    content:
      "Store them in a cool, dry place away from flames or heat. Use metal or concrete storage units for added safety.",
  },
];


const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Responsive logic
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width <= 600) setVisibleCount(1);
      else if (width <= 1203) setVisibleCount(2);
      else setVisibleCount(3);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const next = () => {
  setActiveIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
};

const prev = () => {
  setActiveIndex(
    (prevIndex) => (prevIndex - 1 + cardsData.length) % cardsData.length
  );
};

  const getVisibleCards = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(cardsData[(activeIndex + i) % cardsData.length]);
    }
    return visible;
  };

  return (
    <div className="faq-section text-center py-5">
      <h2 className="mb-4">Must Read for Fire Cracker Business</h2>

      <div className="d-flex justify-content-center align-items-center flex-wrap">
        {/* Left Icon */}
        <div
          onClick={prev}
          style={{ cursor: "pointer", marginRight: "10px" }}
        >
          <FaChevronLeft size={24} />
        </div>

        {/* Cards */}
        <div className="d-flex gap-4 flex-wrap justify-content-center ">
          {getVisibleCards().map((card, index) => (
            <div
              key={index}
              className="card faq-card  shadow d-flex flex-column justify-content-center"
              style={{ width: "19rem", minHeight: "180px" }}
            >
              <h5 className="mb-3 faq-title">{card.title}</h5>
              <p>{card.content}</p>
            </div>
          ))}
        </div>

        {/* Right Icon */}
        <div
          onClick={next}
          style={{ cursor: "pointer", marginLeft: "10px" }}
        >
          <FaChevronRight size={24} />
        </div>
      </div>

      {/* Dots */}
      <div className="mt-4">
        {cardsData.map((_, index) => (
          <span
            key={index}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              display: "inline-block",
              margin: "0 6px",
              backgroundColor: index === activeIndex ? "lightgreen" : "#ddd",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Faq;
