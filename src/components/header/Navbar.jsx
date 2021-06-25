import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink as Link } from "react-router-dom";

import { GlobalContext } from "../../App";
import logo from "../../images/skilly-logo.png";

const Header = () => {
  const { userData: user } = useContext(GlobalContext);

  return (
    <Navbar className="p-3 site-header box-shadow" collapseOnSelect expand="lg">
      <Navbar.Brand>
        <Link to="/" as="a">
          {logo ? <img width="100" src={logo} alt="Skilly" /> : "Skilly"}
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Link to="/courses" as="a" className="nav-link">
            Courses
          </Link>

          <Link to="/pages/contact-us" as="a" className="nav-link">
            Contact
          </Link>
          {user ? (
            <>
              <NavDropdown
                title={
                  <>
                    <span className="pr-2">{user.name}</span>
                    <img
                      width="30"
                      height="30"
                      className="rounded-circle"
                      alt="user"
                      src={`https://skilly-online.herokuapp.com/files/users/${user.photo}`}
                    />
                  </>
                }
                id="collasible-nav-dropdown"
              >
                <Link to="users/myProfile" className="dropdown-item">
                  My Profile
                </Link>
                {/* <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
            </>
          ) : (
            <>
              <Link to="/login" as="a" className="nav-link">
                Login
              </Link>
              <Link to="/register" as="a" className="nav-link">
                Register
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
