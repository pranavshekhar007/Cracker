"use client";

import React, { useContext, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useRouter } from "next/navigation";
import { loginSubscriptionServ } from "../services/subscription.services";
import { ChitLoggedDataContext } from "../context/context2";
import { toast } from "react-toastify";

const ChitLoginPage = () => {
  const router = useRouter();
  const { updateChitLoggedUserData } = useContext(ChitLoggedDataContext);

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = () => {
    router.push("/subscription-signup");
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginSubscriptionServ(formdata); // chit login API
      console.log("Chit Login response:", res.data);

      if (res?.data?.statusCode === 200) {
        updateChitLoggedUserData(res?.data?.data); // store only user data object
        toast.success(res.data.message);
        router.push("/subscription"); // navigate to chit dashboard/subscription page
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Chit Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-sections d-flex align-items-center flex-wrap flex-md-nowrap">
          <div className="login-image d-flex justify-content-center mb-5">
            <img
              src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-28907.jpg?ga=GA1.1.319038510.1738920078&semt=ais_hybrid&w=740"
              alt="Login Illustration"
            />
          </div>
          <div className="login-form">
            <h2>Subscription Chit Login</h2>
            <form
              className="d-flex flex-column align-items-center"
              onSubmit={handleSubmit}
            >
              <div className="signup-div">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  onChange={handleOnchange}
                />
              </div>
              <div className="signup-div">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  onChange={handleOnchange}
                />
                <button type="submit" className="register mt-3">
                  Log In
                </button>
              </div>
            </form>
            <p className="signup-p">
              You don't have an account?{" "}
              <span
                className="signin-option fw-bold"
                onClick={handleSignup}
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChitLoginPage;
