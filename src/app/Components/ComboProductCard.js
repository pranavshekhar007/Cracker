
// "use client";
// import React, { useContext, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { LoggedDataContext } from "../context/context";

// function ComboProductCard({
//   value,
//   bgColor,
//   borderRadius,
//   innerHeight,
//   height,
// }) {
//   const { loggedUserData, cartList, setCartList, wishList, setWishList } =
//     useContext(LoggedDataContext);
//   const router = useRouter();

//   useEffect(() => {
//     console.log("combo product card called");
//   }, [value]);

//   const handleAddToCartLocal = (e, v) => {
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

//       const existingProduct = localCartList.find((item) => item._id === v._id);

//       if (existingProduct) {
//         existingProduct.quantity += 1;
//       } else {
//         localCartList.push({ ...v, quantity: 1 });
//       }

//       localStorage.setItem("cartList", JSON.stringify(localCartList));
//       setCartList(localCartList);
//       toast.success("Item Added To the cart");
//     } catch (error) {
//       console.log("Something went wrong", error);
//     }
//   };
//   const handleAddToWishListLocal = (e, v) => {
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       let localWishList = JSON.parse(localStorage.getItem("wishList")) || [];

//       // Check if product already exists in wishlist
//       const existingProductIndex = localWishList.findIndex(
//         (item) => item._id === v._id
//       );

//       if (existingProductIndex !== -1) {
//         // If exists, remove it
//         localWishList.splice(existingProductIndex, 1);
//         toast.info("Item Removed From Wishlist");
//       } else {
//         // If not exists, add it
//         localWishList.push(v);
//         toast.success("Item Added To Wishlist");
//       }

//       // Update localStorage and state
//       localStorage.setItem("wishList", JSON.stringify(localWishList));
//       setWishList(localWishList);
//     } catch (error) {
//       console.log("Something went wrong", error);
//     }
//   };

//   const handleIncreaseQty = (e, v) => {
//     e.preventDefault();
//     e.stopPropagation();
//     let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

//     const existingProduct = localCartList.find((item) => item._id === v._id);
//     if (existingProduct) {
//       existingProduct.quantity += 1;
//     }

//     localStorage.setItem("cartList", JSON.stringify(localCartList));
//     setCartList(localCartList);
//   };

//   const handleDecreaseQty = (e, v) => {
//     e.preventDefault();
//     e.stopPropagation();
//     let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

//     const existingProduct = localCartList.find((item) => item._id === v._id);
//     if (existingProduct) {
//       existingProduct.quantity -= 1;
//       if (existingProduct.quantity <= 0) {
//         localCartList = localCartList.filter((item) => item._id !== v._id);
//       }
//     }

//     localStorage.setItem("cartList", JSON.stringify(localCartList));
//     setCartList(localCartList);
//   };

//   const getDiscountPercentage = (actualPrice, comboPrice) => {
//     if (!actualPrice || !comboPrice) return 0;
//     const discount = ((actualPrice - comboPrice) / actualPrice) * 100;
//     return Math.round(discount);
//   };

//   return (
//     <div
//       className={`productCard  border bg-white overflow-hidden  position-relative ${
//         height ? "productHeight" : ""
//       }`}
//       style={{
//         ...(bgColor && { backgroundColor: bgColor }),
//         ...(borderRadius && { borderRadius: borderRadius }),
//         // ...(cardHeight && { minHeight: cardHeight }),
//         boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
//       }}
//       onClick={() => router.push("/combo-details/" + value?._id)}
//     >
//       <div
//         className=" position-absolute top-0 end-0 shadow-sm p-2 bg-danger"
//         style={{ borderBottomLeftRadius: "17px" , zIndex:"1"}}
//       >
//         <h4 className="text-white">
//           {" "}
//           {getDiscountPercentage(
//             value?.pricing?.actualPrice,
//             value?.pricing?.comboPrice
//           )}
//           % off
//         </h4>
//       </div>

//       <div
//         className="d-flex justify-content-center pb-3 overflow-hidden pt-3 position-relative"
//         style={{ backgroundColor: "#f3cccc" }}
//       >
//         <img
//           src={value?.productHeroImage}
//           className="img-fluid rounded  comboImage"
//           style={{ width: "90%" }}
//         />

//         <div
//     className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white fw-bold"
//     style={{
//       backgroundColor: "rgba(0, 0, 0, 0.4)",
//       opacity: 0,
//       transition: "opacity 0.3s",
//     }}
//     onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
//     onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
//   >
//      <div className="d-flex gap-1">
//       <img src="https://cdn-icons-png.flaticon.com/128/159/159604.png" 
//       className=" p-2"
//       style={{height:"36px" , width:"36px" , borderRadius:"50%" , backgroundColor: "#e1e5d9b8"}}></img>
//        <div  style={{
//     height: "36px",
//     width: "36px",
//     borderRadius: "50%",
//     backgroundColor: "#e1e5d9b8",
//     display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"
//   }}
// >
//   <img
//     style={{
//       height: "60%", 
//       width: "60%",
//       objectFit: "contain",
//     }}
//     onClick={(e) => handleAddToWishListLocal(e, value)}
//     alt="wishlist"
//     src={
//       wishList?.find((item) => item._id === value._id)
//         ? "https://cdn-icons-png.flaticon.com/128/18275/18275909.png"
//         : "https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
//     }
//   />
// </div>
//     </div>
//   </div>
//       </div>

      


//       <div
//         className={`p-sm-3 pt-sm-3 p-2  productInner d-flex flex-column justify-content-between bg-white ${
//           innerHeight ? "innerHeight" : ""
//         }`}
//         style={{}}
//       >
//         <h5 style={{ fontFamily: "sans-serif" }}>{value?.name}</h5>
//         <p
//           className="mb-2 fw-bold"
//           style={{ color: "#c74848", fontSize: "13px" }}
//         >
//           Included {value?.productId?.length} Items
//         </p>
//         <div>
//           {/* <p>
//           <s className="text-secondary">&#8377;{value?.pricing?.actualPrice}</s>{" "}
//         </p> */}
//           <div className="d-flex justify-content-between mt-2">
//             <p className="fw-bold text-secondary">Price</p>
//             <p className=" fs-6"> &#8377;{value?.pricing?.actualPrice}</p>
//           </div>
//           <div className="d-flex justify-content-between mt-2">
//             <p className="fw-bold text-secondary">Combo Price</p>
//             <p className="text-success fw-bold fs-5 text-end">
//               {" "}
//               &#8377;{value?.pricing?.comboPrice} Only
//             </p>
//           </div>
//         </div>

//         <div className="d-flex gap-2 align-items-center heartIcon mt-3 pb-2">
//           <div className="d-flex justify-content-around align-items-center w-100 ">
//             {cartList?.find((item) => item._id === value._id) ? (
//               <div className="d-flex counterDiv  w-100">
//                 <p
//                   style={{ backgroundColor: "#6d0d0c" }}
//                   className="w-100 text-white"
//                   onClick={(e) => handleDecreaseQty(e, value)}
//                 >
//                   -
//                 </p>
//                 <p className="w-100" style={{ backgroundColor: "#f9f5f5" }}>
//                   {cartList.find((item) => item._id === value._id)?.quantity}
//                 </p>
//                 <p
//                   className="w-100 text-white"
//                   style={{ backgroundColor: "#6d0d0c" }}
//                   onClick={(e) => handleIncreaseQty(e, value)}
//                 > + </p>
//               </div>
//             ) : (
//               <button onClick={(e) => handleAddToCartLocal(e, value)}>
//                 {" "}
//                 Add To Cart{" "}
//               </button>
//             )}
//           </div>
//           <img
//             onClick={(e) => handleAddToWishListLocal(e, value)}
//             alt="wishlist"
//             style={{ height: "25px", width: "25px", cursor: "pointer" }}
//             src={
//               wishList?.find((item) => item._id === value._id)
//                 ? "https://cdn-icons-png.flaticon.com/128/18275/18275909.png"
//                 : "https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ComboProductCard;



"use client";
import React, { useContext, useEffect , useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LoggedDataContext } from "../context/context";
import { addToCartServ, removeToCartServ, userCartList } from "../services/product.service";

function ComboProductCard({
  value,
  bgColor,
  borderRadius,
  innerHeight,
  height,
}) {
  const { loggedUserData, comboCartList, setComboCartList, wishList, setWishList } =
    useContext(LoggedDataContext);
  const router = useRouter();

  useEffect(() => {
    console.log("combo product card called");
  }, [value]);

   const [comboCartListApi , setComboCartListApi] = useState();
  
    const getUserCart = async () => {
      const id = loggedUserData?.id
      try{
         const res = await userCartList(loggedUserData?._id)
         console.log("cart list" , res)
         setComboCartListApi(res?.cartItems)
      }
      catch(error){
        console.log("error in cart list" , error)
      }
    }
  
    useEffect(() => {
      getUserCart();
    }, [loggedUserData?._id])

  const handleAddToCartComboLocal = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      let localComboCartList = JSON.parse(localStorage.getItem("comboCartList")) || [];

      const existingProduct = localComboCartList.find((item) => item._id === v._id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        localComboCartList.push({ ...v, quantity: 1 });
      }

      localStorage.setItem("comboCartList", JSON.stringify(localComboCartList));
      setComboCartList(localComboCartList);
      toast.success("Item Added To the cart");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

const  handleAddToCartComboApi =  async (e , v) => {
     const payload = {
          userId:loggedUserData?._id,
          id: v._id,
          itemType:"ComboProduct"
        }
    
         try{
           const res = await  addToCartServ(payload);
           console.log(res);
            getUserCart();
         }
         catch(error){
             console.log("error in add to cart api", error)
         }
  }

  const handleIncreaseApi = (e , v) => {
        handleAddToCartComboApi(v);
    }
  
      const handleDecreaseApi =  async (e , v) => {
         const payload = {
        userId:loggedUserData?._id,
        id: v._id,
        itemType:"ComboProduct"
      }
  
       try{
         const res = await removeToCartServ(payload);
         console.log(res);
         getUserCart();
       }
       catch(error){
           console.log("error in add to cart api", error)
       }
    }

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
    let localComboCartList = JSON.parse(localStorage.getItem("comboCartList")) || [];

    const existingProduct = localComboCartList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    }

    localStorage.setItem("comboCartList", JSON.stringify(localComboCartList));
    setComboCartList(localComboCartList);
  };

  const handleDecreaseQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localComboCartList = JSON.parse(localStorage.getItem("comboCartList")) || [];

    const existingProduct = localComboCartList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity <= 0) {
        localComboCartList = localComboCartList.filter((item) => item._id !== v._id);
      }
    }

    localStorage.setItem("comboCartList", JSON.stringify(localComboCartList));
    setComboCartList(localComboCartList);
  };

  const getDiscountPercentage = (actualPrice, comboPrice) => {
    if (!actualPrice || !comboPrice) return 0;
    const discount = ((actualPrice - comboPrice) / actualPrice) * 100;
    return Math.round(discount);
  };

  return (

    <div
      className={`productCard  border bg-white overflow-hidden  position-relative ${
        height ? "productHeight" : ""
      }`}
      style={{
        ...(bgColor && { backgroundColor: bgColor }),
        ...(borderRadius && { borderRadius: borderRadius }),
        // ...(cardHeight && { minHeight: cardHeight }),
        boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
      }}
      // onClick={() => router.push("/combo-details/" + value?._id)}
    >
      <div
        className=" position-absolute top-0 end-0 shadow-sm p-2 bg-danger"
        style={{ borderBottomLeftRadius: "17px" , zIndex:"1"}}
      >
        <h4 className="text-white">
          {" "}
          {getDiscountPercentage(
            value?.pricing?.actualPrice,
            value?.pricing?.comboPrice
          )}
          % off
        </h4>
      </div>

      <div
        className="d-flex justify-content-center pb-3 overflow-hidden pt-3 position-relative"
        style={{ backgroundColor: "#f3cccc" }}
      >
        <img
          src={value?.productHeroImage}
          className="img-fluid rounded  comboImage"
          style={{ width: "90%" }}
        />

        <div
    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white fw-bold"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      opacity: 0,
      transition: "opacity 0.3s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
  >
     <div className="d-flex gap-1">
      <img src="https://cdn-icons-png.flaticon.com/128/159/159604.png"
       onClick={() => router.push("/combo-details/" + value?._id)} 
      className=" p-2"
      style={{height:"36px" , width:"36px" , borderRadius:"50%" , backgroundColor: "#e1e5d9b8"}}></img>
       <div  style={{
    height: "36px",
    width: "36px",
    borderRadius: "50%",
    backgroundColor: "#e1e5d9b8",
    display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"
  }}
>
  <img
    style={{
      height: "60%", 
      width: "60%",
      objectFit: "contain",
    }}
    onClick={(e) => handleAddToWishListLocal(e, value)}
    alt="wishlist"
    src={
      wishList?.find((item) => item._id === value._id)
        ? "https://cdn-icons-png.flaticon.com/128/18275/18275909.png"
        : "https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
    }
  />
</div>
    </div>
  </div>
      </div>

      <div
        className={`p-sm-3 pt-sm-3 p-2  productInner d-flex flex-column justify-content-between bg-white ${
          innerHeight ? "innerHeight" : ""
        }`}
        style={{}}
      >
        <h5 style={{ fontFamily: "sans-serif" }}>{value?.name}</h5>
        <p
          className="mb-2 fw-bold"
          style={{ color: "#c74848", fontSize: "13px" }}
        >
          Included {value?.productId?.length} Items
        </p>
        <div>
          {/* <p>
          <s className="text-secondary">&#8377;{value?.pricing?.actualPrice}</s>{" "}
        </p> */}
          <div className="d-flex justify-content-between mt-2">
            <p className="fw-bold text-secondary">Price</p>
            <p className=" fs-6"> &#8377;{value?.pricing?.actualPrice}</p>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <p className="fw-bold text-secondary">Combo Price</p>
            <p className="text-success fw-bold fs-5 text-end">
              {" "}
              &#8377;{value?.pricing?.comboPrice} Only
            </p>
          </div>
        </div>

        <div className="d-flex gap-2 align-items-center heartIcon mt-3 pb-2">
          <div className="d-flex justify-content-around align-items-center w-100 ">
            {loggedUserData ? (
                  comboCartListApi?.find((item) => item._id === value._id) ? (
              <div className="d-flex counterDiv  w-100">
                <p
                  style={{ backgroundColor: "#6d0d0c" }}
                  className="w-100 text-white"
                  onClick={(e) => handleDecreaseApi(e, value)}
                >
                  -
                </p>
                <p className="w-100" style={{ backgroundColor: "#f9f5f5" }}>
                  {comboCartListApi.find((item) => item._id === value._id)?.quantity}
                </p>
                <p
                  className="w-100 text-white"
                  style={{ backgroundColor: "#6d0d0c" }}
                  onClick={(e) => handleIncreaseApi(e, value)}
                > + </p>
              </div>
            ) : (
              <button onClick={(e) => handleAddToCartComboApi(e, value)}>
                {" "}
                Add To Cart{" "}
              </button>
            )
            ):(
              comboCartList?.find((item) => item._id === value._id) ? (
              <div className="d-flex counterDiv  w-100">
                <p
                  style={{ backgroundColor: "#6d0d0c" }}
                  className="w-100 text-white"
                  onClick={(e) => handleDecreaseQty(e, value)}
                >
                  -
                </p>
                <p className="w-100" style={{ backgroundColor: "#f9f5f5" }}>
                  {comboCartList.find((item) => item._id === value._id)?.quantity}
                </p>
                <p
                  className="w-100 text-white"
                  style={{ backgroundColor: "#6d0d0c" }}
                  onClick={(e) => handleIncreaseQty(e, value)}
                > + </p>
              </div>
            ) : (
              <button onClick={(e) => handleAddToCartComboLocal(e, value)}>
                {" "}
                Add To Cart{" "}
              </button>
            )
            )}
          </div>
          <img
            onClick={(e) => handleAddToWishListLocal(e, value)}
            alt="wishlist"
            style={{ height: "25px", width: "25px", cursor: "pointer" }}
            src={
              wishList?.find((item) => item._id === value._id)
                ? "https://cdn-icons-png.flaticon.com/128/18275/18275909.png"
                : "https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
            }
          />
        </div>
      </div>
    </div> 

  );
}

export default ComboProductCard;
