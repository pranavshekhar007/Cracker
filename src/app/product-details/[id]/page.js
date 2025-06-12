"use client";
import React from "react";
import Navbar from "../../Components/Navbar";
import { useState, useEffect ,useRef } from "react";
import { getProduct } from "../../services/product.service";
import { useParams  } from "next/navigation";
import Footer from "../../Components/Footer";
function page() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  const getProductDetails = async () => {
    try {
      let response = await getProduct(id);
      setDetails(response);
    } catch (error) {}
  };
  useEffect(() => {
    getProductDetails();
  }, [id]);

  const [showDetails , setShowDetail] = useState(false);

   const imgRef = useRef();

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => {
    imgRef.current.style.transform = 'scale(1.2)';
  };

  const handleMouseLeave = () => {
    imgRef.current.style.transform = 'scale(1)';
  };

  return (
    <div>
      <Navbar selectedItem="Shop" />
      <div className="container my-md-5 my-4">
        <div className="d-flex mt-md-5 mt-2 breadcrumb">
          <p style={{ color: "#5EBC67" }}>Home -</p>
          <p style={{ color: "#3D9970" }}>Shop -</p>
          <p>{details?.name}</p>
        </div>
        <div className="row px-md-2 px-0 marginLeft0">
          <div className="col-md-6 col-12 row px-md-2 px-0">
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
            <div  className="zoomWrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
                <img
               ref={imgRef}
        src={details?.productHeroImage}
        className="zoomImage"
        alt="Product"
              />
            </div>
            </div>
            <div className="col-12  p-2 mt-3 order-3 d-md-block d-none">
              <div className="d-flex justify-content-end productDetailsLeftBtnGroup">
               <p onClick={() => setShowDetail(!showDetails)}>Product Details</p>
                <p>Reviews</p>
              </div>

        


            </div>
          </div>
          <div className="col-md-6 col-12 mx-md-2 mx-0 px-md-2 px-0">
            <div className="border rounded p-4 productDetailsDiv mt-md-0 mt-3">
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
                  M.R.P : <s className="text-secondary">Rs. {details?.price}</s>
                </h5>
              </div>
              <div>
                <h5>
                  Discounted Price :{" "}
                  <span className="discountedPrice">
                    R.s {details?.discountedPrice}
                  </span>{" "}
                  ({details?.tax}) included
                </h5>
              </div>
              <div className="d-flex counterDiv mt-md-4 mt-2">
                <p className="mb-0">-</p>
                <p  className="mb-0" >10</p>
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
              <p onClick={() => setShowDetail(!showDetails)}>Product Details</p>
                <p>Reviews</p>
                {/* <p>Nutritional Facts</p> */}
              </div>
            </div>
          </div>
        </div>

          {showDetails && (
  <div className="mt-4">
    <h6 className="text-secondary">Product Description</h6>
    <p>{details?.shortDescription?.replace(/<[^>]*>/g, '')}</p>

    <h6 className="text-secondary">Detailed Overview</h6>
    <p>{details?.description?.replace(/<[^>]*>/g, '')}</p>
  </div>
)}
      </div>
      <Footer/>
    </div>
  );
}

export default page;
