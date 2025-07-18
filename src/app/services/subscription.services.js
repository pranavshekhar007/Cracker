import axios from "axios";
import { BASE_URL } from "../utils/api_base_url_configration";
 
// Create Subscription Chit
export const addSubscriptionServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "subscription/create", formData);
    return response;
  } catch (error) {
    console.error("Error creating subscription chit:", error);
    throw error;
  }
};

// List Subscription Chits
export const getSubscriptionListServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "subscription/subscription-users/list", formData);
    return response;
  } catch (error) {
    console.error("Error fetching subscription chit list:", error);
    throw error;
  }
};

// Get Subscription Chit Details
export const getSubscriptionDetailsServ = async (id) => {
  try {
    const response = await axios.get(BASE_URL + "subscription/details/" + id);
    return response;
  } catch (error) {
    console.error("Error fetching subscription chit details:", error);
    throw error;
  }
};

// Update Subscription Chit
export const updateSubscriptionServ = async (formData) => {
  try {
    const response = await axios.put(BASE_URL + "subscription/update", formData);
    return response;
  } catch (error) {
    console.error("Error updating subscription chit:", error);
    throw error;
  }
};

// Delete Subscription Chit
export const deleteSubscriptionServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + "subscription/delete/" + id);
    return response;
  } catch (error) {
    console.error("Error deleting subscription chit:", error);
    throw error;
  }
};

// Sign Up for Subscription Chit
export const signUpSubscriptionServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "subscription/signup", formData);
    return response;
  } catch (error) {
    console.error("Error signing up for subscription chit:", error);
    throw error;
  }
};

// Login Subscription Chit User
export const loginSubscriptionServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "subscription/login", formData);
    return response;
  } catch (error) {
    console.error("Error logging in subscription chit user:", error);
    throw error;
  }
};

// Get My Subscriptions (for logged chit user)
export const getMyChitSubscriptionsServ = async (formData) => {
  try {
    const response = await axios.post(BASE_URL + "subscription/my-subscriptions", formData);
    return response;
  } catch (error) {
    console.error("Error fetching my subscriptions:", error);
    throw error;
  }
};
