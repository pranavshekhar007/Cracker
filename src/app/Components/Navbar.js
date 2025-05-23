// "use client"
// import React, { useState } from 'react';
// import "../globals.css";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {

//     setMenuOpen(!menuOpen);
//   };

//   return (
//     <>
//       <div className='navbar-outer d-flex py-3 justify-content-between align-items-center'>
//         <div className='logo'>
//           <img src='/assets/logo.png'  alt='logo' className='logo-img' />
//         </div>

//         {/* Hamburger icon for small screens */}
//         <div className='hamburger d-md-none' onClick={toggleMenu}>
//           <img src='https://cdn-icons-png.flaticon.com/128/1828/1828859.png' alt='menu' />
//         </div>

//         {/* Nav Links */}
//         <ul className={`nav-links list-unstyled mb-0 ${menuOpen ? 'open' : ''}`}>

//           <li>Home</li>
//           <li>Shop</li>
//           <li>Bulk Order</li>
//           <li>Blog</li>
//           <li>About</li>
//         </ul>

//         <div className='nav-icons d-flex gap-3 align-items-center'>
//           <img src='https://cdn-icons-png.flaticon.com/128/6051/6051092.png' alt='icon1' />
//           <img src='https://cdn-icons-png.flaticon.com/128/15494/15494722.png' alt='icon2' />
//           <img src='https://cdn-icons-png.flaticon.com/128/18695/18695999.png' alt='icon3' />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../globals.css";
import Search from "./Search";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleMobileSearch = () => setMobileSearchOpen(!mobileSearchOpen);

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
          <div className="hamburger only-mobile custom-hide" onClick={toggleMenu}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1828/1828859.png"
              alt="menu"
            />
          </div>
         
        </div>

        {/* Collapsible Nav Menu */}
        <ul
          className={`nav-links list-unstyled mb-0 ${menuOpen ? "open" : ""}`}
        >
          <li className={pathname === "/" ? "active-link" : ""}>
            <Link href="/">Home</Link>
          </li>
          <li className={pathname === "/shop" ? "active-link" : ""}>
            <Link href="/shop">Shop</Link>
          </li>
          <li className={pathname === "/category" ? "active-link" : ""}>
            <Link href="/category">Shop By Category</Link>
          </li>
          <li className={pathname === "/combo-product" ? "active-link" : ""}>
            <Link href="/combo-product">Combo Products</Link>
          </li>
          <li className={pathname === "/one-page-list" ? "active-link" : ""}>
            <Link href="/one-page-list">One Page List</Link>
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
        <div className="nav-icons d-none d-md-flex gap-3 align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png"
            alt="icon1"
          />
          <Link href="/signup">
            <img
              src="https://cdn-icons-png.flaticon.com/128/15494/15494722.png"
              alt="icon2"
            />
          </Link>
          <img
            src="https://cdn-icons-png.flaticon.com/128/18695/18695999.png"
            alt="icon3"
          />
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

        <div onClick={toggleMenu} className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1828/1828859.png"
            alt="Menu"
            width="18"
          />
          <div className="my-small">Menu</div>
        </div>

        <Link href="/cart" className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3144/3144456.png"
            alt="Cart"
            width="18"
          />
          <div className="my-small">Cart</div>
        </Link>

        <Link href="/signup" className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/847/847969.png"
            alt="User"
            width="18"
          />
          <div className="my-small">Me</div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
