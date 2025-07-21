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
import { FaWhatsapp } from "react-icons/fa";
import {
  getProductServ,
  getComboProductServ,
} from "./services/product.service";
import BrandsSlider from "./Components/BrandsSlider";
import ProductSlider from "./Components/ProductSlider";
import LocationSelector from "./Components/LocationSelector";
import { generateToken, messaging } from "./notifications/firebase";
import { onMessage } from "firebase/messaging";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      toast(payload.notification.body);
    });
  }, []);

  const [productlist, setProductList] = useState([]);

  const payload = {
    pageCount: 20,
  };

  const getProductList = async () => {
    try {
      let response = await getProductServ(payload);
      console.log(response?.data);
      if (response?.statusCode == "200") {
        setProductList(response?.data);
      }
    } catch (error) {
      console.log("getting error in product api");
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  // combo prodcucts for slider

  const [comboproducts, setComboProductList] = useState([]);

  const getComboProductList = async () => {
    try {
      let response = await getComboProductServ();
      console.log(response?.data);
      if (response?.statusCode == "200") {
        setComboProductList(response?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getComboProductList();
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

  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <div className=" position-relative">
        <Toaster />
        <Navbar />

        {/* Place below <Navbar /> */}

        <div className="container my-3">
          <button
            className="locationBtn btn btn-danger d-flex justify-content-center align-items-center mx-auto rounded-pill"
            onClick={openModal}
          >
            <i className="fa fa-map-marker-alt me-2"></i>
            Check Delivery & Minimum Order
          </button>

          {showModal && (
            <div
              className="modal fade show"
              style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      Check Delivery & Minimum Order
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                    ></button>
                  </div>

                  <div className="modal-body">
                    <LocationSelector />
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===== Updates Bar Section ===== */}
        <div className="update-bar d-flex align-items-center shadow-sm rounded">
          <div className="update-label d-flex align-items-center px-3 py-2 rounded-start">
            <i className="bi bi-lightning-fill me-2"></i>
            <strong>DISCLAIMER</strong>
          </div>
          <div className="update-text-wrapper py-2 px-2">
            <div className="update-text">
              🚨 As per 2018 Supreme Court guidelines, direct online sale of
              firecrackers is not permitted.&nbsp; | &nbsp; ✅ Big Bang Crackers strictly
              follows all legal and regulatory requirements.&nbsp; | &nbsp; 🛒 Please add your
              products to cart and submit enquiry.&nbsp; | &nbsp; 📞 Our team will respond
              within 24 hours via WhatsApp or call.&nbsp; | &nbsp; 📝 We operate under valid
              licenses with 100% compliance to Explosives Act & safety
              protocols.&nbsp; | &nbsp; 🏢 All stock points and godowns are certified as per
              rules.&nbsp; | &nbsp; 🚚 Deliveries are handled only through approved transport
              services.&nbsp; | &nbsp; 🎇 Celebrate Diwali safely, responsibly, and legally.
            </div>
          </div>
        </div>

        {/* hero section */}

        <div className="hero-container">
          <HeroSection />

          {/* services */}

          {/* <div className="free-shiping">
            <div className="services-container my-5">
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
                  <img
                    src="/assets/secure-payment.png"
                    className="services-icon"
                  />
                </div>
                <div>
                  <p className="mb-0 fw-bold">UPTO 80% DISCOUNT</p>
                  <p>with Assured Packing Quality</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* <div className="container my-4">
          <button className="btn btn-danger" onClick={openModal}>
            Select Location
          </button>

          {showModal && (
            <div
              className="modal fade show"
              style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Select Location</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                    ></button>
                  </div>

                  <div className="modal-body">
                    <LocationSelector />
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
        <SegmentedToggleWithContent productList={productlist} />

        <ProductSlider
          title="Combo Packs"
          subTitle="Best combo deals"
          textAlignCenter={true}
          comboProduct={true}
          productList={comboproducts}
        />

        <BrandsSlider />

        <Testimonals />

        {showDisclaimer && (
          <div
            className="payment-popup position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgb(49 49 49 / 80%)", zIndex: 9999 }}
          >
            <div
              className="p-4 bg-white shadow "
              style={{ width: "700px", maxWidth: "90%", borderRadius: "22px" }}
            >
              <h4
                className="fw-bold mb-3 text-dark text-center"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "1.5rem",
                }}
              >
                Disclaimer
              </h4>

              <p
                className="text-muted"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                }}
              >
                Big Bang Crackers is based in Tamil Nadu and operates in
                compliance with local laws. We do not sell firecrackers online
                to banned areas. This website is intended for order inquiries
                and checkout from customers in legally permitted regions only.
              </p>

              <p
                className="text-muted mt-3"
                style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem" }}
              >
                Deliveries are made via:
              </p>
              <ul
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.95rem",
                  color: "#6c757d",
                  paddingLeft: "20px",
                  marginBottom: "1rem",
                  textAlign: "left",
                  display: "inline-block",
                }}
              >
                <li>Door delivery: Tamil Nadu, Pondicherry, and Bangalore</li>
                <li>
                  To-pay lorry transport: All other legally allowed cities
                </li>
              </ul>

              <p
                className="text-muted"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.95rem",
                  marginBottom: "0.8rem",
                }}
              >
                We do not deliver to restricted zones, and do not use courier
                services (e.g., DTDC, India Post).
              </p>
              <p
                className="text-muted"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.95rem",
                  marginBottom: "0.8rem",
                }}
              >
                Only licensed green crackers are provided where required by law.
              </p>
              <p
                className="text-muted"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.95rem",
                  marginBottom: "1.2rem",
                }}
              >
                Orders from restricted areas will be canceled and refunded
                without exception.
              </p>

              <div className="d-flex gap-2 align-items-start mb-3">
                <input
                  type="checkbox"
                  style={{ height: "20px", marginTop: "3px" }}
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <p
                  className="mb-0 text-muted"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    textAlign: "left",
                    maxWidth: "500px",
                  }}
                >
                  I confirm my location legally permits the purchase and
                  delivery of fireworks, and I agree to the terms.
                </p>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  className="btn disclaimerBtn border-none text-white mt-2 fw-bold "
                  style={{
                    width: "50%",
                    backgroundColor: "#c01212",
                    borderRadius: "0",
                  }}
                  onClick={handleProceed}
                  disabled={!isChecked}
                >
                  PROCEED
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />

        <div
          className="whatsappBtn position-fixed"
          style={{ bottom: "3%", right: "3%" }}
        >
          <a
            href="https://wa.me/+919991896640"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              // display: "inline-block",
              backgroundColor: "#25D366",
              color: "#fff",
              padding: "10px 14px",
              // borderRadius: "25%",
              textDecoration: "none",
              fontWeight: "bold",
            }}
            className=" d-flex justify-content-center align-items-center rounded-pill"
          >
            <FaWhatsapp
              style={{ width: "25px", height: "25px", marginRight: "4px" }}
              className="whatsappLogo"
            />
            Message Us
          </a>
        </div>
      </div>
    </>
  );
}
