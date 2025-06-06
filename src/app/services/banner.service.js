import axios from "axios";

import { BASE_URL } from ".././utils/api_base_url_configration";



export const getBanners = async () => {
  try {
    const response = await axios.post(BASE_URL + "banner/list");
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error; 
  }
};