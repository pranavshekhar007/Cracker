// import React from "react";

// const Testimonals = () => {
//   return (
//     <>
//       <div className="testimonals">
//         <div className="row d-flex align-items-center">
//           <div className="col-md-5 col-12 ">
//             <h1 className="text-white">Testimonials</h1>
//             <h1 className="testi-h">What our customers say</h1>
//             {/* <h1  className="testi-h"></h1> */}
//           </div>

//           <div className="col-md-7 col-12">
//             <div
//               id="testimonialCarousel"
//               className="carousel slide"
//               data-bs-ride="carousel"
//             >
//               <div className="carousel-inner ">
//                 {/* Slide 1 */}
//                 <div className="carousel-item active ">
//                   <div className="card   text-center d-flex flex-column align-items-center">
//                     <div className="testi-card">
//                         <p className="mb-3">
//                       "I recently tried Gustoosa Food's raw makhana and was
//                       blown away by the quality and taste. The makhana was fresh
//                       and crunchy, and had a subtle nutty flavor that was simply
//                       delicious. I love that it's a healthy snack option that I
//                       can feel good about eating, and I'll definitely be
//                       ordering more in the future! "
//                     </p>
//                     <h6 className="mb-0 text-primary">Shreya Jain</h6>
//                     <small className="text-muted">Student</small>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Slide 2 */}
//                 <div className="carousel-item ">
//                   <div className="card   text-center d-flex flex-column align-items-center">
//                    <div  className="testi-card" >
//                      <p className="mb-3">
//                       " I'm a big fan of Gustoosa Food's roasted makhana snacks.
//                       The flavors are so unique and tasty, and they're the
//                       perfect snack to satisfy my cravings without feeling
//                       guilty. I especially love the cheese and caramel flavors –
//                       they're addictive! "
//                     </p>
//                     <h6 className="mb-0 text-primary">Puneet Rawat</h6>
//                     <small className="text-muted">Avid Foodie</small>
//                    </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Controls */}
//               <button
//                 className="carousel-control-prev"
//                 type="button"
//                 data-bs-target="#testimonialCarousel"
//                 data-bs-slide="prev"
//               >
//                 <span
//                   className="carousel-control-prev-icon rounded-circle p-3"
//                   aria-hidden="true"
//                 ></span>
//                 <span className="visually-hidden">Previous</span>
//               </button>
//               <button
//                 className="carousel-control-next"
//                 type="button"
//                 data-bs-target="#testimonialCarousel"
//                 data-bs-slide="next"
//               >
//                 <span
//                   className="carousel-control-next-icon  rounded-circle p-3"
//                   aria-hidden="true"
//                 ></span>
//                 <span className="visually-hidden">Next</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Testimonals;

// "use client";

// import React, { useEffect, useState } from "react";
// import { getGoogleReviews } from "../services/googleReview.service";

// const Testimonials = () => {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const data = await getGoogleReviews();
//         setReviews(data.Reviews); 
//       } catch (err) {
//         console.error("Error fetching Google Reviews:", err);
//       }
//     };

//     fetchReviews();
//   }, []);

//   return (
//     <div className="testimonials-section py-5 px-3">
//       <div className="container">
//         <div className="row d-flex align-items-center">
//           {/* Heading Section */}
//           <div className="col-md-5 col-12 mb-4 mb-md-0">
//             <h2
//               className="testi-heading"
//               style={{
//                 fontFamily: "'Playball', cursive",
//                 fontSize: "3.5rem",
//                 textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
//                 fontWeight: 600,
//               }}
//             >
//               What Our Customers Say
//             </h2>
//           </div>

//           {/* Carousel Section */}
//           <div className="col-md-7 col-12">
//             <div
//               id="testimonialCarousel"
//               className="carousel slide"
//               data-bs-ride="carousel"
//             >
//               <div className="carousel-inner">
//                 {reviews && reviews.length > 0 ? (
//                   reviews.map((review, index) => (
//                     <div
//                       key={index}
//                       className={`carousel-item ${
//                         index === 0 ? "active" : ""
//                       }`}
//                     >
//                       <div className="card testi-card text-center p-4">
//                         <p className="testi-content mb-3">“{review.text}”</p>
//                         <div className="testi-footer alt">
//                           <img
//                             src={
//                               review.profile_photo_url
//                                 ? review.profile_photo_url
//                                 : "/assets/default-user.png"
//                             }
//                             alt={review.author_name}
//                             className="testi-img"
//                           />
//                           <h5 className="text-dark">{review.author_name}</h5>
//                           <small className="text-muted">
//                             {review.relative_time_description}
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="carousel-item active">
//                     <div className="card testi-card text-center p-4">
//                       <p className="testi-content mb-3">
//                         “No reviews available at the moment.”
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Carousel Controls */}
//               {reviews && reviews.length > 1 && (
//                 <>
//                   <button
//                     className="carousel-control-prev"
//                     type="button"
//                     data-bs-target="#testimonialCarousel"
//                     data-bs-slide="prev"
//                   >
//                     <span
//                       className="carousel-control-prev-icon bg-dark rounded-circle p-sm-3"
//                       aria-hidden="true"
//                     ></span>
//                     <span className="visually-hidden">Previous</span>
//                   </button>
//                   <button
//                     className="carousel-control-next"
//                     type="button"
//                     data-bs-target="#testimonialCarousel"
//                     data-bs-slide="next"
//                   >
//                     <span
//                       className="carousel-control-next-icon bg-dark rounded-circle p-sm-3 p-1"
//                       aria-hidden="true"
//                     ></span>
//                     <span className="visually-hidden">Next</span>
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;





"use client";

import React, { useEffect, useState } from "react";
import { FaStar, FaCheckCircle } from "react-icons/fa";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Static reviews data
    const staticReviews = [
      {
        author_name: "Ravi Kumar",
        text: "Excellent service and genuine crackers at best rates. Highly recommended for Diwali shopping!",
        profile_photo_url: "/assets/review1.jpeg",
        relative_time_description: "2 weeks ago",
        rating: 5,
      },
      {
        author_name: "Meena Sharma",
        text: "Fast delivery and superb packing. Very satisfied with my purchase from Big Bang Crackers.",
        profile_photo_url: "/assets/review3.jpeg",
        relative_time_description: "1 month ago",
        rating: 4,
      },
      {
        author_name: "Ajay Singh",
        text: "Huge variety of crackers and amazing combo offers. Will order again next year!",
        profile_photo_url: "/assets/review2.jpeg",
        relative_time_description: "3 months ago",
        rating: 5,
      },
    ];

    setReviews(staticReviews);
  }, []);

  return (
    <div className="testimonials-section py-5 px-3" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row d-flex align-items-center">
          {/* Heading Section */}
          <div className="col-md-5 col-12 mb-4 mb-md-0">
            <h2
              className="testi-heading"
              style={{
                fontFamily: "'Playball', cursive",
                fontSize: "3.5rem",
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                fontWeight: 600,
                color: "#333",
              }}
            >
              What Our Customers Say
            </h2>
          </div>

          {/* Carousel Section */}
          <div className="col-md-7 col-12">
            <div
              id="testimonialCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <div
                      className="card testi-card text-center p-4 mx-2"
                      style={{
                        borderRadius: "12px",
                        border: "1px solid #e0e0e0",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div className="d-flex flex-column align-items-center">
                        <img
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          className="rounded-circle mb-3"
                          style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                        <h5 className="text-dark fw-bold mb-1 d-flex align-items-center">
                          {review.author_name}
                          <FaCheckCircle
                            className="ms-2"
                            style={{ color: "#1a73e8", fontSize: "1rem" }}
                            title="Verified Purchase"
                          />
                        </h5>
                        <div className="mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <FaStar key={i} style={{ color: "#fbbc04", marginRight: "2px" }} />
                          ))}
                        </div>
                        <small className="text-muted mb-3">
                          {review.relative_time_description}
                        </small>
                        <p className="testi-content mb-0" style={{ fontStyle: "italic" }}>
                          “{review.text}”
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              {reviews.length > 1 && (
                <>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#testimonialCarousel"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon bg-dark rounded-circle p-sm-3"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#testimonialCarousel"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon bg-dark rounded-circle p-sm-3 p-1"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
