import React from "react";

const DailySell = () => {
  return (
    <>
      <div className="daily-sells">
        <h1 >Daily Best Sells</h1>
        <div className="all-sells d-flex gap-4">
          <div className="daily-sell1 daily-sell ">
            <h3 className="text-white">Ground Chakkar.</h3>
            <p className="text-white">Get the best deal before close.</p>
            <div className="daily-shop d-flex gap-2 align-items-center justify-content-center my-3">
              <p className="fs-5 mb-0 text-white fs-6">Shop Now</p>
              <img src="/assets/next.png" alt="Next Icon" />
            </div>
          </div>

          <div className="daily-sell">
            <div className="daily-product-card d-flex flex-column justify-content-between">
              <div>
                <img
                  src="https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2024/08/Ground-Spinner-Ashoka-Photoroom.jpg?w=500&ssl=1"
                  className="product-img"
                />
                <p className="category1 mb-0">Spinner</p>
                <p className="description ">Ground Spinner Ashoka – 10 Pcs</p>
                <div className="wishlist-icon">
                  <img src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png" />
                </div>
              </div>
              <div>
                <div className="price d-flex gap-1">
                  <p className="price2">66.00</p>
                  <p className="price1"> 330.00</p>
                </div>
                <button className="addCart-btn"> + Add to Cart</button>
              </div>
            </div>
          </div>

          <div className="daily-sell">
            <div className="daily-product-card d-flex  flex-column justify-content-between">
              <div>
                <img
                  src="https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2024/08/Ground-spinner-big-Photoroom.jpg?w=500&ssl=1"
                  className="product-img"
                />
                <p className="category mb-0">Spinner</p>
                <p className="description ">Ground Spinner Big – 10 Pcs</p>
                <div className="wishlist-icon">
                  <img src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png" />
                </div>
              </div>
              <div>
                <div className="price d-flex gap-1">
                  <p className="price2">46.00</p>
                  <p className="price1">230.00</p>
                </div>
                <button className="addCart-btn"> + Add to Cart</button>
              </div>
            </div>
          </div>

          <div className="daily-sell">
            <div className="daily-product-card d-flex flex-column justify-content-between">
              <div>
                <img
                  src="https://i0.wp.com/bigbangcrackers.com/wp-content/uploads/2024/08/Ground-spinner-special-Photoroom.jpg?w=500&ssl=1"
                  className="product-img"
                />
                <p className="category mb-0">Spinner</p>
                <p className="description ">Ground Spinner Special – 10 Pcs</p>
                <div className="wishlist-icon">
                  <img src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png" />
                </div>
              </div>
              <div>
                <div className="price d-flex gap-1">
                  <p className="price2">90.00</p>
                  <p className="price1">450.00</p>
                </div>
                <button className="addCart-btn"> + Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailySell;
