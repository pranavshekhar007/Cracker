import React from 'react'

const DailySell = () => {
  return (
    <>
      <div className="daily-sells">
        <h1>Daily Best Sells</h1>
            <div className="all-sells d-flex gap-4">
             <div className="daily-sell1 daily-sell ">
                 <h3 className="text-white">100% Natural & Organic Makhana.</h3>
                 <p className="text-white">Get the best deal before close.</p>
                <div className="daily-shop d-flex gap-2 align-items-center justify-content-center my-3">
            <p className="fs-5 mb-0 text-white fs-6">Shop Now</p>
            <img src="/assets/next.png" alt="Next Icon" />
          </div>
             </div>


              <div className="daily-sell">
                 <div className="daily-product-card d-flex flex-column justify-content-between" >
                <div>
                  <img src="https://gustosafoods.com/wp-content/uploads/2024/02/Cream__Onion-a-.png"   className="product-img" />
                  <p className="category1 mb-0">Flavoured Makhana</p>
                  <p className="description ">Frisky Roasted Makhana</p>
                  <div className="wishlist-icon">
                    <img src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png" />
                  </div>
                </div>
                <div>
                  <div className="price d-flex gap-1">
                       <p className="price2">248.00</p>
                      <p className="price1"> 249.00</p>
                  </div>
                  <button className="addCart-btn"> + Add to Cart</button>
                </div>
              </div>
             </div>


               <div className="daily-sell">
                 <div className="daily-product-card d-flex  flex-column justify-content-between" >
                <div>
                  <img src="	https://gustosafoods.com/wp-content/uploads/2024/10/4-suta-1.png"   className="product-img" />
                  <p className="category mb-0">Raw Makhana</p>
                  <p className="description ">Yogibhog Makhana</p>
                  <div className="wishlist-icon">
                    <img src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png" />
                  </div>
                </div>
                <div>
                  <div className="price d-flex gap-1">
                       <p className="price2">499.00</p>
                      <p className="price1">499.00</p>
                  </div>
                  <button className="addCart-btn"> + Add to Cart</button>
                </div>
              </div>
             </div>


              <div className="daily-sell">
                 <div className="daily-product-card d-flex flex-column justify-content-between" >
                <div>
                  <img src="https://gustosafoods.com/wp-content/uploads/2024/10/3-suta-1.png"   className="product-img" />
                  <p className="category mb-0">Sample Makhana</p>
                  <p className="description ">Suta Makhana</p>
                  <div className="wishlist-icon">
                    <img src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png" />
                  </div>
                </div>
                <div>
                  <div className="price d-flex gap-1">
                       <p className="price2">299.00</p>
                      <p className="price1">300.00</p>
                  </div>
                  <button className="addCart-btn"> + Add to Cart</button>
                </div>
              </div>
             </div>
                   
            </div>

        </div>
    </>
  )
}

export default DailySell
