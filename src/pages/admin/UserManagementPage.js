import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import client from "../../util/clients";
//회원 관리 페이지
function UserManagementPage() {
  const [deptOID, setDeptOID] = useState();
  const [deptList, setDeptList] = useState([]);

  const StoredDeptID = window.localStorage.getItem("deptID");
  const handleDeptChange = (event) => {
    setDeptOID(event.target.value);
  };

  const handleDeleteDept = async () => {
    await client.delete(`/user/${deptOID}`).then(() => {
      alert("학생 삭제 완료");
      fetchDeptList();
    });
  };
  const fetchDeptList = async () => {
    client.get(`/dept/${StoredDeptID}`).then((res) => {
      setDeptList(res.data.users);
    });
  };
  useEffect(() => {
    fetchDeptList();
  }, []);

  return (
    <div>
      <div>
        <h4> &nbsp; 학생 관리 페이지</h4>
      </div>
      <br />

      <br />
      <InputGroup className="mb-3 w-50 mx-auto">
        <InputGroup.Text id="basic-addon1">학생</InputGroup.Text>
        <select
          onChange={handleDeptChange}
          className="form-select"
          aria-label="Default select example"
          style={{ width: "50%" }}
        >
          <option disabled selected value="">
            삭제할 학생선택
          </option>

          {deptList.map((dept) => {
            return (
              <option key={dept.id} value={dept.id}>
                {dept.userName}
              </option>
            );
          })}
        </select>
      </InputGroup>

      <div className="row justify-content-end mt-3">
        <button
          className="btn btn-outline-secondary"
          type="button"
          style={{ width: "16%", marginRight: "25%" }}
          onClick={handleDeleteDept}
        >
          학생 삭제
        </button>
      </div>
    </div>
  );
}
export default UserManagementPage;
