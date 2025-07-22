"use client"

import React from 'react'
import Navbar from '../Components/Navbar'
import AccountDetails from '../Components/AccountDetails'
import { LoggedDataContext } from '../context/context'
import { useContext } from 'react'
import { useRouter } from "next/navigation";
import Footer from '../Components/Footer'


const page = () => {
    const router = useRouter();
    const { setLoggedUserData, updateLoggedUserData , setCartList, setWishList , apiCartList , setApiCartList } = useContext(LoggedDataContext);


    const handleLogOut = () => {

         console.log("Logging out...");
     
         updateLoggedUserData(null);
         setCartList([]);
         setWishList([]);
         setApiCartList([]);

    localStorage.removeItem("user");
    localStorage.removeItem("cartList");
    localStorage.removeItem("wishList");

     console.log("Logged out...");
        
     
    router.push("/register");
 

    }

  return (
      
 
    <div>
        <Navbar/>
        <div className='user-profile'>
                <div className="profile-section d-flex gap-3">
                    <AccountDetails/>

                      <div className='profile-right mt-lg-5 pt-lg-4'>
                      
                           <div   className="my-details" 
                           style={{minHeight: "50vh"}}>
                             <h3>Confirm Logout</h3>
                            <p>You’ll be signed out of your account and will need to log in again.</p>
                            <button className='btn btn-danger'
                            style={{width: "140px"}} onClick={handleLogOut}>Log Out</button>
                           </div>
                      </div>
                </div>

        </div>
      <Footer/>
    </div>
  )
}

export default page
