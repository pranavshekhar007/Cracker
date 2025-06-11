"use client"

import React from 'react'
import Navbar from '../Components/Navbar'
import AccountDetails from '../Components/AccountDetails'
import { LoggedDataContext } from '../context/context'
import { orderListServ } from '../services/product.service'
import { useContext  , useEffect} from 'react'

const page = () => {

   const { loggedUserData} =  useContext(LoggedDataContext);

   const getOrders = async() => {
    const id = loggedUserData?._id
    console.log("Frontend ID being sent:", id);
    try{
      const res = await orderListServ(id);
      console.log(res.data)
    }
    catch(error){
     console.log(error)
    }
   }

     useEffect(() => {
    if (loggedUserData?._id) {
      getOrders();
    }
  }, [loggedUserData]);

  return (
    <>
    <Navbar/>
        <div className="user-profile">
               <div className="profile-section d-flex gap-3">
                <AccountDetails/>

                  <div className="profile-right mt-lg-5 pt-lg-4">
                        <div className="my-details">



                        </div>
                  </div>
               </div>
        </div>
    </>
  )
}

export default page
