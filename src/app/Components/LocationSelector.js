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
import {
  getStatesServ,
  getCityByStateServ,
  getPincodeByCityServ,
  getAreaByPincodeServ,
} from "../services/product.service";

const LocationSelector = () => {
  const [addressForm, setAddressForm] = useState({
    state: "",
    stateId: "",
    city: "",
    cityId: "",
    pincode: "",
    pincodeId: "",
    area: "",
    areaId: "",
    minimumPrice: "",
    shipping: "homeDelivery",
  });

  const [stateList, setStateList] = useState([]);
  const [cities, setCities] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [pickupMode, setPickupMode] = useState(false);
  const [selectedCityMinimumPrice, setSelectedCityMinimumPrice] = useState("");

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

  // const handleGetPincodeByCity = async (cityId) => {
  //   if (!cityId) return setPincodes([]);
  //   try {
  //     const res = await getPincodeByCityServ(cityId);
  //     setPincodes(res.data.data);
  //   } catch (error) {
  //     console.error("Failed to load pincodes:", error);
  //   }
  // };

  // const handleGetAreaByPincode = async (pincodeId) => {
  //   if (!pincodeId) return setAreas([]);
  //   try {
  //     const res = await getAreaByPincodeServ(pincodeId);
  //     setAreas(res.data.data);
  //   } catch (error) {
  //     console.error("Failed to load areas:", error);
  //   }
  // };

  const handleSaveAddress = () => {
    console.log("Address saved:", addressForm);
    setPickupMode(false);
  };

  return (
    <div className="card shadow rounded  mb-4" style={{borderLeft:"5px solid #ffdede" , borderRight:"5px solid #ffdede"}}>
      <h5 className="fw-bold mb-4 text-danger text-center pt-4 pb-4" style={{ backgroundColor: "#f5f5f5" , borderBottom: "1px solid #ffffff"}}>
        Hi, For Crackers Purchase  Select your city
        {/* <br /> */}
       
      </h5>

      <div className="row p-4">
        {/* State Dropdown */}
        <div className="col-6 mb-3">
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
                pincode: "",
                pincodeId: "",
                area: "",
                areaId: "",
                minimumPrice: "",
              });
              await handleGetCityByState(selectedStateId);
              setPincodes([]);
              setAreas([]);
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
          <div className="col-6 mb-3">
            <select
              className="form-select"
              value={addressForm.cityId}
              onChange={async (e) => {
                const cityId = e.target.value;
                const selectedCity = cities.find(
                  (c) => c.cityId === parseInt(cityId)
                );

                if(selectedCity){
                  setPickupMode(true)
                }else{
                   setPickupMode(false)
                }

                const minimumPrice = selectedCity?.minimumPrice || "";

                setAddressForm({
                  ...addressForm,
                  city: selectedCity?.name || "",
                  cityId,
                  pincode: "",
                  pincodeId: "",
                  area: "",
                  areaId: "",
                  minimumPrice: minimumPrice,
                });

                setSelectedCityMinimumPrice(minimumPrice);

                // await handleGetPincodeByCity(cityId);
                // setAreas([]);
                // setPickupMode(false);
              }}
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.cityId} value={c.cityId}>
                  {c.name}
                </option>
              ))}
            </select>

            {selectedCityMinimumPrice !== "" && (
              <div className="mt-2 text-center">
                <small className="text-muted">
                  Minimum Order Value for this city: ₹{selectedCityMinimumPrice}
                </small>
              </div>
            )}
          </div>
        )}
      </div>

      {/* <div className="row">
        {pincodes.length > 0 && (
          <div className={`col-${pickupMode ? "6" : "6"} mb-3`}>
            <select
              className="form-select"
              value={addressForm.pincodeId}
              onChange={async (e) => {
                const pincodeId = e.target.value;
                const selectedPincode = pincodes.find(
                  (p) => p.pincodeId === parseInt(pincodeId)
                );
                setAddressForm({
                  ...addressForm,
                  pincode: selectedPincode?.pincode || "",
                  pincodeId,
                  area: "",
                  areaId: "",
                });
                await handleGetAreaByPincode(pincodeId);
              }}
            >
              <option value="">Select Pincode</option>
              {pincodes.map((p) => (
                <option key={p.pincodeId} value={p.pincodeId}>
                  {p.pincode}
                </option>
              ))}
            </select>
          </div>
        )}

        {pickupMode && (
          <div className="col-6 mb-3">
            <select
              className="form-select"
              value={addressForm.areaId}
              onChange={(e) => {
                const areaId = e.target.value;
                const selectedArea = areas.find(
                  (a) => a.areaId === parseInt(areaId)
                );
                setAddressForm({
                  ...addressForm,
                  area: selectedArea?.name || "",
                  areaId,
                });
              }}
            >
              <option value="">Select PickUp Point</option>
              {areas.map((a) => (
                <option key={a.areaId} value={a.areaId}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div> */}

      {/* {!pickupMode && (
        <div className="d-flex gap-2 col-6 mb-3">
          <button
            className={`btn ${
              addressForm.pincodeId ? "btn-danger" : "btn-secondary disabled"
            } w-50`}
            onClick={() => setPickupMode(true)}
            disabled={!addressForm.pincodeId}
          >
            PickUp Location
          </button>

          <button className="btn btn-secondary w-50 disabled" disabled>
            Home Delivery
          </button>
        </div>
      )} */}

      {pickupMode && (
        <div className="px-2 pb-4">
          <p className="text-muted text-center">
            You have chosen Tatkal option. Your crackers will be delivered at
            the chosen Pickup Location in 4 - 5 Days
          </p>

          <div className="mt-3 text-center">
            <p className="mb-0 text-success fw-bold">
              Minimum Order Value: ₹{selectedCityMinimumPrice}
            </p>
            <p className="mb-0 text-success">
              Shipping Charges to be directly paid to Transport Company
            </p>
          </div>

          <div className="text-center">
            <button
              className={`btn ${
                addressForm.cityId ? "btn-danger" : "btn-secondary disabled"
              } px-5 mt-3`}
              onClick={handleSaveAddress}
              disabled={!addressForm.cityId}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;

