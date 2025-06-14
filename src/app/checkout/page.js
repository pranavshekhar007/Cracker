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
import Footer from "../Components/Footer";
import Payment from "../Components/Payment";

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
            
              style={{color: "coral"}} > ₹ {cartList?.reduce((total, item) => {
  const price = item?.discountedPrice ?? item?.pricing?.comboPrice ?? 0;
  return total + price * (item.quantity || 0);
}, 0)

              }
              </p>

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
                        <del>₹{item?.price?? item?.pricing?.offerPrice}</del>
                      </p>
                      <p style={{color:"#e85159"}} className="fw-bold cartPrice"> (₹{item?.discountedPrice?? item?.pricing?.comboPrice}*{item?.quantity})</p>
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
         <Payment showPaymentPopup={showPaymentPopup} setShowPaymentPopup={setShowPaymentPopup} orderId = {orderId}/>
      <Footer/>
       
    </div>


  );
};

export default Page;