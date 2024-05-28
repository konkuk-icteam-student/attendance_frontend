import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../util/AuthContext"; // AuthContext 임포트

function MyNav({ deptName }) {
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext); // AuthContext 사용

  const goLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleManageClick = (e) => {
    e.preventDefault();
    if (auth) {
      navigate("/manage");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const StoredDeptName = window.localStorage.getItem("deptName");

  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="/">
              건국대 {StoredDeptName ? StoredDeptName : deptName}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {auth ? (
                    <>
                      <Nav.Link href="#">환영합니다! {auth.name} 님</Nav.Link>
                      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </>
                  ) : (
                    <Nav.Link onClick={goLogin}>Login</Nav.Link>
                  )}
                  <Nav.Link onClick={handleManageClick}>Manage</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default MyNav;
