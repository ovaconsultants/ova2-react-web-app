import React from 'react';
import { Link } from 'react-router-dom';
import {companyName}  from "../../constants/commonConstant";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="footer-manu">
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact us</Link></li>
                <li><Link to="/service">How it works</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
              </ul>
            </div>
            <p className="copyright mb-0">
              Copyright &copy; {new Date().getFullYear()} Designed & Developed by {companyName}.
              {/* <a href="http://www.themefisher.com"> Themefisher</a>. All rights reserved. */}
              {/* <br /> */}
              {/* Get More <a href="https://themefisher.com/free-bootstrap-templates/">Free Bootstrap Templates</a> */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
