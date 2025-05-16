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

"use client";

import React from "react";


const Testimonals = () => {
  return (
    <div className="testimonals-section py-5 px-3">
      <div className="container">
        <div className="row d-flex align-items-center">
          {/* Heading Section */}
          <div className="col-md-5 col-12 mb-4 mb-md-0">
            {/* <h1 className="text-white mb-2">Testimonials</h1> */}
            <h2 className="testi-heading"
            style={{
              fontFamily: "'Playball', cursive",
              fontSize: "3.5rem",
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
              fontWeight: 600,
            }}>What Our Customers Say</h2>
          </div>

          {/* Carousel Section */}
          <div className="col-md-7 col-12">
            <div
              id="testimonialCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {/* Slide 1 */}
                <div className="carousel-item active">
                  <div className="card testi-card text-center p-4">
                    <p className="testi-content mb-3">
                      “Absolutely loved the sparkle shots from Crackle Fest!
                      The packaging was safe, and the bursts were stunning.
                      Made our Diwali unforgettable. Highly recommend!”
                    </p>
                    <div className="testi-footer alt">
                      <img
                        src="/assets/Buffett.jpg"
                        alt="user1"
                        className="testi-img"
                      />
                      <h5 className="text-dark">Buffet</h5>
                      <small className="text-muted">Business Owner</small>
                    </div>
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="carousel-item">
                  <div className="card testi-card text-center p-4">
                    <p className="testi-content mb-3">
                      “These are the safest and brightest crackers I’ve ever
                      used. My kids had so much fun, and I felt confident
                      knowing everything was top quality Too good and eco-friendly.”
                    </p>
                    <div className="testi-footer alt">
                      <img
                        src="/assets/Bill_Gates.jpg"
                        alt="user2"
                        className="testi-img"
                      />
                      <h5 className="text-dark">Bill Gates</h5>
                      <small className="text-muted">Buiseness man</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon bg-dark rounded-circle p-3"
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
                  className="carousel-control-next-icon bg-dark rounded-circle p-3"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonals;
