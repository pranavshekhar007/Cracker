
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/Components/Navbar";
import PriceFilter from "@/app/Components/PriceFilter";
import ProductCard from "../Components/ProductCard";
import { getProductServ , getCategory} from "../services/product.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "../Components/Footer";


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
 const [priceRange, setPriceRange] = useState([0, 500]);


  const getProductList = async () => {
    setShowLoader(true);

const payload = {
  pageCount: showCount
};

    try {
      let response = await getProductServ(payload);
      // console.table(response?.data);
     console.log("All products:", [...response?.data]);
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

    getCategoryList();
  }, []);

    useEffect(() => {
    getProductList();
  }, [showCount]);

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
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    switch (sortOption) {
      case "high to low":
        filtered = filtered.slice().sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "low to high":
        filtered = filtered.slice().sort((a, b) => a.discountedPrice - b.discountedPrice);
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
     
    // price filtering
    if (priceRange.length === 2) {
  filtered = filtered.filter(
    (p) => p.discountedPrice >= priceRange[0] && p.discountedPrice <= priceRange[1]
  );
}


    // return filtered.slice(0, showCount);
    return filtered;
  }, [selectedCategory, searchTerm, sortOption, showCount , products , categories , priceRange]);

  return (
    <>
      <Navbar/>
      <div className="shop-page">
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
                  ? [1, 2, 3, 4 , 5 , 6 , 7 , 8]?.map((v, i) => {
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
                  className={`category d-flex justify-content-between align-items-center  ${
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

           <PriceFilter values={priceRange} setValues={setPriceRange} />

          </div>

          <div className="item-section">
            {/* product search bar */}
            <div className="d-flex gap-2 mb-3 flex-sm-nowrap flex-wrap">
              <input
                className="product-search"
                placeholder="Search for products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

             <div className="d-flex gap-2">
               <select  className="form-select form-select-sm  w-auto "
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))} >
                <option value={10}>Show: 10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>

              <select  className="form-select form-select-sm w-auto "
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
            </div>

            <p className="product-quantity d-flex gap-2">
              {filteredProducts.length}{" "}
              <span className="quantity-p">Products found</span>
              <h6 className=" text-danger">{selectedCategory}</h6>
            </p>

            {/* product card */}

            <div className="row my-4">
             {showLoader
                ? [1, 2, 3, 4, 5, 6]?.map((v, i) => {
                    return (
                      <div className="col-md-4 col-6 mb-3  ">
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
                  })
                  :filteredProducts.map((v , i) => (
               
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
              key={cat._id}
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