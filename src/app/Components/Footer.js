import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="footer-outer">
        <div className="footer-inner d-flex  gap-4">
          <div className="footer-1 footer-item">
            <img
              src="https://bigbangcrackers.com/wp-content/uploads/2023/08/cropped-big-bang-logo-png-1.png"
              alt="logo"
              className="img-fluid footer-logo"
            />
            <p className=" mt-4">
              We’re passionate about lighting up celebrations with vibrant and
              safe fireworks that spark joy and excitement. Our specialty lies
              in crafting stunning cracker assortments that cater to all ages
              and festive moods. We make every moment brighter, louder, and more
              unforgettable.
            </p>

            <div className="social-icons d-flex gap-2 mt-4">
              <img src="/assets/facebook.png" alt="facebook" />
              <img src="/assets/twitter.png" alt="twitter" />
              <img src="/assets/linkedin.png" alt="linkedin" />
              <img src="/assets/instagram.png" alt="instagram" />
              <img src="/assets/youtube.png" alt="youtube" />
            </div>
          </div>

          <div className="footer-2 footer-item d-flex flex-column align-items-center text-center">
            <h6>Explore Links</h6>
            <hr></hr>
            <div className="footer-links">
              <Link href="/cookie-policy">
                {" "}
                <p>Cookie Policy</p>{" "}
              </Link>
              <Link href="/term-conditions">
                <p>Terms & Condition</p>
              </Link>
              <Link href="/privacy-policy">
                <p>Privacy Policy</p>
              </Link>
              <Link href="/refund-returns">
                <p>Refund & Returns</p>{" "}
              </Link>
              <Link href="/shipping-policy">
                {" "}
                <p>Shipping Policy</p>{" "}
              </Link>
              <Link href="/contact-us">
                {" "}
              <p>Contact Us</p>{" "}
              </Link>
            </div>
          </div>

          <div className="footer-3 footer-item">
            <h6>Contact us</h6>
            <hr></hr>
            <p>
            D.No:4/1993,Kalavthy Nagar, Keelathiruthangal Village, Sivakasi-626124
            </p>
            <p>bigbangcrackers7@gmail.com</p>
            <p>+91 9894047372</p>
            
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-between mt-4 pt-4 pb-5">
          <p className="mb-0 pb-2 text-light">
            © 2024. All Rights Reserved Bing Bang
          </p>
          <div className="d-flex gap-3">
            <img src="/assets/paypal.png" alt="paypal" className="company-img" />
            <img src="/assets/visa.png" alt="visa" className="company-img" />
            <img src="/assets/mastercard.png" alt="mastercard" className="company-img" />
            <img src="/assets/discover.png" alt="discover" className="company-img" />
            <img src="/assets/JCB.png" alt="JCB" className="company-img" />
          </div>
        </div>
        <div className="d-flex justify-content-center mt-1">
          <p className="text-light">
            Developed by{" "}
            <span className="geent-text">
              <a href="https://dousoft.in/" target="blank">
                dousoft It Solution Pvt Ltd
              </a>
            </span>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
