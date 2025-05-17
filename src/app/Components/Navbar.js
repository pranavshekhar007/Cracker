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
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import "../globals.css";
import Search from './Search';

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='navbar-outer fixed-top d-flex py-3 justify-content-between align-items-center bg-white shadow'>
      <div className='logo'>
        <Link href="/">
          <img src='https://bigbangcrackers.com/wp-content/uploads/2023/08/cropped-big-bang-logo-png-1.png' alt='logo' className='logo-img' />
        </Link>
      </div>

      {/* Desktop Search Bar (Hidden on small screens) */}
      <div className='search-desktop'>
        <Search onSearch={(query) => console.log("Searching for:", query)} variant="desktop"  />
      </div>

      {/* Hamburger icon for small screens */}
      <div className='hamburger only-mobile custom-hide' onClick={toggleMenu}>
        <img src='https://cdn-icons-png.flaticon.com/128/1828/1828859.png' alt='menu' />
      </div>

      {/* Collapsible Nav Menu */}
      <ul className={`nav-links list-unstyled mb-0 ${menuOpen ? 'open' : ''}`}>
        {/* Search bar for small screen */}
        <li className='search-mobile'>
          <Search onSearch={(query) => console.log("Searching for:", query)} variant="mobile"  />
        </li>

        <li className={pathname === "/" ? "active-link" : ""}><Link href="/">Home</Link></li>
        <li className={pathname === "/category" ? "active-link" : ""}><Link href="/category">Shop By Category</Link></li>
        <li className={pathname === "/shop" ? "active-link" : ""}><Link href="/shop">Combo Products</Link></li>
        <li className={pathname === "/bulk-order" ? "active-link" : ""}><Link href="/bulk-order">One Page List</Link></li>
      </ul>

      <div className='nav-icons d-flex gap-3 align-items-center'>
        <img src='https://cdn-icons-png.flaticon.com/128/6051/6051092.png' alt='icon1' />
        <img src='https://cdn-icons-png.flaticon.com/128/15494/15494722.png' alt='icon2' />
        <img src='https://cdn-icons-png.flaticon.com/128/18695/18695999.png' alt='icon3' />
      </div>
    </div>
  );
};

export default Navbar;
