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
              <Link href="/subscription-signup">
                {" "}
              <p>Chit Subscription</p>{" "}
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

        <div className="d-flex flex-wrap justify-content-between align-items-center mt-4 pt-4 pb-5">
          <p className="mb-0 pb-2">
            © 2024. All Rights Reserved Bing Bang
          </p>
          <div className="social-icons d-flex align-items-center gap-2 ">
              <img src="https://cdn-icons-png.flaticon.com/128/665/665209.png" alt="facebook" style={{height:"25px" , width:"25px"}} />
             <a href="https://www.instagram.com/bigbangcrackers?utm_source=qr&igsh=MXh1ZGk3Z2txamZq" target="_blank"> <img src="https://cdn-icons-png.flaticon.com/128/15522/15522253.png" alt="instagram" style={{height:"25px" , width:"25px"}}  /></a>
              <img src="https://cdn-icons-png.flaticon.com/128/15522/15522333.png" alt="youtube"  style={{height:"25px" , width:"25px"}} />
            </div>
        </div>
        <div className="d-flex justify-content-center mt-1">
          {/* <p className="">
            Developed by{" "}
            <span className="geent-text">
              <a href="https://dousoft.in/" target="blank">
                dousoft It Solution Pvt Ltd
              </a>
            </span>{" "}
          </p> */}
        </div>
      </div>
    </>
  );
};

export default Footer;
