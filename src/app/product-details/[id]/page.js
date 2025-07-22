// "use client";
// import React from "react";
// import Navbar from "../../Components/Navbar";
// import { useState, useEffect, useRef, useContext } from "react";
// import { getProduct } from "../../services/product.service";
// import { useParams } from "next/navigation";
// import Footer from "../../Components/Footer";
// import { LoggedDataContext } from "../../context/context";
// import { useRouter } from "next/navigation";

// function page() {
//   const { cartList, setCartList } = useContext(LoggedDataContext);
//   const { id } = useParams();
//   const [details, setDetails] = useState(null);
//   const [ratingList, setRatingList] = useState(null);
//   const router = useRouter();

//   const getProductDetails = async () => {
//     try {
//       let response = await getProduct(id);
//       setDetails(response?.product);
//       setRatingList(response?.ratingList);
//     } catch (error) {}
//   };
//   useEffect(() => {
//     getProductDetails();
//   }, [id]);

//   const [showDetails, setShowDetail] = useState(true);
//   const [showReviews, setShowReviews] = useState(false);

//   const imgRef = useRef();

//   const handleMouseMove = (e) => {
//     const img = imgRef.current;
//     const rect = img.getBoundingClientRect();

//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;

//     img.style.transformOrigin = `${x}% ${y}%`;
//   };

//   const handleMouseEnter = () => {
//     imgRef.current.style.transform = "scale(1.2)";
//   };

//   const handleMouseLeave = () => {
//     imgRef.current.style.transform = "scale(1)";
//   };

//   // add to cart

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

//   // selected item
//   const [activeTab, setActiveTab] = useState("details");

//   // buy now function

//   const handleBuyNow = (e, product) => {
//     e.preventDefault();
//     e.stopPropagation();

//     try {
//       let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];
//       const existingProduct = localCartList.find(
//         (item) => item._id === product._id
//       );

//       if (!existingProduct) {
//         localCartList.push({ ...product, quantity: 1 });
//         localStorage.setItem("cartList", JSON.stringify(localCartList));
//         setCartList(localCartList);
//       }

//       router.push("/checkout");
//     } catch (error) {
//       console.log("Something went wrong", error);
//     }
//   };

//   const [mainImage, setMainImage] = useState("");

//   useEffect(() => {
//   if (details?.productHeroImage) {
//     setMainImage(details.productHeroImage);
//   }
// }, [details]);

//   return (
//     <div>
//       <Navbar selectedItem="Shop" />
//       <div style={{}} className="py-md-5">
//         <div className="container my-md-5 my-4 ">
//           <div className="d-flex mt-md-5 mt-5 breadcrumb">
//             <p style={{ color: "rgb(188 94 94)" }}>Home -</p>
//             <p style={{ color: "rgb(153 61 61)" }}>Shop -</p>
//             <p>{details?.name}</p>
//           </div>
//           <div className="row px-0 px-0  bg-white shadow-sm">
//             <div className="col-md-6 col-12 px-md-2 px-0">
//               <div className="row me-2 p-2">
//                 <div className="col-md-3 col-12 d-md-block d-flex order-md-1 order-2">
//                   {details?.productGallery?.map((v, i) => {
//                     return (
//                       <div className="border"  onClick={() => setMainImage(v)}>
//                         <img src={v} className="img-fluid" />
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div className="col-md-9 col-12 d-flex justify-content-center align-items-center border order-md-2 order-1 mb-2">
//                   <div
//                     className="zoomWrapper"
//                     onMouseMove={handleMouseMove}
//                     onMouseEnter={handleMouseEnter}
//                     onMouseLeave={handleMouseLeave}
//                   >
//                     <img
//                       ref={imgRef}
//                       // src={details?.productHeroImage}
//                        src={mainImage}
//                       className="zoomImage"
//                       alt="Product"
//                     />
//                   </div>
//                 </div>
//                 <div className="col-12  p-2 mt-3 order-3 d-md-block d-none">
//                   <div className="d-flex justify-content-end productDetailsLeftBtnGroup gap-3 mx-2 ">
//                     <p
//                       onClick={() => {
//                         if (!showDetails) {
//                           setShowDetail(true);
//                           setActiveTab("details");
//                           setShowReviews(false);
//                         } else {
//                           setShowDetail(false);
//                           setActiveTab("");
//                         }
//                       }}
//                       className={
//                         activeTab === "details" ? "selectedTabDetails" : ""
//                       }
//                     >
//                       Product Details
//                     </p>
//                     <p
//                       onClick={() => {
//                         if (!showReviews) {
//                           setShowReviews(true);
//                           setActiveTab("reviews");
//                           setShowDetail(false);
//                         } else {
//                           setShowReviews(false);
//                           setActiveTab("");
//                         }
//                       }}
//                       className={
//                         activeTab === "reviews" ? "selectedTabDetails" : ""
//                       }
//                     >
//                       Reviews
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6 col-12 px-0">
//               <div className="border rounded p-4 productDetailsDiv mt-md-0 mt-3 ms-2">
//                 <h5 className="badge" style={{ background: "#e76c6a" }}>
//                   Save{" "}
//                   {(
//                     ((details?.price - details?.discountedPrice) /
//                       details?.price) *
//                     100
//                   ).toFixed(2)}
//                   %
//                 </h5>
//                 <h1 className="my-2">{details?.map}</h1>
//                 <div className="d-flex align-items-center reviewDiv">
//                   {[1, 2, 3, 4]?.map((v, i) => {
//                     return (
//                       <img
//                         src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
//                         style={{ height: "20px", marginRight: "4px" }}
//                       />
//                     );
//                   })}
//                   <a>(4 reviews)</a>
//                 </div>
//                 <hr />
//                 <div className="varientDiv">
//                   <h4 className="mb-2">{details?.name}</h4>
//                 </div>
//                 <div>
//                   <h5 className="mb-mb-3 mb-1">
//                     M.R.P :{" "}
//                     <s className="text-secondary">Rs. {details?.price}</s>
//                   </h5>
//                 </div>
//                 <div>
//                   <h5>
//                     Discounted Price :{" "}
//                     <span className="discountedPrice">
//                       R.s {details?.discountedPrice}
//                     </span>{" "}
//                     ({details?.tax}) included
//                   </h5>
//                 </div>

//                 {/* <div className="d-flex counterDiv mt-md-4 mt-2">
//                 <p className="mb-0">-</p>
//                 <p  className="mb-0" >10</p>
//                 <p className="mb-0">+</p>
//               </div> */}

//                 <div className="d-flex justify-content-between mt-md-3 mt-1 gap-3 align-items-center productDetailsBtn">
//                   {cartList?.find((item) => item._id === details?._id) ? (
//                     <div
//                       className="d-flex align-items-center counterDiv w-100 overflow-hidden"
//                       style={{ borderRadius: "8px", height: "41px" }}
//                     >
//                       <p
//                         style={{ backgroundColor: "#6d0d0c", height: "100%" }}
//                         className="w-100 text-white mb-0 d-flex justify-content-center align-items-center "
//                         onClick={(e) => handleDecreaseQty(e, details)}
//                       >
//                         -
//                       </p>
//                       <p
//                         className="w-100 mb-0 d-flex justify-content-center align-items-center"
//                         style={{ backgroundColor: "#f9f5f5", height: "100%" }}
//                       >
//                         {
//                           cartList.find((item) => item._id === details?._id)
//                             ?.quantity
//                         }
//                       </p>
//                       <p
//                         className="w-100 text-white mb-0 d-flex justify-content-center align-items-center"
//                         style={{ backgroundColor: "#6d0d0c", height: "100%" }}
//                         onClick={(e) => handleIncreaseQty(e, details)}
//                       >
//                         +
//                       </p>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={(e) => handleAddToCartLocal(e, details)}
//                       className="w-100"
//                     >
//                       Add To Cart
//                     </button>
//                   )}

//                   <button
//                     className="w-100"
//                     onClick={(e) => handleBuyNow(e, details)}
//                   >
//                     Buy Now
//                   </button>
//                 </div>
//                 <hr />
//                 <div>
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: details?.shortDescription,
//                     }}
//                   ></div>
//                   <div className="mb-2">
//                     <u>read more</u>
//                   </div>
//                 </div>
//                 <div className="d-flex gap-1">
//                   <h5 style={{ minWidth: "140px" }}>Product Code : </h5>
//                   <h5 className=" text-secondary">{details?.hsnCode}</h5>
//                 </div>
//                 <div className="d-flex gap-1">
//                   <h5 style={{ minWidth: "140px" }}>Stock Quantity : </h5>
//                   <h5 className="text-secondary">{details?.stockQuantity}</h5>
//                 </div>
//                 <div className="d-flex gap-1">
//                   <h5 className="mb-0" style={{ minWidth: "140px" }}>
//                     Type :{" "}
//                   </h5>
//                   <h5 className="text-secondary">{details?.productType}</h5>
//                 </div>
//               </div>
//               <div className="col-12  p-2 mt-3 order-3 d-md-none d-block">
//                 <div className="d-flex justify-content-between productDetailsLeftBtnGroup">
//                   <p
//                     onClick={() => {
//                       if (!showDetails) {
//                         setShowDetail(true);
//                         setActiveTab("details");
//                         setShowReviews(false);
//                       } else {
//                         setShowDetail(false);
//                         setActiveTab("");
//                       }
//                     }}
//                     className={
//                       activeTab === "details" ? "selectedTabDetails" : ""
//                     }
//                   >
//                     Product Details
//                   </p>
//                   <p
//                     onClick={() => {
//                       if (!showReviews) {
//                         setShowReviews(true);
//                         setActiveTab("reviews");
//                         setShowDetail(false);
//                       } else {
//                         setShowReviews(false);
//                         setActiveTab("");
//                       }
//                     }}
//                     className={
//                       activeTab === "reviews" ? "selectedTabDetails" : ""
//                     }
//                   >
//                     Reviews
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {showDetails && (
//             <div className="bg-white p-4 shadow-sm rounded-3 mt-4 row productDetail">
//               <div className="">
//                 <h6 className="text-secondary">Product Description</h6>
//                 <p>{details?.shortDescription?.replace(/<[^>]*>/g, "")}</p>

//                 <h6 className="text-secondary">Detailed Overview</h6>
//                 <p>{details?.description?.replace(/<[^>]*>/g, "")}</p>

//                 <hr/>

//                 <h5 className="mb-3">Other Details</h5>

//                  <div className="d-flex gap-3 mb-3 align-items-center">
//                   <h6 className="text-secondary">Sound Level</h6>
//                   <p p className="mb-2">{details?.soundLevel?.replace(/<[^>]*>/g, "")}</p>
//                  </div>

//                 <div className="d-flex gap-3 mb-3 align-items-center">
//                    <h6 className="text-secondary">Light Effect</h6>
//                 <p className="mb-2" >{details?.lightEffect?.replace(/<[^>]*>/g, "")}</p>
//                 </div>

//                 <div className="d-flex gap-3 mb-3 align-items-center">
//                   <h6 className="text-secondary">Usage Area</h6>
//                 <p className="mb-2" >{details?.usageArea?.replace(/<[^>]*>/g, "")}</p>
//                 </div>

//                 <div className="d-flex gap-3 mb-3 align-items-center">
//                   <h6 className="text-secondary">Duration</h6>
//                 <p className="mb-2">{details?.duration}</p>
//                 </div>

//                <div className="d-flex gap-3 mb-3 align-items-center">
//                  <h6 className="text-secondary">Weight</h6>
//                 <p className="mb-2">{details?.weightPerBox}</p>
//                </div>

//                 <div className="d-flex gap-3 mb-3 align-items-center">
//                   <h6 className="text-secondary">Quantity per box</h6>
//                 <p className="mb-2">{details?.numberOfPieces}</p>
//                   </div>

//                  <div className="d-flex gap-3 mb-3 align-items-center">
//                    <h6 className="text-secondary">Safety Rating</h6>
//                 <p className="mb-2">{details?.safetyRating?.replace(/<[^>]*>/g, "")}</p>
//                  </div>
//               </div>

//             </div>
//           )}

//           {showReviews && (
//             <div className="productDetailsDiv mt-3 row">
//               <div className="col-12 border">
//                 <div className="  p-2">
//                   <h3 className="mb-0">Peopls Thought's</h3>

//                   <div className="row">
//                     {ratingList?.map((v, i) => {
//                       return (
//                         <div className="col-6">
//                           <div className="reviewBox p-2 py-3 shadow-sm mb-3 mt-2">
//                             <div className="d-flex align-items-center">
//                               <div>
//                                 <img
//                                 style={{maxWidth: "128px" , maxHeight:"128px"}}
//                                   src={
//                                     v?.userId?.profilePic
//                                       ? v?.userId?.profilePic
//                                       : "https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
//                                   }
//                                 />
//                               </div>
//                               <div className="ms-3">
//                                 <h5>
//                                   {v?.userId?.firstName +
//                                     " " +
//                                     v?.userId?.lastName}
//                                 </h5>
//                                 <div className="d-flex starGroup">
//                                   {[
//                                     ...Array(
//                                       Math.round(Number(v?.rating) || 0)
//                                     ),
//                                   ].map((_, i) => (
//                                     <img
//                                       key={i}
//                                       src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
//                                       style={{
//                                         height: "20px",
//                                         marginRight: "4px",
//                                       }}
//                                     />
//                                   ))}
//                                 </div>
//                                 <p className="mb-0">{v?.review}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default page;

// redsigned

"use client";
import React from "react";
import Navbar from "../../Components/Navbar";
import { useState, useEffect, useRef, useContext } from "react";
import { getProduct } from "../../services/product.service";
import { useParams } from "next/navigation";
import Footer from "../../Components/Footer";
import { LoggedDataContext } from "../../context/context";
import { useRouter } from "next/navigation";

function page() {
  const { cartList, setCartList } = useContext(LoggedDataContext);
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [ratingList, setRatingList] = useState(null);
  const router = useRouter();

  const getProductDetails = async () => {
    try {
      let response = await getProduct(id);
      setDetails(response?.product);
      setRatingList(response?.ratingList);
    } catch (error) {}
  };
  useEffect(() => {
    getProductDetails();
  }, [id]);

  const [showDetails, setShowDetail] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  const imgRef = useRef();

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => {
    imgRef.current.style.transform = "scale(1.2)";
  };

  const handleMouseLeave = () => {
    imgRef.current.style.transform = "scale(1)";
  };

  // add to cart

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

  // selected item
  const [activeTab, setActiveTab] = useState("details");

  // buy now function

  const handleBuyNow = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];
      const existingProduct = localCartList.find(
        (item) => item._id === product._id
      );

      if (!existingProduct) {
        localCartList.push({ ...product, quantity: 1 });
        localStorage.setItem("cartList", JSON.stringify(localCartList));
        setCartList(localCartList);
      }

      router.push("/checkout");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (details?.productHeroImage) {
      setMainImage(details.productHeroImage);
    }
  }, [details]);

  return (
    <div>
      <Navbar selectedItem="Shop" />
      <div style={{}} className="py-md-5">
        <div className="container my-md-5 my-4 shadow-sm">
          <div className="d-flex mt-md-5 mt-5 breadcrumb">
            <p
              style={{ color: "rgb(188 94 94)", cursor: "pointer" }}
              onClick={() => router.push("/")}
            >
              Home -
            </p>
            <p
              style={{ color: "rgb(153 61 61)", cursor: "pointer" }}
              onClick={() => router.push("/shop")}
            >
              Shop -
            </p>
            <p>{details?.name}</p>
          </div>
          <div className="row px-0 px-0  bg-white position-relative ">
            <div className="col-md-6 col-12 px-md-2 px-0 imageColumn p">
              <div className="row me-2 p-2 d-flex justify-content-end">
                <div className="col-md-3 col-12 d-md-block d-flex order-md-1 order-2">
                  {details?.productGallery?.map((v, i) => {
                    return (
                      <div className="border" onClick={() => setMainImage(v)}>
                        <img src={v} className="img-fluid" />
                      </div>
                    );
                  })}
                </div>
                <div className="col-md-9 col-12 d-flex justify-content-center align-items-center border order-md-2 order-1 mb-2">
                  <div
                    className="zoomWrapper"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      ref={imgRef}
                      // src={details?.productHeroImage}
                      src={mainImage}
                      className="zoomImage"
                      alt="Product"
                    />
                  </div>
                </div>
                <div className="row mt-2  p-2 order-3  justify-content-end d-flex">
                  <div className="d-flex justify-content-between mt-md-3 mt-1 gap-3 align-items-center productDetailsBtn col-sm-10 col-12 p-0">
                    {cartList?.find((item) => item._id === details?._id) ? (
                      <div
                        className="d-flex align-items-center counterDiv w-100 overflow-hidden"
                        style={{ borderRadius: "5px", height: "41px" }}
                      >
                        <p
                          style={{ backgroundColor: "#6d0d0c", height: "100%" }}
                          className="w-100 text-white mb-0 d-flex justify-content-center align-items-center "
                          onClick={(e) => handleDecreaseQty(e, details)}
                        >
                          -
                        </p>
                        <p
                          className="w-100 mb-0 d-flex justify-content-center align-items-center"
                          style={{ backgroundColor: "#f9f5f5", height: "100%" }}
                        >
                          {
                            cartList.find((item) => item._id === details?._id)
                              ?.quantity
                          }
                        </p>
                        <p
                          className="w-100 text-white mb-0 d-flex justify-content-center align-items-center"
                          style={{ backgroundColor: "#6d0d0c", height: "100%" }}
                          onClick={(e) => handleIncreaseQty(e, details)}
                        >
                          +
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => handleAddToCartLocal(e, details)}
                        className="w-100"
                      >
                        Add To Cart
                      </button>
                    )}

                    <button
                      className="w-100 "
                      onClick={(e) => handleBuyNow(e, details)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 px-0 detailColumn">
              <div className=" rounded p-4 productDetailsDiv mt-md-0 mt-3 ms-2">
                <h5 className="badge" style={{ background: "#e76c6a" }}>
                  Save{" "}
                  {(
                    ((details?.price - details?.discountedPrice) /
                      details?.price) *
                    100
                  ).toFixed(2)}
                  %
                </h5>
                <h1 className="my-2">{details?.map}</h1>

                <div className="varientDiv">
                  <h4 className="mb-2">{details?.name}</h4>
                </div>
                <div>
                  <h5 className="mb-mb-3 mb-1">
                    M.R.P :{" "}
                    <s className="text-secondary">Rs. {details?.price}</s>
                  </h5>
                </div>
                <div>
                  <h5>
                    Our Price :{" "}
                    <span className="discountedPrice">
                      Rs {details?.discountedPrice}
                    </span>{" "}
                  </h5>
                </div>

                <div className="mt-2 d-flex gap-2">
                  {details?.tags?.map((tag, index) => (
                    <p
                      key={index}
                      className="text-danger d-inline fw-bold"
                      style={{
                        border: "1px solid #ffd7d7",
                        backgroundColor: "#fce6e6",
                        padding: "3px 15px",
                        borderRadius: "18px",
                        fontWeight: "600", 
                        fontSize: "14px", 
                        letterSpacing: "0.5px",
                        marginBottom: "0", 
                      }}
                    >
                      {tag}
                    </p>
                  ))}
                </div>

                <div className="d-flex align-items-center reviewDiv">
                  {[1, 2, 3, 4]?.map((v, i) => {
                    return (
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
                        style={{ height: "20px", marginRight: "4px" }}
                      />
                    );
                  })}
                  <a>(4 reviews)</a>
                </div>

                <hr />
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: details?.shortDescription,
                    }}
                  ></div>
                  <div className="mb-2 mt-2">
                    <u>Read more</u>
                  </div>
                </div>
                <div className="d-flex gap-1">
                  <h5 style={{ minWidth: "140px" }}>Product Code : </h5>
                  <h5 className=" text-secondary">{details?.hsnCode}</h5>
                </div>
                <div className="d-flex gap-1">
                  <h5 style={{ minWidth: "140px" }}>Stock Quantity : </h5>
                  <h5 className="text-secondary">{details?.stockQuantity}</h5>
                </div>
                <div className="d-flex gap-1">
                  <h5 className="mb-0" style={{ minWidth: "140px" }}>
                    Type :{" "}
                  </h5>
                  <h5 className="text-secondary">{details?.productType}</h5>
                </div>

                <div className="d-flex justify-content-start productDetailsLeftBtnGroup gap-3 mx-2 mt-5">
                  <p
                    onClick={() => {
                      if (!showDetails) {
                        setShowDetail(true);
                        setActiveTab("details");
                        setShowReviews(false);
                      } else {
                        setShowDetail(false);
                        setActiveTab("");
                      }
                    }}
                    className={
                      activeTab === "details" ? "selectedTabDetails" : ""
                    }
                  >
                    Product Details
                  </p>
                  <p
                    onClick={() => {
                      if (!showReviews) {
                        setShowReviews(true);
                        setActiveTab("reviews");
                        setShowDetail(false);
                      } else {
                        setShowReviews(false);
                        setActiveTab("");
                      }
                    }}
                    className={
                      activeTab === "reviews" ? "selectedTabDetails" : ""
                    }
                  >
                    Reviews
                  </p>
                </div>
              </div>

              {/* show details */}

              {showDetails && (
                <div className=" p-4  rounded-3 mt-4 row productDetail">
                  <div className="">
                    <h6 className="text-secondary">Product Description</h6>
                    <p>{details?.shortDescription?.replace(/<[^>]*>/g, "")}</p>

                    <h6 className="text-secondary">Detailed Overview</h6>
                    <p>{details?.description?.replace(/<[^>]*>/g, "")}</p>

                    <hr />

                    <h5 className="mb-3">Other Details</h5>

                    <div className="d-flex gap-3 mb-3 align-items-center">
                      <h6 className="text-secondary">Sound Level</h6>
                      <p p className="mb-2">
                        {details?.soundLevel?.replace(/<[^>]*>/g, "")}
                      </p>
                    </div>

                    <div className="d-flex gap-3 mb-3 align-items-center">
                      <h6 className="text-secondary">Light Effect</h6>
                      <p className="mb-2">
                        {details?.lightEffect?.replace(/<[^>]*>/g, "")}
                      </p>
                    </div>

                    <div className="d-flex gap-3 mb-3 align-items-center">
                      <h6 className="text-secondary">Usage Area</h6>
                      <p className="mb-2">
                        {details?.usageArea?.replace(/<[^>]*>/g, "")}
                      </p>
                    </div>

                    <div className="d-flex gap-3 mb-3 align-items-center">
                      <h6 className="text-secondary">Duration</h6>
                      <p className="mb-2">{details?.duration}</p>
                    </div>

                    <div className="d-flex gap-3 mb-3 align-items-center">
                      <h6 className="text-secondary">Weight</h6>
                      <p className="mb-2">{details?.weightPerBox}</p>
                    </div>

                    <div className="d-flex gap-3 mb-3 align-items-center">
                      <h6 className="text-secondary">Quantity per box</h6>
                      <p className="mb-2">{details?.numberOfPieces}</p>
                    </div>

                    <div className="d-flex gap-3 mb-3 align-items-center">
                      <h6 className="text-secondary">Safety Rating</h6>
                      <p className="mb-2">
                        {details?.safetyRating?.replace(/<[^>]*>/g, "")}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* show review */}

              {showReviews && (
                <div className="productDetailsDiv mt-3 row">
                  <div className="col-12 ">
                    <div className="  p-2">
                      <h3 className="mb-3">Peopls Thought's</h3>

                      <div className="row">
                        {ratingList?.length === 0 ? (
                          <div className="col-12">
                            <p className="text-center text-muted my-5">
                              No reviews yet.
                            </p>
                          </div>
                        ) : (
                          ratingList?.map((v, i) => {
                            return (
                              <div className="col-12 ">
                                <div className="reviewBox p-1 py-3 shadow-sm mb-3 mt-2 border">
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <img
                                        style={{
                                          maxWidth: "118px",
                                          maxHeight: "118px",
                                        }}
                                        src={
                                          v?.userId?.profilePic
                                            ? v?.userId?.profilePic
                                            : "https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                                        }
                                      />
                                    </div>
                                    <div className="ms-3">
                                      <h5>
                                        {v?.userId?.firstName +
                                          " " +
                                          v?.userId?.lastName}
                                      </h5>
                                      <div className="d-flex starGroup">
                                        {[
                                          ...Array(
                                            Math.round(Number(v?.rating) || 0)
                                          ),
                                        ].map((_, i) => (
                                          <img
                                            key={i}
                                            src="https://cdn-icons-png.flaticon.com/128/1828/1828884.png"
                                            style={{
                                              height: "20px",
                                              marginRight: "4px",
                                            }}
                                          />
                                        ))}
                                      </div>
                                      <p className="mb-0">{v?.review}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* mobile view  */}
            </div>
          </div>

          <div className="d-flex gap-3"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
