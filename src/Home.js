import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Nav from "../src/component/Nav";
import Board from "../src/component/Board";
function Home() {
  const [commuteInfo, setCommuteInfo] = useState("출퇴근 버튼을 눌러주세요");
  const handleCommuteBtn = () => {
    setCommuteInfo("지문을 인식해주세요");
  };
  const workingMembers = ["김호준", "김나경", "박준형", "지민영"];
  const [dept, setDept] = useState("정보운영팀");
  const handleDeptChange = (event) => {
    setDept(event.target.value);
  };
  return (
    <div>
      <Nav />
      <div className="container px-4 px-lg-5">
        {/* Heading Row */}
        <div className="col">
          {" "}
          <select
            onChange={handleDeptChange}
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue="정보운영팀">정보운영팀</option>
            <option value="2">입학처</option>
            <option value="3">공과대학행정</option>
          </select>
        </div>
        <div className="row gx-4 gx-lg-5 align-items-center my-5">
          {/* <div className="col-lg-6">{commuteInfo}</div> */}
          <div className="col-lg-8">
            <h1 className="font-weight-light">2023-2&nbsp;정보운영팀 출근부</h1>
            <p>관리용 홈페이지..</p>
            {/* <a className="btn btn-primary" onClick={handleCommuteBtn} href="#!">
              출/퇴근하기
            </a> */}
          </div>
        </div>
        {/* Call to Action */}
        <div className="card  my-5 py-4 text-center">
          <div className="card-body">
            <h4 className=" m-0">현재 출근중인 멤버</h4>
            <br />
            <div className="row justify-content-center">
              {workingMembers.map((member) => {
                return <h5 className="m-0">{member}</h5>;
              })}
            </div>
          </div>

          {/* Content Row */}
        </div>
        <h4 className=" m-0">전체 근로생</h4>
        <Board />
      </div>
    </div>
  );
}

export default Home;
