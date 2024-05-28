import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import client from "../../util/clients";
import { AuthContext } from "../../util/AuthContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Login() {
  const [studentId, setStudentId] = useState("");
  const [studentPw, setStudentPw] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();
  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleStudentPwChange = (event) => {
    setStudentPw(event.target.value);
  };
  const { login } = useContext(AuthContext);

  function handleLogin() {
    //회원가입 버튼 눌렀을 때
    client
      .post(
        "/member/login",
        {
          loginId: studentId,
          password: studentPw,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert("로그인 성공");
        login(response.data);
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
          setShowErrorModal(true);
        } else if (error.request) {
          setErrorMessage("로그인 실패: 서버 응답 없음");
          setShowErrorModal(true);
        } else {
          setErrorMessage("로그인 실패: " + error.message);
          setShowErrorModal(true);
        }
      });
  }

  const handleCloseErrorModal = () => setShowErrorModal(false);

  return (
    <>
      <div className="position-relative text-center">
        {" "}
        <h2 className="mb-3">로그인</h2>
        <InputGroup className="mb-3 w-25 mx-auto">
          <InputGroup.Text id="basic-addon1">ID</InputGroup.Text>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="학번"
            aria-label=".form-control-sm example"
            onChange={handleStudentIdChange}
          />
        </InputGroup>
        <InputGroup className="mb-3 w-25 mx-auto">
          <InputGroup.Text id="basic-addon1">PW</InputGroup.Text>
          <input
            className="form-control form-control-sm"
            type="password"
            placeholder="비밀번호"
            aria-label=".form-control-sm example"
            onChange={handleStudentPwChange}
          />
        </InputGroup>
        <button
          className="ms-2 mb-3 btn btn-outline-secondary"
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="ms-3 mb-3 btn btn-outline-secondary"
          type="button"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </div>
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>로그인 오류</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
