import React, { useState, useEffect } from "react";
import "./Products.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../Card/Card";

function Products({ text }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const consumerKey = process.env.REACT_APP_CONSUMER_KEY;
        const consumerSecret = process.env.REACT_APP_CONSUMER_SECRET;
        const auth = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;

        // Fetching products
        const productResponse = await fetch(
          "https://thedarkstarsoft.com/quint/wp-json/wc/v3/products",
          { headers: { Authorization: auth } }
        );
        const productData = await productResponse.json();
        // Fetching categories
        const categoryResponse = await fetch(
          "https://thedarkstarsoft.com/quint/wp-json/wc/v3/products/categories",
          { headers: { Authorization: auth } }
        );
        const categoryData = await categoryResponse.json();

        setProducts(productData);
        setCategories(categoryData);
        setFilteredProducts(productData); // Initially show all products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterProducts = (categoryId) => {
    if (categoryId === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.categories.some((category) => category.id === categoryId)
      );
      setFilteredProducts(filtered);
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1624 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1624, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const defaultImageUrl =
    "https://thedarkstarsoft.com/quint/wp-content/uploads/2023/12/Placeholder-Image.png";

  return (
    <div className="products">
      <div className="container">
        <span>Tagline</span>
        <h3>{text}</h3>
        <div className="products__header">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="products__header__btns">
            <button
              className="btn-colored"
              onClick={() => filterProducts("all")}
            >
              All
            </button>
            {categories?.map((category) => (
              <button
                key={category.id}
                className="btn-colored"
                onClick={() => filterProducts(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="products__body">
          <Carousel showDots={true} responsive={responsive}>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  image={
                    product.images && product.images.length > 0
                      ? product.images[0].src
                      : defaultImageUrl
                  }
                  price={
                    product.price || product.regular_price || product.sale_price
                      ? `${
                          product.sale_price
                            ? `Sale: ${product.sale_price}`
                            : `Regular: ${product.regular_price}`
                        }`
                      : "Price not available"
                  }
                  description={product.description}
                />
              ))
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Products;
