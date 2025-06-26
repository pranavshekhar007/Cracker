// "use client";

// import React, { useState, useMemo, useEffect , useContext } from "react";
// import { useParams } from "next/navigation";
// import Navbar from "@/app/Components/Navbar";
// import PriceFilter from "@/app/Components/PriceFilter";
// import { getProductServ , getCategory} from "../services/product.service";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { toast } from "react-toastify";
// import { LoggedDataContext } from "../context/context";
// import { useRouter } from "next/navigation";
// import Footer from "../Components/Footer";

// const Page = () => {
//   const params = useParams();
//   // const searchParams = useSearchParams();
//   const categoryFromUrl = params.category
//     ? decodeURIComponent(params.category)
//     : "All";

//   const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("featured");

//   const [showMobileFilter, setShowMobileFilter] = useState(false);

//   const [products, setProductList] = useState([]);
//   const [showLoader, setShowLoader] = useState(false);
//    const [priceRange, setPriceRange] = useState([0, 500]);
//     const [showCount, setShowCount] = useState(10);

  
//     const getProductList = async () => {

//       setShowLoader(true);

//       const payload = {
//       pageCount: showCount
//       };
//       try {
//         let response = await getProductServ(payload);
//        console.log("response products" + response?.data);
//         if (response?.statusCode == "200") {
//           setProductList(response?.data);
//         }
//       } catch (error) {}
//         setShowLoader(false);
//     };
  
//      const [showLoaderCategory, setShowLoaderCategory] = useState(false);
//     const [categories, setCategoryList] = useState([]);
//     const getCategoryList = async () => {
//       setShowLoaderCategory(true);
//       try {
//         let response = await getCategory();
//         console.log( response?.data);
//         if (response?.statusCode == "200") {
  
//            const allCategory = { name: "All" };
//         const categoryWithAll = [allCategory, ...response.data];
  
//         setCategoryList(categoryWithAll);
//           // setCategoryList(response?.data);
//         }
//       } catch (error) {
//          console.log("error in getting category" + error) 
//       }
//       setShowLoaderCategory(false);
     
//     };
  
//     useEffect(() => {
    
//         getCategoryList();
//       }, []);
    
//         useEffect(() => {
//         getProductList();
//       }, [showCount]);

//   useEffect(() => {
//     setSelectedCategory(categoryFromUrl);
//   }, [categoryFromUrl]);

//   // Filtered and sorted products using useMemo for performance
//   const filteredProducts = useMemo(() => {
//     let filtered = products;

//     // Filter by category
//     // if (selectedCategory !== "All") {
//     //   filtered = filtered.filter(
//     //     (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
//     //   );
//     // }

//     if(selectedCategory !== "All"){
//         filtered = filtered.filter((p) =>
//     selectedCategory &&
//     p.categoryId &&
//     p.categoryId.some(
//       (cat) =>
//         cat.name &&
//         cat.name === selectedCategory
//     ));
//    }

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

//     // return filtered.slice(0, showCount);

//        // price filtering
//     if (priceRange.length === 2) {
//   filtered = filtered.filter(
//     (p) => p.discountedPrice >= priceRange[0] && p.discountedPrice <= priceRange[1]
//   );
// }



//     return filtered
//   }, [selectedCategory, searchTerm, sortOption, products , categories , priceRange]);


//   const { loggedUserData, cartList, setCartList } =  useContext(LoggedDataContext);
  
//     const handleAddToCartLocal = (e, v) => {
//       e.preventDefault();
//       e.stopPropagation();
//       try {
//         let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];
  
//         const existingProduct = localCartList.find((item) => item._id === v._id);
  
//         if (existingProduct) {
//           existingProduct.quantity += 1;
//         } else {
//           localCartList.push({ ...v, quantity: 1 });
//         }
  
//         localStorage.setItem("cartList", JSON.stringify(localCartList));
//         setCartList(localCartList);
//         toast.success("Item Added To the cart");
//       } catch (error) {
//         console.log("Something went wrong", error);
//       }
//     };
 
  
//     const handleIncreaseQty = (e, v) => {
//       e.preventDefault();
//       e.stopPropagation();
//       let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];
  
//       const existingProduct = localCartList.find((item) => item._id === v._id);
//       if (existingProduct) {
//         existingProduct.quantity += 1;
//       }
  
//       localStorage.setItem("cartList", JSON.stringify(localCartList));
//       setCartList(localCartList);
//     };
  
//     const handleDecreaseQty = (e, v) => {
//       e.preventDefault();
//       e.stopPropagation();
//       let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];
  
//       const existingProduct = localCartList.find((item) => item._id === v._id);
//       if (existingProduct) {
//         existingProduct.quantity -= 1;
//         if (existingProduct.quantity <= 0) {
//           localCartList = localCartList.filter((item) => item._id !== v._id);
//         }
//       }
  
//       localStorage.setItem("cartList", JSON.stringify(localCartList));
//       setCartList(localCartList);
//     };

// //     const productInCart = cartList?.find((item) => item._id === value._id);
// // const productQty = productInCart?.quantity || 0;


//   return (
//     <>
//       <Navbar />

//       <div className="shop-page">
//       <h1 className="text-center mb-4" style={{ color: '#6d0d0c' }}>Quick Buy</h1>
//         <div className="shop-sections d-flex flex-md-nowrap flex-wrap">
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

//           {/* DESKTOP: Sidebar Filter */}
//           <div className="category-section d-none d-md-block">
//             <h5>Categories</h5>
//             <div className="all-category mb-5">
//             {showLoaderCategory
//                              ? [1, 2, 3, 4 , 5 , 6 , 7 ,8]?.map((v, i) => {
//                                  return (
//                                    <div>
//                                      <div className="d-flex align-items-center px-2  text-light mb-1 shadow-sm rounded border">
//                                        {/* <Skeleton height={40} width={40}/> */}
//                                        <div className="m-1 w-100">
//                                          <Skeleton width="100%" height={40}/>
//                                          {/* <Skeleton width="100%" height={18}/> */}
                                         
//                                        </div>
//                                      </div>
//                                    </div>
//                                  );
//                                })
//                              : categories.map((cat) => (
//                 <div
//                   key={cat}
//                   className={`category d-flex justify-content-between align-items-center ${
//                     selectedCategory === cat.name ? "selected-category" : ""
//                   }`}
//                   onClick={() => setSelectedCategory(cat.name)}
//                   style={{
//                     cursor: "pointer",
//                     backgroundColor:
//                       selectedCategory === cat.name ? "#6d0d0c" : "transparent",
//                     color: selectedCategory === cat.name ? "white" : "black",
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
//                       filter: selectedCategory === cat.name ? "invert(1)" : "none",
//                       transition: "filter 0.3s ease",
//                     }}
//                   />
//                 </div>
//               ))}
//             </div>

//             <PriceFilter values={priceRange} setValues={setPriceRange}  />
//           </div>

//           <div className="item-section">
//             <div className="row gx-0   mb-2">
//               <div className="col-sm-9 col-6 p-2 rounded-2" style={{backgroundColor:"#e9e9e9"}}>
//                 <h5> {selectedCategory}</h5>
//               </div>
//               <div className="col-sm-3 col-6 ps-3 justify-content-end d-flex">
//                     <select  className="form-select form-select-sm  w-100 "
//                 value={showCount}
//                 onChange={(e) => setShowCount(Number(e.target.value))} >
//                 <option value={10}>Show: 10</option>
//                 <option value={20}>20</option>
//                 <option value={50}>50</option>
//               </select>
//               </div>
//             </div>
//             <div className="table-responsive">
//               <table className="table table-bordered align-middle">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Product Code</th>
//                     <th>Product Name (Packing)</th>
//                     {/* <th>Image</th> */}
//                     <th>MRP</th>
//                     <th>Product Price</th>
//                     <th>Quantity</th>
//                     <th>Billing Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                {showLoader
//                                 ? [1, 2, 3, 4 , 5 , 6 , 7 , 8]?.map((v, i) => {
//                                     return (
                                    
//                                           <tr key={`skeleton-${i}`} >
//                                             <td>  <Skeleton width="100%" height={40}/></td>
//                                             <td>  <Skeleton width="100%" height={40}/></td>
//                                             <td>  <Skeleton width="100%" height={40}/></td>
//                                             <td>  <Skeleton width="100%" height={40}/></td>
//                                             <td>  <Skeleton width="100%" height={40}/></td>
//                                             <td>  <Skeleton width="100%" height={40}/></td>
//                                           </tr>
                                          
                                       
//                                     );
//                                   })
//                                 : filteredProducts.map((product, index) => {
//                     const productInCart = cartList?.find((item) => item._id === product._id);
//                      const productQty = productInCart?.quantity || 0;                
//                   return(
                    
//                     <tr key={product._id}>
//                       <td>{product?.hsnCode}</td>
//                       <td>{product.name} (10pcs/box)</td>
//                       {/* <td>
//                         <img
//                           src={product.image}
//                           alt={product.description}
//                           style={{ width: "40px", height: "auto" }}
//                         />
//                       </td> */}
//                       <td>
//                         <span className="text-muted text-decoration-line-through">
//                           ₹{product.price}.00
//                         </span>
//                       </td>
//                       <td>₹{product.discountedPrice}.00</td>


//                       <td>
//                         {product.stockQuantity <= 0 ? (
//                           <span style={{ color: "red" }}>Out of stock</span>
//                         ): productQty > 0 ? (
//                           <div className="d-flex justify-content-between align-items-center  counterDiv text-center">
//                             <button
//                               className="  w-100 text-danger bg-white"
//                              onClick={(e) => handleDecreaseQty(e, product)}
//                              style={{border: "1px solid #dee2e6"}}
//                             >
//                               −
//                             </button>
//                             <span className="w-100">{productQty}</span>
//                             <button
//                               className=" w-100  text-success bg-white"
//                                onClick={(e) => handleIncreaseQty(e, product)}
//                                 style={{border: "1px solid #dee2e6"}}
//                             >
//                               +
//                             </button>
//                           </div>
//                         ) : (
//                           <button
//                             className="btn btn-danger btn-sm w-100"
//                              onClick={(e) => handleAddToCartLocal(e, product)}
//                           >
//                             Add To Cart
//                           </button>
//                         )}
//                       </td>

//                       <td>
//                         ₹
//                         {productQty > 0
//                           ? (productQty* product.discountedPrice).toFixed(2)
//                           : "0.00"}
//                       </td>
//                     </tr>
//                   )})}
                 
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* MOBILE FILTER DRAWER */}
//       {showMobileFilter && (
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
//               key={cat._id}
//               className={`category d-flex justify-content-between ${
//                 selectedCategory === cat.name ? "selected-category" : ""
//               }`}
//               onClick={() => {
//                 setSelectedCategory(cat.name);
//                 setShowMobileFilter(false); // Close on selection
//               }}
//               style={{
//                 cursor: "pointer",
//                 backgroundColor:
//                   selectedCategory === cat.name ? "#6d0d0c" : "transparent",
//                 color: selectedCategory === cat.name ? "white" : "black",
//                 padding: "8px 12px",
//                 borderRadius: "6px",
//                 transition: "background-color 0.3s ease, color 0.3s ease",
//                 userSelect: "none",
//               }}
//             >
//               <p className="mb-0">{cat.name}</p>
//               <img
//                 src="https://cdn-icons-png.flaticon.com/128/130/130884.png"
//                 alt="arrow icon"
//                 style={{
//                   filter: selectedCategory === cat.name ? "invert(1)" : "none",
//                   transition: "filter 0.3s ease",
//                 }}
//               />
//             </div>
//           ))}

//           <hr className="my-3" />
//           <PriceFilter values={priceRange} setValues={setPriceRange} />

//         </div>
//       )}
//       <Footer/>
//     </>
//   );
// };

// export default Page;



"use client";

import React, { useState, useMemo, useEffect , useContext } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/Components/Navbar";
import PriceFilter from "@/app/Components/PriceFilter";
import { getProductServ , getCategory} from "../services/product.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import { LoggedDataContext } from "../context/context";
import { useRouter } from "next/navigation";
import Footer from "../Components/Footer";

const Page = () => {
  const params = useParams();
  // const searchParams = useSearchParams();
  const categoryFromUrl = params.category
    ? decodeURIComponent(params.category)
    : "All";

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("featured");

  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [products, setProductList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
   const [priceRange, setPriceRange] = useState([0, 500]);
    // const [showCount, setShowCount] = useState(10);

    const [payload, setPayload] = useState({ pageCount: 10, pageNo: 1 });
    const [statics, setStatics] = useState({ totalCount: 0 });

  
  const getProductList = async () => {
  setShowLoader(true); 
      console.log("inside get product list")
  try {
    const response = await getProductServ({
      pageCount: payload.pageCount,
      pageNo: payload.pageNo,
    });

     console.log("all product" , response?.data)
    // if (response?.statusCode === "200") {
      setProductList(response?.data);
      console.log("all product" , response?.data)
      
      if (response?.documentCount?.totalCount) {
        const pages = Math.ceil(response.documentCount.totalCount / payload.pageCount);
        setTotalPages(pages);
        setStatics(response.documentCount); // ✅ Move this after response is available
      // }
    }
  } catch (error) {
    console.error("Error fetching products", error);
  }

  setShowLoader(false); // disable loader after request
};




     const [showLoaderCategory, setShowLoaderCategory] = useState(false);
    const [categories, setCategoryList] = useState([]);
    const getCategoryList = async () => {
      setShowLoaderCategory(true);
      try {
        let response = await getCategory();
        console.log( response?.data);
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
    
        getCategoryList();
      }, []);
    
        

      useEffect(() => {
  getProductList();
}, [payload]);

  useEffect(() => {
  getProductList();
}, []);

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  // Filtered and sorted products using useMemo for performance
  const filteredProducts = useMemo(() => {
    let filtered = products;

    console.log("all product filters" , products)

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

    // return filtered.slice(0, showCount);

       // price filtering
    if (priceRange.length === 2) {
  filtered = filtered.filter(
    (p) => p.discountedPrice >= priceRange[0] && p.discountedPrice <= priceRange[1]
  );
}


    
    return filtered
  }, [selectedCategory, searchTerm, sortOption, products , categories , priceRange , payload ]);


  const { loggedUserData, cartList, setCartList } =  useContext(LoggedDataContext);
  
    const handleAddToCartLocal = (e, v) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];
  
        const existingProduct = localCartList.find((item) => item._id === v._id);
  
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          localCartList.push({ ...v, quantity: 1 });
        }
  
        localStorage.setItem("cartList", JSON.stringify(localCartList));
        setCartList(localCartList);
        toast.success("Item Added To the cart");
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
 
  
    const handleIncreaseQty = (e, v) => {
      e.preventDefault();
      e.stopPropagation();
      let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];
  
      const existingProduct = localCartList.find((item) => item._id === v._id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
  
      localStorage.setItem("cartList", JSON.stringify(localCartList));
      setCartList(localCartList);
    };
  
    const handleDecreaseQty = (e, v) => {
      e.preventDefault();
      e.stopPropagation();
      let localCartList = JSON.parse(localStorage.getItem("cartList")) || [];
  
      const existingProduct = localCartList.find((item) => item._id === v._id);
      if (existingProduct) {
        existingProduct.quantity -= 1;
        if (existingProduct.quantity <= 0) {
          localCartList = localCartList.filter((item) => item._id !== v._id);
        }
      }
  
      localStorage.setItem("cartList", JSON.stringify(localCartList));
      setCartList(localCartList);
    };

//     const productInCart = cartList?.find((item) => item._id === value._id);
// const productQty = productInCart?.quantity || 0;


// pagination
  


 const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (statics?.totalCount && payload.pageCount) {
      const pages = Math.ceil(statics.totalCount / payload.pageCount);
      setTotalPages(pages);
    }
  }, [statics, payload.pageCount]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPayload({ ...payload, pageNo: newPage });
    }
  }

  return (
    <>
      <Navbar />

      <div className="shop-page">
      <h1 className="text-center mb-4" style={{ color: '#6d0d0c' }}>Quick Buy</h1>
        <div className="shop-sections d-flex flex-md-nowrap flex-wrap">
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
            {showLoaderCategory
                             ? [1, 2, 3, 4 , 5 , 6 , 7 ,8]?.map((v, i) => {
                                 return (
                                   <div>
                                     <div className="d-flex align-items-center px-2  text-light mb-1 shadow-sm rounded border">
                                       {/* <Skeleton height={40} width={40}/> */}
                                       <div className="m-1 w-100">
                                         <Skeleton width="100%" height={40}/>
                                         {/* <Skeleton width="100%" height={18}/> */}
                                         
                                       </div>
                                     </div>
                                   </div>
                                 );
                               })
                             : categories.map((cat) => (
                <div
                  key={cat}
                  className={`category d-flex justify-content-between align-items-center ${
                    selectedCategory === cat.name ? "selected-category" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat.name)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedCategory === cat.name ? "#6d0d0c" : "transparent",
                    color: selectedCategory === cat.name ? "white" : "black",
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
                      filter: selectedCategory === cat.name ? "invert(1)" : "none",
                      transition: "filter 0.3s ease",
                    }}
                  />
                </div>
              ))}
            </div>

            <PriceFilter values={priceRange} setValues={setPriceRange}  />
          </div>

          <div className="item-section">
            <div className="row gx-0   mb-2">
              <div className="col-sm-9 col-6 p-2 rounded-2" style={{backgroundColor:"#e9e9e9"}}>
                <h5> {selectedCategory}</h5>
              </div>
              {/* <div className="col-sm-3 col-6 ps-3 justify-content-end d-flex">
                    <select  className="form-select form-select-sm  w-100 "
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))} >
                <option value={10}>Show: 10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              </div> */}
            </div>
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Product Code</th>
                    <th>Product Name (Packing)</th>
                    {/* <th>Image</th> */}
                    <th>MRP</th>
                    <th>Product Price</th>
                    <th>Quantity</th>
                    <th>Billing Price</th>
                  </tr>
                </thead>
                <tbody>
               {showLoader
                                ? [1, 2, 3, 4 , 5 , 6 , 7 , 8]?.map((v, i) => {
                                    return (
                                    
                                          <tr key={`skeleton-${i}`} >
                                            <td>  <Skeleton width="100%" height={40}/></td>
                                            <td>  <Skeleton width="100%" height={40}/></td>
                                            <td>  <Skeleton width="100%" height={40}/></td>
                                            <td>  <Skeleton width="100%" height={40}/></td>
                                            <td>  <Skeleton width="100%" height={40}/></td>
                                            <td>  <Skeleton width="100%" height={40}/></td>
                                          </tr>
                                          
                                       
                                    );
                                  })
                                : filteredProducts.map((product, index) => {
                    const productInCart = cartList?.find((item) => item._id === product._id);
                     const productQty = productInCart?.quantity || 0;                
                  return(
                    
                    <tr key={product._id}>
                      <td>{product?.hsnCode}</td>
                      <td>{product.name} (10pcs/box)</td>
                      {/* <td>
                        <img
                          src={product.image}
                          alt={product.description}
                          style={{ width: "40px", height: "auto" }}
                        />
                      </td> */}
                      <td>
                        <span className="text-muted text-decoration-line-through">
                          ₹{product.price}.00
                        </span>
                      </td>
                      <td>₹{product.discountedPrice}.00</td>


                      <td>
                        {product.stockQuantity <= 0 ? (
                          <span style={{ color: "red" }}>Out of stock</span>
                        ): productQty > 0 ? (
                          <div className="d-flex justify-content-between align-items-center  counterDiv text-center">
                            <button
                              className="  w-100 text-danger bg-white"
                             onClick={(e) => handleDecreaseQty(e, product)}
                             style={{border: "1px solid #dee2e6"}}
                            >
                              −
                            </button>
                            <span className="w-100">{productQty}</span>
                            <button
                              className=" w-100  text-success bg-white"
                               onClick={(e) => handleIncreaseQty(e, product)}
                                style={{border: "1px solid #dee2e6"}}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            className="btn btn-danger btn-sm w-100"
                             onClick={(e) => handleAddToCartLocal(e, product)}
                          >
                            Add To Cart
                          </button>
                        )}
                      </td>

                      <td>
                        ₹
                        {productQty > 0
                          ? (productQty* product.discountedPrice).toFixed(2)
                          : "0.00"}
                      </td>
                    </tr>
                  )})}
                 
                </tbody>
              </table>
            </div>

            {/* pagination  start  .. */}
               <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-5 px-3 py-3 mt-4">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-semibold text-secondary">Show</span>
                    <select
                      className="form-select form-select-sm custom-select"
                      value={payload.pageCount}
                      onChange={(e) =>
                        setPayload({
                          ...payload,
                          pageCount: parseInt(e.target.value),
                          pageNo: 1,
                        })
                      }
                    >
                      {[10, 25, 50, 100].map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>

                  <nav>
                    <ul className="pagination pagination-sm mb-0 custom-pagination">
                      <li
                        className={`page-item ${
                          payload.pageNo === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(payload.pageNo - 1)}
                        >
                          &lt;
                        </button>
                      </li>

                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= payload.pageNo - 1 &&
                            page <= payload.pageNo + 1)
                        ) {
                          return (
                            <li
                              key={page}
                              className={`page-item ${
                                payload.pageNo === page ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(page)}
                              >
                                {page}
                              </button>
                            </li>
                          );
                        } else if (
                          (page === payload.pageNo - 2 && page > 2) ||
                          (page === payload.pageNo + 2 && page < totalPages - 1)
                        ) {
                          return (
                            <li key={page} className="page-item disabled">
                              <span className="page-link">...</span>
                            </li>
                          );
                        }
                        return null;
                      })}

                      <li
                        className={`page-item ${
                          payload.pageNo === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(payload.pageNo + 1)}
                        >
                          &gt;
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
            {/* pagination end ... */}
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
              key={cat._id}
              className={`category d-flex justify-content-between ${
                selectedCategory === cat.name ? "selected-category" : ""
              }`}
              onClick={() => {
                setSelectedCategory(cat.name);
                setShowMobileFilter(false); // Close on selection
              }}
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedCategory === cat.name ? "#6d0d0c" : "transparent",
                color: selectedCategory === cat.name ? "white" : "black",
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
                  filter: selectedCategory === cat.name ? "invert(1)" : "none",
                  transition: "filter 0.3s ease",
                }}
              />
            </div>
          ))}

          <hr className="my-3" />
          <PriceFilter values={priceRange} setValues={setPriceRange} />

        </div>
      )}
      <Footer/>
    </>
  );
};

export default Page;
