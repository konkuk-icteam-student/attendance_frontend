import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import client from "../../util/clients";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
function Signup() {
  const [departmentsList, setDepartmentsList] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentPw, setStudentPw] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentPhoneNum, setStudentPhoneNum] = useState("");
  const [studentDepartment, setStudentDepartment] = useState("");

  let navigate = useNavigate();
  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleStudentPwChange = (event) => {
    setStudentPw(event.target.value);
  };

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleStudentPhoneNumChange = (event) => {
    setStudentPhoneNum(event.target.value);
  };

  const handleDepartmentSelect = (selectedValue) => {
    setStudentDepartment(selectedValue);
  };
  const handleSignup = () => {
    //회원가입 버튼 눌렀을 때
    client
      .post("/member/signUp", {
        loginId: studentId,
        password: studentPw,
        name: studentName,
        phoneNumber: studentPhoneNum,
        department: studentDepartment,
      })
      .then(() => {
        alert("회원가입 성공");
        navigate("/login");
      });
  };

  useEffect(() => {
    client.get("/dept/list").then((response) => {
      setDepartmentsList(response.data);
    });
  }, [studentDepartment]);
  return (
    <>
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
            value={studentId}
            onChange={handleStudentIdChange}
          />
        </InputGroup>
        <InputGroup className="mb-3 w-50 mx-auto">
          <InputGroup.Text id="basic-addon1">PW</InputGroup.Text>
          <input
            className="form-control form-control-sm"
            type="password"
            placeholder="비밀번호"
            aria-label=".form-control-sm example"
            value={studentPw}
            onChange={handleStudentPwChange}
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
            value={studentName}
            onChange={handleStudentNameChange}
          />
        </InputGroup>
        <InputGroup className="mb-3 w-50 mx-auto">
          <InputGroup.Text id="basic-addon1">전화번호</InputGroup.Text>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="010xxxxxxxx"
            aria-label=".form-control-sm example"
            value={studentPhoneNum}
            onChange={handleStudentPhoneNumChange}
          />
        </InputGroup>
        <FormControl className="mb-3 w-50 mx-auto">
          <InputLabel id="demo-simple-select-label">부서</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => setStudentDepartment(e.target.value)}
            label="부서"
            value={studentDepartment}
          >
            {departmentsList.map((dept) => {
              return (
                <MenuItem
                  value={dept.deptName}
                  onClick={() => handleDepartmentSelect(dept.deptName)}
                >
                  {dept.deptName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <br />
        <button
          className="ms-3 mb-3 btn btn-outline-secondary"
          type="button"
          onClick={handleSignup}
        >
          Sign up
        </button>
      </div>
    </>
  );
}

export default Signup;
