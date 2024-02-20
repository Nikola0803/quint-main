import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import "./Footer.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
      <div className="container border-bottom">
        <div className="row">
          <div className="footer__card-bigger col-6">
            <img src={logo} alt="" />
            <h3>Duis cursus, mi quis viverra ornare</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in <br></br> eros elementum tristique.
              Duis cursus, mi quis viverra ornare, eros dolor interdum nulla,
              <br></br> ut commodo diam libero vitae erat.
            </p>
          </div>
          <div className="footer__card col-2">
            <h3>Column One</h3>
            <ul>
              <li>
                <Link>Link one</Link>
              </li>
              <li>
                <Link>Link two</Link>
              </li>
              <li>
                <Link>Link three</Link>
              </li>
              <li>
                <Link>Link four</Link>
              </li>
              <li>
                <Link>Link five</Link>
              </li>
            </ul>
          </div>
          <div className="footer__card col-2">
            <h3>Column Two</h3>
            <ul>
              <li>
                <Link>Link seven</Link>
              </li>
              <li>
                <Link>Link eight</Link>
              </li>
              <li>
                <Link>Link nine</Link>
              </li>
              <li>
                <Link>Link ten</Link>
              </li>
              <li>
                <Link>Link five</Link>
              </li>
            </ul>
          </div>
          <div className="footer__card col-2">
            <h3>Follow us</h3>
            <div className="footer__card__icon">
              <FaFacebook /> <Link>Facebook</Link>
            </div>

            <div className="footer__card__icon">
              <FaInstagram /> <Link>Instagram</Link>
            </div>

            <div className="footer__card__icon">
              <RiTwitterXFill /> <Link>X</Link>
            </div>

            <div className="footer__card__icon">
              <FaLinkedin /> <Link>Linkedin</Link>
            </div>

            <div className="footer__card__icon">
              <FaYoutube /> <Link>Youtube</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <h3>© 2023 Company. All rights reserved.</h3>
        <ul>
          <li>
            <Link>Privacy Policy</Link>
          </li>
          <li>
            <Link>Terms of Policy</Link>
          </li>
          <li>
            <Link>Cookies Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
