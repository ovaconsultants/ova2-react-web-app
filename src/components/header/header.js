import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../AuthContext';
import "./header.scss";
import * as constants from "../../constants/commonConstant";
import logo from '../../assets/images/ova2_logo.jpg'; 

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const username = localStorage.getItem('username');
    const handleToggle = () => setExpanded(!expanded);
    const handleLogout = () => {
        logout();
        setExpanded(false);
    };

    return (
        <div className="ova2-header">
            <header className="navigation p-0">
                <div className="container">
                    <Navbar expand="lg" expanded={expanded}>
                        <Link className="navbar-brand text-left" to="/home">
                            <img src={logo} alt={constants.companyName} className="header-logo" />
                        </Link>
                        <Navbar.Toggle aria-controls="navbar-nav" className='toggle-size' onClick={handleToggle} />
                        <Navbar.Collapse id="navbar-nav">
                            <Nav className="ml-auto">
                                <Link className="nav-link" to="/home" onClick={() => setExpanded(false)}>Home</Link>
                                <Link className="nav-link" to="/training" onClick={() => setExpanded(false)}>Training</Link>
                                <Link className="nav-link" to="/projects" onClick={() => setExpanded(false)}>Projects</Link>
                                <Link className="nav-link" to="/service" onClick={() => setExpanded(false)}>Service</Link>
                                <Link className="nav-link" to="/contact" onClick={() => setExpanded(false)}>Contact</Link>
                                <NavDropdown title="Jobs" id="jobs-dropdown">
                                <NavDropdown.Item as={Link} to="/in/jobs" onClick={() => setExpanded(false)} className="capitalize-first">India</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/us/jobs" onClick={() => setExpanded(false)}>USA</NavDropdown.Item>
                                
                                </NavDropdown>

                                {isAuthenticated ? (
                                    <>
                                        <Link className="nav-link" to="/admin" onClick={() => setExpanded(false)}>Admin</Link>
                                        {/* <img src={user?.image} alt={user?.userName} className="nav-user-image" /> */}                                       
                                        <NavDropdown title={username} id="user-dropdown">
                                            <NavDropdown.Item as={Link} to="/profile" onClick={() => setExpanded(false)}>Profile</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/settings" onClick={() => setExpanded(false)}>Settings</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/pay-slip" onClick={() => setExpanded(false)}>Generate_Pay_Slip</NavDropdown.Item>
                                        </NavDropdown>
                                        <button className="nav-link btn btn-link" title='Logout' onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right"></i>
                                        </button>

                                    </>
                                ) : (
                                    <Link className="nav-link d-flex align-items-center" to="/login" title="Login" onClick={() => setExpanded(false)}>
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
