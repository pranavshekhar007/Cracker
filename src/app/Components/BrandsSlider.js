import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const brands = [
  {
    brandImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_fwn9QhBHHWOTxPl4AB-MN-4I5cKTfknsaw&s",
  },
  {
    brandImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_fwn9QhBHHWOTxPl4AB-MN-4I5cKTfknsaw&s",
  },
  {
    brandImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQtPVHPgQC4MIrBk8V_j8VlwAwYZK9Z-TVjA&s",
  },
  {
    brandImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTapyR4Hrn9igzuLixIp6fGIPZ1Vv1UilRZw&s",
  },
  {
    brandImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUB4-ClZx6s_9xo8cvfYU6NR6nvBrRwranDw&s",
  },
  {
    brandImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVJ_49O1lYpLMOacgga2ea13A7pQQNILlS_Q&s",
  },

  {
    brandImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJsgOwyzxSsjarHkDSom8uxn6dguJzQgkMRg&s",
  },
  {
    brandImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJX4_1-UdE9pL4Jae0HFtGFGBDbiY-G-h8-Q&s",
  },
];

const BrandsSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div>
      <div className="mt-3 mb-5 px-3 py-sm-5 py-4" style={{backgroundColor:"#efefef"}}>
        <Slider {...settings}>
          {brands.map((brand, index) => (
            <div key={index} className=" mx-5" >
              <img
                src={brand.brandImage}
                alt={`Brand ${index}`}
                style={{ height: "135px", width: "135px", margin: "0 10px" }}
                className="rounded-circle brandLogo"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BrandsSlider;
