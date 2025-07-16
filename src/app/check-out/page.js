


"use client";
import React, { useState, useContext , useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { LoggedDataContext } from "../context/context";
import { placeOrderServ } from "../services/product.service";
import { toast } from "react-toastify";

const Page = () => {
  const { loggedUserData , cartList , setCartList , comboCartList , setComboCartList} = useContext(LoggedDataContext);

  // const [step, setStep] = useState(1);


const [step, setStep] = useState(() => {
  // If user is logged in, start at Step 2
  return loggedUserData?._id ? 2 : 1;
});


  const [shipping, setShipping] = useState("homeDelivery");

  const [addressForm, setAddressForm] = useState({
    phone: "",
    alternatePhone: "",
    landmark: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    fullName: "",
    email:""
  });

  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [discount, setDiscount] = useState(0);
 
  const [cityPrice, setCityPrice] = useState(0);

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);

  const renderStepComponent = () => {
    const stepProps = {
      next,
      back,
      shipping,
      setShipping,
      addressForm,
      setAddressForm,
      deliveryCharge,
      setDeliveryCharge,
      discount,
      setDiscount,
      orderPayload,
      setOrderPayload,
      cityPrice,
      setCityPrice,
      cartList,
      setCartList,
      comboCartList ,
       setComboCartList,
      amountReached,
      placeOrderFunc,
      orderId
    };

    switch (step) {
      case 1:
        return <Step1 {...stepProps} />;
      case 2:
        return <Step2 {...stepProps} />;
      case 3:
        return <Step3 {...stepProps} />;
      case 4:
        return <Step4 {...stepProps} />;
      case 5:
        return <Step5 {...stepProps} />;
      default:
        return <Step1 {...stepProps} />;
    }
  };

  const [orderPayload, setOrderPayload] = useState({
      userId: loggedUserData?._id || "",
  
     product: Array.isArray(cartList)
      ? cartList.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      totalPrice: item.discountedPrice * item.quantity,
      productHeroImage: item.productHeroImage, })): [],

      comboProduct: Array.isArray(comboCartList) ? comboCartList.map((item) => ({
      comboProductId: item._id,
      quantity: item.quantity,
      totalPrice: item.pricing.comboPrice * item.quantity,
      productHeroImage: item.productHeroImage,
      productName: item.name || item.title || "" })): [],
      


      totalAmount: cartList?.reduce(
        (total, item) => total + item.discountedPrice * item.quantity,
        0
      ),
      address: addressForm,
    });

  const [amountReached, setAmountReached] = useState(false);


 useEffect(() => {
    if (!loggedUserData || !cartList) return;

    const subTotal = 
    (cartList.reduce((total, item) => {
      const price = item?.discountedPrice;
      return total + price * item.quantity;
    }, 0)) +
    (comboCartList.reduce((total, item) => {
      const price = item?.pricing?.comboPrice;
      return total + price * item.quantity;
    }, 0))

     const originalTotal =
     ( cartList.reduce((total, item) => {
    const originalPrice =  item?.price || 0;
    return total + originalPrice * item.quantity;
  }, 0))+
  ( comboCartList.reduce((total, item) => {
    const originalPrice = item?.pricing?.actualPrice || 0;
    return total + originalPrice * item.quantity;
  }, 0))

  const calculatedDiscount = originalTotal - subTotal;
  setDiscount(calculatedDiscount);

    const minCityPrice = cityPrice || 0;

    // const deliveryCharge = subTotal >= minCityPrice ? 0 : 100;
    // setDeliveryCharge(deliveryCharge);

    setOrderPayload({
      userId: loggedUserData._id,
       product: Array.isArray(cartList)
      ? cartList.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      totalPrice: item.discountedPrice * item.quantity,
      productHeroImage: item.productHeroImage, })): [],

      comboProduct: Array.isArray(comboCartList) ? comboCartList.map((item) => ({
      comboProductId: item._id,
      quantity: item.quantity,
      totalPrice: item.pricing.comboPrice * item.quantity,
      productHeroImage: item.productHeroImage,
      productName: item.name || item.title || "" })): [],

      totalAmount: subTotal,
      address: addressForm,
      deliveryCharge: deliveryCharge,
      shipping: shipping
    });

    setAmountReached(subTotal >= minCityPrice);

    console.log("payload", orderPayload);
    console.log("comboCartList" , comboCartList) 
    console.log("CartList" , cartList) 
    console.log("amount reached", amountReached);
  }, [loggedUserData, cartList, comboCartList,  addressForm, cityPrice , shipping]);

   const [orderId, setOrderId] = useState(null);

  const placeOrderFunc = async () => {
    try {
      let response = await placeOrderServ(orderPayload);
      if (response?.statusCode == 200) {
      console.log("booking created" , response)
        toast.success(response?.message);
        setCartList([]);
        setComboCartList([]);
        localStorage.removeItem("cartList");
        localStorage.removeItem("comboCartList");
        // router.push("/");

        setOrderId(response?.data?._id);
        next();
        // setShowPaymentPopup(true);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div style={{ backgroundColor: "#f6f6f6", minHeight: "100vh" }}>
      <Navbar />
      <div className="container my-5 pt-5">
        {/* Stepper UI */}
        <div className="checkout-steps mx-auto my-4">
          {["Login", "Delivery", "Cart", "Summary", "Payment"].map((label, index) => {
            const current = index + 1 === step;
            const done = index + 1 < step;
            return (
              <div className="step-item" key={index}>
                <div
                  className={`step-circle ${
                    done ? "done" : current ? "active" : ""
                  }`}
                >
                  {done ? "✓" : index + 1}
                </div>
                <div className="step-label">{label}</div>
                {index < 4 && (
                  <div
                    className={`step-line ${
                      index + 2 <= step ? "filled" : ""
                    }`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step Component Rendering */}
        <div className="mt-8">{renderStepComponent()}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;

