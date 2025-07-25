

// "use client";
// import React, { useState } from "react";

// const Step4 = ({
//   cartList,
//   comboCartList,
//   addressForm,
//   deliveryCharge,
//   discount,
//   cityPrice,
//   amountReached,
//   placeOrderFunc,
//   next,
//   back,
// }) => {
//   const totalProducts =
//     (cartList?.reduce((total, item) => total + item.quantity, 0) || 0) +
//     (comboCartList?.reduce((total, item) => total + item.quantity, 0) || 0);

//   const totalPrice =
//     cartList?.reduce((total, item) => {
//       const price = item?.discountedPrice ?? item?.pricing?.comboPrice ?? 0;
//       return total + price * (item.quantity || 0);
//     }, 0) +
//     comboCartList?.reduce((total, item) => {
//       const price = item?.discountedPrice ?? item?.pricing?.comboPrice ?? 0;
//       return total + price * (item.quantity || 0);
//     }, 0);

//   const subTotal = totalPrice + deliveryCharge;

//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [nextMessage, setNextMessage] = useState("");

//   const handleBack = () => {
//     back();
//   };

//   const handlePlaceOrder = () => {
//     if (amountReached) {
//       placeOrderFunc();
//       setOrderPlaced(true);
//     }
//   };

//   const handleNext = () => {
//     if (orderPlaced) {
//       next();
//     } else {
//       setNextMessage("Please place your order first.");
//     }
//   };

//   return (
//     <div
//       className="p-sm-4 p-2 mb-4 bg-white container d-flex flex-column justify-content-center align-items-center"
//       style={{ borderRadius: "13px", minHeight: "50vh" }}
//     >
//       <div style={{ width: "70%" }} className="stepPage">
//         <h3 className="my-3 text-center">Order Summary</h3>
//         <div className="row">
//           <div className="col-12 mb-4">
//             {cityPrice && <p>Minimum Price for this city: ₹{cityPrice}</p>}

//             <div className="d-flex justify-content-between">
//               <h6 className="fw-bold">Total Products:</h6>
//               <p className="fs-5 fw-bold">{totalProducts}</p>
//             </div>

//             <div className="d-flex justify-content-between">
//               <h6 className="fw-bold">Total:</h6>
//               <p className="fs-5 fw-bold">₹{totalPrice}</p>
//             </div>

//             <div className="d-flex justify-content-between">
//               <h6 className="fw-bold">Delivery Charge:</h6>
//               <p className="fs-5 fw-bold">₹{deliveryCharge}</p>
//             </div>

//             {discount > 0 && (
//               <p style={{ color: "green", fontWeight: "500" }}>
//                 You are saving ₹{discount} on this order!
//               </p>
//             )}

//             <div className="d-flex justify-content-between">
//               <h6 className="fw-bold">Subtotal:</h6>
//               <p className="fs-5 fw-bold" style={{ color: "coral" }}>
//                 ₹{subTotal}
//               </p>
//             </div>

//             {amountReached ? (
//               <button
//                 className="btn btn-warning w-100 mt-3"
//                 onClick={handlePlaceOrder}
//                 disabled={orderPlaced}
//               >
//                 {orderPlaced ? "Order Placed" : "Place Order"}
//               </button>
//             ) : (
//               <button
//                 className="btn btn-warning w-100 mt-3"
//                 style={{ opacity: "0.5", cursor: "not-allowed" }}
//                 disabled
//               >
//                 Place Order
//               </button>
//             )}

//             {!amountReached && (
//               <div
//                 className="alert alert-danger d-flex align-items-center justify-content-between py-2 px-3 rounded mt-3"
//                 style={{ fontSize: "0.875rem" }}
//               >
//                 <span>Minimum order amount not reached</span>
//                 <button
//                   className="btn btn-sm btn-outline-danger"
//                   onClick={() => (window.location.href = "/")}
//                 >
//                   Continue Shopping
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {nextMessage && (
//           <p className="text-danger mt-3 text-end">{nextMessage}</p>
//         )}

//         <div className="d-flex justify-content-end gap-3 w-100 mt-3">
//           <button
//             onClick={handleBack}
//             className="btn"
//             style={{ backgroundColor: "#ffe6ea", border: "1px solid #ebcbd0" }}
//           >
//             Back
//           </button>
//           <button onClick={() => (window.location.href = "/")} className="btn btn-danger px-4">
//             More Shopping
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step4;



"use client";
import React, { useState } from "react";

const Step4 = ({
 apiCartList,
  addressForm,
  deliveryCharge,
  discount,
  cityPrice,
  amountReached,
  placeOrderFunc,
  next,
  back,
}) => {
  const totalProducts =
    (apiCartList?.reduce((total, item) => total + item.quantity, 0) || 0) 

  const totalPrice =
    apiCartList?.reduce((total, item) => {
      const price = item?.discountedPrice ?? item?.pricing?.comboPrice ?? 0;
      return total + price * (item.quantity || 0);
    }, 0);  

  const subTotal = totalPrice + deliveryCharge;
 

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [nextMessage, setNextMessage] = useState("");

  const handleBack = () => {
    back();
  };

  const handlePlaceOrder = () => {
    if (amountReached) {
      placeOrderFunc();
      setOrderPlaced(true);
    }
  };

  const handleNext = () => {
    if (orderPlaced) {
      next();
    } else {
      setNextMessage("Please place your order first.");
    }
  };

  return (
    <div
      className="p-sm-4 p-2 mb-4 bg-white container d-flex flex-column justify-content-center align-items-center"
      style={{ borderRadius: "13px", minHeight: "50vh" }}
    >
      <div style={{ width: "70%" }} className="stepPage">
        <h3 className="my-3 text-center">Order Summary</h3>
        <div className="row">
          <div className="col-12 mb-4">
            {cityPrice && (
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#ff3c00",
                }}
              >
                Minimum Price for this city: ₹{cityPrice}
              </p>
            )}
            <div className="d-flex justify-content-between">
              <h6 className="fw-bold">Total Products:</h6>
              <p className="fs-5 fw-bold">{totalProducts}</p>
            </div>

            <div className="d-flex justify-content-between">
              <h6 className="fw-bold">Total:</h6>
              <p className="fs-5 fw-bold">₹{totalPrice}</p>
            </div>

            <div className="d-flex justify-content-between">
              <h6 className="fw-bold">Delivery Charge:</h6>
              <p className="fs-5 fw-bold">₹{deliveryCharge ? deliveryCharge : 0}</p>
            </div>

            {discount > 0 && (
              <p >
                You are saving ₹{discount} on this order!
              </p>
            )}

            {deliveryCharge && deliveryCharge > 0 ? (
              <div className="d-flex justify-content-between">
              <h6 className="fw-bold">Subtotal:</h6>
              <p className="fs-5 fw-bold" style={{ color: "green", fontWeight: "500" }}>
                ₹{subTotal}
              </p>
            </div>
            ):(
              <div className="d-flex justify-content-between">
              <h6 className="fw-bold">Subtotal:</h6>
              <p className="fs-5 fw-bold" style={{ color: "coral" }}>
                ₹{totalPrice}
              </p>
            </div>
            )}

            {amountReached ? (
              <button
                className="btn btn-warning w-100 mt-3"
                onClick={handlePlaceOrder}
                disabled={orderPlaced}
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#b30000",
                }}
              >
                {orderPlaced ? "Order Placed" : "Place Order"}
              </button>
            ) : (
              <button
                className="btn btn-warning w-100 mt-3"
                style={{
                  opacity: "0.5",
                  cursor: "not-allowed",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "#b30000",
                }}
                disabled
              >
                Place Order
              </button>
            )}

            {!amountReached && (
              <div
                className="alert alert-danger d-flex align-items-center justify-content-between py-2 px-3 rounded mt-3"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#b30000",
                }}
              >
                <span>Minimum order amount not reached</span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => (window.location.href = "/")}
                  style={{ fontWeight: "bold" }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>

        {nextMessage && (
          <p className="text-danger mt-3 text-end">{nextMessage}</p>
        )}

        <div className="d-flex justify-content-end gap-3 w-100 mt-3">
          <button
            onClick={handleBack}
            className="btn"
            style={{ backgroundColor: "#ffe6ea", border: "1px solid #ebcbd0" }}
          >
            Back
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="btn btn-danger px-4"
          >
            More Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
