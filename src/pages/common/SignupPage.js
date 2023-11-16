import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Nav from "../../component/Nav";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Signup() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [inputDisabled, setInputDisabled] = useState(true);

  let navigate = useNavigate();
  const handleDepartmentSelect = (selectedValue) => {
    setSelectedDepartment(selectedValue);
    setInputDisabled(true);
  };
  return (
    <>
      <Nav />
      <div className="position-relative text-center">
        {" "}
        <h2 className="mb-3">회원가입</h2>
        <InputGroup className="mb-3 w-50 mx-auto">
          <InputGroup.Text id="basic-addon1">ID </InputGroup.Text>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="학번"
            aria-label=".form-control-sm example"
          />
        </InputGroup>
        <InputGroup className="mb-3 w-50 mx-auto">
          <InputGroup.Text id="basic-addon1">PW</InputGroup.Text>
          <input
            className="form-control form-control-sm"
            type="password"
            placeholder="비밀번호"
            aria-label=".form-control-sm example"
          />
        </InputGroup>
        <InputGroup className="mb-3 w-50 mx-auto">
          <InputGroup.Text id="basic-addon1">PW</InputGroup.Text>
          <input
            className="form-control form-control-sm"
            type="password"
            placeholder="비밀번호 확인"
            aria-label=".form-control-sm example"
          />
        </InputGroup>
        <InputGroup className="mb-3 w-50 mx-auto">
          <InputGroup.Text id="basic-addon1">이름</InputGroup.Text>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="이름"
            aria-label=".form-control-sm example"
          />
        </InputGroup>
        <InputGroup className="mb-3 w-50 mx-auto">
          <InputGroup.Text id="basic-addon1">전화번호</InputGroup.Text>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="010xxxxxxxx"
            aria-label=".form-control-sm example"
          />
        </InputGroup>
        <InputGroup className="mb-3 w-50 mx-auto">
          <DropdownButton
            variant="outline-secondary"
            title="부서"
            id="input-group-dropdown-4"
            align="end"
          >
            <Dropdown.Item onClick={() => handleDepartmentSelect("정보통신처")}>
              정보통신처
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDepartmentSelect("입학처")}>
              입학처
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleDepartmentSelect("공과대학 행정")}
            >
              공과대학 행정
            </Dropdown.Item>
          </DropdownButton>
          <Form.Control
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            disabled={inputDisabled}
            aria-label="Text input with 2 dropdown buttons"
          />
        </InputGroup>
        {/* <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
      </InputGroup>

      <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">
          https://example.com/users/
        </InputGroup.Text>
        <Form.Control id="basic-url" aria-describedby="basic-addon3" />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control aria-label="Amount (to the nearest dollar)" />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>

      <InputGroup>
        <InputGroup.Text>With textarea</InputGroup.Text>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup> */}
        <button
          className="ms-3 mb-3 btn btn-outline-secondary"
          type="button"
          onClick={() => navigate("/")}
        >
          Sign up
        </button>
      </div>
    </>
  );
}

export default Signup;
