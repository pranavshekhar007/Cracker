"use client"

import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useRouter } from 'next/navigation';
import  { useContext, useState } from 'react';
import { logIn } from '../services/authentication.service';
import { LoggedDataContext } from '../context/context';
import { toast } from "react-toastify";


const page = () => {

      const router = useRouter();
  const { updateLoggedUserData } = useContext(LoggedDataContext);

  const [formdata, setFormData] = useState({
    phone: "",
    password: ""
  });

  const handleSignup = () => {
    router.push("/signup");
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
      const res = await logIn(formdata); // API call
      console.log("Login response:", res.data);

      if (res?.statusCode == 200) {
        // const userData = {
        //   email: res.data.data.email,
        //   firstName: res.data.data.firstName,
        //   lastName: res.data.data.lastName,
        //   phoneNumber: res.data.data.phone,
        // };

        updateLoggedUserData(res?.data); // Context will also save to localStorage

        toast.success(res.message);
        router.push("/");
      } else {
            toast.error(res.message);
        console.log(typeof res.data.statusCode, res.data.statusCode);
      }
    } catch (error) {
      console.log("Login error:", error);
           toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
    <Navbar/>
    <div className='login-page'>
       <div className='login-sections  d-flex align-items-center flex-wrap flex-md-nowrap'>
         <div className='login-image d-flex justify-content-center'>
            <img src='https://img.freepik.com/free-vector/sign-concept-illustration_114360-28907.jpg?ga=GA1.1.319038510.1738920078&semt=ais_hybrid&w=740'/>
         </div>
         <div className='login-form'>
            <h2>Login to Your Account</h2>
          <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
                <div className="signup-div">
                <input type="tel" placeholder="Phone" name="phone" required onChange={handleOnchange} />
              </div>
               <div className="signup-div">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                 required onChange={handleOnchange}
                />
                <button type="submit" className="register mt-3" >Log In</button>
              </div>
          </form>
            <p className="signup-p" >You dont have an account? <span className="signin-option fw-bold" onClick={handleSignup}>Sign Up</span></p>
         </div>
       </div>
    </div> 

    <Footer/>
    </>
  )
}

export default page