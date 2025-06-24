"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoggedDataContext } from "../context/context";

import { toast } from "react-toastify";
import {
  addressCreate,
  addressList,
  addressUpdate,
} from "../services/address.service";
import {
  getCitiesServ,
  getStatesServ,
  placeOrderServ,
} from "../services/product.service";




const Step2 = ({ next , back , addressForm, setAddressForm, orderPayload , setOrderPayload , cityPrice , setCityPrice}) => {

   const { loggedUserData, cartList } =
    useContext(LoggedDataContext);
  const [editAddress, setEditAddress] = useState(false);

const [shipping, setShipping] = useState("homeDelivery");

  const handleShippingChange = (e) => {
  setShipping(e.target.value);
};
  

  const [addresses, setAddresses] = useState([]);
  const fetchAddresses = async () => {
    try {
      const res = await addressList({ userId: loggedUserData?._id });
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

  

 
  

 
  const [amountReached, setAmountReached] = useState(false);
 


  useEffect(() => {
    if (!loggedUserData || !cartList) return;

    const subTotal = cartList.reduce((total, item) => {
      const price = item?.discountedPrice ?? item?.pricing?.comboPrice;
      return total + price * item.quantity;
    }, 0);

     const originalTotal = cartList.reduce((total, item) => {
    const originalPrice = item?.pricing?.actualPrice  || item?.price || 0;
    return total + originalPrice * item.quantity;
  }, 0);

  const calculatedDiscount = originalTotal - subTotal;
    //   setDiscount(calculatedDiscount);

    const minCityPrice = cityPrice || 0;

    const deliveryCharge = subTotal >= minCityPrice ? 0 : 100;
    // setDeliveryCharge(deliveryCharge);

    // setOrderPayload({
    //   userId: loggedUserData._id,
    //   product: cartList.map((item) => ({
    //     productId: item._id,
    //     quantity: item.quantity,
    //     totalPrice:
    //       item.discountedPrice ?? item.pricing.comboPrice * item.quantity,
    //     productHeroImage: item.productHeroImage,
    //   })),
    //   totalAmount: subTotal,
    //   address: addressForm,
    //   deliveryCharge: deliveryCharge,
    //   shipping: shipping
    // });

    setAmountReached(subTotal >= minCityPrice);

    console.log("payload", orderPayload);
    console.log("amount reached", amountReached);
  }, [loggedUserData, cartList, addressForm, cityPrice , shipping]);

  useEffect(() => {
  if (!loggedUserData || !cartList || !cityPrice) return;

  const subTotal = cartList.reduce((total, item) => {
    const price = item?.discountedPrice ?? item?.pricing?.comboPrice;
    return total + price * item.quantity;
  }, 0);

  const deliveryCharge = subTotal >= cityPrice ? 0 : 100;

  setOrderPayload({
    userId: loggedUserData._id,
    product: cartList.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      totalPrice:
        (item.discountedPrice ?? item?.pricing?.comboPrice) * item.quantity,
      productHeroImage: item.productHeroImage,
    })),
    totalAmount: subTotal,
    address: addressForm,
    deliveryCharge,
    shipping,
  });

  setAmountReached(subTotal >= cityPrice);
}, [cityPrice]);


  

  const handleAddressCreate = async (e) => {
    e.preventDefault();

    const isAddressDuplicate = addresses.some(
      (addr) =>
        addr.fullName === addressForm.fullName &&
        addr.phone === addressForm.phone &&
        addr.alternatePhone === addressForm.alternatePhone &&
        addr.area === addressForm.area &&
        addr.city === addressForm.city &&
        addr.state === addressForm.state &&
        addr.pincode === addressForm.pincode &&
        addr.country === addressForm.country &&
        addr.landmark === addressForm.landmark
    );

    if (isAddressDuplicate) {
      toast.info("This address is already saved.");
      return;
    }

    const payload = {
      ...addressForm,
      type: "home",
      userId: loggedUserData?._id,
    };

    try {
      if (payload._id) {
        const res = await addressUpdate(payload);
        if (res?.statusCode == "200") {
          toast.success("Address updated successfully");
        }
      } else {
        const res = await addressCreate(payload);
        if (res?.statusCode == "200") {
          toast.success("Address saved successfully");
        }
      }

      fetchAddresses(); 
    } catch (error) {
      console.error("Address save/update error:", error);
      toast.error(error?.response?.data?.message || "Address operation failed");
    }
  };

  

  useEffect(() => {
    // getLocationAndPincode();
    getStates();
    getCity();
  }, []);

  // states list api

  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const getStates = async () => {
    try {
      const res = await getStatesServ();
      if (res.statusCode == "200") {
        console.log(res.data);
        setStateList(res.data);
      }
    } catch (error) {
      console.log("getting error in state list" + error);
    }
  };

  const getCity = async () => {
    try {
      const res = await getCitiesServ();
      if (res?.statusCode == "200") {
        console.log(res.data);
        setCityList(res.data);
      }
    } catch (error) {
      console.log("getting error in city list" + error);
    }
  };

  const [selectedState, setSelectedState] = useState("null");

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    setAddressForm((prev) => ({
      ...prev,
      state: selectedState,
      city: "",
    }));

    const filtered = cityList.filter(
      (city) => city.state.name === selectedState
    );

    setFilteredCities(filtered);
  };

  const [showAddress, setShowAddress] = useState(false);

  const handleSelectAdress = (address) => {
    // setSelectedAddress(address);
    console.log("selected address is", address);
    setAddressForm(address);
  };

  const handleNext = () => {
    next();
      next();
      next();
    
  }

  const handleBack = () => {
      back();
  }  

  useEffect(() => {
  if (addressForm?.state && cityList.length > 0) {
    const filtered = cityList.filter(
      (city) => city.state.name === addressForm.state
    );
    setFilteredCities(filtered);
  }
}, [addressForm?.state, cityList]);

useEffect(() => {
  if (addressForm?.city && filteredCities.length > 0) {
    const selected = filteredCities.find((city) => city.name === addressForm.city);
    if (selected) {
      setCityPrice(selected.minimumPrice);
    }
  }
}, [addressForm?.city, filteredCities]);



  return (
    <div className=" p-4 mb-4 bg-white container d-flex  flex-column justify-content-center align-items-center" style={{borderRadius:"13px", minHeight:"50vh"}}>
        <div className="border rounded p-3 mb-4"  style={{width: "80%"}}>
            <h3 className="my-3 text-center">Delivery Details </h3>
                  <div className="d-flex justify-content-between align-items-center mx-2 mb-2 steps">
                    <h6 className="mb-0 fw-bold">Delivery Address</h6>
                    {addresses?.length > 1 && (
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/6364/6364586.png"
                        style={{
                          height: "15px",
                          opacity: "0.6",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowAddress(!showAddress)}
                      />
                    )}
                  </div>

                  {showAddress && (
                    <div className="all-addresses d-flex gap-2 flex-wrap">
                      {addresses.map((address) => {
                        return (
                          <div className="address-card w-100 d-flex justify-content-between align-items-end">
                            <div>
                              <p className="address-name mb-0">
                                {address.fullName}
                              </p>
                              <p className="address-phone mb-0">
                                {address.phone}
                              </p>
                              <p className="address mb-0">
                                {address.area}, {address.landmark},{" "}
                                {address.city}, {address.state}
                              </p>
                              <p className="pincode mb-0">{address.pincode}</p>
                            </div>
                            <div className="address-btns d-flex gap-2 mt-3 ">
                              {address?._id == addressForm?._id ? (
                                <button
                                  className="text-danger"
                                  style={{
                                    // height: "40px",
                                    backgroundColor: "rgb(253 231 233)",
                                    border: "1px solid rgb(247 213 216)",
                                  }}
                                  onClick={() => handleSelectAdress(address)}
                                >
                                  Selected
                                </button>
                              ) : (
                                <button
                                  style={{
                                    // height: "40px",
                                    backgroundColor: "#dc3545",
                                  }}
                                  onClick={() => handleSelectAdress(address)}
                                >
                                  Use Address
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="row m-0 p-0">
                    <div className="col-md-12 col-12 p-0 px-md-2 my-2">
                        <label className="steps-label">Name</label>
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
                         <label className="steps-label">Phone</label>
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
                         <label className="steps-label">Alternate Phone</label>
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
                         <label className="steps-label">Area</label>
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
                         <label className="steps-label">Landmark</label>
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
                         <label className="steps-label">Pincode</label>
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
                         <label className="steps-label">State</label>
                      <select
                        className="form-control"
                        placeholder="State"
                        value={addressForm?.state}
                        disabled={!editAddress}
                        // onChange={(e) => handleStateChange(e.target.value)}
                        onChange={handleStateChange}
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      >
                        <option value="">Select State</option>
                        {stateList.map((state, index) => (
                          <option key={index} value={state?.name}>
                            {state?.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4 col-12 p-0 px-md-2 my-2">
                         <label className="steps-label">City</label>
                      <select
                        className="form-control "
                        placeholder="City"
                        value={addressForm?.city}
                        disabled={!editAddress}
                        onChange={(e) => {
                          const selectedCityName = e.target.value;
                          const selectedCityObj = filteredCities.find(
                            (city) => city.name === selectedCityName
                          );

                          setAddressForm((prev) => ({
                            ...prev,
                            city: selectedCityName,
                          }));

                          if (selectedCityObj) {
                            setCityPrice(selectedCityObj.minimumPrice);
                          } else {
                            setCityPrice(null);
                          }
                        }}
                        style={{
                          height: "45px",
                          background: editAddress ? "white" : "whitesmoke",
                        }}
                      >
                        <option value="">Select City</option>
                        {filteredCities.map((city, index) => (
                          <option key={index} value={city?.name}>
                            {city?.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4 col-12 p-0 px-md-2 my-2">
                         <label className="steps-label">Country</label>
                      <input
                        className="form-control"
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
                        <button
                          className="btn btn-danger w-100  mt-2"
                          onClick={handleAddressCreate}
                        >
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
               

                 <div className="border rounded p-3 mt-4">
                <label className=" fw-bold mb-2">
                  Shipping Method
                </label>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="homeDelivery"
                    name="homeDelivery"
                      value="homeDelivery"
      checked={shipping === "homeDelivery"}
      onChange={handleShippingChange}
                  />
                  <label className="form-check-label" htmlFor="homeDelivery">
                    Home Delivery
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="lorryPay"
                    name="lorryPay"
                       value="lorryPay"
      checked={shipping === "lorryPay"}
      onChange={handleShippingChange}
                   
                  />
                  <label className="form-check-label" htmlFor="lorryPay">
                    To Pay - Lorry
                  </label>
                </div>
              </div>

               <div className="d-flex justify-content-end gap-3 w-100 mt-3">
              
        <button onClick={handleNext} className="btn btn-danger px-4" > Continue </button>
    </div>

    </div> 

   
     </div>
  )
}

export default Step2
