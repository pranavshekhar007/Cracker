"use client"

import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import AccountDetails from '../Components/AccountDetails'
import { LoggedDataContext } from '../context/context'
import { orderListServ } from '../services/product.service'
import { useContext  , useEffect} from 'react'
import Footer from '../Components/Footer'
import { toast } from "react-toastify";
import { format } from 'date-fns';
import { useRouter } from "next/navigation";

// const orders = [
//   {
//     id:"#12345",
//     Date:"12 June 2025",
//     price:"150",
//     item: "5",
//     status: "Arriving Today"
//   }
//    ,
//    {
//     id:"#12346",
//     Date:"18 June 2025",
//     price:"500",
//     item: "2",
//     status: "Deliverd"
//   },
//    {
//     id:"#12347",
//     Date:"19 June 2025",
//     price:"300",
//     item: "1",
//     status: "Shipped"
//   }
// ]

const page = () => {

   const { loggedUserData} =  useContext(LoggedDataContext);

   const [orders , setOrders] = useState([])

   const router = useRouter();

   const getOrders = async() => {
    const userId = loggedUserData?._id
    console.log("Frontend ID sent---", userId);
    try{
      const res = await orderListServ(userId);
      console.log(res.data)
      setOrders(res.data)
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
                           <h3>My Orders</h3>

                            <div className='allOrders d-none d-md-block' style={{ whiteSpace:"nowrap"}}>
                              <div className='row py-3 border-bottom ' style={{minWidth: "600px"}}>
                              <div className='d-flex gap-3 col-2'>
                               <p  className='fw-bold' >Order Id</p>
                              </div>

                              <div className='col-2'>
                               <h6 className='fw-bold' >Date</h6>
                              </div>

                              <div className='col-2'>
                               <h6 className='fw-bold'>Items</h6>
                              </div>
                               
                               <div className='col-2' >
                                 <p className='fw-bold'>Price</p>
                              </div>

                               <div className='col-2'>
                                <h6 className='fw-bold'>Delivery Status</h6>
                              </div>

                            </div>

                         {orders.map((order) => {
                            return(
                              <div key={order.id} className='row py-3 border-bottom ' style={{ minWidth: "600px" }}
                            
                                >
                              <div className='d-flex gap-3 col-2'>
                               <p style={{color: "#797979"}} >{order._id.slice(0,5)}</p>
                              </div>

                              <div className='col-2'>
                               <h6 style={{color: "#797979"}} >{format(new Date(order.createdAt), 'dd MMMM yyyy')}</h6>
                              </div>

                              <div className='col-2'>
                               <h6 style={{color: "#797979"}} >Items: {order.product.length}</h6>
                              </div>
                               
                               <div className='col-2' >
                                 <p className='fw-bold' style={{color: "#797979"}}>₹{order.totalAmount}</p>
                              </div>

                               <div className='col-2'>
                                <h6 className='text-success text-capitalize'>{order.status}</h6>
                              </div>

                                <div className='col-2'>
                                <btn className='btn  btn-danger fs-6'
                                    onClick={() => router.push("/order/" + order?._id)}> View</btn>
                              </div>

                            </div>

                            )
                         })}
                       </div>


                       {/* mobile view order cards */}
                           <div className='d-block d-md-none'>
                             <div className='row'>

                              <div className='col-12'>
                                    {orders.map((order) => {
                            return(
                              <div key={order.id} className='border shadow-sm p-3 mb-3'
                            
                                >
                              <div className='d-flex gap-3 '>
                               <p style={{color: "rgb(72 72 72)"}} >Order Id: {order._id.slice(0,5)}</p>
                              </div>

                              <div className=''>
                               <h6 style={{color: "rgb(72 72 72)"}} >Date: {format(new Date(order.createdAt), 'dd MMMM yyyy')}</h6>
                              </div>

                              <div className=''>
                               <h6 style={{color: "rgb(72 72 72)"}} >Items: {order.product.length}</h6>
                              </div>
                               
                               <div className='d-flex justify-content-between' >
                                <p className='fw-bold' style={{color: "rgb(72 72 72)"}}>Price:</p>
                                 <p className='fw-bold' style={{color: "rgb(72 72 72)"}} > ₹{order.totalAmount}</p>
                              </div>

                               <div className='d-flex justify-content-between'>
                                <h6 className='text-success text-capitalize'>{order.status}</h6>
                             
                                <btn className='btn  btn-danger fs-6'
                                    onClick={() => router.push("/order/" + order?._id)}> View</btn>
                              </div>

                            </div>

                            )
                         })}
                              </div>

                             </div>
                           </div>

                        </div>
                       
                      

                  </div>
               </div>
        </div>

        <Footer/>
    </>
  )
}

export default page
