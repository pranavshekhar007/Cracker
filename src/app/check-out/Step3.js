// "use client";
// import React from "react";

// const Step3 = ({ next, cartList, back, comboCartList }) => {
//   const handleNext = () => {
//     next();
//   };

//   const handleBack = () => {
//     back();
//   };

//   return (
//     <div
//       className=" p-sm-4 p-1 mb-4 bg-white container d-flex flex-column justify-content-center align-items-center"
//       style={{ borderRadius: "13px", minHeight: "50vh" }}
//     >
//       <div style={{ width: "70%" }} className="stepPage">
//         <h3 className="my-3 text-center">Cart Items</h3>
//         <div
//           className="col-12 bg-white order-1 order-lg-2"
//           style={{
//             boxShadow:
//               "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;",
//           }}
//         >
//           <div style={{ fontFamily: "poppins" }}>
//             <div className="offcanvas-header">
//               {/* <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="offcanvas"
//               ></button> */}
//             </div>

//             <div className="offcanvas-body p-1">
//               {cartList?.map((item) => (
//                 <div
//                   className="d-flex mb-3 justify-content-between p-sm-2 p-1 border-bottom "
//                   key={item.id}
//                 >
//                   <div className="d-flex">
//                     <img
//                       src={item.productHeroImage}
//                       className="me-3   cartImg"
//                       style={{ width: "80px", height: "80px" }}
//                     />

//                     <h6
//                       style={{
//                         maxWidth: "130px",
//                         color: "#636363;",
//                         fontFamily: "poppins",
//                       }}
//                       className="cartName"
//                     >
//                       {item.name}
//                     </h6>
//                   </div>

//                   <p className="cartPrice">Items: {item?.quantity}</p>

//                   <div style={{ minWidth: "75px" }} className=" text-end">
//                     <p className="text-muted mt-1 mb-0 cartPrice">
//                       <del>₹{item?.price ?? item?.pricing?.actualPrice}</del>
//                     </p>
//                     <p
//                       style={{ color: "#e85159" }}
//                       className="fw-bold cartPrice"
//                     >
//                       {" "}
//                       (₹{item?.discountedPrice ?? item?.pricing?.comboPrice}*
//                       {item?.quantity})
//                     </p>
//                   </div>
//                 </div>
//               ))}
//               {comboCartList?.map((item) => (
//                 <div
//                   className="d-flex mb-3 justify-content-between p-sm-2 p-1 border-bottom "
//                   key={item.id}
//                 >
//                   <div className="d-flex">
//                     <img
//                       src={item.productHeroImage}
//                       className="me-3   cartImg"
//                       style={{ width: "80px", height: "80px" }}
//                     />

//                     <h6
//                       style={{
//                         maxWidth: "130px",
//                         color: "#636363;",
//                         fontFamily: "poppins",
//                       }}
//                       className="cartName"
//                     >
//                       {item.name}
//                     </h6>
//                   </div>

//                   <p className="cartPrice">Items: {item?.quantity}</p>

//                   <div style={{ minWidth: "75px" }} className=" text-end">
//                     <p className="text-muted mt-1 mb-0 cartPrice">
//                       <del>₹{item?.price ?? item?.pricing?.actualPrice}</del>
//                     </p>
//                     <p
//                       style={{ color: "#e85159" }}
//                       className="fw-bold cartPrice"
//                     >
//                       {" "}
//                       (₹{item?.discountedPrice ?? item?.pricing?.comboPrice}*
//                       {item?.quantity})
//                     </p>
//                   </div>
//                 </div>
//               ))}

//               {/* <hr /> */}
//             </div>
//           </div>
//         </div>

//         <div className="d-flex justify-content-end gap-3 w-100 mt-3">
//           <button
//             onClick={handleBack}
//             className="btn px-4"
//             style={{ backgroundColor: "#ffe6ea", border: "1px solid #ebcbd0" }}
//           >
//             Back
//           </button>
//           <button onClick={handleNext} className="btn btn-danger px-4">
//             {" "}
//             Continue{" "}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Step3;


"use client";
import React from "react";

const Step3 = ({ next, cartList, back, comboCartList , apiCartList }) => {
  const handleNext = () => {
    next();
  };

  const handleBack = () => {
    back();
  };

  return (
    <div
      className=" p-sm-4 p-1 mb-4 bg-white container d-flex flex-column justify-content-center align-items-center"
      style={{ borderRadius: "13px", minHeight: "50vh" }}
    >
      <div style={{ width: "70%" }} className="stepPage">
        <h3 className="my-3 text-center">Cart Items</h3>
        <div
          className="col-12 bg-white order-1 order-lg-2"
          style={{
            boxShadow:
              "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;",
          }}
        >
          <div style={{ fontFamily: "poppins" }}>
            <div className="offcanvas-header">
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              ></button> */}
            </div>

            <div className="offcanvas-body p-1">
              
               {apiCartList?.map((item) => (
                <div
                  className="d-flex mb-3 justify-content-between p-sm-2 p-1 border-bottom "
                  key={item.id}
                >
                  <div className="d-flex">
                    <img
                      src={item.productHeroImage}
                      className="me-3   cartImg"
                      style={{ width: "80px", height: "80px" }}
                    />

                    <h6
                      style={{
                        maxWidth: "130px",
                        color: "#636363;",
                        fontFamily: "poppins",
                      }}
                      className="cartName"
                    >
                      {item.name}
                    </h6>
                  </div>

                  <p className="cartPrice">Items: {item?.quantity}</p>

                  <div style={{ minWidth: "75px" }} className=" text-end">
                    <p className="text-muted mt-1 mb-0 cartPrice">
                      <del>₹{item?.price ?? item?.price}</del>
                    </p>
                    <p
                      style={{ color: "#e85159" }}
                      className="fw-bold cartPrice"
                    >
                      {" "}
                      (₹{item?.discountedPrice}*
                      {item?.quantity})
                    </p>
                  </div>
                </div>
              ))}

              {/* <hr /> */}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3 w-100 mt-3">
          <button
            onClick={handleBack}
            className="btn px-4"
            style={{ backgroundColor: "#ffe6ea", border: "1px solid #ebcbd0" }}
          >
            Back
          </button>
          <button onClick={handleNext} className="btn btn-danger px-4">
            {" "}
            Continue{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
