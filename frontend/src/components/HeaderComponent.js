import React from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logoutUser } from "../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { logoutFarmer } from "../redux/actions/farmerActions";
import {Exp} from "../pages/farmer/Exp"
const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const { farmerInfo } = useSelector((state) => state.farmerRegisterLogin);

  const handleFarmerLogout = () => {
    dispatch(logoutFarmer());
  };

  const handleUserLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/images/logo.png"
              alt="Dairy Line Logo"
              width="150"
              height="75"
            />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {farmerInfo && farmerInfo.isAdmin ? (
              <LinkContainer to="/admin/farmers">
                <Nav.Link>
                  Admin
                  <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                </Nav.Link>
              </LinkContainer>
            ) : farmerInfo && farmerInfo.firstname && !farmerInfo.isAdmin ? (
              <NavDropdown
                title={`${farmerInfo.firstname} ${farmerInfo.lastname}`}
                id="collasible-nav-dropdown"
              >
                <LinkContainer to="/farmer/profile">
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/farmer/order-details">
                  <NavDropdown.Item>My orders</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={handleFarmerLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : userInfo && userInfo.isAdmin ? (
              <LinkContainer to="/admin/farmers">
                <Nav.Link>
                  Admin
                  <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                </Nav.Link>
              </LinkContainer>
            ) : userInfo && userInfo.firstname && !userInfo.isAdmin ? (
              <NavDropdown
                title={`${userInfo.firstname} ${userInfo.lastname}`}
                id="collasible-nav-dropdown"
              >
                <LinkContainer to="/user/orders">
                  <NavDropdown.Item>My Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/user">
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={handleUserLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}

            {userInfo && userInfo.firstname && !userInfo.isAdmin && (
              <LinkContainer to="/farmer-list">
                <Nav.Link>Place your Order Here!</Nav.Link>
              </LinkContainer>
            )}
 {farmerInfo && farmerInfo.firstname && !farmerInfo.isAdmin && (
              <LinkContainer to="/farmer/cb">
                <Nav.Link>Money Manager!</Nav.Link>
              </LinkContainer>
              
            )}
             {farmerInfo && farmerInfo.firstname && !farmerInfo.isAdmin && (
              <LinkContainer to="/farmer/vet-list">
                <Nav.Link>Vets for you</Nav.Link>
              </LinkContainer>
              
            )}
            <LinkContainer to="/blog/page">
              <Nav.Link>Blog</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
