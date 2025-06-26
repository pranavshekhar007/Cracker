"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {  uploadPaymentServ} from "../services/product.service"



const Step5 = ({orderId}) => {

    // const [showPaymentPopup, setShowPaymentPopup] = useState(false);
       const [paymentImage, setPaymentImage] = useState(null);
        const router = useRouter();

        const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

       
       
           const handleImageChange = (e) => {
           const file = e.target.files[0];
           if (file) {
             setPaymentImage(file);
           }
         };

         const[errorMessage , setErrorMessage] = useState(null);
         const[showError , setShowError] = useState(false);
       
         const handlePayment = async() => {

          if (!paymentImage) {
            setErrorMessage("Please upload a payment screenshot first!");
            setShowError(true);
          return;
           
           }

           if(!paymentMethod){
             setErrorMessage("Please select a payment method first!");
              setShowError(true);
              return;
           }

           try {



       
          const formData = new FormData();
    formData.append("paymentSs", paymentImage);
    formData.append("id", orderId);
    formData.append("paymentMethod", paymentMethod);

              
             const response = await uploadPaymentServ(formData);
             if(response?.statusCode=="200"){
                setShowError(false);
                
               toast.success(response?.message);
              
               router.push("/");
               // setShowPaymentPopup(true)
             }
           } catch (error) {
             console.log(error)
           }
         }


         const handleSkip = () => {
             router.push("/");
         }
    

  return (
    <div className=" p-sm-4 p-2 mb-4 bg-white container d-flex flex-column justify-content-center align-items-center"
     style={{borderRadius:"13px", minHeight:"50vh"}}>
        
        <div className="payment-popup   d-flex flex-column justify-content-center align-items-center" >
          <h3 className="my-3 text-center mb-4">Complete Payment</h3>

          <div className=" p-sm-4 p-2 rounded border stepPage" style={{ width: "800px", maxWidth: "100%" }} >
            
            

              <div className="d-flex justify-content-sm-around justify-content-center pb-3 mb-3 flex-sm-row  flex-column">
                <div className="d-flex flex-column align-items-center">
                  <h6 className="mb-sm-3 mb-2">Scan the QR Code to Pay</h6>
                   <img
                        className="paymentImage"

                      src="data:image/png;base64,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"
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
<div className="mb-2">
                    <h6>Select Payment Method:</h6>
    <div className="d-flex gap-4 mb-3">
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

              <div>
                <p className="text-danger">{errorMessage}</p>
              </div>
             

            <div className="d-flex gap-2">
               <button className="btn  w-100  fw-bold "
              style={{ background: "#e2e2e2", border: "none" }}
              onClick={handleSkip} >
                Skip Now
               </button>

                <button className="btn  w-100 text-white fw-bold "
              style={{ background: "brown", border: "none" }}
              onClick={handlePayment} >
              Upload Payment
               </button>        
            </div>
                 
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
     
    </div>
  )
}

export default Step5;
