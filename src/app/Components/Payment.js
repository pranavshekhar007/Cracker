"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {  uploadPaymentServ} from "../services/product.service"


const Payment = ({showPaymentPopup , setShowPaymentPopup , orderId , getOrderDetails }) => {

    // const [showPaymentPopup, setShowPaymentPopup] = useState(false);
       const [paymentImage, setPaymentImage] = useState(null);
        const router = useRouter();

        const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

        const handleClosePaymentPopup = () => {
           setShowPaymentPopup(false);
         };
       
           const handleImageChange = (e) => {
           const file = e.target.files[0];
           if (file) {
             setPaymentImage(file);
           }
         };
       
         const handlePayment = async() => {

          if (!paymentImage) {
          toast.error("No payment uploaded");
          router.push("/");
          return;
           
           }

           try {
          //    const formData = new FormData();
          //  formData.append("paymentSs", paymentImage);
          //      formData.append("id", orderId);
       
          const formData = new FormData();
    formData.append("paymentSs", paymentImage);
    formData.append("id", orderId);
    formData.append("paymentMethod", paymentMethod);


             let response = await uploadPaymentServ(formData);
             if(response?.statusCode=="200"){
               toast.success(response?.message);
                setShowPaymentPopup(false)
               getOrderDetails();
             
             }
           } catch (error) {
             console.log(error)
           }
         }
    

  return (
    <div>
        {showPaymentPopup && (
        <div
          className="payment-popup position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div
            className=" p-4 rounded"
            style={{ width: "650px", maxWidth: "90%", background:"#fff5f5" }}
          >
            <div className=" d-flex justify-content-end">
              <button
                className="btn-close"
                onClick={handleClosePaymentPopup}
              ></button>
            </div>
            <div className="d-flex justify-content-center align-items-center ">
              <h5 className="text-end mb-sm-3 mb-2"
              >Complete Your Payment</h5>
              
            </div>

              <div className="d-flex justify-content-sm-around justify-content-center pb-sm-3 mb-1 flex-sm-row  flex-column">
                <div className="d-flex flex-column align-items-center">
                  <h6 className="mb-sm-3 mb-2">Scan the QR Code to Pay</h6>
                   <img
                        className="paymentImage"  
                        src="/assets/Scanner.jpeg"                     
                       style={{ width: "160px", padding: "5px" , border: "1px solid grey" , borderRadius: "5px" }}
                  alt="QR Code" />

                </div>
                <p className="d-flex align-items-center justify-content-center my-sm-4 my-2 text-secondary">or</p>
                <div className="d-flex flex-column align-items-center">
                  <h6 className="mb-sm-4 mb-2" >pay via Bank Transfer</h6>
                 <div className="ms-sm-3 ms-1 "
                 >
                     <p className="mb-sm-2 mb-1"><strong>UPI ID:</strong> renuarajan-1@okicici</p>
                     <p className="mb-sm-2 mb-1"><strong>Bank:</strong> ICICI BANK</p>
                     <p className="mb-sm-2 mb-1"><strong>Account Number:</strong> 034201529953</p>
                     <p className="mb-sm-2 mb-1"><strong>IFSC:</strong> ICIC0000342</p>
                  </div>
                 
                  </div>
              </div>
               
                   <hr/>
<div>
                    <h6>Select Payment Method:</h6>
    <div className="d-flex gap-4">
      <div>
        <label>
        <input
        className="me-2"
          type="radio"
          name="paymentMethod"
          value="upi"
          checked={paymentMethod === "upi"}
          onChange={handleChange}
        />
        UPI
      </label>
      </div>
      {/* <br /> */}

      <div>
        <label>
        <input
          type="radio"
           className="me-2"
          name="paymentMethod"
          value="qr"
          checked={paymentMethod === "qr"}
          onChange={handleChange}
        />
        QR Code
      </label>
      </div>
      {/* <br /> */}

      <div>
        <label>
        <input
          type="radio"
           className="me-2"
          name="paymentMethod"
          value="bank"
          checked={paymentMethod === "bank"}
          onChange={handleChange}
        />
        Bank Transfer
      </label>
      </div>
      </div>

      {/* <br /><br /> */}
      
    </div>
               
              <div className="my-sm-4 my-2">
                  <h6 className="mb-sm-3 mb-2"> Upload Payment Screenshot (after successful payment)</h6>

                   <input
            type="file"
            accept="image/*"
            className="form-control"
             onChange={handleImageChange}
          />
              </div>
             

              <button className="btn  w-100 text-white fw-bold "
              style={{ background: "brown", border: "none" }}
              onClick={handlePayment} >
              Upload Payment
               </button>
                 
            {/* {paymentImage? (
               <button className="btn  w-100 text-white fw-bold "
              style={{ background: "brown", border: "none" }}
              onClick={handlePayment} >
              Upload Payment

            </button>
            ):(
              <button className="btn  w-100 text-white fw-bold "
              style={{ background: "brown", border: "none" , opacity : "0.7" , cursor:"not-allowed"}} >
              Upload Payment
            </button>
            )} */}
          </div>
        </div>
      )}
    </div>
  )
}

export default Payment
