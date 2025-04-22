import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useAuth } from "../../AuthContext";
import { useAtomValue, useSetAtom } from "jotai";
import {
  usernameAtom,
  roleNameAtom,
  registrationIdAtom,
} from "../jotia/globalAtoms/userRelatedAtoms";

import "./header.scss";
import * as constants from "../../constants/commonConstant";
import logo from "../../assets/images/ova2_logo.jpg";

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // Removed unused 'user' variable
  const username = useAtomValue(usernameAtom);
  console.log(username);
  const initials = username.split(" ").map((word) => word.charAt(0).toUpperCase()).join(""); // Fixed whitespace issues
  const roleName = useAtomValue(roleNameAtom);
  const userId = useAtomValue(registrationIdAtom); // Get userId from registrationIdAtom
  const setUsername = useSetAtom(usernameAtom);
  const setRoleName = useSetAtom(roleNameAtom);
  const navigate = useNavigate();

  const handleToggle = () => setExpanded(!expanded);

  const handleLogout = () => {
    logout();
    setUsername("");
    setRoleName("");
    setExpanded(false);
  };

  const handleProfileClick = () => {
    setExpanded(false);
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="ova2-header">
      <header className="navigation p-0">
        <div className="container">
          <Navbar expand="lg" expanded={expanded}>
            <Link className="navbar-brand text-left" to="/home">
              <img
                src={logo}
                alt={constants.companyName}
                className="header-logo"
              />
            </Link>
            <Navbar.Toggle
              aria-controls="navbar-nav"
              className="toggle-size"
              onClick={handleToggle}
            />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="ml-auto">
                <Link
                  className="nav-link"
                  to="/home"
                  onClick={() => setExpanded(false)}
                >
                  Home
                </Link>
                <Link
                  className="nav-link"
                  to="/training"
                  onClick={() => setExpanded(false)}
                >
                  Training
                </Link>
                <Link
                  className="nav-link"
                  to="/projects"
                  onClick={() => setExpanded(false)}
                >
                  Projects
                </Link>
                <Link
                  className="nav-link"
                  to="/service"
                  onClick={() => setExpanded(false)}
                >
                  Service
                </Link>
                <Link
                  className="nav-link"
                  to="/contact"
                  onClick={() => setExpanded(false)}
                >
                  Contact
                </Link>
                { <Link
                  className="nav-link"
                  to="/user-guide"
                  onClick={() => setExpanded(false)}
                >
                   Help 
                </Link> }
                <Link
                  className="nav-link"
                  to="/clients"
                  onClick={() => setExpanded(false)}
                >
                  Clients
                </Link>

                <NavDropdown title="Jobs" id="jobs-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    to="/india/jobs"
                    onClick={() => setExpanded(false)}
                    className="capitalize-first"
                  >
                    India
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/usa/jobs"
                    onClick={() => setExpanded(false)}
                  >
                    USA
                  </NavDropdown.Item>
                </NavDropdown>

                {isAuthenticated ? (
                  <>
                    {roleName.toLowerCase() === "admin" && (
                      <Link
                        className="nav-link"
                        to="/admin"
                        onClick={() => setExpanded(false)}
                      >
                        Admin
                      </Link>
                    )}
                    <NavDropdown
                      title={initials}
                      id="user-dropdown"
                      
                    >
                      <NavDropdown.Item
                        as="button"
                        onClick={() => {
                          handleProfileClick();
                          setExpanded(false);
                        }}
                        className="nav-dropdown-item custom-text"
                      >
                        Profile
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        as={Link}
                        to="/settings"
                        onClick={() => setExpanded(false)}
                        className="custom-text"
                      >
                        Settings
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/pay-Slip-Years"
                        onClick={() => setExpanded(false)}
                        className="custom-text"
                      >
                        Pay Slip
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as="button"
                        onClick={() => {
                          handleLogout();
                          setExpanded(false);
                        }}
                        className="nav-dropdown-item custom-text"
                      >
                        Log Out
                      </NavDropdown.Item>
                    </NavDropdown>

                  </>
                ) : (
                  <Link
                    className="nav-link d-flex align-items-center"
                    to="/login"
                    title="Login"
                    onClick={() => setExpanded(false)}
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    <span>Login/Sign-up</span>
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
    </div>
  );
};

export default Header;