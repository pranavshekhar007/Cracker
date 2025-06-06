"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LoggedDataContext } from "../context/context";

function ComboProductCard({ value , bgColor , borderRadius  , innerHeight , height}) {
  const { loggedUserData, cartList, setCartList, wishList, setWishList } =  useContext(LoggedDataContext);
  const router = useRouter();

  

  const handleAddToCartLocal = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

      const existingProduct = localCartList.find((item) => item._id === v._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        localCartList.push({ ...v, quantity: 1 });
      }

      localStorage.setItem("cartList", JSON.stringify(localCartList));
      setCartList(localCartList);
      toast.success("Item Added To the cart");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };
  const handleAddToWishListLocal = (e, v) => {
  e.preventDefault();
  e.stopPropagation();
  try {
    let localWishList = JSON.parse(localStorage.getItem("wishList")) || [];

    // Check if product already exists in wishlist
    const existingProductIndex = localWishList.findIndex(
      (item) => item._id === v._id
    );

    if (existingProductIndex !== -1) {
      // If exists, remove it
      localWishList.splice(existingProductIndex, 1);
      toast.info("Item Removed From Wishlist");
    } else {
      // If not exists, add it
      localWishList.push(v);
      toast.success("Item Added To Wishlist");
    }

    // Update localStorage and state
    localStorage.setItem("wishList", JSON.stringify(localWishList));
    setWishList(localWishList);

  } catch (error) {
    console.log("Something went wrong", error);
  }
};



  const handleIncreaseQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

    const existingProduct = localCartList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    }

    localStorage.setItem("cartList", JSON.stringify(localCartList));
    setCartList(localCartList);
  };

  const handleDecreaseQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

    const existingProduct = localCartList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity <= 0) {
        localCartList = localCartList.filter((item) => item._id !== v._id);
      }
    }

    localStorage.setItem("cartList", JSON.stringify(localCartList));
    setCartList(localCartList);
  };

  return (
    <div
        className={`productCard shadow-sm border ${height ? 'productHeight' : ''}`}
style={{
  ...(bgColor && { backgroundColor: bgColor }),
  ...(borderRadius && { borderRadius: borderRadius }),
  // ...(cardHeight && { minHeight: cardHeight }),
}}
      onClick={() => router.push("/product-details/" + value?._id)}
    >
      <div className="d-flex justify-content-between align-items-center heartIcon pe-2">
        <h6 className="badge border text-dark m-2">
          {value?.category ? value?.category[0] : "Category"}
        </h6>
        <img onClick={(e)=>handleAddToWishListLocal(e, value)} alt="wishlist"
         src={ wishList?.find((item) => item._id === value._id) ?"https://cdn-icons-png.flaticon.com/128/18275/18275909.png" : "https://cdn-icons-png.flaticon.com/128/1077/1077035.png"} />
      </div>

      <div className="d-flex justify-content-center">
        <img src={value?.productHeroImage} className="img-fluid" />
    
      </div>

      <div className={`p-2 productInner d-flex flex-column justify-content-between ${innerHeight ? 'innerHeight' : ''}`}
>
        <h4>{value?.name}</h4>
       <div>
        <p>
          <s className="text-danger">{value?.price}</s>{" "}
          <span className="text-success text-bold"> {value?.discountedPrice} &#8377; </span>
        </p>
       </div>
      

        <div className="d-flex justify-content-around align-items-center mt-3" >
          {cartList?.find((item) => item._id === value._id) ? (
            <div className="d-flex counterDiv  w-100" >
              <p style={{ backgroundColor: "#6d0d0c"}} className="w-100 text-white" onClick={(e) => handleDecreaseQty(e, value)}>-</p>
              <p className="w-100" style={{backgroundColor:"#f9f5f5"}}>{cartList.find((item) => item._id === value._id)?.quantity}</p>
              <p className="w-100 text-white" style={{  backgroundColor: "#6d0d0c"}}  onClick={(e) => handleIncreaseQty(e, value)}>+</p>
            </div>
          ) : (
            <button onClick={(e) => handleAddToCartLocal(e, value)}> Add To Cart </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComboProductCard;
