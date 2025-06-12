"use client";
import React from "react";
import Navbar from "../../Components/Navbar";
import { useState, useEffect , useRef } from "react";
import { getComboProduct } from "../../services/product.service";
import { useParams } from "next/navigation";
import Footer from "../../Components/Footer";
function page() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  const getProductDetails = async () => {
    try {
      let response = await getComboProduct(id);
      setDetails(response);
    } catch (error) {}
  };
  useEffect(() => {
    getProductDetails();
  }, [id]);

  const [showDetails, setShowDetail] = useState(false);
  const [viewProducts, setViewProduct] = useState(false);

  // image zoom effect
   
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = 'scale(1.2)';
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = 'scale(1)';
    }
  };

  return (
    <div>
      <Navbar selectedItem="Shop" />
      <div style={{ backgroundColor: "#f5f5f5" }} className=" py-md-5 ">
        <div className="container  my-md-5 my-4">
          <div className="d-flex mt-md-5 mt-2 breadcrumb">
            <p style={{ color: "rgb(188 94 94)" }}>Home -</p>
            <p style={{ color: "rgb(153 61 61)" }}>Combo Product -</p>
            <p>{details?.name}</p>
          </div>
          <div className="row px-md-2 px-0 marginLeft0">
            <div className="col-md-6 col-12 row px-md-2 px-0 bg-white">
              <div className="col-md-3 col-12 d-md-block d-flex order-md-1 order-2">
                {details?.productGallery?.map((v, i) => {
                  return (
                    <div className="border">
                      <img src={v} className="img-fluid" />
                    </div>
                  );
                })}
              </div>
              <div className="col-md-9 col-12 d-flex justify-content-center align-items-center border order-md-2 order-1 mb-2">
               <div className="zoomWrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
                 <img
                    ref={imgRef}
        src={details?.productHeroImage || "https://via.placeholder.com/300"}
        className="zoomImage"
        alt="Product"
                  // className="img-fuild"
                  // style={{ height: "300px", width: "300px" }}
                />
               </div>

              </div>
              <div className="col-12  p-2 mt-3 order-3 d-md-block d-none">
                <div className="d-flex justify-content-center gap-2 productDetailsLeftBtnGroup ">
                  <p onClick={() => setViewProduct(!viewProducts)}>
                    View Products
                  </p>
                  <p onClick={() => setShowDetail(!showDetails)}>
                    Product Details
                  </p>
                  <p>Reviews</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 mx-md-2 mx-0 px-md-2 px-0 bg-white">
              <div className="border rounded p-4 productDetailsDiv mt-md-0 mt-3">
                <h5 className="badge" style={{ background: "#e76c6a" }}>
                  Save{" "}
                  {(
                    ((details?.pricing?.offerPrice -
                      details?.pricing?.comboPrice) /
                      details?.pricing?.offerPrice) *
                    100
                  ).toFixed(2)}
                  %
                </h5>
                <h1 className="my-2">{details?.map}</h1>
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
                <div className="varientDiv">
                  <h4 className="mb-2">{details?.name}</h4>
                </div>
                <div>
                  <h5 className="mb-mb-3 mb-1">
                    M.R.P :{" "}
                    <s className="text-secondary">
                      Rs. {details?.pricing?.offerPrice}
                    </s>
                  </h5>
                </div>
                <div>
                  <h5>
                    Discounted Price :{" "}
                    <span className="discountedPrice">
                      R.s {details?.pricing?.comboPrice}
                    </span>{" "}
                    ({details?.tax}) included
                  </h5>
                </div>
                <div className="d-flex counterDiv mt-md-4 mt-2">
                  <p className="mb-0">-</p>
                  <p className="mb-0">10</p>
                  <p className="mb-0">+</p>
                </div>
                <div className="d-flex justify-content-between mt-md-3 mt-1 align-items-center productDetailsBtn">
                  <button className="">Add To Cart</button>
                  <button className="">Buy Now</button>
                </div>
                <hr />
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: details?.shortDescription,
                    }}
                  ></div>
                  <u>read more</u>
                </div>
                <div>
                  <h5>
                    Product Code :{" "}
                    <span className="border  px-2 rounded">
                      {details?.hsnCode}
                    </span>
                  </h5>
                </div>
                <div>
                  <h5>
                    Stock Quantity :{" "}
                    <span className="border  px-2 rounded">
                      {details?.stockQuantity}
                    </span>
                  </h5>
                </div>
                <div>
                  <h5 className="mb-0">
                    Type :{" "}
                    <span className="border  px-2 rounded">
                      {details?.productType}
                    </span>
                  </h5>
                </div>
              </div>


              <div className="col-12  p-2 mt-3 order-3 d-md-none d-block">
                <div className="d-flex justify-content-between productDetailsLeftBtnGroup">
                  <p onClick={() => setViewProduct(!viewProducts)}>
                    View Products
                  </p>
                  <p onClick={() => setShowDetail(!showDetails)}>
                    Product Details
                  </p>
                  <p>Reviews</p>
                  {/* <p>Nutritional Facts</p> */}
                </div>
              </div>
            </div>
          </div>

          {/* product details */}

          {showDetails && (
            <div className="bg-white p-4 shadow-sm rounded-3 mt-4">
            <div className="">
              <h6 className="text-secondary">Product Description</h6>
              <p>{details?.shortDescription?.replace(/<[^>]*>/g, "")}</p>

              <h6 className="text-secondary">Detailed Overview</h6>
              <p>{details?.description?.replace(/<[^>]*>/g, "")}</p>
            </div>
            </div>
          )}

          {/* sub products of combo */}

          {viewProducts && (
            <div className="container my-4">
              <h2>Products</h2>
              <div className="bg-white p-4 shadow-sm rounded-3">
                {details?.productId?.map((item, index) => (
                  <div
                    key={item?.product.id}
                    className=" p-3 py-4 "
                    style={{ borderBottom: "1px solid #c1c1c1" }}
                  >
                    <div className="row g-0  justify-content-between">
                      <div className="col-md-2">
                       <div className="overflow-hidden">
                         <img
                          style={{ width: "160px", height: "auto" }}
                          src={item?.product.productHeroImage}
                          alt={item?.product.name}
                          className="img-fluid rounded-3 productImage mb-2 mb-sm-0"
                        />
                       </div>
                      </div>
                      <div className="col-md-3">
                        <h5 className="card-title mb-1">
                          {item?.product.name}
                        </h5>
                        <div className="tags">
                          {item?.product.tags.map((tag, index) => (
                            <span key={index} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <p>
                          {item?.product.shortDescription.replace(
                            /<[^>]*>/g,
                            ""
                          )}
                        </p>
                      </div>

                      <div className="col-md-3 text-md-center">
                        <p>Number of Pieces: {item?.product.numberOfPieces}</p>
                      </div>

                      <div className="col-md-3 align-items-center text-md-center">
                        <p className=" text-decoration-line-through">
                          ₹{item?.product.price}
                        </p>
                        <h6 className="text-success fw-bold fs-5">
                          Price: ₹{item?.product.discountedPrice}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default page;
