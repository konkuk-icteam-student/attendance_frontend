import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Nav from "../../component/Nav";
import client from "../../util/clients";
//부서 추가, 수정 페이지
function DepartmentManagementPage() {
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deptOID, setDeptOID] = useState();
  const [deptList, setDeptList] = useState([]);

  const handleDeptChange = (event) => {
    setDeptOID(event.target.value);
  };
  const handleAddDept = async () => {
    try {
      const response = await client.post("/dept/new-dept", {
        deptName: department,
        workerNum: 23,
      });
      console.log(response);
      setDepartment("");

      alert("부서 추가 완료");
    } catch (e) {
      setError(e);
    }
  };
  const handleDeleteDept = async () => {
    const response = await client.delete(`/dept/${deptOID}`).then((res) => {
      alert("부서 삭제 완료");
      fetchDeptList();
    });
    console.log(response);
  };
  const fetchDeptList = async () => {
    client.get("/dept/list").then((res) => {
      setDeptList(res.data);
    });
  };
  useEffect(() => {
    fetchDeptList();
  }, []);
  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
    <div>
      <Nav />
      <div>
        <h2>부서 추가 page</h2>
      </div>
      <br />
      <InputGroup className="mb-3 w-50 mx-auto">
        <InputGroup.Text id="basic-addon1">부서</InputGroup.Text>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder="부서명"
          aria-label=".form-control-sm example"
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
        />
      </InputGroup>
      <div>
        &nbsp; 텍스트 필드 대신 건국대 모든 부서 목록 띄워두는게 좋을 듯함.
      </div>
      <button className="mx-auto" onClick={handleAddDept}>
        부서 추가버튼{" "}
      </button>
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
        </select>
      </div>
      <button
        className="mx-auto"
        disabled={!deptOID}
        onClick={handleDeleteDept}
      >
        부서 삭제버튼{" "}
      </button>
    </div>
  );
}

export default DepartmentManagementPage;
