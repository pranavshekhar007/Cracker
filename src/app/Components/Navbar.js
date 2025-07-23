
// "use client";
// import React, { useState, useContext } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { LoggedDataContext } from "../context/context";
// import "../globals.css";
// import Search from "./Search";

// const Navbar = () => {
//   const pathname = usePathname();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
//   const { loggedUserData } = useContext(LoggedDataContext);
//   const router = useRouter();

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
//   const toggleMobileSearch = () => setMobileSearchOpen(!mobileSearchOpen);

//   // 🔁 Conditional navigation logic
//   const handleProfileClick = () => {
//     console.log(loggedUserData);
//     if (loggedUserData) {
//       router.push("/profile");
//     } else {
//       router.push("/signup");
//     }
//   };

//   return (
//     <>
//       {/* Top Navbar */}
//       <div className="navbar-outer fixed-top d-flex py-2 justify-content-between align-items-center bg-white shadow">
//         <div className="logo">
//           <Link href="/">
//             <img
//               src="https://bigbangcrackers.com/wp-content/uploads/2023/08/cropped-big-bang-logo-png-1.png"
//               alt="logo"
//               className="logo-img"
//             />
//           </Link>
//         </div>

//         <div className="d-flex ham-search align-items-center gap-3">
//           {/* Hamburger icon (mobile only) */}
//           <div
//             className="hamburger only-mobile custom-hide"
//             onClick={toggleMenu}
//           >
//             <img
//               src="https://cdn-icons-png.flaticon.com/128/1828/1828859.png"
//               alt="menu"
//             />
//           </div>
//         </div>

//         {/* Collapsible Nav Menu */}
//         <ul
//           className={`nav-links list-unstyled mb-0 ${menuOpen ? "open" : ""}`}
//         >
//           <li className={pathname === "/" ? "active-link" : ""}>
//             <Link href="/">Home</Link>
//           </li>
//           <li className={pathname === "/shop" ? "active-link" : ""}>
//             <Link href="/shop">Shop</Link>
//           </li>
//           <li className={pathname === "/category" ? "active-link" : ""}>
//             <Link href="/category">Shop By Category</Link>
//           </li>
//           <li className={pathname === "/combo-product" ? "active-link" : ""}>
//             <Link href="/combo-product">Combo Products</Link>
//           </li>
//           <li className={pathname === "/one-page-list" ? "active-link" : ""}>
//             <Link href="/one-page-list">One Page List</Link>
//           </li>
//         </ul>

//         {/* Desktop Search Bar (Hidden on small screens) */}
//         <div className="search-desktop">
//           <Search
//             onSearch={(query) => console.log("Searching for:", query)}
//             variant="desktop"
//           />
//         </div>

//         {/* Nav Icons */}
//         <div className="nav-icons  d-md-flex gap-3 align-items-center">
//           {/* <img
//             src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png"
//             alt="icon1"
//           /> */}
//           {/* 🔁 Profile icon with conditional redirect */}
//           {loggedUserData && loggedUserData.profilePic ? (
//             <img
//               src={loggedUserData.profilePic}
//               alt="user-profile"
//               className="rounded-circle d-none d-md-block"
//               title="Go to Profile"
//               onClick={handleProfileClick}
//               style={{
//                 cursor: "pointer",
//                 width: "35px",
//                 height: "35px",
//                 objectFit: "cover",
//                 borderRadius: "50%",
//               }}
//             />
//           ) : (
//             <img
//               src="https://cdn-icons-png.flaticon.com/128/15494/15494722.png"
//               alt="profile-icon"
//               title="Sign Up / Login"
//               onClick={handleProfileClick}
//               style={{ cursor: "pointer", width: "30px", height: "30px" }}
//             />
//           )}

//             <img
//             src="https://cdn-icons-png.flaticon.com/128/665/665865.png"
//             alt="icon3"
//             className="nav-icon-img"
//           />
         
//         </div>
         
//       </div>

//       {/* Full-width mobile search bar */}
//       {mobileSearchOpen && (
//         <div
//           className="mobile-search-container d-md-none p-3 bg-white shadow fixed-top"
//           style={{ top: "40px", zIndex: 1050 }}
//         >
//           <Search
//             onSearch={(query) => console.log("Searching for:", query)}
//             variant="mobile"
//           />
//         </div>
//       )}

//       {/* Mobile Bottom Navigation */}
//       <div className="footer-links d-md-none fixed-bottom bg-white shadow-lg d-flex justify-content-around align-items-center py-2 border-top">
//         <Link href="/" className="text-center">
//           <img
//             src="https://cdn-icons-png.flaticon.com/128/1946/1946488.png"
//             alt="Home"
//             width="18"
//           />
//           <div className="my-small">Home</div>
//         </Link>

//         <div className="text-center">
//           <div
//             className="mobile-search-icon d-md-none"
//             onClick={toggleMobileSearch}
//           >
//             <img
//               src="https://cdn-icons-png.flaticon.com/128/622/622669.png"
//               alt="search"
//               height={18}
//               width="18"
//             />
//           </div>
//           <div className="my-small">Search</div>
//         </div>

//         <div onClick={toggleMenu} className="text-center">
//           <img
//             src="https://cdn-icons-png.flaticon.com/128/1828/1828859.png"
//             alt="Menu"
//             width="18"
//           />
//           <div className="my-small">Menu</div>
//         </div>

//         <Link href="/cart" className="text-center">
//           <img
//             src="https://cdn-icons-png.flaticon.com/128/3144/3144456.png"
//             alt="Cart"
//             width="18"
//           />
//           <div className="my-small">Cart</div>
//         </Link>

//         <Link href="/signup" className="text-center">
//           <img
//             src="https://cdn-icons-png.flaticon.com/128/847/847969.png"
//             alt="User"
//             width="18"
//           />
//           <div className="my-small">Me</div>
//         </Link>
//       </div>
//     </>
//   );
// };

// export default Navbar;



"use client";
import React, { useState, useContext ,  useRef , useEffect} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LoggedDataContext } from "../context/context";
import { addToCartServ, removeIemToCartServ, removeToCartServ, userCartList } from "../services/product.service";
import "../globals.css";
import Search from "./Search";
import { toast } from "react-toastify";


const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [footerMenuOpen, setfooterMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { loggedUserData, comboCartList, setComboCartList , cartList , setCartList , apiCartList , setApiCartList} = useContext(LoggedDataContext);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleFooterMenu = () => {
    setfooterMenuOpen(!footerMenuOpen);
  };


  const toggleMobileSearch = () => setMobileSearchOpen(!mobileSearchOpen);

  // 🔁 Conditional navigation logic
  const handleProfileClick = () => {
    console.log(loggedUserData);
    if (loggedUserData) {
      router.push("/profile");
    } else {
      router.push("/register");
    }
  };
  
    const getUserCart = async () => {
    
      try{
         const res = await userCartList(loggedUserData?._id)
         console.log("cart list" , res)
         setApiCartList(res?.cartItems)
      }
      catch(error){
        console.log("error in cart list" , error)
      }
    }

 useEffect(() => {
  if (loggedUserData?._id) getUserCart(loggedUserData._id);
}, [loggedUserData?._id]);


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


  const handleProceedToCheckout = () => {
     const offcanvasElement = document.getElementById("cartSidebar");
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);


  offcanvas.hide();

     router.push("/check-out");
  };

//menu close

  const footerMenuRef = useRef(null);
  const navMenuRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      footerMenuOpen &&
      footerMenuRef.current &&
      !footerMenuRef.current.contains(event.target)
    ) {
      setfooterMenuOpen(false);
    }

     if (
      menuOpen &&
      navMenuRef.current &&
      !navMenuRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }

     if (
      mobileSearchOpen &&
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setMobileSearchOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [footerMenuOpen , menuOpen , mobileSearchOpen]);

//combo cart

 const handleIncreaseComboQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localComboCartList = JSON.parse(localStorage.getItem("comboCartList")) || [];

    const existingProduct = localComboCartList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    }

    localStorage.setItem("comboCartList", JSON.stringify(localComboCartList));
    setComboCartList(localComboCartList);
  };

  const handleDecreaseComboQty = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    let localComboCartList = JSON.parse(localStorage.getItem("comboCartList")) || [];

    const existingProduct = localComboCartList.find((item) => item._id === v._id);
    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity <= 0) {
        localComboCartList = localComboCartList.filter((item) => item._id !== v._id);
      }
    }

    localStorage.setItem("comboCartList", JSON.stringify(localComboCartList));
    setComboCartList(localComboCartList);
  };
  
   const handleAddToCartApi = async (v)=>{
       const payload = {
        userId:loggedUserData?._id,
        id: v._id,
        itemType:v?.itemType
      }
  
       try{
         const res = await  addToCartServ(payload);
          if(res?.statusCode == 200){
            console.log(res);
          
         getUserCart();
         toast.success(res.message);
          }
          else{
            toast.error(res?.message)
          }
       }
       catch(error){
           console.log("error in add to cart api", error)
       }
    }
  
    const handleIncreaseApi = (e , v) => {

        handleAddToCartApi(v);
    }
  
      const handleDecreaseApi =  async (e , v) => {
          e.preventDefault();
    e.stopPropagation();

         const payload = {
        userId:loggedUserData?._id,
        id: v._id,
        itemType:v?.itemType
      }

  
       try{
         const res = await removeToCartServ(payload);
          if(res?.statusCode == 200){
            console.log(res);
          
         getUserCart();
         toast.success(res.message);
          }
          else{
            toast.error(res?.message)
          }
       }
       catch(error){
           console.log("error in add to cart api", error)
       }
    }

     const handleRemoveItem =  async (e , v) => {
        e.preventDefault();
    e.stopPropagation();

         const payload = {
        userId:loggedUserData?._id,
        id: v._id,
        itemType:v?.itemType
      }
  
       try{
         const res = await removeIemToCartServ(payload);
          if(res?.statusCode == 200){
            console.log(res);
          
         getUserCart();
         toast.success(res.message);
          }
          else{
            toast.error(res?.message)
          }
       }
       catch(error){
           console.log("error in add to cart api", error)
       }
    }
  return (
    <>
      {/* Top Navbar */}
      <div className="navbar-outer fixed-top d-flex py-2 justify-content-between align-items-center bg-white shadow">
        <div className="logo">
          <Link href="/">
            <img
              src="https://bigbangcrackers.com/wp-content/uploads/2023/08/cropped-big-bang-logo-png-1.png"
              alt="logo"
              className="logo-img"
            />
          </Link>
        </div>

        {/* Collapsible Nav Menu */}
        <ul
          ref={navMenuRef}
          className={`nav-links  list-unstyled mb-0 ${menuOpen ? "open" : ""} `}
        >
           <li className={pathname === "/" ? "active-link" : ""}>
            <Link href="/">Home</Link>
          </li>
         {/* <li className={pathname === "/shop" ? "active-link" : ""}>
            <Link href="/shop">Shop</Link>
          </li> */}
          <li className={pathname === "/shop" ? "active-link" : ""}>
            <Link href="/shop">Shop By Category</Link>
          </li>
          <li className={pathname === "/one-page-list" ? "active-link" : ""}>
            <Link href="/one-page-list">One Page List</Link>
          </li>
          <li className={pathname === "/combo-product" ? "active-link" : ""}>
            <Link href="/combo-product">Combo Packs</Link>
          </li>
          
        </ul>

        {/* Desktop Search Bar (Hidden on small screens) */}
        <div className="search-desktop">
          <Search
            onSearch={(query) => console.log("Searching for:", query)}
            variant="desktop"
          />
        </div>

        {/* Nav Icons */}
        <div className="nav-icons  d-md-flex gap-3 align-items-center">
         <div className="d-flex gap-md-3 gap-2">
          <div onClick={() => router.push("/my-wishlist")}>
           <img
            src="https://cdn-icons-png.flaticon.com/128/13369/13369080.png"
            alt="icon1"
          />
         </div>
          {/* 🔁 Profile icon with conditional redirect */}

           <div className="d-flex align-items-center" style={{cursor: "pointer"}} >
            <img
              src="https://cdn-icons-png.flaticon.com/128/3514/3514491.png"
              className="nav-icon-img "
              alt="notification-icon"
              data-bs-toggle="offcanvas"
              data-bs-target="#cartSidebar"
            />
            <div className="notificationDiv" >
              <p>
                 {loggedUserData && apiCartList ?
                 (  
                    apiCartList.reduce(
                      (total, item) => total + (item?.quantity || 0),
                       0)
                 ): (
                   cartList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                ) + comboCartList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                )
                 )}
              </p>
            </div>
          </div>
         </div>

          {loggedUserData && loggedUserData.profilePic ? (
            <img
              src={loggedUserData.profilePic}
              alt="user-profile"
              className="rounded-circle d-none d-md-block"
              // title="Go to Profile"
              onClick={handleProfileClick}
              style={{
                cursor: "pointer",
                width: "35px",
                height: "35px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/128/15494/15494722.png"
              alt="profile-icon"
              // title="Sign Up / Login"
              className="d-none d-md-block"
              onClick={handleProfileClick}
              style={{ cursor: "pointer", width: "30px", height: "30px" }}
            />
          )}

           <div className="d-flex ham-search align-items-center gap-3">
          {/* Hamburger icon (mobile only) */}
          <div
            className="hamburger only-mobile custom-hide"
            onClick={toggleMenu}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/1828/1828859.png"
              alt="menu"
            />
          </div>
        </div>
         
         
        </div>

        
         
      </div>

      {/* Full-width mobile search bar */}
      {mobileSearchOpen && (
        <div
         ref={searchRef}
          className="mobile-search-container d-md-none p-3 bg-white shadow fixed-top"
          style={{ top: "40px", zIndex: 1050 }}
        >
          <Search
            onSearch={(query) => console.log("Searching for:", query)}
            variant="mobile"
          />
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="footer-links d-md-none fixed-bottom bg-white shadow-lg d-flex justify-content-around align-items-center py-2 border-top">
        <Link href="/" className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1946/1946488.png"
            alt="Home"
            width="18"
          />
          <div className="my-small">Home</div>
        </Link>

        <div className="text-center">
          <div
            className="mobile-search-icon d-md-none"
            onClick={toggleMobileSearch}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/622/622669.png"
              alt="search"
              height={18}
              width="18"
            />
          </div>
          <div className="my-small">Search</div>
        </div>

        <div onClick={toggleFooterMenu} className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1828/1828859.png"
            alt="Menu"
            width="18"
          />
          <div className="my-small">Menu</div>
        </div>

        <div  className="text-center" onClick={handleProfileClick}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/847/847969.png"
            alt="User"
            width="18"
          />
          <div className="my-small">Me</div>
        </div>
      </div>

         {/* Cart Sidebar */}
          <div
            className="offcanvas offcanvas-end "
            tabIndex="-1"
            id="cartSidebar"
            style={{ fontFamily: "poppins" }}
          >
            <div className="offcanvas-header">
              {
                loggedUserData ? 
                (
                 <h5>
                Your Cart (
                  {apiCartList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                )}{" "}
                Products
                )
              </h5>
                ):(
                  <h5>
                Your Cart (
                {cartList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                ) + comboCartList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                )}{" "}
                Products)
              </h5>
                )
              }

              
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              ></button>
            </div>
               
            {(cartList?.length <= 0 && comboCartList?.length <= 0 && apiCartList?.length <= 0) ? (
                 <div className="offcanvas-body d-flex flex-column align-items-center">
                  <img src="https://img.freepik.com/free-vector/supermarket-shopping-cart-concept-illustration_114360-22408.jpg?uid=R195795735&ga=GA1.1.1778899298.1732287368&semt=ais_hybrid&w=740" className="img-fluid" style={{maxWidth: "60%"}}></img>
                  <h5 className="p-2 text-center">Your Cart is <span className="text-danger">Empty!</span></h5>
                 </div>
               ):(
              
             <div className="offcanvas-body">
             {loggedUserData ? (

  apiCartList?.map((item) => (
    <div className="d-flex mb-3" key={item._id}>
      <img
        src={item.productHeroImage}
        alt={item.description}
        className="me-3"
        style={{ width: "80px", height: "80px" }}
      />
      <div className="w-100">
        <div className="d-flex justify-content-between">
          <h6>{item.name}</h6>
          <img
            src="https://cdn-icons-png.flaticon.com/128/3096/3096687.png"
            style={{ height: "15px", width: "15px", opacity: "0.6", cursor: "pointer" }}
            onClick={(e) => handleRemoveItem(e, item)}
          />
        </div>
        <div className="d-flex justify-content-between w-100">
          <p className="fw-bold mt-1 mb-0">
            <del className="text-muted fw-normal">₹{item?.price}</del> ₹{item?.discountedPrice ?? item?.pricing?.comboPrice ?? "N/A"}
          </p>

          <div className="d-flex counterDiv rounded-1">
            <p
              className="mb-0 text-secondary"
              style={{ cursor: "pointer" }}
              onClick={(e) => handleDecreaseApi(e, item)}
            >
              -
            </p>
            <p className="mb-0">{item?.quantity}</p>
            <p
              className="mb-0 text-secondary"
              style={{ cursor: "pointer" }}
              onClick={(e) => handleIncreaseApi(e, item)}
            >
              +
            </p>
          </div>
        </div>
      </div>
    </div>
  ))
) : (
  <>
    
    {cartList?.map((item) => (
      <div className="d-flex mb-3" key={item._id}>
        <img
          src={item.productHeroImage}
          alt={item.description}
          className="me-3"
          style={{ width: "80px", height: "80px" }}
        />
        <div className="w-100">
          <h6>{item.name}</h6>
          <div className="d-flex justify-content-between w-100">
            <p className="fw-bold mt-1 mb-0">
              <del className="text-muted fw-normal">₹{item?.price}</del> ₹{item?.discountedPrice ?? item?.pricing?.comboPrice ?? "N/A"}
            </p>
            <div className="d-flex counterDiv rounded-1">
              <p
                className="mb-0 text-secondary"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleDecreaseQty(e, item)}
              >
                -
              </p>
              <p className="mb-0">{item?.quantity}</p>
              <p
                className="mb-0 text-secondary"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleIncreaseQty(e, item)}
              >
                +
              </p>
            </div>
          </div>
        </div>
      </div>
    ))}

  
    {comboCartList?.map((item) => (
      <div className="d-flex mb-3" key={item._id}>
        <img
          src={item.productHeroImage}
          alt={item.description}
          className="me-3"
          style={{ width: "80px", height: "80px" }}
        />
        <div className="w-100">
          <h6>{item.name}</h6>
          <div className="d-flex justify-content-between w-100">
            <p className="fw-bold mt-1 mb-0">
              <del className="text-muted fw-normal">₹{item?.pricing?.actualPrice}</del> ₹{item?.discountedPrice ?? item?.pricing?.comboPrice ?? "N/A"}
            </p>
            <div className="d-flex counterDiv rounded-1">
              <p
                className="mb-0 text-secondary"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleDecreaseComboQty(e, item)}
              >
                -
              </p>
              <p className="mb-0">{item?.quantity}</p>
              <p
                className="mb-0 text-secondary"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleIncreaseComboQty(e, item)}
              >
                +
              </p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
)}


              <hr />

              <h6>
                SUBTOTAL: ₹ (
                {cartList?.reduce(
                  (total, item) => total + item?.discountedPrice * item.quantity,
                  0
                ) + comboCartList?.reduce(
                  (total, item) => total + item?.pricing?.comboPrice * item.quantity,
                  0
                )
                + apiCartList?.reduce(
                  (total, item) => total + item?.discountedPrice * item.quantity,
                  0
                )}
                )
              </h6>
                

              <button
                className="btn btn-danger w-100 mt-4"
                onClick={handleProceedToCheckout}
              >
                Proceed To Checkout
              </button>
              </div>
             )}
          </div>
        
    

      {/* Mobile Bottom Slide-Up Menu */}
{footerMenuOpen && (
  <div
    ref={footerMenuRef}
    className={`mobile-bottom-menu d-md-none position-fixed bottom-0 start-0 w-100   p-3`}
    style={{
      zIndex: 1000,
      animation: "slideUp 1s ease",
      marginBottom: "55px",
      backgroundColor: "#f6f6f6"
    }}
  >
    <ul
          className={`navLinks list-unstyled mb-0 text-center`}
        >
           <li className={pathname === "/" ? "active-link" : ""}>
            <Link href="/">Home</Link>
          </li>
          {/*
          <li className={pathname === "/shop" ? "active-link" : ""}>
            <Link href="/shop">Shop</Link>
          </li> */}
          <li className={pathname === "/shop" ? "active-link" : ""}>
            <Link href="/shop">Shop By Category</Link>
          </li>
          <li className={pathname === "/combo-product" ? "active-link" : ""}>
            <Link href="/combo-product">Combo Packs</Link>
          </li>
          <li className={pathname === "/one-page-list" ? "active-link" : ""}>
            <Link href="/one-page-list">One Page List</Link>
          </li>
        </ul>
  </div>
)}

    </>


  );
};

export default Navbar;
