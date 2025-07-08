// "use client"

// import React, { useRef } from 'react'
// import Navbar from '../Components/Navbar'
// import Footer from '../Components/Footer'

// const BulkOrderPage = () => {
//   const fileInputRef = useRef(null);

//   return (
//     <>
//       <Navbar />
//        <div className='bulk-order-page'>

//         <div className='bulk-section mb-5 '>
//            <div className=' text-center mb-2'>

//              <h1>Bulk Orders</h1>
//            </div>
//             <div className='bulk-content d-flex gap-4 align-items-center'>
//            <div>
//             <h3 className='mb-3'>Order Makhana in Bulk – Premium Quality for Every Occasion</h3>
//              <p>Enjoy the wholesome crunch of premium-grade Makhana delivered in bulk! Perfect for gifting,
//              corporate needs, event giveaways, and retail packaging. We offer 100% natural, handpicked Makhanas
//              with no added preservatives – just pure taste and nutrition.</p>
//              <p>Just fill in your details and requirements below — our team will get back to you within 24 hours with
//                  pricing and options tailored to your needs.</p>

//            </div>
//                  <img src='/assets/bulk3.png'/>
//            </div>
//         </div>

//         <div className='bulk-form pt-5 d-flex flex-column align-items-center'>

//             <h2 className='mb-5'>Place Your Bulk Makhana Order</h2>
//           <form>

//             {/* First Name & Last Name */}
//             <div className="row mb-3">
//               <div className="col">
//                 <label>First Name</label>
//                 <input type="text" className="form-control" required />
//               </div>
//               <div className="col">
//                 <label>Last Name</label>
//                 <input type="text" className="form-control" required />
//               </div>
//             </div>

//             {/* Contact */}
//             <div className="mb-3">
//               <label>Contact Number</label>
//               <input type="tel" className="form-control" required />
//             </div>

//             {/* Message */}
//             <div className="mb-3">
//               <label>Message / Requirements</label>
//               <textarea className="form-control" rows="4" required></textarea>
//             </div>

//             {/* Image Upload */}
//             <div className="mb-3">
//               <label className="form-label">Add a photo or video</label>
//               <div
//                 className="form-control"
//                 style={{
//                   height: "120px",
//                   backgroundColor: "#f8f9fa",
//                   border: "1px solid #ced4da",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => fileInputRef.current && fileInputRef.current.click()}
//               >
//                 Drop files here to upload
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   className="d-none"
//                   accept="image/*,video/*"
//                 />
//               </div>
//             </div>

//             {/* Submit */}
//             <button type="submit" className="bulk-btn">
//               Submit Bulk Request
//             </button>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default BulkOrderPage



"use client"; 

import React, { useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { bulkOrder } from "../services/support.service";

const BulkOrderPage = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    message: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
       try {
         const res = await bulkOrder(formData);
         console.log("Message sent successfully!");
         setFormData({
           firstName: "",
    lastName: "",
    contact: "",
    message: "",
    file: null,
         });
       } catch (err) {
         console.error(err);
       }
  };
  return (
    <>
      <Navbar />
      <div className="bulk-order-page ">

        <div className=" text-center mb-5">
          <h1>Bulk Orders</h1>
        </div>

        <div className="bulk-all-sections d-flex flex-column justify-content-center align-items-center">
          {/* <div className="bulk-section">
            <div className="bulk-content d-flex flex-column justify-content-between ">
              <div>
                <h3 className="mb-2">
                  Order hyzenith products in Bulk – Premium Quality for Every Occasion
                </h3>

                <p>
                  Just fill in your details and requirements below — our team
                  will get back to you within 24 hours with pricing and options
                  tailored to your needs.
                </p>
              </div>
              <img src="/assets/bulk.png" className="bulk-img" />
            </div>
          </div> */}

                        <h2 className="mb-4 text-danger text-center">Place Your Bulk Order</h2>

          <div className="bulk-form d-flex flex-column align-items-center shadow-sm p-4 mb-5" style={{borderRadius: "10px" , backgroundColor:"#ececec" , border:"1px solid #dddddd"}}>
            <form onSubmit={handleSubmit}>


              {/* First & Last Name */}
              <div className="row mb-2">
                <div className="col">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div className="mb-2">
                <label>Contact Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message */}
              <div className="mb-2">
                <label>Message / Requirements</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {/* File Upload */}
              <div className="mb-2">
                <label className="form-label">Add a photo or video</label>
                <div
                  className="form-control"
                  style={{
                    height: "90px",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ced4da",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    fileInputRef.current && fileInputRef.current.click()
                  }
                >
                  {formData.file ? formData.file.name : "Drop files here to upload"}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="d-none"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="bulk-btn">
                <i className="bi bi-send-fill me-2"></i> Submit Bulk Request
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BulkOrderPage;
