import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Login from "../pages/common/LoginPage";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useCallback, useRef, useEffect, useState } from "react";

function MyNav({ deptName }) {
  const navigate = useNavigate();
  const goLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const StoredDeptName = window.localStorage.getItem("deptName");
  useEffect(() => {
    // deptName이 변경될 때마다 로그 찍기 (실제로는 여기서 다른 업데이트 로직을 추가하면 됩니다)
    console.log("DeptName Updated:", deptName);
  }, [deptName]);
  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            {StoredDeptName ? (
              <Navbar.Brand href="/">건국대 {StoredDeptName}</Navbar.Brand>
            ) : (
              <Navbar.Brand href="/">건국대 {deptName}</Navbar.Brand>
            )}
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
                  <Nav.Link onClick={goLogin}>Login</Nav.Link>
                  <Nav.Link href="/manage">Manage</Nav.Link>
                  {/* <NavDropdown
                    title="기타"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
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
