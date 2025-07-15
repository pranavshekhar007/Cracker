import axios from "axios";
import { BASE_URL } from ".././utils/api_base_url_configration";

// Google Review API

export const getGoogleReviews = async () => {
  try {
    const response = await axios.get(BASE_URL + "review/google/list");
    console.log("Google Reviews Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Google Reviews:", error);
    throw error;
  }
};
