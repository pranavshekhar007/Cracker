import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="contact-page d-flex flex-column align-items-center">
        <div className="contact-head d-flex flex-column align-items-center ">
          <h1>Contact Us</h1>
          <p>
            Reach out to us for any inquiries, feedback, or support. Our team is
            ready to assist you.
          </p>
        </div>

        <div className="contact-details d-flex gap-4 justify-content-center">
          <div className="contact-detail">
            <img src="/assets/location.png" alt="location"></img>
            <div>
              <h5>ADDRESS</h5>
              <p>
                Station Club Road, Near Navratan Durga Asthan, NH 31, Purnia -
                854301 (BR)
              </p>
            </div>
          </div>

          <div className="contact-detail">
            <img src="assets/mail.png" alt="mail"></img>
            <div>
              <h5>MAIL US</h5>
              <p>vishal@crackers.com</p>
            </div>
          </div>

          <div className="contact-detail">
            <img src="assets/call.png"></img>
            <div>
              <h5>CALL US</h5>
              <p>+91-81000 03505</p>
              <p>+91-92056 00140,41,42</p>
            </div>
          </div>
        </div>

        <div className="contact-main d-flex justify-content-center">
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d28127.959504969855!2d87.47897828361309!3d25.78244898364153!3m2!1i1024!2i768!4f13.1!2m1!1sStation%20Club%20Road%2C%20Near%20%20Navratan%20Durga%20Asthan%2C%20NH%2031%2C%20Purnia%20-%20854301%20(BR!5e0!3m2!1sen!2sus!4v1747892117458!5m2!1sen!2sus"
              className="iframe"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="contact-form">
            <h2>Get In Touch</h2>
            <form className="d-flex flex-column align-items-center">
              <div className="contact-div row gx-0 gap-3">
                <div className="col">
                  <input type="text" placeholder="Name" required />
                </div>
                <div className="col">
                  <input type="email" placeholder="Email" required />
                </div>
              </div>
              <div className="contact-div row gx-0 gap-3">
                <div className="col">
                  <input type="tel" placeholder="Phone" required />
                </div>
                <div className="col">
                  <input type="text" placeholder="Website" required />
                </div>
              </div>
              <div className="contact-div">
                <textarea
                  placeholder="Message"
                  rows="3"
                  required
                  className="your-custom-class"
                />
              </div>

              <button type="submit" className="register">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
