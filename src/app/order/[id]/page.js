"use client";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";
import React, { use } from "react";
import { useState, useEffect, useContext } from "react";
import { orderDetailsServ } from "@/app/services/product.service";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import moment from "moment";
import { useRouter } from "next/navigation";
import Payment from "@/app/Components/Payment";
import { addReviewServ } from "@/app/services/product.service";
import { LoggedDataContext } from "@/app/context/context";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const statusFlow = [
  { key: "orderPlaced", icon: "🛒", label: "Order Placed" },
  { key: "orderPacked", icon: "📦", label: "Packed" },
  { key: "shipping", icon: "🚚", label: "Shipping" },
  { key: "outForDelivery", icon: "📍", label: "Out For Delivery" },
  { key: "delivered", icon: "✅", label: "Delivered" },
  { key: "cancelled", icon: "❌", label: "Cancelled" },
];

const page = () => {
  const { cartList, setCartList } = useContext(LoggedDataContext);
  const [details, setDetails] = useState(null);
  const [loader, setLoader] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const { loggedUserData } = useContext(LoggedDataContext);

  const getOrderDetails = async () => {
    try {
      setLoader(true);
      let response = await orderDetailsServ(id);
      if (response?.statusCode == "200") {
        setDetails(response.data);
        setOrderId(response.data._id);
      }
    } catch (error) {}
    setLoader(false);
  };
  useEffect(() => {
    getOrderDetails();
  }, [id]);

  const [showReviewPopup, setReviewPopup] = useState(false);
  // review api

  const [form, setForm] = useState({
    rating: "",
    review: "",
  });

  const handleRatingChange = (e) => {
    setForm((prev) => ({ ...prev, rating: e.target.value }));
  };

  const handleReviewTextChange = (e) => {
    setForm((prev) => ({ ...prev, review: e.target.value }));
  };

  const [reviewProductId, setReviewProductId] = useState("");

  const handleSubmitReview = async () => {
    console.log("Review Form:", form);

    const payload = {
      rating: form.rating,
      review: form.review,
      userId: loggedUserData?._id,
      productId: reviewProductId,
    };

    try {
      const res = await addReviewServ(payload);
      console.log(res);

      if (res?.statusCode == "200") {
        toast.success(res?.message);
      }
      setReviewPopup(false);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleReviewShow = (id) => {
    setReviewPopup(true);
    setReviewProductId(id);
    console.log("product id", reviewProductId);
  };
  useEffect(() => {
    if (reviewProductId) {
      console.log("SET SUCCESSFULLY:", reviewProductId);
    }
  }, [reviewProductId]);

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

  return (
    <div>
        <Navbar/>
        <div className="order-details " style={{ backgroundColor: "#f9f9f9" }}>
        <div className="my-5 py-5">
          <div className="d-flex gap-3 ms-md-5 ms-2 ps-md-4">
            <img
              src="https://cdn-icons-png.flaticon.com/128/11519/11519951.png"
              style={{ height: "25px", width: "25px", cursor: "pointer" }}
              onClick={() => router.push("/my-orders")}
              className="m-2 "  ></img>
            <div>
              <h1 className="text-danger fs-3 mt-1">Your Order Details</h1>
              <p className="mb-4">
                Thanks for your order! Check out the details below.
              </p>
            </div>
          </div>

          {loader ? (
            <div className="container">
              <div className="row">
                {/* Left column: Order Status & Products */}
                <div className="col-lg-8 col-12">
                  <div className="mb-3 p-3 bg-white rounded shadow-sm">
                    <Skeleton height={25} width={150} className="mb-3" />
                    <Skeleton count={5} height={20} className="mb-2" />
                  </div>

                  <div className="mb-3 p-3 bg-white rounded shadow-sm">
                    <Skeleton height={25} width={150} className="mb-3" />
                    {[...Array(2)].map((_, idx) => (
                      <div
                        key={idx}
                        className="d-flex align-items-center gap-3 mb-3"
                      >
                        <Skeleton height={60} width={60} />
                        <div className="w-100">
                          <Skeleton height={20} width="80%" className="mb-2" />
                          <Skeleton height={15} width="60%" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right column: Info, Address, Payment */}
                <div className="col-lg-4 col-12">
                  {[...Array(3)].map((_, idx) => (
                    <div
                      key={idx}
                      className="mb-3 p-3 bg-white rounded shadow-sm"
                    >
                      <Skeleton height={25} width={120} className="mb-3" />
                      <Skeleton count={3} height={15} className="mb-2" />
                    </div>
                  ))}

                  <div className="mb-3 p-3 bg-white rounded shadow-sm">
                    <Skeleton height={25} width={100} className="mb-3" />
                    <Skeleton count={4} height={15} className="mb-2" />
                    <Skeleton height={30} width={100} className="mt-3" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container ">
              <div className="row">
                <div className="col-lg-8 col-12">
                  <div className="col-12 mb-3">
                    <div className="rounded-3 shadow-sm bg-white p-3 px-sm-5 px-3">
                      <h5 className="fs-5 mb-4 mt-3">Order status</h5>

                      {/* Order Status */}

                      <ul className="order-tracker ">
                        {statusFlow.map((step, idx) => {
                          if (
                            step.key === "cancelled" &&
                            details?.status !== "cancelled"
                          )
                            return null;

                          const currentIndex = statusFlow.findIndex(
                            (s) => s.key === details?.status
                          );
                          const isCompleted = idx < currentIndex;
                          const isActive = idx === currentIndex;

                          return (
                            <li
                              key={step.key}
                              className={`${
                                isCompleted
                                  ? "completed"
                                  : isActive
                                  ? "active"
                                  : "pending"
                              }`}
                            >
                              <div className="icon">{step.icon}</div>
                              <div className="details">
                                <strong>
                                  {step.label} -{" "}
                                  {moment(details?.createdAt)
                                    .add(idx, "days")
                                    .format("ddd, DD MMM YYYY")}
                                </strong>

                                {/* Optional message blocks */}
                                {step.key === "orderPlaced" && (
                                  <div className="text-muted small">
                                    An order has been placed.
                                    <br />
                                    {moment(details?.createdAt).format(
                                      "ddd, DD MMM YYYY - h:mmA"
                                    )}
                                    <br />
                                    Seller has processed your order.
                                    <br />
                                    {moment(details?.createdAt)
                                      .add(1, "days")
                                      .format("ddd, DD MMM YYYY - h:mmA")}
                                  </div>
                                )}

                                {step.key === "orderPacked" && (
                                  <div className="text-muted small">
                                    Your item has been picked up by courier
                                    partner.
                                    <br />
                                    {moment(details?.createdAt)
                                      .add(2, "days")
                                      .format("ddd, DD MMM YYYY - h:mmA")}
                                  </div>
                                )}

                                {step.key === "shipping" && (
                                  <div className="text-muted small">
                                    <strong>
                                      RQP Logistics – MFDS1400457854
                                    </strong>
                                    <br />
                                    Your item has been shipped.
                                    <br />
                                    {moment(details?.createdAt)
                                      .add(3, "days")
                                      .format("ddd, DD MMM YYYY - h:mmA")}
                                  </div>
                                )}

                                {step.key === "outForDelivery" && (
                                  <div className="text-muted small">
                                    Your item is out for delivery.
                                  </div>
                                )}

                                {step.key === "delivered" && (
                                  <div className="text-muted small">
                                    Order has been delivered successfully.
                                  </div>
                                )}

                                {step.key === "cancelled" && (
                                  <div className="text-muted small text-danger">
                                    This order was cancelled.
                                  </div>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    <div className="rounded-3 shadow-sm bg-white p-md-3 px-md-5 p-1">
                      <h5 className="fs-5 mb-4 mt-3">Products</h5>
                      {details?.product?.length > 0 &&
                        details.product.map((item, index) => (
                          <div
                            key={item._id}
                            className="d-flex flex-sm-nowrap flex-wrap gap-4 mb-4 border p-3 align-items-center"
                            style={{ borderRadius: "10px" }}
                          >
                            <img
                              src={
                                item?.productHeroImage ||
                                item?.productId?.productHeroImage
                              }
                              alt={item?.productId?.name}
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "7px",
                              }}
                            />
                            <div className="d-flex flex-sm-nowrap flex-wrap justify-content-between w-100">
                              <div>
                                <h6 className="mb-1">
                                  {item?.productId?.name}
                                </h6>
                                <p className="mb-1 text-muted">
                                  Quantity: <strong>{item.quantity}</strong>
                                </p>
                              </div>

                              <p className="mb-3 " style={{ color: "brown" }}>
                                ₹ <strong>{item.totalPrice}</strong>
                              </p>

                              <div className="d-flex gap-2">
                                <div>
                                  {cartList?.find(
                                    (item) => item._id === details?._id
                                  ) ? (
                                    <div
                                      className="d-flex align-items-center counterDiv w-100 overflow-hidden"
                                      style={{
                                        borderRadius: "8px",
                                        height: "41px",
                                      }}
                                    >
                                      <p
                                        style={{
                                          backgroundColor: "#6d0d0c",
                                          height: "100%",
                                        }}
                                        className="w-100 text-white mb-0 d-flex justify-content-center align-items-center "
                                        onClick={(e) =>
                                          handleDecreaseQty(e, details)
                                        }
                                      >
                                        -
                                      </p>
                                      <p
                                        className="w-100 mb-0 d-flex justify-content-center align-items-center"
                                        style={{
                                          backgroundColor: "#f9f5f5",
                                          height: "100%",
                                        }}
                                      >
                                        {
                                          cartList.find(
                                            (item) => item._id === details?._id
                                          )?.quantity
                                        }
                                      </p>
                                      <p
                                        className="w-100 text-white mb-0 d-flex justify-content-center align-items-center"
                                        style={{
                                          backgroundColor: "#6d0d0c",
                                          height: "100%",
                                        }}
                                        onClick={(e) =>
                                          handleIncreaseQty(e, details)
                                        }
                                      >
                                        +
                                      </p>
                                    </div>
                                  ) : (
                                    <button
                                      className="buyAgain rounded-3 "
                                      onClick={(e) =>
                                        handleAddToCartLocal(e, details)
                                      }
                                    >
                                      Buy Again
                                    </button>
                                  )}
                                </div>

                                <div>
                                  {details?.status === "delivered" && (
                                    <button
                                      class="btn-review"
                                      onClick={() =>
                                        handleReviewShow(item?.productId?._id)
                                      }
                                    >
                                      Add Review
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-12">
                  <div className="col-12 mb-3">
                    <div
                      className="rounded-3 shadow-sm bg-white p-3 px-4 d-flex justify-content-between"
                      onClick={() =>
                        router.push("/orderInvoice/" + details?._id)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex gap-2  align-items-center ">
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/7939/7939869.png"
                          style={{ width: "20px", height: "20px" }}
                        ></img>
                        <h5 className="mb-0" style={{ color: "#333333" }}>
                          Download Invoice
                        </h5>
                      </div>

                      <img
                        src="https://sa-web-h1a.flixcart.com/mosaic/ss/RightChevron.svg?q=80"
                        style={{ width: "20px", height: "20px" }}
                      ></img>
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    <div className="rounded-3 shadow-sm bg-white p-3 px-4  ">
                      <div
                        className="d-flex gap-3 mb-3 align-items-center"
                        style={{
                          paddingBottom: "15px",
                          borderBottom: "1px solid rgb(237 237 237)",
                        }}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/1008/1008014.png"
                          className="orderHeadingImage"
                        ></img>

                        <h5 className="mb-0" style={{ color: "#333333" }}>
                          Order Info
                        </h5>
                      </div>
                      <div className="d-flex gap-3">
                        <div className="orderName">
                          <p className="fw-bold  mb-2">Order Id:</p>
                          <p className="fw-bold mb-2"> Order Date:</p>
                        </div>
                        <div>
                          <div className="orderData">
                            <p className="mb-2">{details?._id.slice(0, 10)}</p>
                            <p className="mb-2">
                              {details?.createdAt
                                ? format(
                                    new Date(details.createdAt),
                                    "dd MMMM yyyy"
                                  )
                                : "—"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-12 mb-3">
                  <div className="rounded-3 shadow-sm bg-white p-3 px-4">
                    <div
                      className="d-flex gap-3 mb-3 align-items-center"
                      style={{
                        paddingBottom: "15px",
                        borderBottom: "1px solid rgb(237 237 237)",
                      }}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/1946/1946429.png"
                        className="orderHeadingImage"
                      ></img>
                      <h5 className="mb-0" style={{ color: "#333333" }}>
                        Customer Details
                      </h5>
                    </div>
                    <div className="d-flex gap-3">
                      <div className="orderName">
                        <p className="fw-bold  mb-2">Name:</p>
                        <p className="fw-bold mb-2">Phone:</p>
                        <p className="fw-bold mb-2">Email:</p>
                      </div>
                      <div>
                        <div className="orderData">
                          <p className="mb-2">
                            {details?.userId?.firstName +
                              " " +
                              details?.userId?.lastName}
                          </p>
                          <p className="mb-2">{details?.userId?.phone} </p>
                          <p className="mb-2">{details?.userId?.email} </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                  <div className="col-12 mb-3">
                    <div className="rounded-3 shadow-sm bg-white p-3 px-4">
                      <div
                        className="d-flex gap-3 mb-3 align-items-center"
                        style={{
                          paddingBottom: "15px",
                          borderBottom: "1px solid rgb(237 237 237)",
                        }}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/1483/1483234.png"
                          className="orderHeadingImage"
                        ></img>
                        <h5 className="mb-0" style={{ color: "#333333" }}>
                          Address
                        </h5>
                      </div>

                      <div className="d-flex gap-3">
                        <div className="orderName">
                          <p className="fw-bold  mb-2">Address:</p>
                        </div>
                        <div>
                          <div className="orderData">
                            <p className="mb-2">
                              {details?.address?.landmark +
                                ", " +
                                details?.address?.area +
                                ", " +
                                details?.address?.city +
                                ", " +
                                details?.address?.pincode +
                                ", " +
                                details?.address?.state +
                                ", " +
                                details?.address?.country}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    <div className="rounded-3 shadow-sm bg-white p-3 px-4">
                      <div
                        className="d-flex gap-3 mb-3 align-items-center"
                        style={{
                          paddingBottom: "15px",
                          borderBottom: "1px solid rgb(237 237 237)",
                        }}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/6519/6519159.png"
                          className="orderHeadingImage"
                        ></img>
                        <h5 className="mb-0" style={{ color: "#333333" }}>
                          Payment
                        </h5>
                      </div>

                      <div className="d-flex gap-3">
                        <div className="orderName">
                          <p className="fw-bold  mb-2">Subtotal:</p>
                          <p className="fw-bold  mb-2">Delivery Charges:</p>
                          <p className="fw-bold  mb-3">Discount:</p>
                          <p className="fw-bold  mb-2">Total:</p>
                        </div>
                        <div>
                          <div className="orderData">
                            <p className="mb-2">₹3000</p>
                            <p className="mb-2">₹{details?.deliveryCharge}</p>
                            <p className="mb-3">₹100</p>
                            <p className="mb-2">₹{details?.totalAmount}</p>
                          </div>
                        </div>
                      </div>

                      <hr />

                      <div className="d-flex gap-3 align-items-center">
                        <h6>payment status</h6>

                        {details?.paymentSs && details?.paymentSs !== "null" ? (
                          <h6 className="text-success fs-6"> Payment Done</h6>
                        ) : (
                          <h6 className="text-danger fs-6">Not Completed</h6>
                        )}

                        {(!details?.paymentSs ||
                          details?.paymentSs === "null") && (
                          <h6
                            className="btn btn-danger"
                            onClick={() => setShowPaymentPopup(true)}
                          >
                            Pay Now
                          </h6>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    {/* {
                   details?.status === "Deliverd" &&(
                     <button
                    class="btn-review"
                    onClick={() => setReviewPopup(!showReviewPopup)}
                  >
                    📝 Add Review
                  </button>
                   )
                 } */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* popup to add review  */}

        {showReviewPopup && (
          <div
            className="review-popup position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
          >
            <div
              className="bg-white p-sm-4 px-sm-5 p-3 py-4"
              style={{ width: "500px", maxWidth: "90%", borderRadius: "3%" }}
            >
              <div className=" text-center align-items-center mb-3">
                <h4>Write a Review</h4>
                <p class="text-sm text-gray-500 mb-sm-4 mb-2">
                  We value your feedback!
                </p>
              </div>

              <div className="d-flex flex-column ">
                <div class="star-rating mb-3 justify-content-center">
                  <input
                    type="radio"
                    name="rating"
                    id="star5"
                    value="5"
                    onChange={handleRatingChange}
                  />
                  <label for="star5">★</label>

                  <input
                    type="radio"
                    name="rating"
                    id="star4"
                    value="4"
                    onChange={handleRatingChange}
                  />
                  <label for="star4">★</label>

                  <input
                    type="radio"
                    name="rating"
                    id="star3"
                    value="3"
                    onChange={handleRatingChange}
                  />
                  <label for="star3">★</label>

                  <input
                    type="radio"
                    name="rating"
                    id="star2"
                    value="2"
                    onChange={handleRatingChange}
                  />
                  <label for="star2">★</label>

                  <input
                    type="radio"
                    name="rating"
                    id="star1"
                    value="1"
                    onChange={handleRatingChange}
                  />
                  <label for="star1">★</label>
                </div>

                <textarea
                  placeholder="Share your thoughts about the product"
                  rows={4}
                  onChange={handleReviewTextChange}
                  className="w-100 p-2 "
                  style={{ borderRadius: "8px" }}
                />

                {/* <div className="add-review mb-4">
      <h5>Add a photo or video</h5>

      <label htmlFor="imageUpload" className="upload-box w-100 text-center d-flex align-items-center justify-content-center">
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="img-preview"  
            style={{ maxWidth: "70px", maxHeight: "70px", objectFit: "contain", borderRadius: "8px", }}/>
        ) : (
          'Drop files here to upload'
        )}
      </label>

      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleImageChange}
        className="form-control d-none"
      />
                  </div> */}

                <div className="d-flex gap-3 w-100 mt-3">
                  <button
                    className="btn border-none  mt-3 mb-2 fw-bold"
                    onClick={() => setReviewPopup(!showReviewPopup)}
                    style={{
                      width: "50%",
                      backgroundColor: "rgb(211 211 211)",
                      borderRadius: "5px",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn disclaimerBtn border-none text-white mt-3 mb-2 fw-bold"
                    style={{
                      width: "50%",
                      backgroundColor: "#c01212",
                      borderRadius: "5px",
                    }}
                    onClick={handleSubmitReview}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Popup */}
      <Payment
        showPaymentPopup={showPaymentPopup}
        setShowPaymentPopup={setShowPaymentPopup}
        orderId={orderId}
      />

      <Footer />
    </div>
  );
};

export default page;
