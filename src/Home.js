import React, { useCallback, useRef, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Nav from "../src/component/Nav";
import Board from "../src/component/Board";
import client from "./util/clients";
import WebSocketManager from "./util/WebSocketManager";

import SockJS from "sockjs-client";
import Stomp from "stompjs";

//부서 선택될 때 마다 부서 아이디 가져와서 웹소켓 url 연결하기
function Home() {
  const [commuteInfo, setCommuteInfo] = useState("출퇴근 버튼을 눌러주세요");
  const handleCommuteBtn = () => {
    setCommuteInfo("지문을 인식해주세요");
  };
  const [workingMembers, setWorkingMembers] = useState([]);
  const [deptList, setDeptList] = useState([]);
  // const workingMembers = ["김호준", "김나경", "박준형", "지민영"];
  const [socketData, setSocketData] = useState();
  const [dept, setDept] = useState("정보운영팀");
  const [checkSocketLogin, setCheckSocketLogin] = useState(false);
  const ws = useRef(null); //webSocket을 담는 변수,

  const handleDeptChange = (event) => {
    setDept(event.target.value);
    client.get(`/user/attendance/current/${event.target.value}`).then((res) => {
      setWorkingMembers(res.data);
      console.log("??", res.data, event.target.value);
    });
  };

  useEffect(() => {
    const disconnectWebSocket = WebSocketManager((stompClient) => {
      stompClient.subscribe("/topic/attendance/dept/1", (message) => {
        const currentAttendanceUsers = JSON.parse(message.body);
        // 현재 출석 유저 정보를 처리하는 로직을 추가하세요
        console.log("Received:", currentAttendanceUsers);
      });
    });

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => disconnectWebSocket();
  }, []);
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
            <option disabled selected value="">
              부서선택
            </option>
            {deptList.map((dept) => {
              return (
                <option key={dept.id} value={dept.id}>
                  {dept.deptName}
                </option>
              );
            })}
            {/* <option defaultValue="정보운영팀">정보운영팀</option>
            <option value="2">입학처</option>
            <option value="3">공과대학행정</option> */}
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
                return <h5 className="m-0">{member.userName}</h5>;
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
