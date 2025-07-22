// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   getStatesServ,
//   getCityByStateServ,
//   getPincodeByCityServ,
//   getAreaByPincodeServ,
// } from "../services/product.service";

// const LocationSelector = () => {
//   const [addressForm, setAddressForm] = useState({
//     state: "",
//     stateId: "",
//     city: "",
//     cityId: "",
//     pincode: "",
//     pincodeId: "",
//     area: "",
//     areaId: "",
//     minimumPrice: "",
//     shipping: "homeDelivery",
//   });

//   const [stateList, setStateList] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [pincodes, setPincodes] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [pickupMode, setPickupMode] = useState(false);
//   const [selectedCityMinimumPrice, setSelectedCityMinimumPrice] = useState("");

//   const getStates = async () => {
//     try {
//       const res = await getStatesServ();
//       if (res.statusCode == "200") {
//         setStateList(res.data);
//       }
//     } catch (error) {
//       console.log("getting error in state list" + error);
//     }
//   };
//   useEffect(() => {
//     getStates();
//   }, []);

//   const handleGetCityByState = async (stateId) => {
//     if (!stateId) return setCities([]);
//     try {
//       const res = await getCityByStateServ(stateId);
//       setCities(res.data.data);
//     } catch (error) {
//       console.error("Failed to load cities:", error);
//     }
//   };

//   const handleGetPincodeByCity = async (cityId) => {
//     if (!cityId) return setPincodes([]);
//     try {
//       const res = await getPincodeByCityServ(cityId);
//       setPincodes(res.data.data);
//     } catch (error) {
//       console.error("Failed to load pincodes:", error);
//     }
//   };

//   const handleGetAreaByPincode = async (pincodeId) => {
//     if (!pincodeId) return setAreas([]);
//     try {
//       const res = await getAreaByPincodeServ(pincodeId);
//       setAreas(res.data.data);
//     } catch (error) {
//       console.error("Failed to load areas:", error);
//     }
//   };

//   const handleSaveAddress = () => {
//     console.log("Address saved:", addressForm);
//     setPickupMode(false);
//   };

//   return (
//     <div className="card shadow rounded p-4 mb-4">
//       <h5 className="fw-bold mb-3 text-primary text-center">
//         Hi, For Crackers Purchase
//         <br />
//         Select your city
//       </h5>

//       <div className="row">
//         {/* State Dropdown */}
//         <div className="col-6 mb-3">
//           <select
//             className="form-select"
//             value={addressForm.stateId}
//             onChange={async (e) => {
//               const selectedStateId = e.target.value;
//               const selectedState = stateList.find(
//                 (s) => s.stateId.toString() === selectedStateId
//               );
//               setAddressForm({
//                 ...addressForm,
//                 state: selectedState?.name || "",
//                 stateId: selectedStateId,
//                 city: "",
//                 cityId: "",
//                 pincode: "",
//                 pincodeId: "",
//                 area: "",
//                 areaId: "",
//                 minimumPrice: "",
//               });
//               await handleGetCityByState(selectedStateId);
//               setPincodes([]);
//               setAreas([]);
//               setPickupMode(false);
//               setSelectedCityMinimumPrice("");
//             }}
//           >
//             <option value="">Select State</option>
//             {stateList.map((s) => (
//               <option key={s.stateId} value={s.stateId}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* City Dropdown */}
//         {cities.length > 0 && (
//           <div className="col-6 mb-3">
//             <select
//               className="form-select"
//               value={addressForm.cityId}
//               onChange={async (e) => {
//                 const cityId = e.target.value;
//                 const selectedCity = cities.find(
//                   (c) => c.cityId === parseInt(cityId)
//                 );

//                 const minimumPrice = selectedCity?.minimumPrice || "";

//                 setAddressForm({
//                   ...addressForm,
//                   city: selectedCity?.name || "",
//                   cityId,
//                   pincode: "",
//                   pincodeId: "",
//                   area: "",
//                   areaId: "",
//                   minimumPrice: minimumPrice,
//                 });

//                 setSelectedCityMinimumPrice(minimumPrice);

//                 await handleGetPincodeByCity(cityId);
//                 setAreas([]);
//                 setPickupMode(false);
//               }}
//             >
//               <option value="">Select City</option>
//               {cities.map((c) => (
//                 <option key={c.cityId} value={c.cityId}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>

//             {selectedCityMinimumPrice !== "" && (
//               <div className="mt-2 text-center">
//                 <small className="text-muted">
//                   Minimum Order Value for this city: ₹{selectedCityMinimumPrice}
//                 </small>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="row">
//         {pincodes.length > 0 && (
//           <div className={`col-${pickupMode ? "6" : "6"} mb-3`}>
//             <select
//               className="form-select"
//               value={addressForm.pincodeId}
//               onChange={async (e) => {
//                 const pincodeId = e.target.value;
//                 const selectedPincode = pincodes.find(
//                   (p) => p.pincodeId === parseInt(pincodeId)
//                 );
//                 setAddressForm({
//                   ...addressForm,
//                   pincode: selectedPincode?.pincode || "",
//                   pincodeId,
//                   area: "",
//                   areaId: "",
//                 });
//                 await handleGetAreaByPincode(pincodeId);
//               }}
//             >
//               <option value="">Select Pincode</option>
//               {pincodes.map((p) => (
//                 <option key={p.pincodeId} value={p.pincodeId}>
//                   {p.pincode}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {pickupMode && (
//           <div className="col-6 mb-3">
//             <select
//               className="form-select"
//               value={addressForm.areaId}
//               onChange={(e) => {
//                 const areaId = e.target.value;
//                 const selectedArea = areas.find(
//                   (a) => a.areaId === parseInt(areaId)
//                 );
//                 setAddressForm({
//                   ...addressForm,
//                   area: selectedArea?.name || "",
//                   areaId,
//                 });
//               }}
//             >
//               <option value="">Select PickUp Point</option>
//               {areas.map((a) => (
//                 <option key={a.areaId} value={a.areaId}>
//                   {a.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//       </div>

//       {!pickupMode && (
//         <div className="d-flex gap-2 col-6 mb-3">
//           <button
//             className={`btn ${
//               addressForm.pincodeId ? "btn-danger" : "btn-secondary disabled"
//             } w-50`}
//             onClick={() => setPickupMode(true)}
//             disabled={!addressForm.pincodeId}
//           >
//             PickUp Location
//           </button>

//           <button className="btn btn-secondary w-50 disabled" disabled>
//             Home Delivery
//           </button>
//         </div>
//       )}

//       {pickupMode && (
//         <>
//           <p className="text-muted text-center">
//             You have chosen Tatkal option. Your crackers will be delivered at
//             the chosen Pickup Location in 4 - 5 Days
//           </p>

//           <div className="mt-3 text-center">
//             <p className="mb-0 text-success fw-bold">
//               Minimum Order Value: ₹{selectedCityMinimumPrice}
//             </p>
//             <p className="mb-0 text-success">
//               Shipping Charges to be directly paid to Transport Company
//             </p>
//           </div>

//           <div className="text-center">
//             <button
//               className={`btn ${
//                 addressForm.areaId ? "btn-danger" : "btn-secondary disabled"
//               } px-5`}
//               onClick={handleSaveAddress}
//               disabled={!addressForm.areaId}
//             >
//               OK
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default LocationSelector;

"use client";
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCity, FaTruck } from "react-icons/fa";
import { getStatesServ, getCityByStateServ } from "../services/product.service";

const LocationSelector = ({ onClose }) => {
  const [addressForm, setAddressForm] = useState({
    state: "",
    stateId: "",
    city: "",
    cityId: "",
    minimumPrice: "",
  });

  const [stateList, setStateList] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCityMinimumPrice, setSelectedCityMinimumPrice] = useState("");
  const [confirmedLocation, setConfirmedLocation] = useState(null);

  const getStates = async () => {
    try {
      const res = await getStatesServ();
      if (res.statusCode == "200") {
        setStateList(res.data);
      }
    } catch (error) {
      console.log("Error fetching states:", error);
    }
  };

  useEffect(() => {
    getStates();
  }, []);

  const handleGetCityByState = async (stateId) => {
    if (!stateId) return setCities([]);
    try {
      const res = await getCityByStateServ(stateId);
      setCities(res.data.data);
    } catch (error) {
      console.error("Failed to load cities:", error);
    }
  };

  const handleCheckAvailability = () => {
    setConfirmedLocation({
      state: addressForm.state,
      city: addressForm.city,
      minimumPrice: addressForm.minimumPrice,
    });
  };

  return (
    <div
      className="shadow rounded"
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="text-white text-center py-3"
        style={{
          background: "linear-gradient(45deg, #f44336, #ff9800)",
        }}
      >
        <FaTruck size={40} className="mb-2" />
        <h4 className="fw-bold mb-0">Check Delivery Availability</h4>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="mb-3 text-center">
          Select your location to check service availability and minimum order
          value
        </p>

        {/* State Dropdown */}
        <div className="mb-3">
          <label className="fw-bold mb-1">Select Your State</label>
          <select
            className="form-select"
            value={addressForm.stateId}
            onChange={async (e) => {
              const selectedStateId = e.target.value;
              const selectedState = stateList.find(
                (s) => s.stateId.toString() === selectedStateId
              );
              setAddressForm({
                ...addressForm,
                state: selectedState?.name || "",
                stateId: selectedStateId,
                city: "",
                cityId: "",
                minimumPrice: "",
              });
              await handleGetCityByState(selectedStateId);
              setSelectedCityMinimumPrice("");
            }}
          >
            <option value="">Select State</option>
            {stateList.map((s) => (
              <option key={s.stateId} value={s.stateId}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* City Dropdown */}
        {cities.length > 0 && (
          <div className="mb-3">
            <label className="fw-bold mb-1">Select Your City</label>
            <select
              className="form-select"
              value={addressForm.cityId}
              onChange={(e) => {
                const cityId = e.target.value;
                const selectedCity = cities.find(
                  (c) => c.cityId === parseInt(cityId)
                );

                const minimumPrice = selectedCity?.minimumPrice || "";

                setAddressForm({
                  ...addressForm,
                  city: selectedCity?.name || "",
                  cityId,
                  minimumPrice: minimumPrice,
                });

                setSelectedCityMinimumPrice(minimumPrice);
              }}
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.cityId} value={c.cityId}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Check Availability Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "80px",
            marginTop: "10px",
          }}
        >
          <button
            onClick={handleCheckAvailability}
            disabled={!addressForm.stateId || !addressForm.cityId}
            style={{
              flex: "1",
              background: "linear-gradient(90deg, #fa4d56, #ff6f61)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              fontWeight: "600",
              fontSize: "16px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
          >
            Check Availability
          </button>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#333",
              fontWeight: "500",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>

        {/* Show confirmed location and minimum price */}
        {confirmedLocation && (
          <div className="mt-3 alert alert-success text-center fw-bold">
            Delivery available in {confirmedLocation.city},{" "}
            {confirmedLocation.state}. Minimum Order: ₹
            {confirmedLocation.minimumPrice}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
