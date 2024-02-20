import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

function Card({ id, title, image, price, description }) {
  return (
    <div className="card__card">
      <img src={image || "default-image-url"} alt={title} />
      <div className="card__card__title">
        <h3>{title}</h3>
        <h3>{price}</h3>
      </div>
      <Link to={`/product/${id}`}>
        <button className="btn-colored">Configure</button>
      </Link>
    </div>
  );
}

export default Card;
