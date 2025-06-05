// import React, { useEffect, useState } from 'react'

// const MostProducts = () => {

//     const products = [
//         {
//           id: 1,
//           image:
//             "https://gustosafoods.com/wp-content/uploads/2024/10/4-plus-300x300.png",
//           description: "4 Suta Plus Makhana| (12mm and above)| 200gm",
//           price1: "₹300.00",
//           price2: "₹299.00",
//         },
//         {
//           id: 2,
//           image:
//             "https://gustosafoods.com/wp-content/uploads/2024/10/6-plus-hp-600x600.png",
//           description: "S6.5 Suta Plus(20.7mm above)| Handpicked Makhana|200gm",
//           price1: "₹499.00",
//           price2: "₹499.00",
//         },
//         {
//           id: 3,
//           image:
//             "	https://gustosafoods.com/wp-content/uploads/2024/10/5-plus-Handpicked-300x300.jpg",
//           description: "5 Suta Plus Handpicked Makhana(15.8mm and above)| 200gm",
//           price1: "₹349.00 ",
//           price2: "₹299.00",
//         },
//         {
//           id: 4,
//           image:
//             "https://gustosafoods.com/wp-content/uploads/2024/10/2-300x300.png",
//           description: "Yogibhog Makhana 500gm (250gm x 2)",
//           price1: "₹1,400.00",
//           price2: "₹799.00",
//         },
//         {
//           id: 5,
//           image:
//             "https://gustosafoods.com/wp-content/uploads/2024/10/3-300x300.png",
//           description: "Yogibhog | Premium Makhana Big Size 250gm",
//           price1: "₹700.00",
//           price2: "₹499.00",
//         },
//         {
//           id: 6,
//           image:
//             "https://bigbangcrackers.com/wp-content/uploads/2024/08/Website-Sliders-1646-X-609-2.jpg",
//           description: "Frisky Roasted Makhana(Fox Nut), Peri Peri, jar - 70gm",
//           price1: "₹199.00",
//           price2: "₹198.00",
//         },
//         {
//           id: 7,
//           image:
//             "https://bigbangcrackers.com/wp-content/uploads/2024/08/Website-Sliders-1646-X-609-2.jpg",
//           description: "Frisky Roasted Makhana(Fox Nut), Peri Peri, jar - 70gm",
//           price1: "₹199.00",
//           price2: "₹198.00",
//         },
//       ];
    
    
//       const [startIndex, setStartIndex] = useState(0);
//       const [visibleCount, setVisibleCount] = useState(4);
//       const [visibleProducts, setVisibleProducts] = useState([]);
    
//       // 1️⃣ Update visible count based on screen size
//       useEffect(() => {
//         const updateVisibleCount = () => {
//           const width = window.innerWidth;
//           if (width <= 600) setVisibleCount(2);
//           else if (width <= 800) setVisibleCount(3);
//           else if (width <= 1025) setVisibleCount(4);
//           else setVisibleCount(4);
//         };
    
//         updateVisibleCount();
//         window.addEventListener("resize", updateVisibleCount);
//         return () => window.removeEventListener("resize", updateVisibleCount);
//       }, []);
    
//       // 2️⃣ Update visible products when startIndex or visibleCount changes
//       useEffect(() => {
//         const end = startIndex + visibleCount;
//         const visible = products
//           .slice(startIndex, end)
//           .concat(products.slice(0, Math.max(0, end - products.length)));
//         setVisibleProducts(visible);
//         // Remove products from dependencies
//       }, [startIndex, visibleCount]);
    
//       // 3️⃣ Navigation
//       const nextSlide = () => {
//         setStartIndex((prev) => (prev + visibleCount) % products.length);
//       };
    
//       const prevSlide = () => {
//         setStartIndex(
//           (prev) => (prev - visibleCount + products.length) % products.length
//         );
//       };
    

//   return (
//        <div className="most-popular d-flex flex-column align-items-center">
//         <p className="mb-0">New Arrivals</p>
//         <h1 className="text-center mx-2">Discover flavours in demand</h1>
//         <div className="carousel-container d-flex gap-1">
//           <button onClick={prevSlide} className="carousel-btn">
//             <img
//               src="/assets/back.png"
//               alt="Previous"
//               className="popular-btn"
//             />
//           </button>

//           <div className="products-grid">
//             {visibleProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="product-card d-flex flex-column justify-content-between"
//               >
//                 <div>
//                   <a href="/Product">
//                     {" "}
//                     <img
//                       src={product.image}
//                       alt={product.description}
//                       className="product-img"
//                     />
//                   </a>
//                   <p className="product-descrip">{product.description}</p>
//                   <div className="wishlist-icon">
//                     <img src="https://cdn-icons-png.flaticon.com/128/13369/13369080.png" />
//                   </div>
//                 </div>
//                 <div>
//                   <div className="price d-flex gap-1">
//                     <p className="price1">{product.price1}</p>
//                     <p className="price2">{product.price2}</p>
//                   </div>
//                   <button className="add-to-cart">Add to Cart</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button onClick={nextSlide} className="carousel-btn">
//             <img src="/assets/next2.png" alt="Next" className="popular-btn" />
//           </button>
//         </div>
//       </div>
//   )
// }

// export default MostProducts


import React, { useEffect, useState } from 'react'
import ProductSlider from './ProductSlider';

const MostProducts = () => {

    const products = [
        {
          _id: 111,
          image:
            "https://gustosafoods.com/wp-content/uploads/2024/10/4-plus-300x300.png",
          description: "4 Suta Plus Makhana| (12mm and above)| 200gm",
          price1: "₹300.00",
          price2: "₹299.00",
        },
        {
          _id: 222,
          image:
            "https://gustosafoods.com/wp-content/uploads/2024/10/6-plus-hp-600x600.png",
          description: "S6.5 Suta Plus(20.7mm above)| Handpicked Makhana|200gm",
          price1: "₹499.00",
          price2: "₹499.00",
        },
        {
          _id: 333,
          image:
            "	https://gustosafoods.com/wp-content/uploads/2024/10/5-plus-Handpicked-300x300.jpg",
          description: "5 Suta Plus Handpicked Makhana(15.8mm and above)| 200gm",
          price1: "₹349.00 ",
          price2: "₹299.00",
        },
        {
          _id: 4444,
          image:
            "https://gustosafoods.com/wp-content/uploads/2024/10/2-300x300.png",
          description: "Yogibhog Makhana 500gm (250gm x 2)",
          price1: "₹1,400.00",
          price2: "₹799.00",
        },
        {
          _id: 555,
          image:
            "https://gustosafoods.com/wp-content/uploads/2024/10/3-300x300.png",
          description: "Yogibhog | Premium Makhana Big Size 250gm",
          price1: "₹700.00",
          price2: "₹499.00",
        },
        {
          _id: 666,
          image:
            "https://bigbangcrackers.com/wp-content/uploads/2024/08/Website-Sliders-1646-X-609-2.jpg",
          description: "Frisky Roasted Makhana(Fox Nut), Peri Peri, jar - 70gm",
          price1: "₹199.00",
          price2: "₹198.00",
        },
        {
          _id: 777,
          image:
            "https://bigbangcrackers.com/wp-content/uploads/2024/08/Website-Sliders-1646-X-609-2.jpg",
          description: "Frisky Roasted Makhana(Fox Nut), Peri Peri, jar - 70gm",
          price1: "₹199.00",
          price2: "₹198.00",
        },
      ];
    
    
      // const [startIndex, setStartIndex] = useState(0);
      // const [visibleCount, setVisibleCount] = useState(4);
      // const [visibleProducts, setVisibleProducts] = useState([]);
    
      // // 1️⃣ Update visible count based on screen size
      // useEffect(() => {
      //   const updateVisibleCount = () => {
      //     const width = window.innerWidth;
      //     if (width <= 600) setVisibleCount(2);
      //     else if (width <= 800) setVisibleCount(3);
      //     else if (width <= 1025) setVisibleCount(4);
      //     else setVisibleCount(4);
      //   };
    
      //   updateVisibleCount();
      //   window.addEventListener("resize", updateVisibleCount);
      //   return () => window.removeEventListener("resize", updateVisibleCount);
      // }, []);
    
      // // 2️⃣ Update visible products when startIndex or visibleCount changes
      // useEffect(() => {
      //   const end = startIndex + visibleCount;
      //   const visible = products
      //     .slice(startIndex, end)
      //     .concat(products.slice(0, Math.max(0, end - products.length)));
      //   setVisibleProducts(visible);
      //   // Remove products from dependencies
      // }, [startIndex, visibleCount]);
    
      // // 3️⃣ Navigation
      // const nextSlide = () => {
      //   setStartIndex((prev) => (prev + visibleCount) % products.length);
      // };
    
      // const prevSlide = () => {
      //   setStartIndex(
      //     (prev) => (prev - visibleCount + products.length) % products.length
      //   );
      // };
    

  return (
       <div className="">
        {/* <p className="mb-0">New Arrivals</p>
        <h1 className="text-center mx-2">Discover flavours in demand</h1>
        <div className="carousel-container d-flex gap-1">
          <button onClick={prevSlide} className="carousel-btn">
            <img
              src="/assets/back.png"
              alt="Previous"
              className="popular-btn"
            />
          </button>

          <div className="products-grid">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="product-card d-flex flex-column justify-content-between"
              >
                <div>
                  <a href="/Product">
                    {" "}
                    <img
                      src={product.image}
                      alt={product.description}
                      className="product-img"
                    />
                  </a>
                  <p className="product-descrip">{product.description}</p>
                  <div className="wishlist-icon">
                    <img src="https://cdn-icons-png.flaticon.com/128/13369/13369080.png" />
                  </div>
                </div>
                <div>
                  <div className="price d-flex gap-1">
                    <p className="price1">{product.price1}</p>
                    <p className="price2">{product.price2}</p>
                  </div>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>

          <button onClick={nextSlide} className="carousel-btn">
            <img src="/assets/next2.png" alt="Next" className="popular-btn" />
          </button>
        </div> */}

        <ProductSlider 
         title="New Arrivals"
        subTitle="Discover flavours in demand"
        textAlignCenter={true}
        productList={products}
           
        />
      </div>
  )
}

export default MostProducts
