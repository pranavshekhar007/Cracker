
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
import React, { useState, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LoggedDataContext } from "../context/context";
import "../globals.css";
import Search from "./Search";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [footerMenuOpen, setfooterMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { loggedUserData, cartList, setCartList } = useContext(LoggedDataContext);
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
      router.push("/signup");
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
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const handleProceedToCheckout = () => {
    setShowPaymentPopup(true);
  };
  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false);
  };
  const initiatePayment = () => {
    const amount = cartList?.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    );
     const options = {
      key: "rzp_test_fT349CvRXH2mv0",
      amount: amount * 100, 
      currency: "INR",
      name: "Gustosa Foods",
      description: "Purchase Transaction",
      image: "/assets/logo.png",
      handler: function (response) {
        console.log(response);
        alert(
          "Payment Successful! Payment ID: " + response.razorpay_payment_id
        );
        setShowPaymentPopup(false);
      },
      prefill: {
        name: loggedUserData?.name || "Guest User",
        email: loggedUserData?.email || "guest@example.com",
        contact: loggedUserData?.mobile || "9996588662",
      },
      theme: {
        color: "#3D9970",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

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

        {/* Collapsible Nav Menu */}
        <ul
          className={`nav-links  list-unstyled mb-0 ${menuOpen ? "open" : ""} `}
        >
          {/* <li className={pathname === "/" ? "active-link" : ""}>
            <Link href="/">Home</Link>
          </li>
          <li className={pathname === "/shop" ? "active-link" : ""}>
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
          {/* <img
            src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png"
            alt="icon1"
          /> */}
          {/* 🔁 Profile icon with conditional redirect */}

           <div className="d-flex align-items-center ">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3514/3514491.png"
              className="nav-icon-img"
              alt="notification-icon"
              data-bs-toggle="offcanvas"
              data-bs-target="#cartSidebar"
            />
            <div className="notificationDiv">
              <p>
                {cartList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                )}
              </p>
            </div>
          </div>

          {loggedUserData && loggedUserData.profilePic ? (
            <img
              src={loggedUserData.profilePic}
              alt="user-profile"
              className="rounded-circle d-none d-md-block"
              title="Go to Profile"
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
              title="Sign Up / Login"
              className="d-none d-md-block"
              onClick={handleProfileClick}
              style={{ cursor: "pointer", width: "30px", height: "30px" }}
            />
          )}
         
         
        </div>
         
      </div>

      {/* Full-width mobile search bar */}
      {mobileSearchOpen && (
        <div
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

        <Link href="/signup" className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/847/847969.png"
            alt="User"
            width="18"
          />
          <div className="my-small">Me</div>
        </Link>
      </div>

         {/* Cart Sidebar */}
          <div
            className="offcanvas offcanvas-end "
            tabIndex="-1"
            id="cartSidebar"
            style={{ fontFamily: "poppins" }}
          >
            <div className="offcanvas-header">
              <h5>
                Your Cart (
                {cartList?.reduce(
                  (total, item) => total + (item.quantity || 0),
                  0
                )}{" "}
                Products)
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              ></button>
            </div>

            <div className="offcanvas-body">
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

                        <p className=" fw-bold mt-1 mb-0">
                      <del className="text-muted fw-normal">₹{item?.price}</del> ₹{item?.discountedPrice}
                    </p> 

                      <div className="d-flex counterDiv  rounded-1 ">
                      <p
                       className="mb-0 text-secondary"
                        style={{ borderColor: "red"  , cursor:"pointer" }}
                        onClick={(e) => handleDecreaseQty(e, item)}
                      >
                        -
                      </p>
                      <p  className="mb-0">
                        {/* {
                          cartList.find((cartitem) => cartitem._id === item._id)
                            ?.quantity
                        } */}
                        {item?.quantity}
                      </p>
                      <p
                        className="mb-0 text-secondary "
                        style={{ borderColor: "green" , cursor:"pointer" }}
                        onClick={(e) => handleIncreaseQty(e, item)}
                      >
                        +
                      </p>
                    </div>
                  
                    </div>
                  </div>
                </div>
              ))}

              <hr />

              <h6>
                SUBTOTAL: ₹ (
                {cartList?.reduce(
                  (total, item) => total + item.discountedPrice * item.quantity,
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
          </div>
        
      {/* Payment Popup */}
      {showPaymentPopup && (
        <div
          className="payment-popup position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)", zIndex: 9999 }}
        >
          <div
            className="bg-white p-4 rounded"
            style={{ width: "400px", maxWidth: "90%" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Payment Summary</h5>
              <button
                className="btn-close"
                onClick={handleClosePaymentPopup}
              ></button>
            </div>

            <p>
              Total Products:{" "}
              {cartList?.reduce((total, item) => total + item.quantity, 0)}
            </p>
            <p>
              Subtotal: ₹
              {cartList?.reduce(
                (total, item) => total + item.discountedPrice * item.quantity,
                0
              )}
            </p>

            <button className="btn btn-primary w-100" onClick={initiatePayment}>
              Pay Now
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Slide-Up Menu */}
{footerMenuOpen && (
  <div
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
          {/* <li className={pathname === "/" ? "active-link" : ""}>
            <Link href="/">Home</Link>
          </li>
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
