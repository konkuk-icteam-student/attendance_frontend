import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import client from "../../util/clients";
//부서 추가, 수정 페이지
function DepartmentManagementPage() {
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deptOID, setDeptOID] = useState();
  const [deptList, setDeptList] = useState([]);
  const [workerNum, setWorkerNum] = useState(0);

  const StoredDeptID = window.localStorage.getItem("deptID");
  const handleDeptChange = (event) => {
    setDeptOID(event.target.value);
  };
  const handleChange = (event) => {
    setWorkerNum(event.target.value);
  };

  const handleAddDept = async () => {
    try {
      const response = await client
        .post("/dept/new-dept", {
          deptName: department,
          workerNum: parseInt(workerNum, 10), // Convert to integer
        })
        .then((res) => {
          setDepartment("");
          alert("부서 추가 완료");
          setLoading(true);
          setWorkerNum(0);
        })
        .catch((e) => {
          alert("부서명이 중복됩니다.");
          setDepartment("");
          setWorkerNum(0);
        });
    } catch (e) {
      setError(e);
    }
  };
  const handleDeleteDept = async () => {
    await client.delete(`/dept/${deptOID}`).then((res) => {
      alert("부서 삭제 완료");
      fetchDeptList();
    });

    window.localStorage.removeItem("deptID");
    window.localStorage.removeItem("deptName");
  };
  const fetchDeptList = async () => {
    client.get("/dept/list").then((res) => {
      setDeptList(res.data);
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
          onChange={handleChange}
        />
      </InputGroup>

      <div className="row justify-content-end mt-3">
        <button
          className="btn btn-outline-secondary"
          type="button"
          style={{ width: "10%", marginRight: "25%" }}
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

          {deptList.map((dept) => {
            return (
              <option
                key={dept.id}
                value={dept.id}
                // disabled={StoredDeptID != dept.id}
              >
                {dept.deptName}
              </option>
            );
          })}
        </select>
      </InputGroup>

      <div className="row justify-content-end mt-3">
        <button
          className="btn btn-outline-secondary"
          type="button"
          style={{ width: "10%", marginRight: "25%" }}
          onClick={handleDeleteDept}
        >
          부서 삭제
        </button>
      </div>
    </div>
  );
}

export default DepartmentManagementPage;
