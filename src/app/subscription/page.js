"use client";

import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import { addSubscriptionServ } from "../services/subscription.services";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";

const Page = () => {
  const [formData, setFormData] = useState({
    price: "",
    name: "",
    duration: "",
    phone: "",
    email: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const plans = [
    { value: "700", label: "Rs.700.00 per month" },
    { value: "800", label: "Rs.800.00 per month" },
    { value: "1000", label: "Rs.1000.00 per month" },
    { value: "1250", label: "Rs.1250.00 per month" },
    { value: "1500", label: "Rs.1500.00 per month" },
    { value: "2000", label: "Rs.2000.00 per month" },
    { value: "2500", label: "Rs.2500.00 per month" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });

    setLoading(true);
    try {
      await addSubscriptionServ(submitData);
      toast.success("Enquiry submitted successfully");
      setFormData({
        price: "",
        name: "",
        duration: "",
        phone: "",
        email: "",
        location: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div
        className=""
        style={{
          backgroundColor: "rgb(246 244 244)",
          marginTop: "40px",
          paddingTop: "5%",
        }}
      >
        <div className="row">
          {/* Left Side Banner */}
          <div className="w-full md:w-2/3 col-6">
            <Image
              src="/assets/hero-image2.jpg"
              alt="Diwali Chit Scheme"
              width={800}
              height={400}
              className="rounded shadow"
            />
          </div>

          {/* Right Side Form */}
          <div className="md:w-1/3 bg-white p-4 rounded shadow col-6">
            <h3 className="text-xl font-bold text-red-600 mb-4">
              ENQUIRY FORM
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <select
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-select border rounded px-3 py-2 w-full"
                required
              >
                <option value="">Select a Plan</option>
                {plans.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="form-control border rounded px-3 py-2 w-full"
                required
              />

              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={formData.duration}
                onChange={handleChange}
                className="form-control border rounded px-3 py-2 w-full"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control border rounded px-3 py-2 w-full"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="form-control border rounded px-3 py-2 w-full"
                required
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="form-control border rounded px-3 py-2 w-full"
                required
              />

              <button
                type="submit"
                className="bg-red-600 py-2 px-4 rounded w-full font-semibold"
                disabled={loading}
              >
                {loading ? <Skeleton height={20} /> : "SUBMIT"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
