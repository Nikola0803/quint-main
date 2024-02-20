import React from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "./Navbar.scss";
function Navbar() {
  return (
    <div className="container">
      <div className="navbar">
        <div className="navbar__left">
          <Link to={"#"}>
            {" "}
            <img src={Logo} alt="" />
          </Link>

          <ul>
            <Link to={"/products"}>Order Now</Link>
            <Link to={"test"}>About Us</Link>
            <Link to={"test"}>Contact</Link>

            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Material Types
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Wood
                </a>
                <a className="dropdown-item" href="#">
                  Plastic
                </a>
                <a className="dropdown-item" href="#">
                 Aluminium
                </a>
                <a className="dropdown-item" href="#">
                  Aluminium & Wood
                </a>
              </div>
            </div>
            <Link to={"test"}>Services</Link>
          </ul>
        </div>
        <div className="navbar-right">
          <button className="btn-white">Sign Up</button>
          <button className="btn-colored">Log In</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
