// import React from "react";

// const DailySell = () => {
//   return (
//     <>
//       <div className="daily-sells">
//         <h1 >Daily Best Sells</h1>
//         <div className="all-sells d-flex gap-4">
//           <div className="daily-sell1 daily-sell ">
//             <h3 className="text-white">Ground Chakkar.</h3>
//             <p className="text-white">Get the best deal before close.</p>
//             <div className="daily-shop d-flex gap-2 align-items-center justify-content-center my-3">
//               <p className="fs-5 mb-0 text-white fs-6">Shop Now</p>
//               <img src="/assets/next.png" alt="Next Icon" />
//             </div>
//           </div>

//           <div className="daily-sell">
//             <div className="daily-product-card d-flex flex-column justify-content-between">
//               <div>
//                 <img
//                   src="https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2024/08/Ground-Spinner-Ashoka-Photoroom.jpg?w=500&ssl=1"
//                   className="product-img"
//                 />
//                 <p className="category1 mb-0">Spinner</p>
//                 <p className="description ">Ground Spinner Ashoka – 10 Pcs</p>
//                 <div className="wishlist-icon">
//                   <img src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png" />
//                 </div>
//               </div>
//               <div>
//                 <div className="price d-flex gap-1">
//                   <p className="price2">66.00</p>
//                   <p className="price1"> 330.00</p>
//                 </div>
//                 <button className="addCart-btn"> + Add to Cart</button>
//               </div>
//             </div>
//           </div>

//           <div className="daily-sell">
//             <div className="daily-product-card d-flex  flex-column justify-content-between">
//               <div>
//                 <img
//                   src="https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2024/08/Ground-spinner-big-Photoroom.jpg?w=500&ssl=1"
//                   className="product-img"
//                 />
//                 <p className="category mb-0">Spinner</p>
//                 <p className="description ">Ground Spinner Big – 10 Pcs</p>
//                 <div className="wishlist-icon">
//                   <img src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png" />
//                 </div>
//               </div>
//               <div>
//                 <div className="price d-flex gap-1">
//                   <p className="price2">46.00</p>
//                   <p className="price1">230.00</p>
//                 </div>
//                 <button className="addCart-btn"> + Add to Cart</button>
//               </div>
//             </div>
//           </div>

//           <div className="daily-sell">
//             <div className="daily-product-card d-flex flex-column justify-content-between">
//               <div>
//                 <img
//                   src="https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2024/08/Ground-spinner-special-Photoroom.jpg?w=500&ssl=1"
//                   className="product-img"
//                 />
//                 <p className="category mb-0">Spinner</p>
//                 <p className="description ">Ground Spinner Special – 10 Pcs</p>
//                 <div className="wishlist-icon">
//                   <img src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png" />
//                 </div>
//               </div>
//               <div>
//                 <div className="price d-flex gap-1">
//                   <p className="price2">90.00</p>
//                   <p className="price1">450.00</p>
//                 </div>
//                 <button className="addCart-btn"> + Add to Cart</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DailySell;


import React from "react";
import ProductCard from "./ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DailySell = ({productList}) => {
  return (
    <>
      <div className="daily-sells">
        <h1  className="text-center">Daily Best Sells</h1>
        <div className="all-sells d-flex gap-4 justify-content-center">
          <div className="daily-sell1 daily-sell ">
            <h3 className="text-white">Ground Chakkar.</h3>
            <p className="text-white">Get the best deal before close.</p>
            <div className="daily-shop d-flex gap-2 align-items-center justify-content-center my-3">
              <p className="fs-5 mb-0 text-white fs-6">Shop Now</p>
              <img src="/assets/next.png" alt="Next Icon" />
            </div>
          </div>

          {productList && productList.length > 0 ? (
             productList.slice(0,3).map((product) => (
        
          <div className="daily-sell">
            <ProductCard value={product}
            bgColor = {'#f0d0d0'}
            borderRadius = {'15px'}
            innerHeight = {true}
             height = {true}
          />
            </div>

          ))
          ):(
             [1, 2, 3]?.map((v, i) => {
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
           )
        }
                
        </div>
      </div>
    </>
  );
};

export default DailySell;