"use client";


import React from 'react';
import axios from 'axios';

const LocationFinder = () => {
  const getLocationAndPincode = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Latitude:', latitude, 'Longitude:', longitude);

        try {
          const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b78ab41e554a4896a29df23f1ee4a1b5`);
          const data = response.data;

          if (data.results && data.results.length > 0) {
            const components = data.results[0].components;
            const pincode = components.postcode;
            alert(`Your Pincode is: ${pincode}`);
            console.log(`Your pincode is: ${pincode}`);
          }
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
        }
      }, (error) => {
        console.error('Geolocation error:', error);
        alert('Location permission denied');
      });
    } else {
      alert('Geolocation not supported');
    }
  };

  return (
    <div>
      <button onClick={getLocationAndPincode}>Get My Pincode</button>
    </div>
  );
};

export default LocationFinder;
