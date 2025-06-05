"use client"

import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useRouter } from 'next/navigation';
import { logIn } from '../services/authentication.service';
import { LoggedDataContext } from '../context/context';
import { toast } from "react-toastify";


const page = () => {

     const router = useRouter();

      const handleSignup = () => {
     router.push("/signup");
  }


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
          <form className='d-flex flex-column align-items-center'>
                <div className="signup-div">
                <input type="email" placeholder="Email" name="email" required />
              </div>
               <div className="signup-div">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
                <button type="submit" className="register mt-3">Sign In</button>
              </div>
          </form>
            <p className="signup-p">You dont have an account? <span className="signin-option fw-bold" onClick={handleSignup}>Sign Up</span></p>
         </div>
       </div>
    </div> 

    <Footer/>
    </>
  )
}

export default page