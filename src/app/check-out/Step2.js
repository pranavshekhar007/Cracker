
// "use client";
// import React, { useState, useContext, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { LoggedDataContext } from "../context/context";

// import { toast } from "react-toastify";
// import {
//   addressCreate,
//   addressList,
//   addressUpdate,
// } from "../services/address.service";
// import {
//   getCitiesServ,
//   getCityByStateServ,
//   getPincodeServ,
//   getStatesServ,
//   placeOrderServ,
// } from "../services/product.service";

// const Step2 = ({
//   next,
//   back,
//   addressForm,
//   setAddressForm,
//   orderPayload,
//   setOrderPayload,
//   cityPrice,
//   setCityPrice,
// }) => {
//   const { loggedUserData, cartList } = useContext(LoggedDataContext);
//   const [editAddress, setEditAddress] = useState(false);

//   const [shipping, setShipping] = useState("homeDelivery");

//   const handleShippingChange = (e) => {
//     setShipping(e.target.value);
//   };

//   const [addresses, setAddresses] = useState([]);
//   const fetchAddresses = async () => {
//     try {
//       const res = await addressList({ userId: loggedUserData?._id });
//       setAddresses(res?.data || []);
//       setAddressForm(res?.data[0]);
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//     }
//   };
//   useEffect(() => {
//     if (loggedUserData) {
//       fetchAddresses();
//     }
//   }, [loggedUserData]);

//   const [amountReached, setAmountReached] = useState(false);

//   useEffect(() => {
//     if (!loggedUserData || !cartList) return;

//     const subTotal = cartList.reduce((total, item) => {
//       const price = item?.discountedPrice ?? item?.pricing?.comboPrice;
//       return total + price * item.quantity;
//     }, 0);

//     const originalTotal = cartList.reduce((total, item) => {
//       const originalPrice = item?.pricing?.actualPrice || item?.price || 0;
//       return total + originalPrice * item.quantity;
//     }, 0);

//     const minCityPrice = cityPrice || 0;

//     setAmountReached(subTotal >= minCityPrice);

//     console.log("payload", orderPayload);
//     console.log("amount reached", amountReached);
//   }, [loggedUserData, cartList, addressForm, cityPrice, shipping]);

//   useEffect(() => {
//     if (!loggedUserData || !cartList || !cityPrice) return;

//     const subTotal = cartList.reduce((total, item) => {
//       const price = item?.discountedPrice ?? item?.pricing?.comboPrice;
//       return total + price * item.quantity;
//     }, 0);

//     const deliveryCharge = subTotal >= cityPrice ? 0 : 100;

//     setOrderPayload({
//       userId: loggedUserData._id,
//       product: cartList.map((item) => ({
//         productId: item._id,
//         quantity: item.quantity,
//         totalPrice:
//           (item.discountedPrice ?? item?.pricing?.comboPrice) * item.quantity,
//         productHeroImage: item.productHeroImage,
//       })),
//       totalAmount: subTotal,
//       address: addressForm,
//       deliveryCharge,
//       shipping,
//     });

//     setAmountReached(subTotal >= cityPrice);
//   }, [cityPrice]);

//   const handleAddressCreate = async (e) => {
//     e.preventDefault();

//     const isAddressDuplicate = addresses.some(
//       (addr) =>
//         addr.fullName === addressForm.fullName &&
//         addr.phone === addressForm.phone &&
//         addr.alternatePhone === addressForm.alternatePhone &&
//         addr.area === addressForm.area &&
//         addr.city === addressForm.city &&
//         addr.state === addressForm.state &&
//         addr.pincode === addressForm.pincode &&
//         addr.country === addressForm.country &&
//         addr.landmark === addressForm.landmark
//     );

//     if (isAddressDuplicate) {
//       toast.info("This address is already saved.");
//       return;
//     }

//     const payload = {
//       ...addressForm,
//       type: "home",
//       userId: loggedUserData?._id,
//     };

//     try {
//       if (payload._id) {
//         const res = await addressUpdate(payload);
//         if (res?.statusCode == "200") {
//           toast.success("Address updated successfully");
//         }
//       } else {
//         const res = await addressCreate(payload);
//         if (res?.statusCode == "200") {
//           toast.success("Address saved successfully");
//         }
//       }

//       fetchAddresses();
//     } catch (error) {
//       console.error("Address save/update error:", error);
//       toast.error(error?.response?.data?.message || "Address operation failed");
//     }
//   };

//   useEffect(() => {
//     getStates();
//     getPincodes();
//   }, []);

//   // states list api

//   const [stateList, setStateList] = useState([]);
//   // const [cityList, setCityList] = useState([]);
//   const [pincodes, setPincodes] = useState([]);

//   const getPincodes = async () => {
//     try {
//       const res = await getPincodeServ();
//       if (res.statusCode == "200") {
//         console.log(res.data);
//         setPincodes(res.data);
//       }
//     } catch (error) {
//       console.log("getting error in pincode list" + error);
//     }
//   };

//   const getStates = async () => {
//     try {
//       const res = await getStatesServ();
//       if (res.statusCode == "200") {
//         console.log(res.data);
//         setStateList(res.data);
//       }
//     } catch (error) {
//       console.log("getting error in state list" + error);
//     }
//   };

//   const [cities, setCities] = useState([]);
//   const [showAddress, setShowAddress] = useState(false);

//   const handleSelectAdress = (address) => {
//     // setSelectedAddress(address);
//     console.log("selected address is", address);
//     setAddressForm(address);
//   };

//   const handleNext = () => {
//     next();
//   };

//  useEffect(() => {
//   const fetchCities = async () => {
//     if (addressForm?.state && cities.length === 0) {
//       try {
//         const res = await getCityByStateServ(addressForm.state);
//         setCities(res.data.data);
//         console.log("Cities fetched");
//       } catch (err) {
//         toast.error("Failed to load cities for selected state");
//       }
//     } 
//   };

//   fetchCities();
// }, [addressForm?.state , addressForm]);


//   useEffect(() => {
//     if (addressForm?.city && cities.length > 0) {
//       const selected = cities.find(
//         (city) => city.name === addressForm.city
//       );
//       if (selected) {
//         setCityPrice(selected.minimumPrice);
//         console.log("selected city" , addressForm.city)
//       }
//     }
//   }, [addressForm?.city, cities]);

//   return (
//     <div
//       className=" p-sm-4 p-2 mb-4 bg-white container d-flex  flex-column justify-content-center align-items-center"
//       style={{ borderRadius: "13px", minHeight: "50vh" }}
//     >
//       <div
//         className="border rounded p-sm-3 p-2 mb-4 stepPage"
//         style={{ width: "80%" }}
//       >
//         <h3 className="my-3 text-center">Delivery Details </h3>
//         <div className="d-flex justify-content-between align-items-center mx-2 mb-2 steps">
//           <h6 className="mb-0 fw-bold">Delivery Address</h6>
//           {addresses?.length > 1 && (
//             <img
//               src="https://cdn-icons-png.flaticon.com/128/6364/6364586.png"
//               style={{
//                 height: "15px",
//                 opacity: "0.6",
//                 cursor: "pointer",
//               }}
//               onClick={() => setShowAddress(!showAddress)}
//             />
//           )}
//         </div>

//         {showAddress && (
//           <div className="all-addresses d-flex gap-2 flex-wrap">
//             {addresses.map((address) => {
//               return (
//                 <div className="address-card w-100 d-flex justify-content-between align-items-end">
//                   <div>
//                     <p className="address-name mb-0">{address.fullName}</p>
//                     <p className="address-phone mb-0">{address.phone}</p>
//                     {/* <p className="address mb-0">
//                                 {address.area}, {address.landmark},{" "}
//                                 {address.city}, {address.state}
//                               </p> */}
//                     <p className="address mb-0">
//                       {address.area}, {address.landmark},{" "}
//                       {cities.find((c) => c._id === address.city)?.name ||
//                         address.city}
//                       ,{" "}
//                       {stateList.find((s) => s._id === address.state)?.name ||
//                         address.state}
//                     </p>

//                     <p className="pincode mb-0">{address.pincode}</p>
//                   </div>
//                   <div className="address-btns d-flex gap-2 mt-3 ">
//                     {address?._id == addressForm?._id ? (
//                       <button
//                         className="text-danger"
//                         style={{
//                           // height: "40px",
//                           backgroundColor: "rgb(253 231 233)",
//                           border: "1px solid rgb(247 213 216)",
//                         }}
//                         onClick={() => handleSelectAdress(address)}
//                       >
//                         Selected
//                       </button>
//                     ) : (
//                       <button
//                         style={{
//                           // height: "40px",
//                           backgroundColor: "#dc3545",
//                         }}
//                         onClick={() => handleSelectAdress(address)}
//                       >
//                         Use Address
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         <div className="row m-0 p-0">
//           <div className="col-md-12 col-12 p-0 px-md-2 my-2">
//             <label className="steps-label">Name</label>
//             <input
//               className="form-control"
//               placeholder="Enter Full Name"
//               value={addressForm?.fullName}
//               readOnly={!editAddress}
//               onChange={(e) =>
//                 setAddressForm({
//                   ...addressForm,
//                   fullName: e?.target.value,
//                 })
//               }
//               style={{
//                 height: "45px",
//                 background: editAddress ? "white" : "whitesmoke",
//               }}
//             />
//           </div>
//           <div className="col-md-6 col-12 p-0 px-md-2 my-2">
//             <label className="steps-label">Phone</label>
//             <input
//               className="form-control "
//               placeholder="Enter Phone"
//               value={addressForm?.phone}
//               readOnly={!editAddress}
//               onChange={(e) =>
//                 setAddressForm({
//                   ...addressForm,
//                   phone: e?.target.value,
//                 })
//               }
//               style={{
//                 height: "45px",
//                 background: editAddress ? "white" : "whitesmoke",
//               }}
//             />
//           </div>

//           <div className="col-md-6 col-12 p-0 px-md-2 my-2">
//             <label className="steps-label">Alternate Phone</label>
//             <input
//               className="form-control "
//               placeholder="Enter Alternative Phone"
//               value={addressForm?.alternatePhone}
//               readOnly={!editAddress}
//               onChange={(e) =>
//                 setAddressForm({
//                   ...addressForm,
//                   alternatePhone: e?.target.value,
//                 })
//               }
//               style={{
//                 height: "45px",
//                 background: editAddress ? "white" : "whitesmoke",
//               }}
//             />
//           </div>
//         </div>
//         <div className="row m-0 p-0">
//           <div className="col-md-12 col-12 p-0 px-md-2 my-2">
//             <label className="steps-label">Area</label>
//             <textarea
//               className="form-control "
//               placeholder="Area"
//               value={addressForm?.area}
//               readOnly={!editAddress}
//               onChange={(e) =>
//                 setAddressForm({
//                   ...addressForm,
//                   area: e?.target.value,
//                 })
//               }
//               style={{
//                 height: "45px",
//                 background: editAddress ? "white" : "whitesmoke",
//               }}
//             />
//           </div>

//           <div className="col-md-6 col-12 p-0 px-md-2 my-2">
//             <label className="steps-label">Landmark</label>
//             <input
//               className="form-control "
//               placeholder="Landmark"
//               value={addressForm?.landmark}
//               readOnly={!editAddress}
//               onChange={(e) =>
//                 setAddressForm({
//                   ...addressForm,
//                   landmark: e?.target.value,
//                 })
//               }
//               style={{
//                 height: "45px",
//                 background: editAddress ? "white" : "whitesmoke",
//               }}
//             />
//           </div>
//           <div className="col-md-6 col-12 p-0 px-md-2 my-2">
//             <label className="steps-label">Pincode</label>
//             <select
//               className="form-control "
//               placeholder="Pincode"
//               value={addressForm?.pincode}
//               disabled={!editAddress}
//               onChange={(e) =>
//                 setAddressForm({
//                   ...addressForm,
//                   pincode: e?.target.value,
//                 })
//               }
//               style={{
//                 height: "45px",
//                 background: editAddress ? "white" : "whitesmoke",
//               }}
//             >
//               <option value="">Select Pincode</option>
//               {pincodes.map((code, index) => (
//                 <option key={index} value={code?.pincode}>
//                   {code?.pincode}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-4 col-12 p-0 px-md-2 my-2">
//             <label className="steps-label">State</label>
//             <select
//               className="form-control"
//               placeholder="State"
//               value={addressForm?.state}
//               disabled={!editAddress}
//               onChange={async (e) => {
//                 const stateId = e.target.value;
//                 setAddressForm({
//                   ...addressForm,
//                   state: stateId,
//                   city: "", // reset city when state changes
//                 });

//                 if (stateId) {
//                   try {
//                     const res = await getCityByStateServ(stateId);
//                     setCities(res.data.data);
//                   } catch (err) {
//                     toast.error("Failed to load cities for selected state");
//                   }
//                 } else {
//                   setCities([]);
//                 }
//               }}
//             >
//               <option value="">Select State</option>
//               {stateList.map((state) => (
//                 <option key={state?._id} value={state?._id}>
//                   {state.name}
//                 </option>
//               ))}
//                      
//             </select>
//           </div>

//           <div className="col-md-4 col-12 p-0 px-md-2 my-2">
//             <label className="steps-label">City</label>
//             <select
//               className="form-control"
//               value={addressForm.city}
//               disabled={!editAddress}
//               onChange={(e) =>
//                 setAddressForm({
//                   ...addressForm,
//                   city: e.target.value,
//                 })
//               }
//             >
//               <option value="">Select City</option>
//               {cities.map((city) => (
//                 <option key={city._id} value={city.name}>
//                   {city.name}
//                 </option>
//               ))}
//                     
//             </select>
//           </div>

//           <div className="col-md-4 col-12 p-0 px-md-2 my-2">
//             <label className="steps-label">Country</label>
//             <input
//               className="form-control"
//               placeholder="Country"
//               value={addressForm?.country}
//               readOnly={!editAddress}
//               onChange={(e) =>
//                 setAddressForm({
//                   ...addressForm,
//                   country: e?.target.value,
//                 })
//               }
//               style={{
//                 height: "45px",
//                 background: editAddress ? "white" : "whitesmoke",
//               }}
//             />
//           </div>
//         </div>
//         <div className="d-flex flex-column flex-sm-row">
//           <div className="mx-1">
//             {!editAddress && (
//               <button
//                 onClick={() => setEditAddress(true)}
//                 className="btn btn-secondary w-100  mt-2"
//               >
//                 Edit Address
//               </button>
//             )}
//           </div>
//           <div className="mx-1">
//             {addressForm?.fullName &&
//             addressForm?.phone &&
//             addressForm?.area &&
//             addressForm?.pincode &&
//             addressForm?.landmark ? (
//               <button
//                 className="btn btn-danger w-100  mt-2"
//                 onClick={handleAddressCreate}
//               >
//                 Save as delivery address
//               </button>
//             ) : (
//               <button
//                 className="btn btn-danger w-100  mt-2"
//                 style={{ opacity: "0.5" }}
//               >
//                 Save as delivery address
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="border rounded p-3 mt-4">
//           <label className=" fw-bold mb-2">Shipping Method</label>
//           <div className="form-check mb-2">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="homeDelivery"
//               name="homeDelivery"
//               value="homeDelivery"
//               checked={shipping === "homeDelivery"}
//               onChange={handleShippingChange}
//             />
//             <label className="form-check-label" htmlFor="homeDelivery">
//               Home Delivery
//             </label>
//           </div>

//           <div className="form-check">
//             <input
//               className="form-check-input"
//               type="checkbox"
//               id="lorryPay"
//               name="lorryPay"
//               value="lorryPay"
//               checked={shipping === "lorryPay"}
//               onChange={handleShippingChange}
//             />
//             <label className="form-check-label" htmlFor="lorryPay">
//               To Pay - Lorry
//             </label>
//           </div>
//         </div>

//         <div className="d-flex justify-content-end gap-3 w-100 mt-3">
//           <button onClick={handleNext} className="btn btn-danger px-4">
//             {" "}
//             Continue{" "}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step2;



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
  getAreaServ,
  getCityByStateServ,
  getPincodeByCityServ,
  getStatesServ,

} from "../services/product.service";

const Step2 = ({
  next,
  back,
  addressForm,
  setAddressForm,
  orderPayload,
  setOrderPayload,
  cityPrice,
  setCityPrice,
  deliveryCharge,
  setDeliveryCharge
}) => {
  const { loggedUserData, cartList } = useContext(LoggedDataContext);
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
      const originalPrice = item?.pricing?.actualPrice || item?.price || 0;
      return total + originalPrice * item.quantity;
    }, 0);

    const minCityPrice = cityPrice || 0;

    setAmountReached(subTotal >= minCityPrice);

    console.log("payload", orderPayload);
    console.log("amount reached", amountReached);
  }, [loggedUserData, cartList, addressForm, cityPrice, shipping]);

  useEffect(() => {
    if (!loggedUserData || !cartList || !cityPrice) return;

    const subTotal = cartList.reduce((total, item) => {
      const price = item?.discountedPrice ?? item?.pricing?.comboPrice;
      return total + price * item.quantity;
    }, 0);

    

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
    getStates();
    getPincodes();
  }, []);

  // states list api

  const [stateList, setStateList] = useState([]);
  // const [cityList, setCityList] = useState([]);
  const [pincodes, setPincodes] = useState([]);

  const getPincodes = async () => {
    try {
      const res = await getPincodeServ();
      if (res.statusCode == "200") {
        console.log(res.data);
        setPincodes(res.data);
      }
    } catch (error) {
      console.log("getting error in pincode list" + error);
    }
  };

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

  const[minimumPrice , setSelectedCityMinimumPrice] = useState(null)
  const [cities, setCities] = useState([]);
  const [showAddress, setShowAddress] = useState(false);

  const handleSelectAdress = (address) => {
    // setSelectedAddress(address);
    console.log("selected address is", address);
    setAddressForm(address);
  };

  const handleNext = () => {
    next();
  };

  const handleGetCityByState = async (stateId) => {
    if (!stateId) return setCities([]);
    try {
      const res = await getCityByStateServ(stateId);
      setCities(res.data.data);
    } catch (error) {
      toast.error("Failed to load cities for selected state");
    }
  };

  const handleGetPincodeByCity = async (cityId) => {
    if (!cityId) return setPincodes([]);
    try {
      const res = await getPincodeByCityServ(cityId);
      setPincodes(res.data.data);
    } catch (error) {
      toast.error("Failed to load pincodes for selected city");
    }
  };


  // useEffect(() => {
  //    setCityPrice(minimumPrice);
  // },[minimumPrice])

  // area api

  const [areaPayload, setAreaPayload] = useState({
    searchKey: "",
    stateId: addressForm?.stateId,
    pageNo: 1,
    pageCount: 10,
  });



const[list , setList] = useState([])

  const handleGetArea = async () => {
     
    try {
      const res = await getAreaServ(areaPayload);
      setList(res.data.data);
      // setStatics(res.data.documentCount);
    } catch (error) {
      toast.error("Failed to load Area");
    }
    
  };

useEffect(() => {
  if (addressForm?.stateId) {
    setAreaPayload((prev) => ({
      ...prev,
      stateId: addressForm.stateId,
    }));
  }
}, [addressForm?.stateId]);

useEffect(() => {
  if (areaPayload.stateId) {
    handleGetArea();
  }
}, [areaPayload]);



  return (
    <div
      className=" p-sm-4 p-2 mb-4 bg-white container d-flex  flex-column justify-content-center align-items-center"
      style={{ borderRadius: "13px", minHeight: "50vh" }}
    >
      <div
        className="border rounded p-sm-3 p-2 mb-4 stepPage"
        style={{ width: "80%" }}
      >
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
                    <p className="address-name mb-0">{address.fullName}</p>
                    <p className="address-phone mb-0">{address.phone}</p>
                    {/* <p className="address mb-0">
                                {address.area}, {address.landmark},{" "}
                                {address.city}, {address.state}
                              </p> */}
                    <p className="address mb-0">
                      {address.area}, {address.landmark},{" "}
                      {cities.find((c) => c._id === address.city)?.name ||
                        address.city}
                      ,{" "}
                      {stateList.find((s) => s._id === address.state)?.name ||
                        address.state}
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
          <div className="col-md-6 col-12 p-0 px-md-2 my-2">
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
            <label className="steps-label">Email</label>
            <input
              className="form-control"
              placeholder="Enter email"
              value={addressForm?.email}
              readOnly={!editAddress}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  email: e?.target.value,
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

            {/* country */}
          <div className="col-md-12 col-12 p-0 px-md-2 my-2">
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

           {/* state */}
          <div className="col-md-4 col-12 p-0 px-md-2 my-2">

            <label className="steps-label">State</label>
                    <select
                      className="form-control"
              placeholder="State"
              value={addressForm?.stateId}
              disabled={!editAddress}
                      onChange={async (e) => {
                        const stateId = e.target.value;
                        setAddressForm({
                          ...addressForm,
                          stateId: stateId,
                          cityId: "",
                          pincodeId: "",
                        });
                        await handleGetCityByState(stateId);
                        setPincodes([]);
                      }}
                    >
                      <option value="">Select State</option>
                      {stateList.map((state) => (
                        <option key={state.stateId} value={state.stateId}>
                          {state.name}
                        </option>
                      ))}
                    </select>
          </div>

            {/* city */}
          <div className="col-md-4 col-12 p-0 px-md-2 my-2">

               <label  className="steps-label">City</label>
                    <select
                      className="form-control"
                      value={addressForm?.cityId}
                      disabled={!editAddress}
                      onChange={async (e) => {
                        const cityId = e.target.value;

                        // Find selected city from state
                        const selectedCity = cities.find(
                          (city) => city.cityId === parseInt(cityId)
                        );

                        setAddressForm({
                          ...addressForm,
                          cityId: cityId,
                          minimumPrice: selectedCity
                            ? selectedCity.minimumPrice
                            : "",
                          pincodeId: "",
                        });

                        // setSelectedCityMinimumPrice(
                        //   selectedCity ? selectedCity.minimumPrice : ""
                        // );
                          //  console.log("sleceted city" , minimumPrice)
                       

                        await handleGetPincodeByCity(cityId);
                      }}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.cityId} value={city.cityId}>
                          {city.name}
                        </option>
                      ))}
                    </select>
          </div>

           {/* pincode */}
          <div className="col-md-4 col-12 p-0 px-md-2 my-2">
            <label className="steps-label">Pincode</label>
            <select
              className="form-control "
              placeholder="Pincode"
              value={addressForm?.pincodeId}
              disabled={!editAddress}
              onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  pincodeId: e?.target.value,
                })
              }
              style={{
                height: "45px",
                background: editAddress ? "white" : "whitesmoke",
              }}
            >
              <option value="">Select Pincode</option>
              {pincodes.map((code, index) => (
                <option key={index} value={code?.pincode}>
                  {code?.pincode}
                </option>
              ))}
            </select>
          </div>
            

          {/* area */}
          <div className="col-md-6 col-12 p-0 px-md-2 my-2">
            <label className="steps-label">Area</label>
            <select
              className="form-control "
              placeholder="area"
              value={addressForm?.areaId}
              disabled={!editAddress}
               onChange={(e) => {
    const selectedArea = list.find((item) => item.name === e.target.value);
    setAddressForm({
      ...addressForm,
      areaId: e.target.value,
    });
   
      console.log("slected area" , selectedArea)
      setDeliveryCharge(selectedArea.deliveryCharge); 
      setCityPrice(selectedArea.minimumPrice)
   
  }}
              style={{
                height: "45px",
                background: editAddress ? "white" : "whitesmoke",
              }}
            >
              <option value="">Select Area</option>
              {list.map((item, index) => (
                <option key={index} value={item?.areaId}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>

           {/* landmark */}
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
         addressForm?.areaId &&
         addressForm?.pincodeId &&
         addressForm?.landmark &&
         addressForm?.cityId &&
         addressForm?.email &&
        addressForm?.stateId ? (
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
          <label className=" fw-bold mb-2">Shipping Method</label>
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
          {
           addressForm?.fullName &&
         addressForm?.phone &&
         addressForm?.areaId &&
         addressForm?.pincodeId &&
         addressForm?.landmark &&
         addressForm?.cityId &&
         addressForm?.email &&
        addressForm?.stateId ?(
             <button onClick={handleNext} className="btn btn-danger px-4">
            {" "}
            Continue{" "}
          </button>
        ):(
            <button  className="btn btn-danger px-4 " disabled style={{cursor:"not-allowed"}}>
            {" "}
            Continue{" "}
          </button>
        )
        }
          
        </div>
      </div>
    </div>
  );
};

export default Step2;

