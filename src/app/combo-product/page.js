"use client";

import React from "react";
import Navbar from "../Components/Navbar";
import PriceFilter from "../Components/PriceFilter";
import ComboProductCard from "../Components/ComboProductCard";
import { getComboProductServ } from "../services/product.service";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// const products = [
//   {
//     id: 1,
//     image: "https://gustosafoods.com/wp-content/uploads/2024/10/4-suta-1.png",
//     category: "Raw Makhana",
//     description: "Yogibhog Makhana",
//     price1: 599,
//     price2: 499,
//   },
//   {
//     id: 2,
//     image: "https://gustosafoods.com/wp-content/uploads/2024/10/4-plus.png",
//     category: "Classic Makhana",
//     description: "Gustosa Super Makhana",
//     price1: 549,
//     price2: 449,
//   },
//   {
//     id: 3,
//     image:
//       "https://gustosafoods.com/wp-content/uploads/2025/02/5-plus-Handpicked-1152x1536.jpg",
//     category: "Tandoori Makhana",
//     description: "Spicy & Crispy",
//     price1: 499,
//     price2: 399,
//   },
//   {
//     id: 4,
//     image:
//       "https://gustosafoods.com/wp-content/uploads/2024/10/6-plus-hp-1024x1024.png",
//     category: "Peri Peri Makhana",
//     description: "Chatpata Delight",
//     price1: 459,
//     price2: 359,
//   },
//   {
//     id: 5,
//     image: "https://gustosafoods.com/wp-content/uploads/2024/10/3-suta-1.png",
//     category: "Pudina Makhana",
//     description: "Mint Magic",
//     price1: 489,
//     price2: 389,
//   },
//   {
//     id: 6,
//     image:
//       "https://gustosafoods.com/wp-content/uploads/2024/02/Cream__Onion-a-.png",
//     category: "Cheese Makhana",
//     description: "Cheesy Crunch",
//     price1: 519,
//     price2: 419,
//   },
//   {
//     id: 7,
//     image:
//       "https://gustosafoods.com/wp-content/uploads/2024/02/Jalapeno3-c-.png",
//     category: "Chocolate Makhana",
//     description: "Sweet & Healthy",
//     price1: 569,
//     price2: 469,
//   },
//   {
//     id: 8,
//     image:
//       "https://gustosafoods.com/wp-content/uploads/2024/02/Chatpata_Masala-a-png.png",
//     category: "Salted Makhana",
//     description: "Classic Salted",
//     price1: 429,
//     price2: 329,
//   },
//   {
//     id: 9,
//     image: "https://gustosafoods.com/wp-content/uploads/2024/02/Smokey-b-.png",
//     category: "Spicy Tomato Makhana",
//     description: "Zesty Flavor",
//     price1: 489,
//     price2: 389,
//   },
//   {
//     id: 10,
//     image: "https://gustosafoods.com/wp-content/uploads/2024/02/Pudina-a-.png",
//     category: "Masala Makhana",
//     description: "Indian Spice Mix",
//     price1: 499,
//     price2: 399,
//   },
// ];

const page = () => {
  const [products, setProductList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const getProductList = async () => {
    setShowLoader(true);
    try {
      let response = await getComboProductServ();
      console.log(response?.data);
      if (response?.statusCode == "200") {
        setProductList(response?.data);
      }
    } catch (error) {}
    setShowLoader(false);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      <Navbar />

      <div className="shop-page">
        <div className="shop-sections d-flex ">
          <div>
            {/* product search bar */}

            <p className="product-quantity">
               {products.length} <span className="quantity-p">Products found</span>
            </p>

            <div className="products row">

              {products && products.length > 0? (
                 products.map((product) => (
                <div className="col-lg-3 col-md-4 col-6 mb-md-4 mb-2">
                  <ComboProductCard
                    value={product}
                    innerHeight={true}
                    height={true}
                  />
                </div>
              ))
              ):(
                 [1, 2, 3 ,4 ,5 ,6 ,7 ,8 ]?.map((v, i) => {
                                    return (
                                      <div className="col-md-3 col-6 mb-3 daily-sell ">
                                        <div className="productCard shadow-sm border ">
                                          <div className="d-flex justify-content-between align-items-center heartIcon pe-2">
                                            <h6 className="badge border text-dark m-2">
                                              <Skeleton height={20} width={100} />
                                            </h6>
                                            <Skeleton height={20} width={20} />
                                          </div>
                
                                          <div className="w-100">
                                            <Skeleton height={180} width="100%" />
                                          </div>
                
                                          <div className="p-2">
                                            <h4>
                                              <Skeleton />
                                            </h4>
                                            <p>
                                              <Skeleton />
                                            </p>
                
                                            <div className="w-100 ">
                                              <Skeleton height={30} width="100%" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                               )
              )}
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
