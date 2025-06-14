"use client";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";
import React, { use } from "react";
import { useState, useEffect } from "react";
import { orderDetailsServ } from "@/app/services/product.service";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import moment from "moment";
import { useRouter } from "next/navigation";
import Payment from "@/app/Components/Payment";

const statusFlow = [
  { key: "orderPlaced", icon: "🛒", label: "Order Placed" },
  { key: "orderPacked", icon: "📦", label: "Packed" },
  { key: "shipping", icon: "🚚", label: "Shipping" },
  { key: "outForDelivery", icon: "📍", label: "Out For Delivery" },
  { key: "delivered", icon: "✅", label: "Delivered" },
  { key: "cancelled", icon: "❌", label: "Cancelled" },
];

const page = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const router = useRouter();

    const [showPaymentPopup, setShowPaymentPopup] = useState(false);
    const [orderId, setOrderId] = useState(null);

  const getOrderDetails = async () => {
    try {
      let response = await orderDetailsServ(id);
      setDetails(response.data);
      setOrderId(response.data._id)
    } catch (error) {}
  };
  useEffect(() => {
    getOrderDetails();
  }, [id]);


  const [showReviewPopup, setReviewPopup] = useState(false);

   const [imagePreview, setImagePreview] = useState(null);
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  

  return (
    <div>
      <Navbar />
      <div className="order-details " style={{ backgroundColor: "#f9f9f9" }}>
        <div className="my-5 py-5">
          <div className="d-flex gap-3 ms-md-5 ms-2 ps-md-4">
            <img
              src="https://cdn-icons-png.flaticon.com/128/11519/11519951.png"
              style={{ height: "25px", width: "25px" }}
              onClick={() => router.push("/my-orders")}
              className="m-2 "
            ></img>
            <div>
              <h1 className="text-danger fs-3 mt-1">Your Order Details</h1>
              <p className="mb-4">
                Thanks for your order! Check out the details below.
              </p>
            </div>
          </div>

          <div className="container ">
            <div className="row">
              <div className="col-lg-8 col-12">
                <div className="col-12 mb-3">
                  <div className="rounded-3 shadow-sm bg-white p-3 px-5">
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
                    {details?.product?.length > 0 ? (
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
                              <h6 className="mb-1">{item?.productId?.name}</h6>
                              <p className="mb-1 text-muted">
                                Quantity: <strong>{item.quantity}</strong>
                              </p>
                            </div>

                            <p className="mb-3 " style={{ color: "brown" }}>
                              ₹ <strong>{item.totalPrice}</strong>
                            </p>

                            <div>
                              <button className="buyAgain rounded-3 ">
                                Buy Again
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No products found in this order.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-12">
                <div className="col-12 mb-3">
                  <div className="rounded-3 shadow-sm bg-white p-3 px-4 d-flex justify-content-between">
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
                          <p className="mb-2">0</p>
                          <p className="mb-3">₹100</p>
                          <p className="mb-2">₹{details?.totalAmount}</p>
                        </div>
                      </div>
                    </div>

                    <hr/>

                  <div className="d-flex gap-3 align-items-center">

                    <h6>payment status</h6>
                    
                                 {details?.paymentSs === "null" ? (
        <h6 className="text-danger fs-6">Not Completed</h6>
      ) : (
        <h6 className="text-success fs-6"> Payment Done</h6>
      )}
        
           {details?.paymentSs === "null" && (
       <h6 className="btn btn-danger" onClick={() => setShowPaymentPopup(true)}>Pay Now</h6>

      ) }
       
                  </div>


                  </div>
                </div>

                <div className="col-12 mb-3">
                  <button
                    class="btn-review"
                    onClick={() => setReviewPopup(!showReviewPopup)}
                  >
                    📝 Add Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* popup to add review  */}
          
        {showReviewPopup && (
          <div
            className="review-popup position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
          >
            <div
              className="bg-white p-sm-4 px-sm-5 p-3"
              style={{ width: "500px", maxWidth: "90%" , borderRadius:"3%"}}
            >
              <div className=" text-center align-items-center mb-3">
                <h4>Write a Review</h4>
                <p class="text-sm text-gray-500 mb-sm-4 mb-2">We value your feedback!</p>
              </div>

                <div className="d-flex flex-column ">
                     <div class="star-rating mb-3 justify-content-center">
                <input type="radio" name="rating" id="star5" value="5" />
                <label for="star5">★</label>

                <input type="radio" name="rating" id="star4" value="4" />
                <label for="star4">★</label>

                <input type="radio" name="rating" id="star3" value="3" />
                <label for="star3">★</label>

                <input type="radio" name="rating" id="star2" value="2" />
                <label for="star2">★</label>

                <input type="radio" name="rating" id="star1" value="1" />
                <label for="star1">★</label>
              </div>

              <textarea
                placeholder="Share your thoughts about the product"
                rows={4}
                className="w-100 p-2 " style={{borderRadius:"8px"}}
              />

              {/* <div className="my-sm-4 my-2 w-100 ">
                <h6 className="mb-sm-3 mb-2">Add a Photo (optional)</h6>

                <input type="file" accept="image/*" className="form-control w-100" />
              </div> */}

                  <div className="add-review mb-4">
      <h5>Add a photo or video</h5>

      <label htmlFor="imageUpload" className="upload-box w-100 text-center d-flex align-items-center justify-content-center">
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="img-preview" />
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
    </div>

             <div className="d-flex gap-3 w-100">
              <button
                className="btn border-none  mt-3 mb-2 fw-bold"
                   onClick={() => setReviewPopup(!showReviewPopup)}
                style={{
                  width: "50%",
                  backgroundColor: "rgb(211 211 211)",
                  borderRadius: "5px", }}
               
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
         <Payment showPaymentPopup={showPaymentPopup} setShowPaymentPopup={setShowPaymentPopup} orderId = {orderId}/>
        
           
      <Footer />
    </div>
  );
};

export default page;
