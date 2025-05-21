"use client";
import DailySell from "./Components/DailySell";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import Testimonals from "./Components/Testimonals";
import Faq from "./Components/Faq";
import ShopFromFarm from "./Components/ShopFromFarm";
import Footer from "./Components/Footer";
import SegmentedToggleWithContent from "./Components/SegmentedToggleWithContent";

export default function Home() {
  
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
        </div>
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
              <img src="/assets/viber.png" className="services-icon" />
            </div>
            <div>
              <p className="mb-0 fw-bold">OTHER STATES</p>
              <p>Minimum Order ₹6,000</p>
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
              <img src="/assets/viber.png" className="services-icon" />
            </div>
            <div>
              <p className="mb-0 fw-bold">OTHER STATES</p>
              <p>Minimum Order ₹6,000</p>
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
      </div>



      {/* Featured categories */}

      {/* <FeaturedCarousel /> */}

      {/* shop from our farm */}

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

      <SegmentedToggleWithContent />

      {/* <ShopFromFarm /> */}

      {/* testimonals section */}
      <Testimonals />

      {/* <Faq /> */}

      {/* footer */}

      <Footer />
    </>
  );
}
