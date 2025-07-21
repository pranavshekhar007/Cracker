

import axios from "axios";

import { BASE_URL } from ".././utils/api_base_url_configration";


// policy  api

export const getPolicy = async () => {
  try {
    const response = await axios.get(BASE_URL + "support/details");
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    console.error("Error fetching polcies:", error);
    throw error; 
  }
};

// contact api

export const contact = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "support/add-contact-query",formData,);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

export const addBulkOrderServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "bulk-order/create", formData, getConfig());
    return response;
  } catch (error) {
    // Handle error (e.g., log or throw an error)
    console.error("Error fetching data:", error);
    throw error;
  }
};


