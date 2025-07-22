"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { uploadPaymentServ } from "../services/product.service";

const Step5 = ({ orderId }) => {
  // const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentImage, setPaymentImage] = useState(null);
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("renuarajan-1@okicici");
    toast.success("UPI ID copied to clipboard!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentImage(file);
    }
  };

  const [errorMessage, setErrorMessage] = useState(null);
  const [showError, setShowError] = useState(false);

  const handlePayment = async () => {
    if (!paymentImage) {
      setErrorMessage("Please upload a payment screenshot first!");
      setShowError(true);
      return;
    }

    if (!paymentMethod) {
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
      if (response?.statusCode == "200") {
        setShowError(false);

        toast.success(response?.message);
       
        router.push("/");
        // setShowPaymentPopup(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkip = () => {
    router.push("/");
  };

  return (
    <div
      className=" p-sm-4 p-2 mb-4 bg-white container d-flex flex-column justify-content-center align-items-center"
      style={{ borderRadius: "13px", minHeight: "50vh" }}
    >
      <div className="payment-popup   d-flex flex-column justify-content-center align-items-center">
        <h3 className="my-3 text-center mb-4">Complete Payment</h3>

        <div
          className=" p-sm-4 p-2 rounded border stepPage"
          style={{ width: "800px", maxWidth: "100%" }}
        >
          <div className="d-flex justify-content-sm-around justify-content-center pb-3 mb-3 flex-sm-row  flex-column">
            <div className="d-flex flex-column align-items-center">
              <h6 className="mb-sm-3 mb-2">Scan the QR Code to Pay</h6>
              <img
                className="paymentImage"
                src="/assets/Scanner.jpeg"
                style={{
                  width: "160px",
                  padding: "5px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                }}
                alt="QR Code"
              />
            </div>
            <p className="d-flex align-items-center justify-content-center my-sm-4 my-2 text-secondary">
              or
            </p>
            <div className="d-flex flex-column align-items-center">
              <h6 className="mb-sm-4 mb-2">pay via Bank Transfer</h6>
              <div className="ms-sm-3 ms-1 ">
                <div className="d-flex align-items-center mb-sm-2 mb-1">
                  <p className="mb-0 me-2">
                    <strong>UPI ID:</strong> renuarajan-1@okicici
                  </p>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={handleCopyUPI}
                  >
                    Copy
                  </button>
                </div>

                <p className="mb-sm-2 mb-1">
                  <strong>Bank:</strong> ICICI BANK
                </p>
                <p className="mb-sm-2 mb-1">
                  <strong>Account Number:</strong> 034201529953
                </p>
                <p className="mb-sm-2 mb-1">
                  <strong>IFSC:</strong> ICIC0000342
                </p>
              </div>
            </div>
          </div>

          <hr />
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
            <h6 className="mb-sm-3 mb-2">
              {" "}
              Upload Payment Screenshot (after successful payment)
            </h6>

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
            <button
              className="btn  w-100  fw-bold "
              style={{ background: "#e2e2e2", border: "none" }}
              onClick={handleSkip}
            >
              Skip Now
            </button>

            <button
              className="btn  w-100 text-white fw-bold "
              style={{ background: "brown", border: "none" }}
              onClick={handlePayment}
            >
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
  );
};

export default Step5;
