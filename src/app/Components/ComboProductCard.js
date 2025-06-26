// "use client";
// import React, { useContext } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { LoggedDataContext } from "../context/context";

// function ComboProductCard({ value , bgColor , borderRadius  , innerHeight , height}) {
//   const { loggedUserData, cartList, setCartList, wishList, setWishList } =  useContext(LoggedDataContext);
//   const router = useRouter();

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
//   e.preventDefault();
//   e.stopPropagation();
//   try {
//     let localWishList = JSON.parse(localStorage.getItem("wishList")) || [];

//     // Check if product already exists in wishlist
//     const existingProductIndex = localWishList.findIndex(
//       (item) => item._id === v._id
//     );

//     if (existingProductIndex !== -1) {
//       // If exists, remove it
//       localWishList.splice(existingProductIndex, 1);
//       toast.info("Item Removed From Wishlist");
//     } else {
//       // If not exists, add it
//       localWishList.push(v);
//       toast.success("Item Added To Wishlist");
//     }

//     // Update localStorage and state
//     localStorage.setItem("wishList", JSON.stringify(localWishList));
//     setWishList(localWishList);

//   } catch (error) {
//     console.log("Something went wrong", error);
//   }
// };

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

//   return (
//     <div
//         className={`productCard shadow-sm border ${height ? 'productHeight' : ''}`}
// style={{
//   ...(bgColor && { backgroundColor: bgColor }),
//   ...(borderRadius && { borderRadius: borderRadius }),
//   // ...(cardHeight && { minHeight: cardHeight }),
// }}
//       onClick={() => router.push("/product-details/" + value?._id)}
//     >
//       <div className="d-flex justify-content-between align-items-center heartIcon pe-2">
//         <h6 className="badge border text-dark m-2">
//           {value?.category ? value?.category[0] : "Category"}
//         </h6>
//         <img onClick={(e)=>handleAddToWishListLocal(e, value)} alt="wishlist"
//          src={ wishList?.find((item) => item._id === value._id) ?"https://cdn-icons-png.flaticon.com/128/18275/18275909.png" : "https://cdn-icons-png.flaticon.com/128/1077/1077035.png"} />
//       </div>

//       <div className="d-flex justify-content-center">
//         <img src={value?.productHeroImage} className="img-fluid" />
//       </div>

//       <div className={`p-2 productInner d-flex flex-column justify-content-between ${innerHeight ? 'innerHeight' : ''}`}
// >
//         <h4>{value?.name}</h4>
//        <div>
//         <p>
//           <s className="text-danger">&#8377;{value?.pricing?.actualPrice}</s>{" "}
//           <span className=" fw-bold">&#8377;{value?.pricing?.offerPrice} </span>
//         </p>
//        <div className="d-flex justify-content-between mt-3">
//          <p className="text-secondary fw-bold fs-6">Combo price </p>
//         <p className="text-success fw-bold fs-5">  &#8377;{value?.pricing?.comboPrice}</p>
//        </div>
//        </div>

//         <div className="d-flex justify-content-around align-items-center mt-3" >
//           {cartList?.find((item) => item._id === value._id) ? (
//             <div className="d-flex counterDiv  w-100" >
//               <p style={{ backgroundColor: "#6d0d0c"}} className="w-100 text-white" onClick={(e) => handleDecreaseQty(e, value)}>-</p>
//               <p className="w-100" style={{backgroundColor:"#f9f5f5"}}>{cartList.find((item) => item._id === value._id)?.quantity}</p>
//               <p className="w-100 text-white" style={{  backgroundColor: "#6d0d0c"}}  onClick={(e) => handleIncreaseQty(e, value)}>+</p>
//             </div>
//           ) : (
//             <button onClick={(e) => handleAddToCartLocal(e, value)}> Add To Cart </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ComboProductCard;

// "use client";
// import React, { useContext } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { LoggedDataContext } from "../context/context";

// function ComboProductCard({ value , bgColor , borderRadius  , innerHeight , height}) {
//   const { loggedUserData, cartList, setCartList, wishList, setWishList } =  useContext(LoggedDataContext);
//   const router = useRouter();

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
//   e.preventDefault();
//   e.stopPropagation();
//   try {
//     let localWishList = JSON.parse(localStorage.getItem("wishList")) || [];

//     // Check if product already exists in wishlist
//     const existingProductIndex = localWishList.findIndex(
//       (item) => item._id === v._id
//     );

//     if (existingProductIndex !== -1) {
//       // If exists, remove it
//       localWishList.splice(existingProductIndex, 1);
//       toast.info("Item Removed From Wishlist");
//     } else {
//       // If not exists, add it
//       localWishList.push(v);
//       toast.success("Item Added To Wishlist");
//     }

//     // Update localStorage and state
//     localStorage.setItem("wishList", JSON.stringify(localWishList));
//     setWishList(localWishList);

//   } catch (error) {
//     console.log("Something went wrong", error);
//   }
// };

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

//   return (
//     <div
//         className={`productCard  border bg-white overflow-hidden ${height ? 'productHeight' : ''}`}
// style={{
//   ...(bgColor && { backgroundColor: bgColor }),
//   ...(borderRadius && { borderRadius: borderRadius }),
//   // ...(cardHeight && { minHeight: cardHeight }),
//   boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px"
// }}
//          onClick={() => router.push("/combo-details/" +  value?._id)}
//     >
//       <div className="d-flex justify-content-end align-items-center heartIcon pe-2 m-2">
//         {/* <h6 className="badge border text-dark m-2">
//           {value?.category ? value?.category[0] : "Category"}
//         </h6> */}
//         <img onClick={(e)=>handleAddToWishListLocal(e, value)} alt="wishlist"
//          src={ wishList?.find((item) => item._id === value._id) ?"https://cdn-icons-png.flaticon.com/128/18275/18275909.png" : "https://cdn-icons-png.flaticon.com/128/1077/1077035.png"} />
//       </div>

//       <div className="d-flex justify-content-center pb-3 overflow-hidden">
//         <img src={value?.productHeroImage} className="img-fluid rounded productImage comboImage" style={{width: "90%"}} />
//       </div>

//       <div className={`p-2 pt-3 productInner d-flex flex-column justify-content-between ${innerHeight ? 'innerHeight' : ''}`}
//        style={{backgroundColor: "rgb(255 , 251 , 251)", borderTop: "1px solid #e0e0e0"}}
// >
//         <h5 style={{fontFamily: "sans-serif"}}>{value?.name}</h5>
//         <p className="mb-2" style={{color:"#c74848"}}>Included {value?.productId?.length}  Items</p>
//        <div>
//         <p>
//           <s className="text-secondary">&#8377;{value?.pricing?.actualPrice}</s>{" "}
//         </p>
//          <div className="d-flex justify-content-between mt-3">
//         <p className="fw-bold text-secondary">Offer Price</p>
//         <p className=" fs-6">  &#8377;{value?.pricing?.offerPrice}</p>
//        </div>
//        <div className="d-flex justify-content-between mt-3">
//         <p className="fw-bold text-secondary">Combo Price</p>
//         <p className="text-success fw-bold fs-5 text-end">  &#8377;{value?.pricing?.comboPrice} Only</p>
//        </div>
//        </div>

//         <div className="d-flex justify-content-around align-items-center mt-3 pb-2" >
//           {cartList?.find((item) => item._id === value._id) ? (
//             <div className="d-flex counterDiv  w-100" >
//               <p style={{ backgroundColor: "#6d0d0c"}} className="w-100 text-white" onClick={(e) => handleDecreaseQty(e, value)}>-</p>
//               <p className="w-100" style={{backgroundColor:"#f9f5f5"}}>{cartList.find((item) => item._id === value._id)?.quantity}</p>
//               <p className="w-100 text-white" style={{  backgroundColor: "#6d0d0c"}}  onClick={(e) => handleIncreaseQty(e, value)}>+</p>
//             </div>
//           ) : (
//             <button onClick={(e) => handleAddToCartLocal(e, value)}> Add To Cart </button>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }

// export default ComboProductCard;

"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LoggedDataContext } from "../context/context";

function ComboProductCard({
  value,
  bgColor,
  borderRadius,
  innerHeight,
  height,
}) {
  const { loggedUserData, cartList, setCartList, wishList, setWishList } =
    useContext(LoggedDataContext);
  const router = useRouter();

  useEffect(() => {
    console.log("combo product card called");
  }, [value]);

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
      onClick={() => router.push("/combo-details/" + value?._id)}
    >
      <div
        className=" position-absolute top-0 end-0 shadow-sm p-2 bg-danger"
        style={{ borderBottomLeftRadius: "17px" }}
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
        className="d-flex justify-content-center pb-3 overflow-hidden pt-3"
        style={{ backgroundColor: "#f3cccc" }}
      >
        <img
          src={value?.productHeroImage}
          className="img-fluid rounded  comboImage"
          style={{ width: "90%" }}
        />
      </div>

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
      className=" p-2"
      style={{height:"36px" , width:"36px" , borderRadius:"50%" , backgroundColor: "#e1e5d9b8"}}></img>
      <img
        className=" p-2"
      style={{height:"36px" , width:"36px", borderRadius:"50%" , backgroundColor: "#e1e5d9b8"}}
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
            {cartList?.find((item) => item._id === value._id) ? (
              <div className="d-flex counterDiv  w-100">
                <p
                  style={{ backgroundColor: "#6d0d0c" }}
                  className="w-100 text-white"
                  onClick={(e) => handleDecreaseQty(e, value)}
                >
                  -
                </p>
                <p className="w-100" style={{ backgroundColor: "#f9f5f5" }}>
                  {cartList.find((item) => item._id === value._id)?.quantity}
                </p>
                <p
                  className="w-100 text-white"
                  style={{ backgroundColor: "#6d0d0c" }}
                  onClick={(e) => handleIncreaseQty(e, value)}
                >
                  +
                </p>
              </div>
            ) : (
              <button onClick={(e) => handleAddToCartLocal(e, value)}>
                {" "}
                Add To Cart{" "}
              </button>
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
