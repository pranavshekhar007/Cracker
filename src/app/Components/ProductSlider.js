import React from "react";
import ProductCard from "./ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ComboProductCard from "./ComboProductCard";
import { useEffect } from "react";

function ProductSlider({title, subTitle, productList , textAlignCenter , comboProduct}) {
 var settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
     responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
       console.log("product slider called")
       console.log("combo prudct value is" + comboProduct)
       if(comboProduct){
       console.log("combo list:", productList);
       }
    }, [productList , comboProduct]);

  return (
    <div className="container py-3 py-md-5 productSliderDiv">
      <h1 className={` ${textAlignCenter ? "text-center" : ""}`}  >{title}</h1>
      <h5 className={`mb-4 text-muted ${textAlignCenter ? "text-center" : ""}`}>{subTitle}</h5>
      <div className="row py-3">
        <Slider {...settings}>
          
          {productList?.map((v, i) => {
          return (
            <div className="col-6 col-md-3 px-1 px-md-2 mb-2 mb-md-3">
           {
            comboProduct === true ? (
                <ComboProductCard
                      value={v}
                    innerHeight={true}
                    height={true}
                    borderRadius={"10px"}
                />
            ):(
                 <ProductCard value={v}
            innerHeight = {true}
            height = {true}
              />
            )
           }
            </div>
          );
        })}
        </Slider>
          
        
      </div>
       
    </div>
  );
}

export default ProductSlider;



// import React from "react";
// import ProductCard from "./ProductCard";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// function ProductSlider({title, subTitle, productList , textAlignCenter}) {
//  var settings = {
//     arrows: true,
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//      responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: false
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           initialSlide: 2
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };
//   return (
//     <div className="container py-3 py-md-5 productSliderDiv">
//       <h1 className={textAlignCenter ? " text-center" :" "}>{title}</h1>
//       <h5 className={textAlignCenter ? " text-center" :" "}>{subTitle}</h5>
//       <div className="row py-3">
//         <Slider {...settings}>

//           {productList && productList.length > 0? (
//                 productList?.map((v, i) => {
//           return (
//             <div className="col-6 col-md-3 px-1 px-md-2 mb-2 mb-md-3">
//               <ProductCard value={v}
//             innerHeight = {true}
//             height = {true}
//               />
//             </div>
//           );
//         })
//           ):(
//              [1, 2, 3]?.map((v, i) => {
//                                 return (
//                                   <div className="col-md-3 col-6 mb-3  ">
//                                     <div className="productCard shadow-sm border ">
//                                       <div className="d-flex justify-content-between align-items-center heartIcon pe-2">
//                                         <h6 className="badge border text-dark m-2">
//                                           <Skeleton height={20} width={100} />
//                                         </h6>
//                                         <Skeleton height={20} width={20} />
//                                       </div>
            
//                                       <div className="w-100">
//                                         <Skeleton height={180} width="100%" />
//                                       </div>
            
//                                       <div className="p-2">
//                                         <h4>
//                                           <Skeleton />
//                                         </h4>
//                                         <p>
//                                           <Skeleton />
//                                         </p>
            
//                                         <div className="w-100 ">
//                                           <Skeleton height={30} width="100%" />
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 );
//                               }
//                            )
//           )
//           }

          
//         </Slider>
          
        
//       </div>
       
//     </div>
//   );
// }

// export default ProductSlider;
