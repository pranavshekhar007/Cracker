"use client"
import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { contact } from "../services/support.service";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const page = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await contact(formData);
      console.log("Message sent successfully!");
         toast.success(res?.message);
    setFormData({
      name: "",
      email: "",
      phone: "",
      website: "",
      message: "",
    });

    } catch (err) {
        toast.error(err?.message);
      console.error(err);
    }
  };

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
               D.No:4/1993,Kalavthy Nagar, Keelathiruthangal Village, Sivakasi-626124
              </p>
            </div>
          </div>

          <div className="contact-detail">
            <img src="assets/mail.png" alt="mail"></img>
            <div>
              <h5>MAIL US</h5>
              <p>bigbangcrackers7@gmail.com</p>
            </div>
          </div>

          <div className="contact-detail">
            <img src="assets/call.png"></img>
            <div>
              <h5>CALL US</h5>
              <p>+91 9894047372</p>
              {/* <p>+91-92056 00140,41,42</p> */}
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
            <form className="d-flex flex-column align-items-center"
             onSubmit={handleSubmit}>
              <div className="contact-div row gx-0 gap-3">
                <div className="col">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required />
                </div>
                <div className="col">
                  <input  type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required />
                </div>
              </div>
              <div className="contact-div row gx-0 gap-3">
                <div className="col">
                  <input   type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required />
                </div>
                <div className="col">
                  <input  type="text"
                    name="website"
                    placeholder="Website"
                    value={formData.website}
                    onChange={handleChange}
                    required />
                </div>
              </div>
              <div className="contact-div">
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  required
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
