import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Nav from "../../component/Nav";
import client from "../../util/clients";
//부서 추가, 수정 페이지
function DepartmentManagementPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDept = async () => {
    try {
      const response = await client.post("/dept/new-dept", {
        deptName: "부서1",
        workerNum: 23,
      });
      console.log(response);
    } catch (e) {
      setError(e);
    }
  };
  useEffect(() => {
    // client.get("/dept/list").then((response) => {
    //   console.log(response.data);
    //   setDepartments(response.data);
    // });
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
        />
      </InputGroup>
      <div>
        &nbsp; 텍스트 필드 대신 건국대 모든 부서 목록 띄워두는게 좋을 듯함.
      </div>
      <button className="mx-auto" onClick={handleDept}>
        부서 추가버튼{" "}
      </button>
    </div>
  );
}

export default DepartmentManagementPage;
