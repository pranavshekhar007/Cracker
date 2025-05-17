import React from "react";
import Navbar from "../Components/Navbar";
import PriceFilter from "../Components/PriceFilter";

const products = [
  {
    id: 1,
    image: 'https://gustosafoods.com/wp-content/uploads/2024/10/4-suta-1.png',
    category: 'Raw Makhana',
    description: 'Yogibhog Makhana',
    price1: 599,
    price2: 499,
  },
  {
    id: 2,
    image: 'https://gustosafoods.com/wp-content/uploads/2024/10/4-plus.png',
    category: 'Classic Makhana',
    description: 'Gustosa Super Makhana',
    price1: 549,
    price2: 449,
  },
  {
    id: 3,
    image: 'https://gustosafoods.com/wp-content/uploads/2025/02/5-plus-Handpicked-1152x1536.jpg',
    category: 'Tandoori Makhana',
    description: 'Spicy & Crispy',
    price1: 499,
    price2: 399,
  },
  {
    id: 4,
    image: 'https://gustosafoods.com/wp-content/uploads/2024/10/6-plus-hp-1024x1024.png',
    category: 'Peri Peri Makhana',
    description: 'Chatpata Delight',
    price1: 459,
    price2: 359,
  },
  {
    id: 5,
    image: 'https://gustosafoods.com/wp-content/uploads/2024/10/3-suta-1.png',
    category: 'Pudina Makhana',
    description: 'Mint Magic',
    price1: 489,
    price2: 389,
  },
  {
    id: 6,
    image: 'https://gustosafoods.com/wp-content/uploads/2024/02/Cream__Onion-a-.png',
    category: 'Cheese Makhana',
    description: 'Cheesy Crunch',
    price1: 519,
    price2: 419,
  },
  {
    id: 7,
    image: 'https://gustosafoods.com/wp-content/uploads/2024/02/Jalapeno3-c-.png',
    category: 'Chocolate Makhana',
    description: 'Sweet & Healthy',
    price1: 569,
    price2: 469,
  },
  {
    id: 8,
    image: 'https://gustosafoods.com/wp-content/uploads/2024/02/Chatpata_Masala-a-png.png',
    category: 'Salted Makhana',
    description: 'Classic Salted',
    price1: 429,
    price2: 329,
  },
  {
    id: 9,
    image: 'https://gustosafoods.com/wp-content/uploads/2024/02/Smokey-b-.png',
    category: 'Spicy Tomato Makhana',
    description: 'Zesty Flavor',
    price1: 489,
    price2: 389,
  },
  {
    id: 10,
    image: 'https://gustosafoods.com/wp-content/uploads/2024/02/Pudina-a-.png',
    category: 'Masala Makhana',
    description: 'Indian Spice Mix',
    price1: 499,
    price2: 399,
  },
];


const page = () => {
  return (
    <>
      <Navbar />

      <div className="shop-page">
        <div className="shop-sections d-flex ">
          <div className="category-section ">
            <h5>Categories</h5>

            {/* all categories */}

            <div className="all-categroy mb-5">
              <div className="category d-flex justify-content-between">
                <p className="mb-0 ">Dairy, Bread & Eggs</p>
                <img src="https://cdn-icons-png.flaticon.com/128/130/130884.png" />
              </div>
              <div className="category d-flex justify-content-between">
                <p className="mb-0">Snacks & Munchies</p>
                <img src="https://cdn-icons-png.flaticon.com/128/130/130884.png" />
              </div>
              <div className="category d-flex justify-content-between">
                <p className="mb-0">Fruits & Vegetables</p>
                <img src="https://cdn-icons-png.flaticon.com/128/130/130884.png" />
              </div>
              <div className="category d-flex justify-content-between">
                <p className="mb-0">Cold Drinks & Juices</p>
                <img src="https://cdn-icons-png.flaticon.com/128/130/130884.png" />
              </div>
              <div className="category d-flex justify-content-between">
                <p className="mb-0">Breakfast & Instant Food</p>
                <img src="https://cdn-icons-png.flaticon.com/128/130/130884.png" />
              </div>
              <div className="category d-flex justify-content-between">
                <p className="mb-0">Bakery & Biscuits</p>
                <img src="https://cdn-icons-png.flaticon.com/128/130/130884.png" />
              </div>
            </div>

            {/* price filter */}

            <PriceFilter />

            {/* rating section */}

            <div className="shop-rating mt-5">
              <h5 className="mb-2">Rating</h5>
              <div className="rate-input d-flex gap-2 mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="priceCheckbox"
                />
                <div className="d-flex gap-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                </div>
              </div>

              <div className="rate-input d-flex gap-2 mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="priceCheckbox"
                />
                <div className="d-flex gap-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img src="/assets/blank-star.png" className="rate"></img>
                </div>
              </div>

              <div className="rate-input d-flex gap-2 mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="priceCheckbox"
                />
                <div className="d-flex gap-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img src="/assets/blank-star.png" className="rate"></img>
                  <img src="/assets/blank-star.png" className="rate"></img>
                </div>
              </div>

              <div className="rate-input d-flex gap-2 mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="priceCheckbox"
                />
                <div className="d-flex gap-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img src="/assets/blank-star.png" className="rate"></img>
                  <img src="/assets/blank-star.png" className="rate"></img>
                  <img src="/assets/blank-star.png" className="rate"></img>
                </div>
              </div>

              <div className="rate-input d-flex gap-2 mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="priceCheckbox"
                />
                <div className="d-flex gap-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png"
                    className="rate"
                  ></img>
                  <img src="/assets/blank-star.png" className="rate"></img>
                  <img src="/assets/blank-star.png" className="rate"></img>
                  <img src="/assets/blank-star.png" className="rate"></img>
                  <img src="/assets/blank-star.png" className="rate"></img>
                </div>
              </div>
            </div>

            {/* daily sell section */}

            <div className="daily-sell1 daily-selling ">
              <h3 className="text-white">100% Natural & Organic Makhana.</h3>
              <p className="text-white">Get the best deal before close.</p>
              <div className="daily-shop d-flex gap-2 align-items-center justify-content-center my-3">
                <p className="fs-5 mb-0 text-white fs-6">Shop Now</p>
                <img src="/assets/next.png" alt="Next Icon" />
              </div>
            </div>
          </div>



          <div className="item-section">
            {/* product search bar */}

            <div className="d-flex gap-2">
              <input
                className="product-search"
                placeholder="search for products"
              ></input>
              {/* <img src='https://cdn-icons-png.flaticon.com/128/54/54481.png'></img> */}

              <select
                id="showSelect"
                className="form-select form-select-sm w-auto"
              >
                <option value="10">Show: 10</option>
                <option value="10"> 10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>

              <select
                id="showSelect"
                className="form-select form-select-sm w-auto "
              >
                <option value="featured">Sort by: Featured</option>
                <option value="high to low">Price: High to Low</option>
                <option value="low to high">Price: Low to High</option>
                <option value="release date">Release Date</option>
                <option value="avg. rating" >Avg. Rating</option>
              </select>
            </div>
            <p className="product-quantity">26 <span className="quantity-p">Products found</span></p>


               <div className="products">
  {products.map((product) => (
    <div className="shop-product-card d-flex flex-column justify-content-between" key={product.id}>
      <div>
        <img src={product.image} alt={product.description} className="product-img" />
        <p className="category1 mb-0">{product.category}</p>
        <p className="description">{product.description}</p>
        <div className="wishlist-icon">
          <img src="https://cdn-icons-png.flaticon.com/128/6051/6051092.png" alt="wishlist" />
        </div>
      </div>
      <div>
        <div className="price d-flex gap-1">
          <p className="shop-price2  fw-bold">₹{product.price2}.00</p>
          <p className="shop-price1 text-muted text-decoration-line-through">₹{product.price1}.00</p>
        </div>
        <button className="shop-addCart-btn">+ Add to Cart</button>
      </div>
    </div>
  ))}
</div>


          </div>
        </div>
      </div>
    </>
  );
};

export default page;
