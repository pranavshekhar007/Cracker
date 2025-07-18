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
import { FaMapMarkerAlt, FaTruck, FaCity } from "react-icons/fa";
import { getStatesServ, getCityByStateServ } from "../services/product.service";

const LocationSelector = () => {
  const [addressForm, setAddressForm] = useState({
    state: "",
    stateId: "",
    city: "",
    cityId: "",
    minimumPrice: "",
  });

  const [stateList, setStateList] = useState([]);
  const [cities, setCities] = useState([]);
  const [pickupMode, setPickupMode] = useState(false);
  const [selectedCityMinimumPrice, setSelectedCityMinimumPrice] = useState("");
  const [confirmedLocation, setConfirmedLocation] = useState(null);

  const getStates = async () => {
    try {
      const res = await getStatesServ();
      if (res.statusCode == "200") {
        setStateList(res.data);
      }
    } catch (error) {
      console.log("getting error in state list" + error);
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

  const handleSaveAddress = () => {
    console.log("Address saved:", addressForm);
    setConfirmedLocation({
      state: addressForm.state,
      city: addressForm.city,
    });
    setPickupMode(false);
  };

  return (
    <div
      className="card shadow rounded mb-4"
      style={{
        borderLeft: "5px solid #ff4d4d",
        borderRight: "5px solid #ff4d4d",
        overflow: "hidden",
      }}
    >
      {/* Gradient Header */}
      <div
        className="text-white text-center py-4"
        style={{
          background: "linear-gradient(45deg, #ff4d4d, #ff9999)",
        }}
      >
        <FaMapMarkerAlt size={30} className="mb-2" />

        {/* Show confirmed location if exists */}
        {confirmedLocation && (
          <p className="mb-0 mt-2 fw-bold">
            {confirmedLocation.city}, {confirmedLocation.state}
          </p>
        )}

        <h5 className="fw-bold mb-0">
          For Crackers Purchase – Select Your City
        </h5>
        <p className="mb-0" style={{ fontSize: "0.9rem" }}>
          Check delivery availability in your location
        </p>
      </div>

      {/* Form */}
      <div className="p-4">
        <div className="row">
          {/* State Dropdown */}
          <div className="col-12 mb-3">
            <label className="fw-bold">
              <FaTruck className="me-2 text-danger" />
              Select State
            </label>
            <select
              className="form-select shadow-sm"
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
                setPickupMode(false);
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
            <div className="col-12 mb-3">
              <label className="fw-bold">
                <FaCity className="me-2 text-danger" />
                Select City
              </label>
              <select
                className="form-select shadow-sm"
                value={addressForm.cityId}
                onChange={(e) => {
                  const cityId = e.target.value;
                  const selectedCity = cities.find(
                    (c) => c.cityId === parseInt(cityId)
                  );

                  setPickupMode(!!selectedCity);
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
        </div>

        {/* Delivery Info */}
        {pickupMode && (
          <div className="mt-4">
            <div className="alert alert-success text-center fw-bold mb-3">
              Minimum Order Value: ₹{selectedCityMinimumPrice}
            </div>

      

            <div className="text-center">
              <button
                className="btn btn-danger px-5"
                onClick={handleSaveAddress}
              >
                Confirm Location
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
