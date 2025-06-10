"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoggedDataContext } from "../context/context";
import Navbar from "../Components/Navbar";
import { otpSend, otpVerify } from "../services/authentication.service";
import { toast } from "react-toastify";
import {
  addressCreate,
  addressList,
  addressDelete,
  addressUpdate,
} from "../services/address.service";
import {placeOrderServ ,  uploadPaymentServ} from "../services/product.service"

const Page = () => {
  const { loggedUserData, cartList, updateLoggedUserData , setCartList} =
    useContext(LoggedDataContext);
  const router = useRouter();
  const [editAddress, setEditAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    phone: "",
    alternatePhone: "",
    landmark: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    fullName: "",
  });

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
   const [paymentImage, setPaymentImage] = useState(null);
   const [orderId, setOrderId] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const fetchAddresses = async () => {
    try {
      const res = await addressList({userId:loggedUserData?._id});
      setAddresses(res?.data || []);
      setAddressForm(res?.data[0]);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  useEffect(() => {
    if (loggedUserData) {
      fetchAddresses();
    }
  }, [loggedUserData]);

  const [userFormData, setUserFormData] = useState({
    phone: "",
    phoneOtp: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
   const [showPhoneInput, setShowPhoneInput] = useState(false);

   const [phoneLoading, setPhoneLoading] = useState(false);
      const [otpLoading, setOtpLoading] = useState(false);

  const sendOtpFunc = async () => {
     if (!userFormData.phone) {
    setErrorMessage("Please enter your phone number first.");
    return;
  } 
   if (userFormData.phone.length !== 10) {
    setErrorMessage("Please enter a valid 10-digit phone number.");
    return;
  }

  setErrorMessage("");
  setPhoneLoading(true)
    try {
       const { phone } = userFormData;
      let response = await otpSend(phone);
      if (response?.statusCode == "200") {
        toast.success(response?.message);
        setShowPhoneInput(true);
      }
    } catch (error) {
      console.log(error?.response?.message);
       toast.error(error?.response?.data?.message);
    }
    setPhoneLoading(false)
  };
  const otpVerifyFunc = async () => {
      if (!userFormData.phoneOtp) {
    setErrorMessage("Please enter your otp first.");
    return;
  }
  setErrorMessage("");
  setOtpLoading(true);
    try {
      let response = await otpVerify(userFormData);
      if (response?.statusCode == "200") {
        toast.success(response?.message);
        updateLoggedUserData(response?.data);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
          toast.error(error?.response?.data?.message);
    
    }
    setOtpLoading(false);
  };
  
  const [orderPayload, setOrderPayload]=useState({
    userId: loggedUserData?._id || "",

    product: cartList?.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      totalPrice: item.discountedPrice * item.quantity,
      productHeroImage: item.productHeroImage,
    })),
    totalAmount: cartList?.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    ),
    address: addressForm,
  });

  useEffect(() => {
  if (!loggedUserData || !cartList) return;

  setOrderPayload({
    userId: loggedUserData._id,
    product: cartList.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      totalPrice: item.discountedPrice * item.quantity,
      productHeroImage: item.productHeroImage,
    })),
    totalAmount: cartList.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    ),
    address: addressForm,
  });
}, [loggedUserData, cartList, addressForm]);


  const placeOrderFunc = async ()=>{
    try {
      
      let response = await placeOrderServ(orderPayload);
      if(response?.statusCode=="200"){
        toast.success(response?.message);
        setCartList([]);
        localStorage.removeItem("cartList")
        // router.push("/");
         setOrderId(response?.data?._id);
        setShowPaymentPopup(true)
      }
    
    } catch (error) {
      console.log(error)
       
    }
   
  }

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
    try {
      const formData = new FormData();
    formData.append("paymentSs", paymentImage);
        formData.append("id", orderId);

      let response = await uploadPaymentServ(formData);
      if(response?.statusCode=="200"){
        toast.success(response?.message);
       
        router.push("/");
        // setShowPaymentPopup(true)
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div 
    style={{backgroundColor: "#f6f6f6" , minHeight: "100vh"}}>
      <Navbar />
      <div className="container py-5 mt-5" style={{ fontFamily: "poppins" }}>
        <h2 className="mb-4">Checkout</h2>
        <div className="row gx-0 gx-lg-5">
          <div className="col-lg-7 col-12 order-2 order-lg-1  ">
            <div className=" rounded px-md-4 p-md-3 p-1 bg-white"
            style={{boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;"}}>
              {loggedUserData?._id ? (
                <div className="border rounded p-3 mb-4">
                  <div className="d-flex justify-content-between align-items-center mx-2 mb-2">
                    <h6 className="mb-0 fw-bold">Delivery Address</h6>
                    {addresses?.length > 1 && (
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/6364/6364586.png"
                        style={{ height: "15px", opacity: "0.6" }}
                      
                      />
                    )}
                  </div>

                  <div className="row m-0 p-0">
                    <div className="col-md-12 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control"
                        placeholder="Enter Full Name"
                        value={addressForm?.fullName}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            fullName: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                    <div className="col-md-6 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="Enter Phone"
                        value={addressForm?.phone}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            phone: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>

                    <div className="col-md-6 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="Enter Alternative Phone"
                        value={addressForm?.alternatePhone}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            alternatePhone: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div className="col-md-12 col-12 p-0 px-md-2 my-2">
                      <textarea
                        className="form-control "
                        placeholder="Area"
                        value={addressForm?.area}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            area: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>

                    <div className="col-md-6 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="Landmark"
                        value={addressForm?.landmark}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            landmark: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                    <div className="col-md-6 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="Pincode"
                        value={addressForm?.pincode}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            pincode: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                    <div className="col-md-4 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="City"
                        value={addressForm?.city}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            city: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                    <div className="col-md-4 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="State"
                        value={addressForm?.state}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            state: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                    <div className="col-md-4 col-12 p-0 px-md-2 my-2">
                      <input
                        className="form-control "
                        placeholder="Country"
                        value={addressForm?.country}
                        readOnly={!editAddress}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            country: e?.target.value,
                          })
                        }
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-sm-row">
                    <div className="mx-1">
                      {!editAddress && (
                        <button
                          onClick={() => setEditAddress(true)}
                          className="btn btn-secondary w-100  mt-2"
                        >
                          Edit Address
                        </button>
                      )}
                    </div>
                    <div className="mx-1">
                      {addressForm?.fullName &&
                      addressForm?.phone &&
                      addressForm?.area &&
                      addressForm?.pincode &&
                      addressForm?.landmark ? (
                        <button className="btn btn-danger w-100  mt-2">
                          Save as delivery address
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger w-100  mt-2"
                          style={{ opacity: "0.5" }}
                        >
                          Save as delivery address
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" pb-4 mb-4">
                  <h6 className="fw-bold mb-4">Please Verify your phone number</h6>
                  <input
                    value={userFormData.phone}
                    className="form-control mb-3"
                    placeholder="Enter number"
                    required
                    onChange={(e) =>
                      setUserFormData({
                        ...userFormData,
                        phone: e.target.value,
                      })
                    }
                  />
                  {showPhoneInput && (
                    <input
                      value={userFormData?.phoneOtp}
                      className="form-control mt-2"
                      placeholder="Enter OTP"
                      style={{ height: "45px" }}
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          phoneOtp: e.target.value,
                        })
                      }
                    />
                  )}
                  {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}

                  {showPhoneInput ? (
                    <button
                      className="btn  w-100  mt-3 text-white"
                      style={{ backgroundColor: "maroon" }}
                      onClick={() => otpVerifyFunc()}
                      disabled = {otpLoading}
                    >
                     {otpLoading? <span className="spinner-border spinner-border-sm"></span> : "Verify OTP"}
                    </button>
                  ) : (
                   <button
  className="btn w-100 mt-2 text-white"
  style={{ backgroundColor: "maroon" }}
  onClick={sendOtpFunc}
  disabled={phoneLoading} 
>
  {phoneLoading ? <span className="spinner-border spinner-border-sm"></span> : "Send OTP"}
</button>

                  )}
                </div>
              )}

              <hr/>

             <div className="d-flex justify-content-between">
               <h6 className=" fw-bold">  Total Products:{" "} </h6>
              <p className=" fs-5 fw-bold ">  {cartList?.reduce((total, item) => total + item.quantity, 0)}</p>
             </div>
              
              <div className="d-flex justify-content-between">
                <h6 className=" fw-bold" > Subtotal:  </h6>
              <p className=" fs-5 fw-bold " 
              style={{color: "coral"}} > ₹ {cartList?.reduce( (total, item) => total + item.discountedPrice * item.quantity,  0 )}</p>

              </div>
              {addressForm?.fullName &&
                      addressForm?.phone &&
                      addressForm?.area &&
                      addressForm?.pincode &&
                      addressForm?.landmark ? (
                       <button
                className="btn btn-warning w-100 mt-3"
                onClick={placeOrderFunc}
              >
               Place Order
              </button>
                      ):(
                      <button
                className="btn btn-warning w-100 mt-3"
                  style={{ opacity: "0.5"  , cursor: "not-allowed"}}

              >
               Place Order
              </button>
                      )
                    }

            </div>
          </div>

          <div className="col-lg-5 col-12 bg-white order-1 order-lg-2"
           style={{boxShadow: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;"}}>
            <div style={{ fontFamily: "poppins" }}>
              <div className="offcanvas-header">
                <h6 className="fw-bold">  Your Cart Items </h6>
                {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              ></button> */}
              </div>

              <div className="offcanvas-body">
                {cartList?.map((item) => (
                  <div className="d-flex mb-3 justify-content-between p-2 border-bottom " key={item.id}>
                   <div className="d-flex"> 
                     <img
                      src={item.productHeroImage}
                      className="me-3   cartImg"
                      style={{ width: "80px", height: "80px" }}
                      
                    />
                    
                      <h6 style={{maxWidth: "130px" , color: "#636363;" , fontFamily: "poppins"}} className="cartName">
                        {item.name} 
                      </h6>
                    </div>

                      
                        
                        <p className="cartPrice">{item?.quantity}</p>

                       <div style={{minWidth: "75px"}} className=" text-end">
                         <p className="text-muted mt-1 mb-0 cartPrice">
                        <del>₹{item?.price}</del>
                      </p>
                      <p style={{color:"#e85159"}} className="fw-bold cartPrice"> (₹{item?.discountedPrice}*{item?.quantity})</p>
                       </div>
                      
                      
                    
                  </div>
                ))}

                {/* <hr /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Payment Popup */}
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
            <div className="d-flex justify-content-center align-items-center mb-3">
              <h5 className="text-end mb-3"
              >Complete Your Payment</h5>
              
            </div>

              <div className="d-flex justify-content-sm-around justify-content-center pb-3 flex-sm-row  flex-column">
                <div className="d-flex flex-column align-items-center">
                  <h6 className="mb-3">Scan the QR Code to Pay</h6>
                   <img
                      
                       src="data:image/png;base64,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"
                       
                       style={{ width: "160px", padding: "5px" , border: "1px solid grey" , borderRadius: "5px" }}
                  alt="QR Code" />

                </div>
                <p className="d-flex align-items-center justify-content-center my-4 text-secondary">or</p>
                <div className="d-flex flex-column align-items-center">
                  <h6 className="mb-4" >pay via Bank Transfer</h6>
                 <div className="ms-3"
                 >
                     <p className="mb-2"><strong>UPI ID:</strong> myupi@bank</p>
          <p className="mb-2"><strong>Bank:</strong> HDFC Bank</p>
          <p className="mb-2"><strong>Account Number:</strong> 1234567890</p>
          <p className="mb-2"><strong>IFSC:</strong> HDFC0001234</p>
                  </div>
                 
                  </div>
              </div>
               
                   <hr/>
               
              <div className="my-4">
                  <h6 className="mb-3"> Upload Payment Screenshot (after successful payment)</h6>

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
  );
};

export default Page;