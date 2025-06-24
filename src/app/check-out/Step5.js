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
                      //  src="data:image/png;base64,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"
                       
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
