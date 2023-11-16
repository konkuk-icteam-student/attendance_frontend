import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Nav from "../src/component/Nav";

function Home() {
  const [commuteInfo, setCommuteInfo] = useState("출퇴근 버튼을 눌러주세요");
  const handleCommuteBtn = () => {
    setCommuteInfo("지문을 인식해주세요");
  };

  return (
    <div>
      <Nav />
      <div className="container px-4 px-lg-5">
        {/* Heading Row */}
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
        <div className="card text-white bg-secondary my-5 py-4 text-center">
          <div className="card-body">
            <p className="text-white m-0">현재 출근중인 멤버</p>
          </div>
        </div>
        {/* Content Row */}
        <div className="row gx-4 gx-lg-5">{/* ... (이하 생략) */}</div>
      </div>
    </div>
  );
}

export default Home;
