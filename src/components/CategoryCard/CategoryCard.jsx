import React from "react";
import "./CategoryCard.scss";
import window2 from "../../assets/window2.png";
function CategoryCard() {
  return (
    <div className="category-card__card">
      <img src={window2} alt="" />
      <div className="category-card__card__title">
        <h3>Outlet wooden frame</h3>
        <h3>$99</h3>
      </div>
      <p>Natural</p>
      <button className="btn-colored">Visit Category</button>
    </div>
  );
}

export default CategoryCard;
