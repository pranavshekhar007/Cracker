


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

export const orderListServ = async (userId) => {
  try {
    const response = await axios.get(BASE_URL + `booking/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Order list Error:", error);
    throw error;
  }
};

// my order details

export const orderDetailsServ = async (id) => {
  try {
    const response = await axios.get(BASE_URL + `booking/details/${id}`);
    return response.data;
  } catch (error) {
    console.error("Order list Error:", error);
    throw error;
  }
};

// states api

export const getStatesServ = async () => {
  try {
    const response = await axios.post(BASE_URL + "state/list");
    return response.data;
  } catch (error) {
    console.error("state list Error:", error);
    throw error;
  }
};

// city api

export const getCityByStateServ = async (stateId) => {
    try {
      const response = await axios.get(BASE_URL + `city?stateId=${stateId}`);
      return response;
    } catch (error) {
      console.error("Error fetching cities by state:", error);
      throw error;
    }
  }


//pincode api

export const getPincodeByCityServ = async (cityId) => {
  try {
    const response = await axios.post(BASE_URL + "pin-code/get-by-city", {
      cityId,
    });
    return response;
  } catch (error) {
    console.error("Error fetching pincodes by city:", error);
    throw error;
  }
};

//area api

export const getAreaByPincodeServ = async (pincodeId) => {
  try {
    const response = await axios.post(BASE_URL + "area/get-by-pincode", {
      pincodeId,
    });
    return response;
  } catch (error) {
    console.error("Error fetching area list:", error);
    throw error;
  }
};


//product review

export const addReviewServ = async (payload) => {
  try {
    console.log(payload)
    const response = await axios.post(BASE_URL + "rating/create", payload);
    return response.data;
  } catch (error) {
    console.error("review error:", error);
    throw error;
  }
};
