import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./breadcrumb.scss";
import { FaHome } from "react-icons/fa";

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname
    .split("/")
    .filter((path) => path && path !== "home");
  console.log(paths);  

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <FaHome className="home-icon" /> {/* Home icon */}
            </Link>
          </li>

          {paths.map((path, index) => {
            const path1 = `/${paths.slice(0, index + 1).join("/")}`;
            const routeTo = path1;
            const isLast = index === paths.length - 1;
        
            return isLast ? (
              <li
                className="breadcrumb-item active"
                aria-current="page"
                key={index}
              >
                {path}
              </li>
            ) : (
              <li className="breadcrumb-item" key={index}>
                <Link to={routeTo}>{path}</Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
