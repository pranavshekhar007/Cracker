"use client";
import React, { useState, useContext, useEffect } from "react";
import { LoggedDataContext } from "../context/context";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { signUpSubscriptionServ } from "../services/subscription.services";
import { toast } from "react-toastify";

const SubscriptionRegistrationPage = () => {
  const { loggedUserData } = useContext(LoggedDataContext);

  const [form, setForm] = useState({
    // installment: "",
    name: "",
    phone: "",
    email: "",
    location: "",
  });

  useEffect(() => {
    if (loggedUserData) {
      setForm({
        ...form,
        name: `${loggedUserData.firstName} ${loggedUserData.lastName}`,
        phone: loggedUserData.phone,
        email: loggedUserData.email,
      });
    }
  }, [loggedUserData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: loggedUserData?._id,
      name: form.name,
      phone: form.phone,
      email: form.email,
      location: form.location,
      //   installment: form.installment,
    };

    try {
      const res = await signUpSubscriptionServ(payload);
      toast.success(res?.data?.message || "Registered successfully!");
      setForm({
        // installment: "",
        name: "",
        phone: "",
        email: "",
        location: "",
      });
    } catch (error) {
      console.error("Error registering:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="subscription-page container mt-5 mb-5">
        <div className="row">
          <div className="col-md-8">
            <img
              src="/assets/banner.jpg"
              alt="Diwali Pattasu Chit Scheme 2025"
              className="img-fluid"
            />

            <div className="terms mt-4">
              <h5>Terms & Conditions</h5>
              <p>
                • The months scheme starts from after diwali and ends in
                before diwali.
              </p>
              <p>
                • Customers get easy payment options (Google Pay, PhonePe,
                Paytm, Net banking, UPI, BHIM etc.).
              </p>
              <p>
                • You are requested to pay every month's due amount on or before
                the 10th of every month...
              </p>
              {/* add all other terms similarly */}

              <p className="mt-3 text-danger fw-bold">
                Sale and delivery of firecrackers are subject to applicable laws
                and regulations. We strictly comply with Supreme Court and state
                government guidelines. Orders are accepted only from regions
                where sale and transport of firecrackers are permitted.
                Customers are responsible for checking local restrictions before
                placing an order. We do not sell banned or uncertified
                firecrackers. Celebrate responsibly and use fireworks safely.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="enquiry-form card p-4">
              <h5 className="mb-3">ENQUIRY FORM</h5>
              <form onSubmit={handleSubmit}>
                {/* <div className="mb-3">
                  <select
                    name="installment"
                    value={form.installment}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Installment</option>
                    <option value="₹700 x 3 Months">₹700 x 3 Months</option>
                    <option value="₹800 x 3 Months">₹800 x 3 Months</option>
                    <option value="₹1000 x 3 Months">₹1000 x 3 Months</option>
                    
                  </select>
                </div> */}

                <div className="mb-3">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name*"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email ID"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location*"
                    className="form-control"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SubscriptionRegistrationPage;
