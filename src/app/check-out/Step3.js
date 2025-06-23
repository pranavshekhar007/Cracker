import React from 'react'

const Step3 = ({next , cartList}) => {

     const handleNext = () => {
    next();
  }

  return (
    <div  className=" p-4 mb-4 bg-white container d-flex flex-column justify-content-center align-items-center"
     style={{borderRadius:"13px", minHeight:"50vh"}}>

        <div style={{width: "70%"}} >
      <div 
            className="col-12 bg-white order-1 order-lg-2"
            style={{
              boxShadow:
                "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;",
            }}
          >
            <div style={{ fontFamily: "poppins" }}>
              <div className="offcanvas-header">
                <h6 className="fw-bold"> Your Cart Items </h6>
                {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              ></button> */}
              </div>

              <div className="offcanvas-body">
                {cartList?.map((item) => (
                  <div
                    className="d-flex mb-3 justify-content-between p-2 border-bottom "
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

                    <p className="cartPrice">{item?.quantity}</p>

                    <div style={{ minWidth: "75px" }} className=" text-end">
                      <p className="text-muted mt-1 mb-0 cartPrice">
                        <del>₹{item?.price ?? item?.pricing?.actualPrice}</del>
                      </p>
                      <p
                        style={{ color: "#e85159" }}
                        className="fw-bold cartPrice"
                      >
                        {" "}
                        (₹{item?.discountedPrice ?? item?.pricing?.comboPrice}*
                        {item?.quantity})
                      </p>
                    </div>
                  </div>
                ))}

                {/* <hr /> */}
              </div>
            </div>
          </div>
          </div>

          <div className="d-flex justify-content-end w-100">
        <button onClick={handleNext} className="btn btn-danger" > Next </button>
    </div>
    </div>
  )
}

export default Step3
