
"use client"
import React from 'react'
import { useState , useEffect } from 'react';
import { getStatesServ , getCityByStateServ } from '../services/product.service';

const LocationSelector = () => {

     const [addressForm, setAddressForm] = useState({
        area: "",
        city: "",
        state: "",
        pincode: "",
        shipping:""
      });

     const [stateList, setStateList] = useState([]);
       const [cities, setCities] = useState([]);
      const [pincodes, setPincodes] = useState([]);
        const [shipping, setShipping] = useState("homeDelivery");

         const handleShippingChange = (e) => {
    setShipping(e.target.value);
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

       useEffect(() => {
          getStates();
        }, []);

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

  return (
    <div className='border container py-3'>
      <h2>Choose Your Location</h2>
      
      <div className='row '> 
            {/* state */}
          <div className="col-md-4 col-12 p-0 px-md-2 my-2">
            <label className=" text-secondary fw-bold">State</label>
            <select
              className="form-control"
              value={addressForm?.stateId || ""}
              onChange={async (e) => {
                const selectedStateId = e.target.value;
                const selectedState = stateList.find(
                  (state) => state.stateId.toString() === selectedStateId
                );

                if (selectedState) {
                  setAddressForm({
                    ...addressForm,
                    state: selectedState.name,
                    stateId: selectedState.stateId,
                    city: "",
                    pincode: "",
                    area:"",
                  });

                  await handleGetCityByState(selectedState.stateId);
                  setPincodes([]);
                }
              }}
            >
              {addressForm?.state ? (
                <option value="">{addressForm?.state}</option>
              ) : (
                <option value="">Select State</option>
              )}
              {stateList.map((state) => (
                <option key={state.stateId} value={state.stateId}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* city */}
          <div className="col-md-4 col-12 p-0 px-md-2 my-2">
            <label className="steps-label">City</label>
            <select
              className="form-control"
              value={addressForm?.cityId}
              onChange={async (e) => {
                const cityId = e.target.value;

                const selectedCity = cities.find(
                  (city) => city.cityId === parseInt(cityId)
                );

                setAddressForm({
                  ...addressForm,
                  city: selectedCity.name,
                  cityId: selectedCity.cityId,
                  minimumPrice: selectedCity ? selectedCity.minimumPrice : "",
                  pincode: "",
                });

                await handleGetPincodeByCity(cityId);
              }}
            >
              {addressForm?.city ? (
                <option value="">{addressForm?.city}</option>
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
      </div>

      <div className='row'>
         <label>Select Delivery Mode</label>

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
              To-Pay Lorry Pickup
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
              Prepaid Lorry Pickup
            </label>
          </div>
      </div>
    </div>
  )
}

export default LocationSelector;
