import React from "react";
import "./CustomFrames.scss";
import bigGrade from "../../assets/big-grade-icon.png";
import bigStar from "../../assets/big-star-icon.png";
import bigSlusalica from "../../assets/big-slusalica.png";
import kockica from "../../assets/kockica-icon.png";
function CustomFrames() {
  return (
    <div className="custom-frames">
      <div className="container">
        <h5>Order</h5>
        <h3>Custom Frames for You</h3>
        <p>Easy, Fast, and Reliable Window Frame Ordering</p>

        <div className="custom-frames__wrapper row">
          <div className="custom-frames__wrapper__card col-6">
            <img src={bigStar} alt="" />
            <h3>Quality Frames Delivered</h3>
            <p>
              Choose from a Wide Selection of Wooden, PVC, and Aluminum Frames
              for Your <br></br>Project
            </p>
            <div className="custom-frames__wrapper__card__btns">
              <button className="btn-colored">
                Calculate <img src={kockica} alt="" />
              </button>
              <button className="btn-white">Learn More</button>
            </div>
          </div>
          <div className="custom-frames__wrapper__card col-3">
            <img src={bigGrade} alt="" />
            <h3>Customize Your Perfect Window Frame</h3>
            <p>High-Quality Materials and Expert Craftsmanship</p>
            <div className="custom-frames__wrapper__card__btns">
              <button className="btn-white">Get Started</button>
            </div>
          </div>
          <div className="custom-frames__wrapper__card col-3">
            <img src={bigSlusalica} alt="" />
            <h3>Efficient Production and Timely Delivery</h3>
            <p>Flexible Delivery Options to Suit Your Needs</p>
            <div className="custom-frames__wrapper__card__btns">
              <button className="btn-white">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomFrames;
