
// "use client";
// import React, { useContext } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { LoggedDataContext } from "../context/context";

// function ProductCard({ value, bgColor, borderRadius, innerHeight, height }) {
//   const { loggedUserData, cartList, setCartList, wishList, setWishList } =
//     useContext(LoggedDataContext);
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

//   return (
//     <div
//       className={`productCard shadow-sm border position-relative overflow-hidden ${
//         height ? "productHeight" : ""
//       }`}
//       style={{
//         ...(bgColor && { backgroundColor: bgColor }),
//         ...(borderRadius && { borderRadius: borderRadius }),
//         cursor:"pointer",
//         backgroundColor: "white",
//       }}
//       onClick={() => router.push("/product-details/" + value?._id)}
//     >
//       <div className="d-flex justify-content-between align-items-center heartIcon pe-2  position-absolute " style={{zIndex:"99"}} >
//        {/* <h6 className="badge  text-white  bg-danger p-sm-2 ">
//   {value?.categoryId?.length > 0 ? value.categoryId[0].name : "Category"}
// </h6> */}

//       </div>

//       <div className="d-flex justify-content-center position-relative ">
//         <img
//           src={value?.productHeroImage}
//           className="img-fluid  productImage "
//         />
         
//          <div
//     className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white fw-bold"
//     style={{
//       backgroundColor: "rgba(0, 0, 0, 0.3)",
//       opacity: 0,
//       transition: "opacity 0.3s",
//     }}
//     onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
//     onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
//   >
   
//     <div className="d-flex gap-1">
//       <img src="https://cdn-icons-png.flaticon.com/128/159/159604.png" 
//       className=" p-2"
//       style={{height:"36px" , width:"36px" , borderRadius:"50%" , backgroundColor: "#e1e5d9b8"}}></img>
//      <div  style={{
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
//       </div>
      
        

//         {/* <img src={value?.image} alt={value.description} className="img-fluid" /> */}
//       </div>

//       {/* click to view */}

        
//       <div
//         className={`p-2 productInner d-flex flex-column justify-content-between ${
//           innerHeight ? "innerHeight" : ""
//         }`}
//       >
//         <h4 className="fw-bold">{value?.name}</h4>
//         <p className="fw-semibold text-danger">{value?.productType}</p>
//         <div>
//           {/* <h4 className="fs-6 mb-1 mt-2">{value.category}</h4>
//         <h4 className="fw-bold mb-3">{value.description}</h4> */}
//          <div className="d-flex justify-content-between mt-2">
//            <p className="text-secondary text-decoration-line-through"> &#8377;{value?.price}</p>
//             <p className="fw-bold fs-5 text-success">  &#8377;{value?.discountedPrice} </p>
//          </div>
          
//         </div>

//         <div className="d-flex justify-content-around align-items-center mt-sm-3 mt-1">
//           {cartList?.find((item) => item._id === value._id) ? (
//             <div className="d-flex counterDiv  w-100">
//               <p
//                 style={{ backgroundColor: "#6d0d0c" }}
//                 className="w-100 text-white"
//                 onClick={(e) => handleDecreaseQty(e, value)}
//               >
//                 -
//               </p>
//               <p className="w-100" style={{ backgroundColor: "#f9f5f5" }}>
//                 {cartList.find((item) => item._id === value._id)?.quantity}
//               </p>
//               <p
//                 className="w-100 text-white"
//                 style={{ backgroundColor: "#6d0d0c" }}
//                 onClick={(e) => handleIncreaseQty(e, value)}
//               >
//                 +
//               </p>
//             </div>
//           ) : (
//             <button onClick={(e) => handleAddToCartLocal(e, value)}>
//               {" "}
//               Add To Cart{" "}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;


// after adding add to cart api


"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LoggedDataContext } from "../context/context";
import { addToCartServ, removeToCartServ, userCartList } from "../services/product.service";


function ProductCard({ value, bgColor, borderRadius, innerHeight, height }) {
  const { loggedUserData, cartList, setCartList, wishList, setWishList } =
    useContext(LoggedDataContext);
  const router = useRouter();

  const [cartListApi , setCartListApi] = useState();

  const getUserCart = async () => {
    const id = loggedUserData?.id
    try{
       const res = await userCartList(loggedUserData?._id)
       console.log("cart list" , res)
       setCartListApi(res?.cartItems)
    }
    catch(error){
      console.log("error in cart list" , error)
    }
  }

  useEffect(() => {
    getUserCart();
  }, [loggedUserData?._id])

  const handleAddToCartLocal = (e, v) => {

    e.preventDefault();
    e.stopPropagation();
   if(loggedUserData){   
             handleAddToCartApi(v);
   }else{
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
   }
  };


  const handleAddToCartApi = async (v)=>{
     const payload = {
      userId:loggedUserData?._id,
      id: v._id,
      itemType:"Product"
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
      handleAddToCartApi(v);
  }

    const handleDecreaseApi =  async (e , v) => {
       const payload = {
      userId:loggedUserData?._id,
      id: v._id,
      itemType:"Product"
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

  // const handleIncreaseQty = (e, v) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

  //   const existingProduct = localCartList.find((item) => item._id === v._id);
  //   if (existingProduct) {
  //     existingProduct.quantity += 1;
  //   }

  //   localStorage.setItem("cartList", JSON.stringify(localCartList));
  //   setCartList(localCartList);
  // };

  // const handleDecreaseQty = (e, v) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];

  //   const existingProduct = localCartList.find((item) => item._id === v._id);
  //   if (existingProduct) {
  //     existingProduct.quantity -= 1;
  //     if (existingProduct.quantity <= 0) {
  //       localCartList = localCartList.filter((item) => item._id !== v._id);
  //     }
  //   }

  //   localStorage.setItem("cartList", JSON.stringify(localCartList));
  //   setCartList(localCartList);
  // };

  return (
    <div
      className={`productCard shadow-sm border position-relative overflow-hidden ${
        height ? "productHeight" : ""
      }`}
      style={{
        ...(bgColor && { backgroundColor: bgColor }),
        ...(borderRadius && { borderRadius: borderRadius }),
        cursor:"pointer",
        backgroundColor: "white",
      }}
      // onClick={() => router.push("/product-details/" + value?._id)}
    >
      <div className="d-flex justify-content-between align-items-center heartIcon pe-2  position-absolute " style={{zIndex:"99"}} >
       {/* <h6 className="badge  text-white  bg-danger p-sm-2 ">
  {value?.categoryId?.length > 0 ? value.categoryId[0].name : "Category"}
</h6> */}

      </div>

      <div className="d-flex justify-content-center position-relative ">
        <img
          src={value?.productHeroImage}
          className="img-fluid  productImage "
        />
         
         <div
    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white fw-bold"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      opacity: 0,
      transition: "opacity 0.3s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
  >
   
    <div className="d-flex gap-1">
      <img src="https://cdn-icons-png.flaticon.com/128/159/159604.png" 
      className=" p-2"
      onClick={() => router.push("/product-details/" + value?._id)}
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
      
        

        {/* <img src={value?.image} alt={value.description} className="img-fluid" /> */}
      </div>

      {/* click to view */}

        
      <div
        className={`p-2 productInner d-flex flex-column justify-content-between ${
          innerHeight ? "innerHeight" : ""
        }`}
      >
        <h4 className="fw-bold">{value?.name}</h4>
        <p className="fw-semibold text-danger">{value?.productType}</p>
        <div>
          {/* <h4 className="fs-6 mb-1 mt-2">{value.category}</h4>
        <h4 className="fw-bold mb-3">{value.description}</h4> */}
         <div className="d-flex justify-content-between mt-2">
           <p className="text-secondary text-decoration-line-through"> &#8377;{value?.price}</p>
            <p className="fw-bold fs-5 text-success">  &#8377;{value?.discountedPrice} </p>
         </div>
          
        </div>

        <div className="d-flex justify-content-around align-items-center mt-sm-3 mt-1">
          {
            loggedUserData ? (
              cartListApi?.find((item) => item._id === value._id) ? (
            <div className="d-flex counterDiv  w-100">
              <p
                style={{ backgroundColor: "#6d0d0c" }}
                className="w-100 text-white"
                onClick={(e) => handleDecreaseApi(e, value)}
              >
                -
              </p>
              <p className="w-100" style={{ backgroundColor: "#f9f5f5" }}>
                {cartListApi.find((item) => item._id === value._id)?.quantity}
              </p>
              <p
                className="w-100 text-white"
                style={{ backgroundColor: "#6d0d0c" }}
                onClick={(e) => handleIncreaseApi(e, value)}
              >
                +
              </p>
            </div>
          ) : (
            <button onClick={(e) => handleAddToCartLocal(e, value)}>
              {" "}
              Add To Cart{" "}
            </button>
          )
            ):(
              cartList?.find((item) => item._id === value._id) ? (
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
          ))  
                    }
          
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
