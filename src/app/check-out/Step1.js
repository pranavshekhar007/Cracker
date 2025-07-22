"use client";
import React, { useContext, useEffect, useState } from "react";
import { LoggedDataContext } from "../context/context";
import { otpSend, otpVerify } from "../services/authentication.service";
import { toast } from "react-toastify";
import { addToCartServ , userCartList } from "../services/product.service";

const Step1 = ({ next ,  cartList,
      setCartList, comboCartList , setComboCartList }) => {
  const { loggedUserData, updateLoggedUserData , setApiCartList} =
    useContext(LoggedDataContext);

  const [userFormData, setUserFormData] = useState({
    phone: "",
    phoneOtp: "",
    firstName: "",
  });

  useEffect(() => {
    if (loggedUserData?._id) {
      next();
    }
  }, [loggedUserData, next]);

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
    setPhoneLoading(true);
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
    setPhoneLoading(false);
  };

  const otpVerifyFunc = async () => {
    if (!userFormData.phoneOtp) {
      setErrorMessage("Please enter your otp first.");
      return;
    }
    if (!userFormData.firstName) {
      setErrorMessage("Please enter you name");
      return;
    }
    setErrorMessage("");
    setOtpLoading(true);
    try {
      let response = await otpVerify(userFormData);
      if (response?.statusCode == "200") {
        toast.success(response?.message);
        const userData = response?.data;

      updateLoggedUserData(userData);

     
      await handleUpdateCartData(userData);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
    setOtpLoading(false);
  };


  const handleUpdateCartData = async (userData) => {
      
      // ✅ Send normal product cart
      const guestCart = cartList || [];
      for (let item of guestCart) {
        const repeat = item.quantity || 1;
        for (let i = 0; i < repeat; i++) {
          const payload = {
            userId: userData._id,
            id: item._id,
            itemType: "Product",
          };
          try {
            await addToCartServ(payload);
          } catch (err) {
            console.log("Error syncing product:", item._id, err);
          }
        }
      }

       const guestComboCart = comboCartList || [];
      for (let item of guestComboCart) {
        const repeat = item.quantity || 1;
        for (let i = 0; i < repeat; i++) {
          const payload = {
            userId: userData._id,
            id: item._id,
            itemType: "ComboProduct",
          };
          try {
            await addToCartServ(payload);
          } catch (err) {
            console.log("Error syncing combo product:", item._id, err);
          }
        }
      }

       localStorage.removeItem("cartList");
      localStorage.removeItem("comboCartList");
      setCartList([]);
      setComboCartList([]);

       getUserCart(userData);

      
  }

    const getUserCart = async (userData) => {
            try{
             const res = await userCartList(userData._id)
               console.log("cart list" , res)
               setApiCartList(res?.cartItems || []);
                next();
            }
            catch(error){
              console.log("error in cart list" , error)
            }
          }

  return (
    <div
      className=" p-4 mb-4 bg-white container d-flex justify-content-center align-items-center"
      style={{ borderRadius: "13px", minHeight: "60vh" }}
    >
      <div style={{ width: "50%" }} className="stepPage">
        <h6 className="fw-bold mb-4">Please Verify your phone number</h6>
        <input
          className="form-control mb-3"
          placeholder="Enter you name"
          onChange={(e) =>
            setUserFormData({
              ...userFormData,
              firstName: e.target.value,
            })
          }
        ></input>

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
            disabled={otpLoading}
          >
            {otpLoading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "Verify OTP"
            )}
          </button>
        ) : (
          <button
            className="btn w-100 mt-2 text-white"
            style={{ backgroundColor: "maroon" }}
            onClick={sendOtpFunc}
            disabled={phoneLoading}
          >
            {phoneLoading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "Send OTP"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Step1;
