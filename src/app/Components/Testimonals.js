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
  const [expanded, setExpanded] = useState({}); 

  useEffect(() => {
    // Static reviews data
    const staticReviews = [
      {
        author_name: "Bhuvi Karthik",
        text: "Good quality 💥 Worth for money 💯 Time to good delivery Response very well …",
        profile_photo_url: "/assets/Bhuvi.png",
        relative_time_description: "5 months ago",
        rating: 5,
      },
      {
        author_name: "Kanaga Raj",
        text: "Great quality and specially liked delivered in good way",
        profile_photo_url: "/assets/Kanaga.png",
        relative_time_description: "3 months ago",
        rating: 5,
      },
      {
        author_name: "Arjun Krishna",
        text: "This was my first time buying crackers online, as I usually purchase them from the store. I decided to give it a try, and I’m really happy with my experience! The packaging was excellent, and everything I ordered was included. The crackers were fantastic—they burst beautifully and added to the celebration. I’m definitely going to buy from them again next year, and I’m hoping for the same level of excitement and quality. Highly recommended!",
        profile_photo_url: "/assets/Arjun.png",
        relative_time_description: "5 months ago",
        rating: 4,
      },
      {
        author_name: "poorani kannan",
        text: "Ordered for Diwali and was impressed with the fast delivery and secure packaging. The prices were reasonable and all items were as described. Will order again!",
        profile_photo_url: "/assets/poorani.png",
        relative_time_description: "3 months ago",
        rating: 4,
      },
      {
        author_name: "Kishore MuthuKumar",
        text: "crackers is a popular tradition in many parts of India. People light firecrackers to celebrate the victory of light over darkness and good over evil. The colorful explosions and loud sounds are believed to drive away evil spirits and bring joy and excitement, especially among children. However, in recent years, there's been growing awareness about the environmental and health effects of crackers, leading many to choose eco-friendly or green crackers or celebrate Diwali in quieter, more sustainable ways.",
        profile_photo_url: "/assets/Kishore.png",
        relative_time_description: "3 months ago",
        rating: 5,
      },
      // {
      //   author_name: "Harikrishna IYER",
      //   text: "Amazing place, crackers are good quality. Enjoyed my diwali",
      //   profile_photo_url: "/assets/Harikrishna.png",
      //   relative_time_description: "3 months ago",
      //   rating: 5,
      // },
      // {
      //   author_name: "Harikrishna IYER",
      //   text: "Amazing place, crackers are good quality. Enjoyed my diwali",
      //   profile_photo_url: "/assets/Harikrishna.png",
      //   relative_time_description: "3 months ago",
      //   rating: 5,
      // },
      {
        author_name: "Harikrishna IYER",
        text: "Amazing place, crackers are good quality. Enjoyed my diwali",
        profile_photo_url: "/assets/Harikrishna.png",
        relative_time_description: "3 months ago",
        rating: 5,
      },
      {
        author_name: "Kalaivani selvaraj",
        text: "product quality is very good. Quick and safe delivery👍",
        profile_photo_url: "/assets/kalivani.png",
        relative_time_description: "3 months ago",
        rating: 4,
      },
      {
        author_name: "Chetan Agarwal",
        text: "Thank you sir ✌✌ All the crackers were nice and executed well👌👌 Every package was neatly packed and liked by everyone Thanks again👍👍",
        profile_photo_url: "/assets/chetan.png",
        relative_time_description: "8 months ago",
        rating: 5,
      },
    ];

    setReviews(staticReviews);
  }, []);

  const toggleReadMore = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="testimonials-section py-5 px-3" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row d-flex align-items-center">
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

          <div className="col-md-7 col-12">
            <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
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
                          “
                          {expanded[index]
                            ? review.text
                            : review.text.length > 150
                            ? `${review.text.substring(0, 150)}...`
                            : review.text}
                          ”
                        </p>

                        {review.text.length > 150 && (
                          <button
                            onClick={() => toggleReadMore(index)}
                            className="btn btn-link p-0 mt-1"
                            style={{
                              fontSize: "0.9rem",
                              color: "#1a73e8",
                              textDecoration: "none",
                            }}
                          >
                            {expanded[index] ? "Read less" : "Read more"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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
