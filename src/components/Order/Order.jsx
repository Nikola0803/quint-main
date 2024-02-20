import React from "react";
import "./Order.scss";
function Order() {
  return (
    <div className="order">
      <div className="container">
        <h3>Order Your Frames Today!</h3>
        <p>
          Choose from a variety of wooden, PVC, and aluminum frames for your
          project.
        </p>
        <button className="btn-colored">Order Now</button>
      </div>
    </div>
  );
}

export default Order;
