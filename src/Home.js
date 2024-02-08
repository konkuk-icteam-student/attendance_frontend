import React, { useCallback, useRef, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Nav from "../src/component/Nav";
import Board from "../src/component/Board";
import client from "./util/clients";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

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
  const [deptID, setDeptID] = useState(1);
  const [checkSocketLogin, setCheckSocketLogin] = useState(false);
  const ws = useRef(null); //webSocket을 담는 변수,
  const [stompClient, setStompClient] = useState(null);

  const [webSocket, setWebSocket] = useState(null);
  const handleDeptChange = (event) => {
    setDeptID(event.target.value);
    // stompClient.subscribe(
    //   `/topic/currentMember/${event.target.value}`,
    //   (message) => {
    //     const receivedData = JSON.parse(message.body);
    //     console.log("Received Data:", receivedData);
    //     // 받은 데이터를 상태나 다른 곳에 적용하세요.
    //     setWorkingMembers(receivedData);
    //   }
    // );
  };

  const fetchDeptList = async () => {
    client.get("/dept/list").then((res) => {
      setDeptList(res.data);
    });
  };
  let sockJS = new SockJS(`${process.env.REACT_APP_API_URL}/ws`);
  let stomp = Stomp.over(sockJS);
  useEffect(() => {
    fetchDeptList();

    stomp.connect({}, () => {
      console.log("WebSocket Connected");
      setStompClient(stomp);

      stomp.subscribe(`/topic/currentMember/1`, (message) => {
        console.log("Received Data:", message);
        //받은 데이터를 현재 출근중인 멤버리스트에 저장
        // const receivedData = JSON.parse(message.body);
        // setWorkingMembers(receivedData);
      });
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [deptID]);
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
