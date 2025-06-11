


import axios from "axios";

import { BASE_URL } from ".././utils/api_base_url_configration";

// all products

export const getProductServ = async (payload) => {
  try {
    const response = await axios.post(BASE_URL + "product/list" , payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error; 
  }
};

// product details

export async function getProduct(id) {
  try {
    const res = await axios.get(BASE_URL+`product/details/${id}`);
    //  console.log(res.data.data);
    return res.data.data;
   
  } 
  catch (error) {
    throw new Error('Product not found');
  }
}


// product categories

export const getCategory = async () => {
  try {
    const response = await axios.post(BASE_URL + "category/list");
    console.log(response.data)
    return response.data;
    
  } catch (error) {
    console.error("Error fetching product categories:", error);
    throw error; 
  }
};

// add to cart
export const addToCartServ = async (payload) => {
  try {
    const response = await axios.post(BASE_URL + "user/add-to-cart/"+payload?.productId, {userId:payload?.userId});
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error; 
  }
};


// combo  products

export const getComboProductServ = async () => {
  try {
    const response = await axios.post(BASE_URL + "combo-product/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error; 
  }
};


// combo product details

export async function getComboProduct(id) {
  try {
    const res = await axios.get(BASE_URL+`combo-product/details/${id}`);
    //  console.log(res.data.data);
    return res.data.data;
   
  } 
  catch (error) {
    throw new Error('Product not found');
  }
}


// place order

export const placeOrderServ = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "booking/create", formdata);
    return response.data;
  } catch (error) {
    console.error("place Order error:", error);
    throw error;
  }
};


// paymnet

export const uploadPaymentServ = async (formdata) => {
  try {
    const response = await axios.put(BASE_URL + "booking/upload/payment-ss", formdata);
    return response.data;
  } catch (error) {
    console.error("payment error:", error);
    throw error;
  }
};


// my orders

export const orderListServ = async (id) => {
  try {
    const response = await axios.get(BASE_URL + `booking/details/${id}`);
    return response.data;
  } catch (error) {
    console.error("Order list Error:", error);
    throw error;
  }
};
