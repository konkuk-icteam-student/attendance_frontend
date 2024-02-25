import React, { useCallback, useRef, useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
// import "./css/styles.css";
import Board from "../src/component/Board";
import client from "./util/clients";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import Nav from "./component/Nav";

//부서 선택될 때 마다 부서 아이디 가져와서 웹소켓 url 연결하기
function Home() {
  const [workingMembers, setWorkingMembers] = useState([]);
  const [deptList, setDeptList] = useState([]);
  const [deptID, setDeptID] = useState(() => {
    const storedDeptID = localStorage.getItem("deptID");

    // 만약 값이 존재한다면 해당 값을 반환, 없으면 0을 반환
    return storedDeptID ? parseInt(storedDeptID) : 1;
  });
  const [deptName, setDeptName] = useState(() => {
    const storedDeptName = localStorage.getItem("deptName");
    return storedDeptName ? storedDeptName : "정보운영팀";
  });
  const [stompClient, setStompClient] = useState(null);
  const [allMembers, setAllMembers] = useState([]);
  let sockJS = new SockJS(`${process.env.REACT_APP_API_URL}/ws`);
  let stomp = Stomp.over(sockJS);

  const handleDeptChange = (event) => {
    setDeptID(event.target.value);
    setDeptName(event.target.options[event.target.selectedIndex].text);
    setWorkingMembers([]);
    stompClient.disconnect();
  };

  const fetchDeptList = async () => {
    client.get("/dept/list").then((res) => {
      setDeptList(res.data);

      console.log(res.data);
    });
  };
  //부서별 전체 학생 조회
  const fetchAllMembers = async () => {
    client.get(`/dept/${deptID}`).then((res) => {
      console.log("all members", res.data);
      setAllMembers(res.data.users);
    });
  };
  useEffect(() => {
    fetchDeptList();
    if (deptID === undefined) {
    } else {
      window.localStorage.setItem("deptID", deptID);
      window.localStorage.setItem("deptName", deptName);
    }
    fetchAllMembers();
    stomp.connect({}, () => {
      console.log("WebSocket Connected");
      setStompClient(stomp);

      stomp.subscribe(`/topic/currentMember/${deptID}`, (message) => {
        //받은 데이터를 현재 출근중인 멤버리스트에 저장
        const receivedData = JSON.parse(message.body);
        setWorkingMembers(receivedData);
      });

      stomp.send(`/app/dept/${deptID}`, {}, null);
    });
    //useEffect에서 return을 하면 컴포넌트가 언마운트 될 때 또는 useEffect 실행전에 먼저 실행됨
    return () => {
      //stompClient 객체가 존재하면 웹소켓 연결 끊음
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [deptID]);
  return (
    <div>
      <Nav deptName={deptName} />
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
                <option
                  key={dept.id}
                  value={dept.id}
                  selected={deptID === dept.id}
                >
                  {dept.deptName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="row gx-4 gx-lg-5 align-items-center my-5">
          <div className="col-lg-8">
            <h1 className="font-weight-light">2023-2&nbsp;정보운영팀 출근부</h1>
            <p>관리용 홈페이지..</p>
          </div>
        </div>
        <div className="card  my-5 py-4 text-center">
          <div className="card-body">
            <h4 className=" m-0">현재 출근중인 멤버</h4>
            <br />
            <div className="row justify-content-center">
              {workingMembers.map((member) => {
                return (
                  <h5 className="m-0" key={member.id}>
                    {member.userName}
                  </h5>
                );
              })}
            </div>
          </div>
        </div>
        <h4 className=" m-0">전체 근로생</h4>
        {
          //부서별 전체 근로생 조회
          !allMembers ? (
            <div>로딩중...</div>
          ) : (
            <Board deptMembers={allMembers} />
          )
        }
      </div>
    </div>
  );
}

export default Home;
