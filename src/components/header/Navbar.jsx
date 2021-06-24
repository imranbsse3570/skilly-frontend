import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../images/skilly-logo.png";

const Header = () => {
  return (
    <Navbar className="p-3 site-header box-shadow" collapseOnSelect expand="lg">
      <Navbar.Brand>
        <NavLink to="/" as="a">
          {logo ? <img width="100" src={logo} alt="Skilly" /> : "Skilly"}
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link>
            <NavLink to="/courses/test" as="a">
              Courses
            </NavLink>
          </Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link>
            <NavLink to="/login" as="a">
              Login
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink to="/register" as="a">
              Register
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink to="/pages/contact-us" as="a">
              Contact
            </NavLink>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
