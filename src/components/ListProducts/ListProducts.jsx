import React, { useState, useEffect } from "react";
import "./ListProducts.scss";
import Card from "../Card/Card";
import { ThreeDots } from "react-loader-spinner";

function ListProducts() {
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

  const defaultImageUrl =
    "https://thedarkstarsoft.com/quint/wp-content/uploads/2023/12/Placeholder-Image.png";

  return (
    <div className="list-products">
      <div className="container">
        <div className="list-products__header">
          <button className="btn-colored" onClick={() => filterProducts("all")}>
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className="btn-colored"
              onClick={() => filterProducts(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="list-products__body">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <ThreeDots
                height="60"
                width="60"
                radius="9"
                color="#A31332"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="row">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="col-2 list-products__body__card"
                >
                  <Card
                    id={product.id}
                    title={product.name}
                    image={
                      product.images.length > 0
                        ? product.images[0].src
                        : defaultImageUrl
                    }
                    price={product.price}
                    description={product.description}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListProducts;
