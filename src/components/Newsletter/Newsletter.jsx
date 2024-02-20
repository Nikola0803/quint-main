import React from "react";
import "./Newsletter.scss";
function Newsletter() {
  return (
    <div className="newsletter">
      <div className="container">
        <div className="row">
          <div className="newsletter__card col-6">
            <h3>
              Stay Updated with Our <br></br>Newsletter
            </h3>
          </div>
          <div className="newsletter__card col-6">
            <p>
              Get the latest updates and special offers by subscribing to our
              newsletter.
            </p>
            <div className="newsletter__card__input">
              <input type="text" placeholder="Placeholder" />
              <button className="btn-colored">Button</button>
            </div>
            <span>By subscribing, you agree to our Terms and Conditions.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
