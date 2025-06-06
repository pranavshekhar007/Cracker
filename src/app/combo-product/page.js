"use client"

import React from "react";
import Navbar from "../Components/Navbar";
import PriceFilter from "../Components/PriceFilter";
import ComboProductCard from "../Components/ComboProductCard";
import { getComboProductServ } from "../services/product.service";
import { useState , useEffect } from "react";


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
      }, [] );


  return (
    <>
      <Navbar />

      <div className="shop-page">
        <div className="shop-sections d-flex ">
          <div>
            {/* product search bar */}

            <p className="product-quantity">
              26 <span className="quantity-p">Products found</span>
            </p>

            <div className="products row">
              {products.map((product) => (
                // <div
                //   className="shop-product-card d-flex flex-column justify-content-between"
                //   key={product.id}
                // >
                //   <div>
                //     <img
                //       src={product.image}
                //       alt={product.description}
                //       className="product-img"
                //     />
                //     <p className="category1 mb-0">{product.category}</p>
                //     <p className="description">{product.description}</p>
                //     <div className="wishlist-icon">
                //       <img
                //         src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png"
                //         alt="wishlist"
                //       />
                //     </div>
                //   </div>
                //   <div>
                //     <div className="price d-flex gap-1">
                //     <p className="price1 text-muted text-decoration-line-through">
                //         ₹{product.price1}.00
                //       </p>
                //       <p className="price2  fw-bold">
                //         ₹{product.price2}.00
                //       </p>
                      
                //     </div>
                //     <button className="shop-addCart-btn">+ Add to Cart</button>
                //   </div>
                // </div>
        
         <div className="col-lg-3 col-md-4 col-6 mb-md-4 mb-2">
           <ComboProductCard
          value={product}
            // bgColor = {'#f0d0d0'}
            // borderRadius = {'15px'}
              innerHeight = {true}
             height = {true}
          />
          </div>

              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
