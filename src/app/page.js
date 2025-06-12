"use client";
import DailySell from "./Components/DailySell";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import Testimonals from "./Components/Testimonals";
import Faq from "./Components/Faq";
import ShopFromFarm from "./Components/ShopFromFarm";
import Footer from "./Components/Footer";
import SegmentedToggleWithContent from "./Components/SegmentedToggleWithContent";
import HeroSection from "./Components/HeroSection";
import { getProductServ } from "./services/product.service";
import BrandsSlider from "./Components/BrandsSlider";

export default function Home() {

    const [productlist, setProductList] = useState([]);

  const getProductList = async () => {
    try {
      let response = await getProductServ();
      console.log(response?.data);
      if (response?.statusCode == "200") {
        setProductList(response?.data);
      }
    } catch (error) {
      console.log("getting error in product api")
    }
  };

   useEffect(() => {
    getProductList();
  }, []);


  // popup on first visit
    
  const [showDisclaimer, setShowDisclaimer] = useState(false);

    const handleProceed = () => {
    localStorage.setItem("disclaimerAccepted", "true");
    setShowDisclaimer(false);
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
    };

    useEffect(() => {

        const hasAccepted = localStorage.getItem("disclaimerAccepted");
  if (!hasAccepted) {
      setShowDisclaimer(true);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
}, []);

 useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
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
         
        <HeroSection/>

        <BrandsSlider/>
       
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
      {/* <DailySell
       productList={productlist}
      /> */}
      <DailySell 
          productList={productlist?.filter((v, i) => {
          return v?.specialAppearance?.includes("daily sell");
        })}
/>

      {/* <SegmentedToggleWithContent
      productList={productlist.filter((v) => 
    v?.specialAppearance?.includes("our shop") &&
    v?.specialAppearance?.includes("new Arrivals")
  )}
      /> */}
         <SegmentedToggleWithContent
       productList={productlist}/>

    
      <Testimonals />


      {showDisclaimer && (
        <div
          className="payment-popup position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgb(49 49 49 / 80%)", zIndex: 9999 }}
        >
          <div
            className=" p-5 text-center bg-white"
            style={{ width: "500px", maxWidth: "90%", borderRadius: "22px" }}
          >
                <h4 className='fw-bold' style={{fontFamily:"poppins"}}>Disclaimer</h4>
          <p className='mt-3 text-muted' style={{fontFamily:"sans-serif"}}>
            We respect and follow all Supreme Court guidelines on firecracker sales.
          </p>
          <p className="text-muted"  style={{fontFamily:"sans-serif"}}>
            By clicking “Proceed”, you confirm you are from a region where firecracker delivery is legally permitted.
          </p>
          <button className="btn disclaimerBtn border-none text-white mt-3 mb-2 fw-bold" style={{width: "50%" , backgroundColor: "#c01212" , borderRadius:"0"} } onClick={handleProceed}>
            PROCEED
          </button>
           
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
