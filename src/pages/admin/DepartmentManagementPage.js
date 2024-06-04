import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";

import client from "../../util/clients";
//부서 추가, 수정 페이지
function DepartmentManagementPage() {
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deptOID, setDeptOID] = useState();
  const [deptList, setDeptList] = useState([]);
  const [workerNum, setWorkerNum] = useState(0);
  //선택된 부서 저장하는 함수
  const handleDeptChange = (event) => {
    setDeptOID(event.target.value);
  };
  //부서 인원 입력 필드 값 변경되면 저장하는 함수
  const handleWorkNumInputChange = (event) => {
    setWorkerNum(event.target.value);
  };
  //부서 추가 함수
  const handleAddDept = async () => {
    try {
      await client
        .post("/dept/new-dept", {
          deptName: department,
          workerNum: parseInt(workerNum),
        })
        .then(() => {
          setDepartment("");
          alert("부서 추가 완료");
          setLoading(true);
          setWorkerNum(0);
        })
        .catch(() => {
          alert("부서명이 중복됩니다.");
          setDepartment("");
          setWorkerNum(0);
        });
    } catch (e) {
      console.log(e);
    }
  };
  //부서 삭제 함수
  const handleDeleteDept = async () => {
    await client.delete(`/dept/${deptOID}`).then((res) => {
      alert("부서 삭제 완료");
      setLoading(true);
    });
    if (deptOID === window.localStorage.getItem("deptID")) {
      window.localStorage.removeItem("deptID");
      window.localStorage.removeItem("deptName");
    }
  };
  //부서 목록 불러오는 함수
  const fetchDeptList = async () => {
    client.get("/dept/list").then((res) => {
      setDeptList(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchDeptList();
  }, [loading]);

  return (
    <div>
      <div>
        <h4> &nbsp; 부서 관리 페이지</h4>
      </div>
      <br />
      <InputGroup className="mb-3 w-50 mx-auto">
        <InputGroup.Text id="basic-addon1">부서</InputGroup.Text>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder="추가할 부서 명"
          aria-label=".form-control-sm example"
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
        />
        <InputGroup.Text id="basic-addon2">인원수</InputGroup.Text>
        <input
          className="form-control form-control-sm"
          type="number"
          placeholder="인원수"
          aria-label=".form-control-sm example"
          value={workerNum}
          onChange={handleWorkNumInputChange}
        />
      </InputGroup>

      <div className="row justify-content-end mt-3">
        <button
          className="btn btn-outline-secondary"
          type="button"
          style={{ width: "16%", marginRight: "25%" }}
          onClick={handleAddDept}
        >
          부서 추가
        </button>
      </div>
      <br />
      <InputGroup className="mb-3 w-50 mx-auto">
        <InputGroup.Text id="basic-addon1">부서</InputGroup.Text>
        <select
          onChange={handleDeptChange}
          className="form-select"
          aria-label="Default select example"
          style={{ width: "50%" }}
        >
          <option disabled selected value="">
            삭제할 부서선택
          </option>

          {Array.isArray(deptList) && deptList.length > 0 ? (
            deptList.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.deptName}
              </option>
            ))
          ) : (
            <option disabled>
              부서 목록을 불러오는데 문제가 발생했습니다.
            </option>
          )}
        </select>
      </InputGroup>

      <div className="row justify-content-end mt-3">
        <button
          className="btn btn-outline-secondary"
          type="button"
          style={{ width: "16%", marginRight: "25%" }}
          onClick={handleDeleteDept}
        >
          부서 삭제
        </button>
      </div>
    </div>
  );
}

export default DepartmentManagementPage;
