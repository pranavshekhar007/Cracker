// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Navbar from "@/app/Components/Navbar";
// import PriceFilter from "@/app/Components/PriceFilter";
// import { getProductServ , getCategory} from "../services/product.service";



// const Page = () => {
//   const params = useParams();
//   // const searchParams = useSearchParams();
//   const categoryFromUrl = decodeURIComponent(params.category);

//   const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("featured");
//   const [showCount, setShowCount] = useState(10);

//    const [products, setProductList] = useState([]);
//     const [showLoader, setShowLoader] = useState(false);

//     const getProductList = async () => {
//       setShowLoader(true);
//       try {
//         let response = await getProductServ();
//         console.log(response?.data);
//         if (response?.statusCode == "200") {
//           setProductList(response?.data);
//         }
//       } catch (error) {}
//       setShowLoader(false);
//     };

//     const [showLoaderCategory, setShowLoaderCategory] = useState(false);
//      const [categories, setCategoryList] = useState([]);
//      const getCategoryList = async () => {
//        setShowLoaderCategory(true);
//        try {
//          let response = await getCategory();
//          console.log(response?.data);
//          if (response?.statusCode == "200") {
//            setCategoryList(response?.data);
//          }
//        } catch (error) {
//          console.log("error in getting category" + error) 
//        }
//        setShowLoaderCategory(false);
      
//      };
   
//        useEffect(() => {
//        getProductList();
//        getCategoryList();
//      }, []);

//   useEffect(() => {
//     setSelectedCategory(categoryFromUrl);
//   }, [categoryFromUrl]);

//   // Filtered and sorted products using useMemo for performance
//   const filteredProducts = useMemo(() => {
//     let filtered = products;

//     console.log("filtered" + filtered)

//     // Filter by category
//     // if (selectedCategory !== "All") {
//     //   filtered = filtered.filter(
//     //     (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
//     //   );
//     // }
//     if (selectedCategory && selectedCategory !== "All") {
//   filtered = filtered.filter(
//     (p) =>
//       typeof p.category === "string" &&
//       p.category.toLowerCase() === selectedCategory.toLowerCase()
//   );
// }


//     // Filter by search term
//     if (searchTerm.trim()) {
//       filtered = filtered.filter((p) =>
//         p.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Sort products
//     switch (sortOption) {
//       case "high to low":
//         filtered = filtered.slice().sort((a, b) => b.price2 - a.price2);
//         break;
//       case "low to high":
//         filtered = filtered.slice().sort((a, b) => a.price2 - b.price2);
//         break;
//       case "release date":
//         // Assuming products have a releaseDate field, else skip
//         break;
//       case "avg. rating":
//         // Assuming products have rating field, else skip
//         break;
//       case "featured":
//       default:
//         // No sorting or default sorting
//         break;
//     }

//     return filtered.slice(0, showCount);
//   }, [selectedCategory, searchTerm, sortOption, showCount , products , categories]);

//   return (
//     <>
//       <Navbar />

//       <div className="shop-page">
//         <div className="shop-sections d-flex">
//           <div className="category-section">
//             <h5>Categories</h5>
//             <div className="all-category mb-5">
//               {categories.map((cat) => (
//                 <div
//                   key={cat}
//                   className={`category d-flex justify-content-between ${
//                     selectedCategory === cat ? "selected-category" : ""
//                   }`}
//                   onClick={() => setSelectedCategory(cat)}
//                   style={{
//                     cursor: "pointer",
//                     backgroundColor:
//                       selectedCategory === cat ? "#6d0d0c" : "transparent",
//                     color: selectedCategory === cat ? "white" : "black",
//                     padding: "8px 12px",
//                     borderRadius: "6px",
//                     transition: "background-color 0.3s ease, color 0.3s ease",
//                     userSelect: "none",
//                   }}
//                 >
//                   <p className="mb-0">{cat}</p>
//                   <img
//                     src="https://cdn-icons-png.flaticon.com/128/130/130884.png"
//                     alt="arrow icon"
//                     style={{
//                       filter: selectedCategory === cat ? "invert(1)" : "none",
//                       transition: "filter 0.3s ease",
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>

//             <PriceFilter />

//             {/* Rating filter can be updated similarly if needed */}

//             <div className="daily-sell1 daily-selling ">
//               <h3 className="text-white">100% Natural & Organic Makhana.</h3>
//               <p className="text-white">Get the best deal before close.</p>
//               <div className="daily-shop d-flex gap-2 align-items-center justify-content-center my-3">
//                 <p className="fs-5 mb-0 text-white fs-6">Shop Now</p>
//                 <img src="/assets/next.png" alt="Next Icon" />
//               </div>
//             </div>
//           </div>

//           <div className="item-section">
//             {/* product search bar */}
//             <div className="d-flex gap-2 mb-3">
//               <input
//                 className="product-search"
//                 placeholder="Search for products"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />

//               <select
//                 className="form-select form-select-sm w-auto"
//                 value={showCount}
//                 onChange={(e) => setShowCount(Number(e.target.value))}
//               >
//                 <option value={10}>Show: 10</option>
//                 <option value={20}>20</option>
//                 <option value={50}>50</option>
//               </select>

//               <select
//                 className="form-select form-select-sm w-auto"
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//               >
//                 <option value="featured">Sort by: Featured</option>
//                 <option value="high to low">Price: High to Low</option>
//                 <option value="low to high">Price: Low to High</option>
//                 <option value="release date">Release Date</option>
//                 <option value="avg. rating">Avg. Rating</option>
//               </select>
//             </div>

//             <p className="product-quantity">
//               {filteredProducts.length}{" "}
//               <span className="quantity-p">Products found</span>
//             </p>

//             <div className="products">
//               {filteredProducts.map((product) => (
//                 <div
//                   className="shop-product-card d-flex flex-column justify-content-between"
//                   key={product.id}
//                 >
//                   <div>
//                     <img
//                       src={product.image}
//                       alt={product.description}
//                       className="product-img"
//                     />
//                     <p className="category1 mb-0">{product.category}</p>
//                     <p className="description">{product.description}</p>
//                     <div className="wishlist-icon">
//                       <img
//                         src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png"
//                         alt="wishlist"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <div className="price d-flex gap-1">
//                       <p className="shop-price2  fw-bold">
//                         ₹{product.price2}.00
//                       </p>
//                       <p className="shop-price1 text-muted text-decoration-line-through">
//                         ₹{product.price1}.00
//                       </p>
//                     </div>
//                     <button className="shop-addCart-btn">+ Add to Cart</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Page;


"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/Components/Navbar";
import PriceFilter from "@/app/Components/PriceFilter";
import { getProductServ , getCategory} from "../../services/product.service";



const Page = () => {
  const params = useParams();
  // const searchParams = useSearchParams();
  const categoryFromUrl = decodeURIComponent(params.category);

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [showCount, setShowCount] = useState(10);

   const [products, setProductList] = useState([]);
    const [showLoader, setShowLoader] = useState(false);

    const getProductList = async () => {
      setShowLoader(true);
      try {
        let response = await getProductServ();
        console.log(response?.data);
        if (response?.statusCode == "200") {
          setProductList(response?.data);
        }
      } catch (error) {}
      setShowLoader(false);
    };

    const [showLoaderCategory, setShowLoaderCategory] = useState(false);
     const [categories, setCategoryList] = useState([]);
     const getCategoryList = async () => {
       setShowLoaderCategory(true);
       try {
         let response = await getCategory();
         console.log(response?.data);
         if (response?.statusCode == "200") {
           setCategoryList(response?.data);
         }
       } catch (error) {
         console.log("error in getting category" + error) 
       }
       setShowLoaderCategory(false);
      
     };
   
       useEffect(() => {
       getProductList();
       getCategoryList();
     }, []);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  // Filtered and sorted products using useMemo for performance
  const filteredProducts = useMemo(() => {
    let filtered = products;

    console.log("filtered" + filtered)

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
  

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    switch (sortOption) {
      case "high to low":
        filtered = filtered.slice().sort((a, b) => b.price2 - a.price2);
        break;
      case "low to high":
        filtered = filtered.slice().sort((a, b) => a.price2 - b.price2);
        break;
      case "release date":
        // Assuming products have a releaseDate field, else skip
        break;
      case "avg. rating":
        // Assuming products have rating field, else skip
        break;
      case "featured":
      default:
        // No sorting or default sorting
        break;
    }

    return filtered.slice(0, showCount);
  }, [selectedCategory, searchTerm, sortOption, showCount , products , categories]);

  return (
    <>
      <Navbar />

      <div className="shop-page">
        <div className="shop-sections d-flex">
          <div className="category-section">
            <h5>Categories</h5>
            <div className="all-category mb-5">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className={`category d-flex justify-content-between ${
                    selectedCategory === cat ? "selected-category" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedCategory === cat ? "#6d0d0c" : "transparent",
                    color: selectedCategory === cat ? "white" : "black",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    userSelect: "none",
                  }}
                >
                  <p className="mb-0">{cat}</p>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/130/130884.png"
                    alt="arrow icon"
                    style={{
                      filter: selectedCategory === cat ? "invert(1)" : "none",
                      transition: "filter 0.3s ease",
                    }}
                  />
                </div>
              ))}
            </div>

            <PriceFilter />

            {/* Rating filter can be updated similarly if needed */}

            <div className="daily-sell1 daily-selling ">
              <h3 className="text-white">100% Natural & Organic Makhana.</h3>
              <p className="text-white">Get the best deal before close.</p>
              <div className="daily-shop d-flex gap-2 align-items-center justify-content-center my-3">
                <p className="fs-5 mb-0 text-white fs-6">Shop Now</p>
                <img src="/assets/next.png" alt="Next Icon" />
              </div>
            </div>
          </div>

          <div className="item-section">
            {/* product search bar */}
            <div className="d-flex gap-2 mb-3">
              <input
                className="product-search"
                placeholder="Search for products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="form-select form-select-sm w-auto"
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
              >
                <option value={10}>Show: 10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>

              <select
                className="form-select form-select-sm w-auto"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Sort by: Featured</option>
                <option value="high to low">Price: High to Low</option>
                <option value="low to high">Price: Low to High</option>
                <option value="release date">Release Date</option>
                <option value="avg. rating">Avg. Rating</option>
              </select>
            </div>

            <p className="product-quantity">
              {filteredProducts.length}{" "}
              <span className="quantity-p">Products found</span>
            </p>

            <div className="products">
              {filteredProducts.map((product) => (
                <div
                  className="shop-product-card d-flex flex-column justify-content-between"
                  key={product.id}
                >
                  <div>
                    <img
                      src={product.image}
                      alt={product.description}
                      className="product-img"
                    />
                    <p className="category1 mb-0">{product.category}</p>
                    <p className="description">{product.description}</p>
                    <div className="wishlist-icon">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png"
                        alt="wishlist"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="price d-flex gap-1">
                      <p className="shop-price2  fw-bold">
                        ₹{product.price2}.00
                      </p>
                      <p className="shop-price1 text-muted text-decoration-line-through">
                        ₹{product.price1}.00
                      </p>
                    </div>
                    <button className="shop-addCart-btn">+ Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
