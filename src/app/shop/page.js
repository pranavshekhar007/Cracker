// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Navbar from "@/app/Components/Navbar";
// import PriceFilter from "@/app/Components/PriceFilter";
// import ProductCard from "../Components/ProductCard";
// import { getProductServ , getCategory} from "../services/product.service";

// // const products = [
// //   {
// //     _id: 1,
// //     image:
// //       "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/chakker.png?resize=600%2C494&ssl=1",
// //     category: "Ground Chakkar",
// //     description: "Ground Chakkar Firecracker",
// //     price1: 250,
// //     price2: 200,
// //   },
// //   {
// //     _id: 2,
// //     image:
// //       "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/Flower-Pot.png?w=1136&ssl=1",
// //     category: "Flower Pots",
// //     description: "Beautiful Flower Pots",
// //     price1: 300,
// //     price2: 250,
// //   },
// //   {
// //     _id: 3,
// //     image:
// //       "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/sound.png?w=1136&ssl=1",
// //     category: "One Sound",
// //     description: "Loud One Sound Crackers",
// //     price1: 350,
// //     price2: 300,
// //   },
// //   {
// //     _id: 4,
// //     image:
// //       "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/sparklers.png?w=1136&ssl=1",
// //     category: "Sparklers",
// //     description: "Sparkling Sparklers",
// //     price1: 150,
// //     price2: 120,
// //   },
// //   {
// //     _id: 5,
// //     image:
// //       "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/Rocket.png?w=1136&ssl=1",
// //     category: "Novelties",
// //     description: "Exciting Novelties",
// //     price1: 400,
// //     price2: 350,
// //   },
// //   {
// //     _id: 6,
// //     image:
// //       "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/kids.png?w=1136&ssl=1",
// //     category: "New Arrivals",
// //     description: "Latest New Arrivals",
// //     price1: 280,
// //     price2: 230,
// //   },
// //   {
// //     _id: 7,
// //     image:
// //       "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/fountains.png?w=1136&ssl=1",
// //     category: "Choice of Fountain",
// //     description: "Beautiful Fountain Crackers",
// //     price1: 320,
// //     price2: 270,
// //   },
// //   {
// //     _id: 8,
// //     image:
// //       "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/fatafat.png?w=1136&ssl=1",
// //     category: "Fatafat",
// //     description: "Quick Fatafat Crackers",
// //     price1: 200,
// //     price2: 160,
// //   },
// //   {
// //     _id: 9,
// //     image:
// //       "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/fancy.png?w=1136&ssl=1",
// //     category: "Fancy",
// //     description: "Fancy Crackers",
// //     price1: 310,
// //     price2: 260,
// //   },
// //   {
// //     _id: 10,
// //     image:
// //       "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/bomb.png?w=1136&ssl=1",
// //     category: "Bombs",
// //     description: "Explosive Bombs",
// //     price1: 400,
// //     price2: 350,
// //   },
// //   {
// //     _id: 11,
// //     image:
// //       "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/bijili.png?w=1136&ssl=1",
// //     category: "Bijili",
// //     description: "Bright Bijili Crackers",
// //     price1: 280,
// //     price2: 230,
// //   },
// //   {
// //     _id: 12,
// //     image:
// //       "https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2023/08/30-shots.png?w=1136&ssl=1",
// //     category: "Multishots",
// //     description: "Multi-shot Fireworks",
// //     price1: 450,
// //     price2: 400,
// //   },
// // ];

// // const categories = [
// //   "All",
// //   "Bijili",
// //   "Bombs",
// //   "Choice of Fountain",
// //   "Fancy",
// //   "Fatafat",
// //   "Flower Pots",
// //   "Ground Chakkar",
// //   "Gun Crackling",
// //   "Mudpot",
// //   "MultiShots",
// //   "New Arrivals",
// //   "Novelties",
// //   "One Sound",
// //   "Paper Out",
// //   "Peacock",
// //   "Premium Skyshot",
// //   "Sattai",
// //   "Sparklers",
// //   "Uncategorized",
// // ];

// const Page = () => {
//   const params = useParams();
//   // const searchParams = useSearchParams();
//   const categoryFromUrl = params.category ? decodeURIComponent(params.category) : "All";

//   const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("featured");
//   const [showCount, setShowCount] = useState(10);
//   const [showMobileFilter, setShowMobileFilter] = useState(false);

//   const [products, setProductList] = useState([]);
//   const [showLoader, setShowLoader] = useState(false);


//   const getProductList = async () => {
//     setShowLoader(true);
//     try {
//       let response = await getProductServ();
//       console.log(response?.data);
//       if (response?.statusCode == "200") {
//         setProductList(response?.data);
//       }
//     } catch (error) {}
//     setShowLoader(false);
//   };

//    const [showLoaderCategory, setShowLoaderCategory] = useState(false);
//   const [categories, setCategoryList] = useState([]);
//   const getCategoryList = async () => {
//     setShowLoaderCategory(true);
//     try {
//       let response = await getCategory();
//       console.log(response?.data);
//       if (response?.statusCode == "200") {
//         setCategoryList(response?.data);
//       }
//     } catch (error) {
//        console.log("error in getting category" + error) 
//     }
//     setShowLoaderCategory(false);
   
//   };

//     useEffect(() => {
//     getProductList();
//     getCategoryList();
//   }, []);

//   useEffect(() => {
//     setSelectedCategory(categoryFromUrl);
//   }, [categoryFromUrl]);

//   // Filtered and sorted products using useMemo for performance
//   const filteredProducts = useMemo(() => {
//     let filtered = products;

//     // Filter by category
//     if (selectedCategory !== "All") {
//       filtered = filtered.filter(
//         (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
//       );
//     }

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
//           {/* MOBILE: Filter Toggle Button */}
//           <div className="d-md-none mb-3">
//             <button
//               className="btn btn-outline-danger"
//               onClick={() => setShowMobileFilter(true)}
//             >
//               <img
//                 src="https://cdn-icons-png.flaticon.com/128/15430/15430342.png"
//                 alt="filter icon"
//                 style={{ width: "20px", marginRight: "6px" }}
//               />
//               Filters
//             </button>
//           </div>
//            {/* DESKTOP: Sidebar Filter */}
//            <div className="category-section d-none d-md-block">
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
//                   <p className="mb-0">{cat.name}</p>
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

//             {/* product card */}

//             <div className="row my-4">
//               {filteredProducts.map((v , i) => (
               
//                  <div className="col-md-4 col-6 mb-3"> 
//                   <ProductCard value={v}/>
                  
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//        {/* MOBILE FILTER DRAWER */}
//        {showMobileFilter && (
//         <div
//           className="mobile-filter-drawer"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             height: "100vh",
//             width: "80%",
//             maxWidth: "300px",
//             backgroundColor: "#fff",
//             boxShadow: "-2px 0 8px rgba(0,0,0,0.3)",
//             zIndex: 9999,
//             padding: "20px",
//             overflowY: "auto",
//           }}
//         >
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5 className="mb-0">Filter</h5>
//             <button
//               className="btn btn-outline-secondary btn-sm"
//               onClick={() => setShowMobileFilter(false)}
//             >
//               Close
//             </button>
//           </div>
//           <h4>Category</h4>

//           {categories.map((cat) => (
//             <div
//               key={cat}
//               className={`category d-flex justify-content-between ${
//                 selectedCategory === cat ? "selected-category" : ""
//               }`}
//               onClick={() => {
//                 setSelectedCategory(cat);
//                 setShowMobileFilter(false); // Close on selection
//               }}
//               style={{
//                 cursor: "pointer",
//                 backgroundColor:
//                   selectedCategory === cat ? "#6d0d0c" : "transparent",
//                 color: selectedCategory === cat ? "white" : "black",
//                 padding: "8px 12px",
//                 borderRadius: "6px",
//                 transition: "background-color 0.3s ease, color 0.3s ease",
//                 userSelect: "none",
//               }}
//             >
//               <p className="mb-0">{cat}</p>
//               <img
//                 src="https://cdn-icons-png.flaticon.com/128/130/130884.png"
//                 alt="arrow icon"
//                 style={{
//                   filter: selectedCategory === cat ? "invert(1)" : "none",
//                   transition: "filter 0.3s ease",
//                 }}
//               />
//             </div>
//           ))}

//           <hr className="my-3" />
//           <PriceFilter />
//         </div>
//       )}
//     </>
//   );
// };

// export default Page;




"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/Components/Navbar";
import PriceFilter from "@/app/Components/PriceFilter";
import ProductCard from "../Components/ProductCard";
import { getProductServ , getCategory} from "../services/product.service";



const Page = () => {
  const params = useParams();
  // const searchParams = useSearchParams();
  const categoryFromUrl = params.category ? decodeURIComponent(params.category) : "All";

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [showCount, setShowCount] = useState(10);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

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

         const allCategory = { name: "All" };
      const categoryWithAll = [allCategory, ...response.data];

      setCategoryList(categoryWithAll);
        // setCategoryList(response?.data);
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

    // Filter by category
    // if (selectedCategory !== "All") {
    //   filtered = filtered.filter(
    //     (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    //   );
    // }

   if(selectedCategory !== "All"){
        filtered = filtered.filter((p) =>
    selectedCategory &&
    p.categoryId &&
    p.categoryId.some(
      (cat) =>
        cat.name &&
        cat.name === selectedCategory
    ));
   }

console.log("select category" + selectedCategory);
console.log("filtered product" + filtered);

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
          {/* MOBILE: Filter Toggle Button */}
          <div className="d-md-none mb-3">
            <button
              className="btn btn-outline-danger"
              onClick={() => setShowMobileFilter(true)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/15430/15430342.png"
                alt="filter icon"
                style={{ width: "20px", marginRight: "6px" }}
              />
              Filters
            </button>
          </div>
           {/* DESKTOP: Sidebar Filter */}
           <div className="category-section d-none d-md-block">
            <h5>Categories</h5>
            <div className="all-category mb-5">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className={`category d-flex justify-content-between  ${
                    selectedCategory === cat.name ? "selected-category" : ""
                  }`}
                 onClick={() => setSelectedCategory(cat.name)}
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
                  <p className="mb-0">{cat.name}</p>
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

            {/* product card */}

            <div className="row my-4">
              {filteredProducts.map((v , i) => (
               
                 <div className="col-md-4 col-6 mb-3"> 
                  <ProductCard value={v}/>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
       {/* MOBILE FILTER DRAWER */}
       {showMobileFilter && (
        <div
          className="mobile-filter-drawer"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "80%",
            maxWidth: "300px",
            backgroundColor: "#fff",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.3)",
            zIndex: 9999,
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Filter</h5>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setShowMobileFilter(false)}
            >
              Close
            </button>
          </div>
          <h4>Category</h4>

          {categories.map((cat) => (
            <div
              key={cat}
              className={`category d-flex justify-content-between ${
                selectedCategory === cat ? "selected-category" : ""
              }`}
              onClick={() => {
                setSelectedCategory(cat.name);
                setShowMobileFilter(false); // Close on selection
              }}
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

          <hr className="my-3" />
          <PriceFilter />
        </div>
      )}
    </>
  );
};

export default Page;
