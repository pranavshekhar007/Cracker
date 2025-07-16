// "use client";
// import React, { useState, useContext, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { LoggedDataContext } from "../context/context";
// import Navbar from "../Components/Navbar";
// import AccountDetails from "../Components/AccountDetails";
// import {
//   addressCreate,
//   addressList,
//   addressDelete,
//   addressUpdate,
// } from "../services/address.service";
// import { toast } from "react-toastify";
// import Footer from "../Components/Footer";
// import {
//   getAreaServ,
//   getCityByStateServ,
//   getPincodeByCityServ,
//   getStatesServ,
// } from "../services/product.service";

// const Page = () => {
//   const { loggedUserData } = useContext(LoggedDataContext);
//   const router = useRouter();

//   const [form, setForm] = useState({
//     phone: "",
//     alternatePhone: "",
//     landmark: "",
//     area: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//     fullName: "",
//     type: "",
//     userId: "",
//   });

//   const [showForm, setShowForm] = useState(false);
//   const [addresses, setAddresses] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({});

//   useEffect(() => {
//     if (loggedUserData?._id) {
//       setForm((prevForm) => ({
//         ...prevForm,
//         userId: loggedUserData._id,
//       }));
//     }
//   }, [loggedUserData]);

//   useEffect(() => {
//     if (!loggedUserData) {
//       const timer = setTimeout(() => {
//         router.push("/login");
//       }, 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [loggedUserData, router]);

//   useEffect(() => {
//     if (loggedUserData?._id) {
//       fetchAddresses();
//     }
//   }, [loggedUserData]);

//   const fetchAddresses = async () => {
//     try {
//       const res = await addressList({ userId: loggedUserData?._id });
//       if (res?.statusCode == 200) {
//         setAddresses(res?.data || []);
//       }
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("address create data", form);
//       const res = await addressCreate(form);
//       setShowForm(false);
//       setForm({
//         phone: "",
//         alternatePhone: "",
//         landmark: "",
//         area: "",
//         city: "",
//         state: "",
//         pincode: "",
//         country: "",
//         fullName: "",
//         type: "",
//         email: "",
//         userId: loggedUserData?._id,
//       });
//       await fetchAddresses();
//       toast.success(res.message);
//     } catch (error) {
//       console.error("Error creating address:", error);
//       toast.error(error.response?.data?.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await addressDelete(id);
//       await fetchAddresses();
//       toast.success(res.message);
//     } catch (error) {
//       console.error("Error deleting address:", error);
//       toast.error(error.response?.data?.message);
//     }
//   };

//   const handleEdit = (address) => {
//     setEditingId(address._id);
//     setEditForm({ ...address });
//   };

//   const handleEditChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       const { _id, createdAt, updatedAt, __v, ...sanitizedData } = editForm;
//       const payload = { ...sanitizedData, _id };
//       const res = await addressUpdate(payload);
//       toast.success(res.message);
//       setEditingId(null);
//       setEditForm({});
//       await fetchAddresses();
//     } catch (error) {
//       console.error("Error updating address:", error);
//       toast.error(error.response?.data?.message);
//     }
//   };

//   const [stateList, setStateList] = useState([]);

//   const [pincodes, setPincodes] = useState([]);

//   const [cities, setCities] = useState([]);

//   useEffect(() => {
//     getStates();
//   }, []);

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

//   const handleGetCityByState = async (stateId) => {
//     if (!stateId) return setCities([]);
//     try {
//       const res = await getCityByStateServ(stateId);
//       setCities(res.data.data);
//     } catch (error) {
//       toast.error("Failed to load cities for selected state");
//     }
//   };

//   const handleGetPincodeByCity = async (cityId) => {
//     if (!cityId) return setPincodes([]);
//     try {
//       const res = await getPincodeByCityServ(cityId);
//       setPincodes(res.data.data);
//     } catch (error) {
//       toast.error("Failed to load pincodes for selected city");
//     }
//   };

//   const [areaPayload, setAreaPayload] = useState({
//     searchKey: "",
//     stateId: form?.stateId,
//     pageNo: 1,
//     pageCount: 10,
//   });

//   const [list, setList] = useState([]);

//   const handleGetArea = async () => {
//     try {
//       const res = await getAreaServ(areaPayload);
//       setList(res.data.data);
//       // setStatics(res.data.documentCount);
//     } catch (error) {
//       toast.error("Failed to load Area");
//     }
//   };

//   useEffect(() => {
//     if (form?.stateId) {
//       setAreaPayload((prev) => ({
//         ...prev,
//         stateId: form.stateId,
//       }));
//     }
//   }, [form?.stateId]);

//   useEffect(() => {
//     if (areaPayload.stateId) {
//       handleGetArea();
//     }
//   }, [areaPayload]);

//   if (!loggedUserData) {
//     return (
//       <div className="loading-div">
//         <p>Loading user data...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="user-profile">
//         {/* <h2>My Account</h2> */}
//         <div className="profile-section d-flex gap-3">
//           <AccountDetails />

//           <div className="profile-right mt-lg-5 pt-lg-4">
//             <div className="my-address">
//               <h3>My Address</h3>
//               <div className="all-address d-flex gap-2 flex-wrap">
//                 {addresses.map((address) => (
//                   <div key={address._id} className="address-card">
//                     {editingId === address._id ? (
//                       <>
//                         <input
//                           name="fullName"
//                           value={editForm.fullName}
//                           onChange={handleEditChange}
//                         />
//                         <input
//                           name="phone"
//                           value={editForm.phone}
//                           onChange={handleEditChange}
//                         />
//                         <input
//                           name="alternatePhone"
//                           value={editForm.alternatePhone}
//                           onChange={handleEditChange}
//                         />
//                         <input
//                           name="landmark"
//                           value={editForm.landmark}
//                           onChange={handleEditChange}
//                         />
//                         <input
//                           name="area"
//                           value={editForm.area?._id}
//                           onChange={handleEditChange}
//                         />
//                         <input
//                           name="city"
//                           value={editForm.city}
//                           onChange={handleEditChange}
//                         />
//                         <input
//                           name="state"
//                           value={editForm.state}
//                           onChange={handleEditChange}
//                         />
//                         <input
//                           name="pincode"
//                           value={editForm.pincode}
//                           onChange={handleEditChange}
//                         />
//                         <input
//                           name="country"
//                           value={editForm.country}
//                           onChange={handleEditChange}
//                         />
//                         <select
//                           name="type"
//                           value={editForm.type}
//                           onChange={handleEditChange}
//                         >
//                           <option value="">Select Address Type</option>
//                           <option value="Home">Home</option>
//                           <option value="Work">Work</option>
//                           <option value="Other">Other</option>
//                         </select>
//                         <div className="address-btns d-flex gap-2 mt-3">
//                           <button onClick={handleUpdate}>Save</button>
//                           <button onClick={() => setEditingId(null)}>
//                             Cancel
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <p className="address-name mb-0">{address.fullName}</p>
//                         <p className="address-phone mb-0">{address.phone}</p>
//                         <p className="address mb-0">
//                           {address.area?.name}, {address.landmark},{" "}
//                           {address.city}, {address.state}
//                         </p>
//                         <p className="pincode mb-0">{address.pincode}</p>
//                         <div className="address-btns d-flex gap-2 mt-3">
//                           <button onClick={() => handleEdit(address)}>
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(address._id)}
//                             className="remove-btn"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {showForm && (
//                 <div className="address-form">
//                   <div className="d-flex justify-content-between align-items-center mb-4">
//                     <h3 className="mb-0 ">Add new address</h3>
//                     <img
//                       src="https://cdn-icons-png.flaticon.com/128/1828/1828778.png"
//                       onClick={() => setShowForm(!showForm)}
//                       style={{ width: "18px", height: "18px" }}
//                       className="mt-3 me-0 me-sm-5"
//                     ></img>
//                   </div>
//                   <form onSubmit={handleSubmit}>
//                     <div className="d-flex gap-3">
//                       <input
//                         name="fullName"
//                         placeholder="Full Name"
//                         value={form.fullName}
//                         onChange={handleChange}
//                       />
//                       <input
//                         name="phone"
//                         placeholder="Phone"
//                         value={form.phone}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="d-flex gap-3">
//                       <input
//                         name="alternatePhone"
//                         placeholder="Alternate Phone"
//                         value={form.alternatePhone}
//                         onChange={handleChange}
//                       />
//                       <input
//                         name="email"
//                         placeholder="Email"
//                         value={form.email}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="d-flex gap-3">
//                       <select
//                         className="form-control"
//                         value={form?.stateId || ""}
//                         onChange={async (e) => {
//                           const selectedStateId = e.target.value;
//                           const selectedState = stateList.find(
//                             (state) =>
//                               state.stateId.toString() === selectedStateId
//                           );

//                           if (selectedState) {
//                             setForm({
//                               ...form,
//                               state: selectedState.name,
//                               stateId: selectedState.stateId,
//                               city: "",
//                               pincode: "",
//                               area: "",
//                             });

//                             await handleGetCityByState(selectedState.stateId);
//                             setPincodes([]);
//                           }
//                         }}
//                       >
//                         {form?.state ? (
//                           <option value="">{form?.state}</option>
//                         ) : (
//                           <option value="">Select State</option>
//                         )}
//                         {stateList.map((state) => (
//                           <option key={state.stateId} value={state.stateId}>
//                             {state.name}
//                           </option>
//                         ))}
//                       </select>

//                       {/* city */}
//                       <select
//                         className="form-control"
//                         value={form?.cityId}
//                         onChange={async (e) => {
//                           const cityId = e.target.value;

//                           // Find selected city from state
//                           const selectedCity = cities.find(
//                             (city) => city.cityId === parseInt(cityId)
//                           );

//                           setForm({
//                             ...form,
//                             city: selectedCity.name,
//                             cityId: selectedCity.cityId,
//                             minimumPrice: selectedCity
//                               ? selectedCity.minimumPrice
//                               : "",
//                             pincode: "",
//                           });

//                           // setSelectedCityMinimumPrice(
//                           //   selectedCity ? selectedCity.minimumPrice : ""
//                           // );
//                           //  console.log("sleceted city" , minimumPrice)

//                           await handleGetPincodeByCity(cityId);
//                         }}
//                       >
//                         {form?.city ? (
//                           <option value="">{form?.city}</option>
//                         ) : (
//                           <option value="">Select City</option>
//                         )}
//                         {cities.map((city) => (
//                           <option key={city.cityId} value={city.cityId}>
//                             {city.name}
//                           </option>
//                         ))}
//
//                       </select>
//                     </div>
//                     <div className="d-flex gap-3">
//                       {/* pincode */}

//                       <select
//                         className="form-control "
//                         placeholder="Pincode"
//                         value={form?.pincode}
//                         onChange={(e) =>
//                           setForm({
//                             ...form,
//                             pincode: e?.target.value,
//                           })
//                         }
//                       >
//                         {form?.pincode ? (
//                           <option value="">{form?.pincode}</option>
//                         ) : (
//                           <option value="">Select Pincode</option>
//                         )}
//                         {pincodes.map((code, index) => (
//                           <option key={index} value={code?.pincode}>
//                             {code?.pincode}
//                           </option>
//                         ))}
//                       </select>

//                       {/* area */}
//                       <select
//                         className="form-control "
//                         placeholder="area"
//                         value={form?.area || ""}
//                         onChange={(e) => {
//                           const selectedAreaId = parseInt(e.target.value);
//                           const selectedArea = list.find(
//                             (item) => item.areaId === selectedAreaId
//                           );

//                           if (selectedArea) {
//                             setForm({
//                               ...form,
//                               area: selectedArea.areaId, // ✅ store as number (areaId)
//                             });

//                             console.log("selected area", selectedArea);
//                             setDeliveryCharge(selectedArea.deliveryCharge);
//                             setCityPrice(selectedArea.minimumPrice);
//                           }
//                         }}
//                       >
//                         {form?.area ? (
//                           <option value="">{form?.area}</option>
//                         ) : (
//                           <option value="">Select Area</option>
//                         )}
//                         {list.map((item, index) => (
//                           <option key={index} value={item?.areaId}>
//                             {item?.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="d-flex gap-3">
//                       <input
//                         name="landmark"
//                         placeholder="Landmark"
//                         value={form.landmark}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="d-flex gap-3">
//                       <select
//                         name="type"
//                         value={form.type}
//                         onChange={handleChange}
//                       >
//                         <option value="">Select Address Type</option>
//                         <option value="Home">Home</option>
//                         <option value="Work">Work</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                     <div>
//                       <input
//                         name="country"
//                         placeholder="Country"
//                         value={form.country}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <button type="submit">Save</button>
//                   </form>
//                 </div>
//               )}

//               <div
//                 className="add-address"
//                 onClick={() => setShowForm(!showForm)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <div className="d-flex gap-2">
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/128/10308/10308038.png"
//                     alt="Add"
//                   />
//                   <p className="mb-0">Add new address</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Page;

"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoggedDataContext } from "../context/context";
import Navbar from "../Components/Navbar";
import AccountDetails from "../Components/AccountDetails";
import {
  addressCreate,
  addressList,
  addressDelete,
  addressUpdate,
} from "../services/address.service";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import { getCityByStateServ, getStatesServ } from "../services/product.service";

const Page = () => {
  const { loggedUserData } = useContext(LoggedDataContext);
  const router = useRouter();

  const [form, setForm] = useState({
    phone: "",
    alternatePhone: "",
    landmark: "",
    area: "",
    areaId: "",
    city: "",
    cityId: "",
    state: "",
    stateId: "",
    pincode: "",
    pincodeId: "",
    country: "India",
    fullName: "",
    type: "",
    userId: loggedUserData?._id,
  });

  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (loggedUserData?._id) {
      setForm((prevForm) => ({
        ...prevForm,
        userId: loggedUserData._id,
      }));
    }
  }, [loggedUserData]);

  useEffect(() => {
    if (!loggedUserData) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loggedUserData, router]);

  useEffect(() => {
    if (loggedUserData?._id) {
      fetchAddresses();
    }
  }, [loggedUserData]);

  const fetchAddresses = async () => {
    try {
      const res = await addressList({ userId: loggedUserData?._id });
      if (res?.statusCode == 200) {
        setAddresses(res?.data || []);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode == true) {
      handleUpdate();
    } else {
      try {
        console.log("address create data", form);
        const res = await addressCreate(form);
        setShowForm(false);
        setForm({
          phone: "",
          alternatePhone: "",
          landmark: "",
          area: "",
          areaId: "",
          city: "",
          cityId: "",
          state: "",
          stateId: "",
          pincode: "",
          pincodeId: "",
          country: "India",
          fullName: "",
          type: "",
          email: "",
          userId: loggedUserData?._id,
        });
        await fetchAddresses();
        toast.success(res.message);
      } catch (error) {
        console.error("Error creating address:", error);
        toast.error(error.response?.data?.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await addressDelete(id);
      await fetchAddresses();
      toast.success(res.message);
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error(error.response?.data?.message);
    }
  };

  const handleEdit = (address) => {
    setForm({
      fullName: address.fullName,
      phone: address.phone,
      alternatePhone: address.alternatePhone,
      email: address.email,
      landmark: address.landmark,
      area: address.areaId || address.area?._id || address.area,
      state: address.state,
      stateId: address.stateId,
      city: address.city,
      cityId: address.cityId,
      pincode: address.pincode,
      country: address.country,
      type: address.type,
    });

    setEditingId(address._id);
    setIsEditMode(true);
    setEditForm({ ...address });
    setShowForm(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const { _id, createdAt, updatedAt, __v, ...sanitizedData } = form;
      const payload = { ...sanitizedData, _id: editingId };
      const res = await addressUpdate(payload);
      toast.success(res.message);
      setEditingId(null);
      setForm({
        phone: "",
        alternatePhone: "",
        landmark: "",
        area: "",
        areaId: "",
        city: "",
        cityId: "",
        state: "",
        stateId: "",
        pincode: "",
        pincodeId: "",
        minimumPrice: "",
        deliveryCharge: "",
        country: "India",
        fullName: "",
        type: "",
        email: "",
        userId: loggedUserData?._id,
      });
      await fetchAddresses();
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error(error.response?.data?.message);
    }
    setIsEditMode(false);
    setShowForm(false);
  };

  const [stateList, setStateList] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getStates();
  }, []);

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

  const handleGetCityByState = async (stateId) => {
    if (!stateId) return setCities([]);
    try {
      const res = await getCityByStateServ(stateId);
      setCities(res.data.data);
    } catch (error) {
      toast.error("Failed to load cities for selected state");
    }
  };

  if (!loggedUserData) {
    return (
      <div className="loading-div">
        <p>Loading user data...</p>
      </div>
    );
  }

  const handleShowForm = () => {
    setShowForm(!showForm);
    setForm({
      phone: "",
      alternatePhone: "",
      landmark: "",
      area: "",
      city: "",
      cityId: "",
      state: "",
      stateId: "",
      pincode: "",
      country: "India",
      fullName: "",
      type: "",
      email: "",
      userId: loggedUserData?._id,
    });
  };

  return (
    <>
      <Navbar />
      <div className="user-profile">
        {/* <h2>My Account</h2> */}
        <div className="profile-section d-flex gap-3">
          <AccountDetails />

          <div className="profile-right mt-lg-5 pt-lg-4">
            <div className="my-address">
              <h3>My Address</h3>
              <div className="all-address d-flex gap-2 flex-wrap">
                {addresses.map((address) => (
                  <div key={address._id} className="address-card">
                    <p className="address-name mb-0">{address.fullName}</p>
                    <p className="address-phone mb-0">{address.phone}</p>
                    <p className="address mb-0">
                      {address.area}, {address.landmark}, {address.city},{" "}
                      {address.state}
                    </p>
                    <p className="pincode mb-0">{address.pincode}</p>
                    <div className="address-btns d-flex gap-2 mt-3">
                      <button onClick={() => handleEdit(address)}>Edit</button>
                      <button
                        onClick={() => handleDelete(address._id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {showForm && (
                <div className="address-form">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="mb-0 ">
                      {" "}
                      {isEditMode ? "Update address" : "Add new address"}
                    </h3>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1828/1828778.png"
                      onClick={() => (
                        setShowForm(!showForm), setIsEditMode(false)
                      )}
                      style={{ width: "18px", height: "18px" }}
                      className="mt-3 me-0 me-sm-5"
                    ></img>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex gap-3">
                      <input
                        name="fullName"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                      />
                      <input
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="d-flex gap-3">
                      <input
                        name="alternatePhone"
                        placeholder="Alternate Phone"
                        value={form.alternatePhone}
                        onChange={handleChange}
                      />
                      {/* area */}
                      <input
                        name="area"
                        placeholder="Area"
                        value={form.area}
                        onChange={handleChange}
                        required
                      />
                      <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex gap-3">
                      <select
                        className="form-control"
                        value={form?.stateId || ""}
                        required
                        onChange={async (e) => {
                          const selectedStateId = e.target.value;
                          const selectedState = stateList.find(
                            (state) =>
                              state.stateId.toString() === selectedStateId
                          );

                          if (selectedState) {
                            setForm({
                              ...form,
                              state: selectedState.name,
                              stateId: selectedState.stateId,
                              city: "",
                            });

                            await handleGetCityByState(selectedState.stateId);
                          }
                        }}
                      >
                        {form?.state ? (
                          <option value="">{form?.state}</option>
                        ) : (
                          <option value="">Select State</option>
                        )}
                        {stateList.map((state) => (
                          <option key={state.stateId} value={state.stateId}>
                            {state.name}
                          </option>
                        ))}
                      </select>

                      {/* city */}
                      <select
                        className="form-control"
                        value={form?.cityId}
                        required
                        onChange={async (e) => {
                          const cityId = e.target.value;

                          // Find selected city from state
                          const selectedCity = cities.find(
                            (city) => city.cityId === parseInt(cityId)
                          );

                          setForm({
                            ...form,
                            city: selectedCity.name,
                            cityId: selectedCity.cityId,
                            minimumPrice: selectedCity
                              ? selectedCity.minimumPrice
                              : "",
                            deliveryCharge: selectedCity
                              ? selectedCity.deliveryCharge
                              : "",
                          });
                        }}
                      >
                        {form?.city ? (
                          <option value="">{form?.city}</option>
                        ) : (
                          <option value="">Select City</option>
                        )}
                        {cities.map((city) => (
                          <option key={city.cityId} value={city.cityId}>
                            {city.name}
                          </option>
                        ))}
                               
                      </select>
                    </div>
                    <div className="d-flex gap-3">
                      {/* pincode */}
                      <input
                        name="pincode"
                        placeholder="Pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="d-flex gap-3">
                      <input
                        name="landmark"
                        placeholder="Landmark"
                        value={form.landmark}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex gap-3">
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                      >
                        <option value="">Select Address Type</option>
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <input name="country" value={form.country} readOnly />
                    </div>
                    <button type="submit">
                      {isEditMode ? "Update" : "Save"}
                    </button>
                  </form>
                </div>
              )}

              <div
                className="add-address"
                onClick={handleShowForm}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex gap-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/10308/10308038.png"
                    alt="Add"
                  />
                  <p className="mb-0">Add new address</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
