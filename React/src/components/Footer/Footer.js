import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <h1>The Grocery Co.</h1>
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <ul>
            <li>
              <Link to={"/about"}>Our Story</Link>
            </li>
            <li>
              <Link to={"/teams"}>Teams</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>
              <Link to={"/faq"}>FAQs</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} The Grocery Co. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
