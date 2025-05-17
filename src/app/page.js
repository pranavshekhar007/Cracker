"use client";
import DailySell from "./Components/DailySell";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import Testimonals from "./Components/Testimonals";
import Faq from "./Components/Faq";
import ShopFromFarm from "./Components/ShopFromFarm";
import Footer from "./Components/Footer";

export default function Home() {
  const products = [
    {
      id: 1,
      image:
        "https://bigbangcrackers.com/wp-content/uploads/2024/08/Website-Sliders-1646-X-609-2.jpg",
      description: "4 Suta Plus Makhana| (12mm and above)| 200gm",
      price1: "₹300.00",
      price2: "₹299.00",
    },
    {
      id: 2,
      image:
        "https://bigbangcrackers.com/wp-content/uploads/2024/08/Website-Sliders-1646-X-609-1.jpg",
      description: "S6.5 Suta Plus(20.7mm above)| Handpicked Makhana|200gm",
      price1: "₹499.00",
      price2: "₹499.00",
    },
    {
      id: 3,
      image:
        "https://bigbangcrackers.com/wp-content/uploads/2024/08/Website-Sliders-1646-X-609.jpg",
      description: "5 Suta Plus Handpicked Makhana(15.8mm and above)| 200gm",
      price1: "₹349.00 ",
      price2: "₹299.00",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [visibleProducts, setVisibleProducts] = useState([]);

  // 1️⃣ Update visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width <= 600) setVisibleCount(2);
      else if (width <= 800) setVisibleCount(3);
      else if (width <= 1025) setVisibleCount(4);
      else setVisibleCount(4);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // 2️⃣ Update visible products when startIndex or visibleCount changes
  useEffect(() => {
    const end = startIndex + visibleCount;
    const visible = products
      .slice(startIndex, end)
      .concat(products.slice(0, Math.max(0, end - products.length)));
    setVisibleProducts(visible);
    // Remove products from dependencies
  }, [startIndex, visibleCount]);

  // 3️⃣ Navigation
  const nextSlide = () => {
    setStartIndex((prev) => (prev + visibleCount) % products.length);
  };

  const prevSlide = () => {
    setStartIndex(
      (prev) => (prev - visibleCount + products.length) % products.length
    );
  };

  const images = [
    "https://bigbangcrackers.com/wp-content/uploads/2024/08/Website-Sliders-1646-X-609.jpg",
    "https://bigbangcrackers.com/wp-content/uploads/2024/08/Website-Sliders-1646-X-609-2.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === images[0] ? images[1] : images[0]
      );
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      <Navbar />

      {/* ===== Updates Bar Section ===== */}
      <div className="update-bar d-flex align-items-center shadow-sm rounded">
        <div className="update-label d-flex align-items-center px-3 py-2 rounded-start">
          <i className="bi bi-lightning-fill me-2"></i>
          <strong>UPDATES</strong>
        </div>
        <div className="update-text-wrapper py-2 px-2">
          <div className="update-text">
            🚨 Over India Except Crackers Banned States. &nbsp; | &nbsp; 🔥 As
            Per The Supreme Court Order, Online Sale Of Firecrackers Is Not
            Permitted! &nbsp; | &nbsp; 🎉 Safe & Fast Delivery Options Available
            Now! &nbsp; | &nbsp; 📢 Celebrate Responsibly — Stay Safe, Stay
            Happy!
          </div>
        </div>
      </div>

      {/* hero section */}

      <div className="hero-container">
        <div
          className="hero-section d-flex flex-column justify-content-center"
          style={{
            backgroundImage: `url(${currentImage})`,
            backgroundSize: "cover",
          }}
        >
          {/* <div className="hero-section1"> */}
          {/* <h1>
            Say goodbye to bland makhanas; it's time to savor the flavors.
          </h1>
          <p className="fs-6 fs-lg-5 mb-4">
            Get extra 5% off on flavoured makhanas.
          </p> */}
          {/* <div className="shop-now d-flex gap-2 align-items-center justify-content-center my-3">
            <p className="fs-5 mb-0 text-white">Shop Now</p>
            <img src="/assets/next.png" alt="Next Icon" />
          </div> */}
          {/* </div> */}
        </div>
      </div>

      {/* free shiping section */}

      <div className="free-shiping">
        <div className="services-container">
          <div className="service-box">
            <div className="services-icon-wrapper">
              <img src="/assets/cart.png" className="services-icon" />
            </div>
            <div>
              <p className="mb-0 fw-bold">Minimum Order Value</p>
              <p>₹1,999 (TN, BLRE & PY)</p>
            </div>
          </div>

          <div className="service-box">
            <div className="services-icon-wrapper">
              <img src="/assets/car.png" className="services-icon" />
            </div>
            <div>
              <p className="mb-0 fw-bold">HOME DELIVERY</p>
              <p>(TN, BLRE & PY Only)</p>
            </div>
          </div>

          <div className="service-box">
            <div className="services-icon-wrapper">
              <img src="/assets/viber.png" className="services-icon" />
            </div>
            <div>
              <p className="mb-0 fw-bold">OTHER STATES</p>
              <p>Minimum Order ₹6,000</p>
            </div>
          </div>

          <div className="service-box">
            <div className="services-icon-wrapper">
              <img src="/assets/secure-payment.png" className="services-icon" />
            </div>
            <div>
              <p className="mb-0 fw-bold">UPTO 80% DISCOUNT</p>
              <p>with Assured Packing Quality</p>
            </div>
          </div>
        </div>
      </div>

      {/* most popular section */}

      {/* <div className="most-popular d-flex flex-column align-items-center"> */}
      {/* <p className="mb-0">Most Popular</p>
        <h1 className="text-center mx-2">Discover flavours in demand</h1>
        <div className="carousel-container">
          <button onClick={prevSlide} className="carousel-btn">
            <img src="/assets/back.png" alt="Previous" className="popular-btn" />
          </button>

          <div className="products-grid">
            {visibleProducts.map((product) => (
              <div key={product.id} className="product-card d-flex flex-column justify-content-between" >
                <div>
                 <a href="/Product"> <img
                    src={product.image}
                    alt={product.description}
                    className="product-img"
                  /></a>
                  <p className="product-descrip">{product.description}</p>
                  <div className="wishlist-icon">
                    <img src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png" />
                  </div>
                </div>
                <div>
                  <div className="price d-flex gap-1">
                    <p className="price1">{product.price1}</p>
                    <p className="price2">{product.price2}</p>
                  </div>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>

          <button onClick={nextSlide} className="carousel-btn">
            <img src="/assets/next2.png" alt="Next" className="popular-btn" />
          </button>
        </div> */}
      {/* </div> */}

      {/* Featured categories */}

      {/* <FeaturedCarousel /> */}

      {/* shop from our farm */}

      {/* <ShopFromFarm /> */}

      {/* feature bottom */}

      {/* <div className="featured-bottom ">
        <div className="row">
          <div className="col-lg-6 col-12 mt-3">
           <div className="feature-card feature-card1  d-flex flex-column justify-content-center">
           <h3 className=" fw-bold">Fruits & Vegetables</h3>
            <p>Get Upto 30% Off</p>
            <button className="shop-btn">
              Shop Now
            </button>
           </div>
          </div>

          <div className="col-lg-6 col-12 mt-3 ">
           <div className=" feature-card feature-card2  d-flex flex-column justify-content-center">
           <h3 className=" fw-bold">Freshly Baked Buns</h3>
            <p>Get Upto 25% Off</p>
            <button className="shop-btn">
              Shop Now
            </button>
           </div>
          </div>
        </div>
      </div> */}

      {/* Daily best sells section */}
      <DailySell />

      {/* testimonals section */}
      <Testimonals />

      {/* <Faq /> */}

      {/* footer */}

      <Footer />
    </>
  );
}
