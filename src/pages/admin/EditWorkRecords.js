import React, { useEffect, useMemo, useState, useRef } from "react";
import Nav from "../../component/Nav";
import Table from "../../component/Table";
import ModalComponent from "../../component/Modal";
import dayjs from "dayjs";
import client from "../../util/clients";

// 학생 근로시간을 수정할 수 있는 페이지
function EditWorkRecords() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  //선택된 학생 이름
  const [selectedStudentValue, setSelectedStudentValue] = useState(null);
  //선택된 학생 아이디(학번)
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  //선택된 row
  const [selectedRowData, setSelectedRowData] = useState(null);
  //근로 학생 리스트
  const [studentList, setStudentList] = useState([]);
  //근로 시간 데이터 세팅
  const [workTimeData, setWorkTimeData] = useState([]);
  const TableColumns = [
    {
      accessor: "date",
      Header: "날짜",
    },
    {
      accessor: "start_time",
      Header: "출근",
    },
    {
      accessor: "end_time",
      Header: "퇴근",
    },
    {
      accessor: "sum",
      Header: "합",
    },
  ];
  const dummyData = [
    { date: "2023-11-01", start_time: "09:00", end_time: "11:00", sum: 2.0 },
    { date: "2023-11-02", start_time: "09:00", end_time: "11:00", sum: 2.5 },
    { date: "2023-11-03", start_time: "13:00", end_time: "16:00", sum: 3.0 },
    { date: "2023-11-04", start_time: "15:30", end_time: "17:30", sum: 2.0 },
    { date: "2023-11-05", start_time: "09:00", end_time: "11:30", sum: 2.5 },
    { date: "2023-11-06", start_time: "09:00", end_time: "11:00", sum: 2.0 },
    { date: "2023-11-07", start_time: "09:00", end_time: "11:30", sum: 2.5 },
    { date: "2023-11-08", start_time: "13:00", end_time: "16:00", sum: 3.0 },
    { date: "2023-11-09", start_time: "15:30", end_time: "17:30", sum: 2.0 },
    { date: "2023-11-10", start_time: "09:00", end_time: "11:00", sum: 2.0 },
    { date: "2023-11-11", start_time: "15:30", end_time: "17:30", sum: 2.0 },
    { date: "2023-11-12", start_time: "15:30", end_time: "17:30", sum: 2.0 },
    { date: "2023-11-13", start_time: "15:30", end_time: "17:30", sum: 2.0 },
    { date: "2023-11-14", start_time: "09:00", end_time: "11:00", sum: 2.0 },
    { date: "2023-11-15", start_time: "13:00", end_time: "16:00", sum: 3.0 },
  ];
  const total_work_hours = 32.5;
  const handleEditClick = (rowData) => {
    setSelectedRowData(rowData);
    // setModalOpen(true);
    console.log("editworkrecord:??", rowData);
  };

  const modifyWorktime = (editDate, editStartTime, editEndTime) => {
    // console.log("modifyWorktime");
    // console.log("editDate", editDate.format("YYYY-MM-DD"));
    // console.log("editStartTime", editStartTime);
    // console.log("editEndTime", editEndTime);
    setEditModalOpen(false);
  };
  const addWorktime = (editDate, editStartTime, editEndTime) => {
    // console.log("addWorktime");
    // console.log("editDate", editDate.format("YYYY-MM-DD"));
    // console.log("editStartTime", editStartTime);
    // console.log("editEndTime", editEndTime);
    setAddModalOpen(false);
  };
  //부서에 속한 학생 목록 가져오기 (현재는 1번 부서)
  const fetchStudentList = () => {
    client.get("/dept/1").then((res) => {
      setStudentList(res.data.users);
    });
    console.log("studentList", studentList);
  };
  //select 박스에서 선택된 학생의 아이디로 근로 시간 데이터 가져오기
  const handleSelectStudent = async (event) => {
    setSelectedStudentId(event.target.value);
    // await client.get(`/worktime/${event.target.value}`).then((res) => {
    //   console.log("res.data", res.data);
    //   setWorkTimeData(res.data);
    // });
  };
  useEffect(() => {
    console.log("?");
    // client.get("/user/attendance-log").then((res) => {
    //   console.log("server resonse?\n", res);
    // });
    fetchStudentList();
  }, []);

  return (
    <>
      <Nav />
      <div>
        {/* 학생 근로 시간 수정하는 모달 */}
        {editModalOpen && (
          <ModalComponent
            title="근로 시간 수정"
            rowData={selectedRowData}
            onClose={() => setEditModalOpen(false)}
            modifyWorktime={modifyWorktime}
          />
        )}
        {/* 근로 시간 새로 추가하는 모달 */}
        {addModalOpen && (
          <ModalComponent
            title="근로 시간 추가"
            rowData={dayjs("2024-01-01T09:00")}
            onClose={() => setAddModalOpen(false)}
            modifyWorktime={addWorktime}
          />
        )}
      </div>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleSelectStudent}
            >
              <option defaultValue="학생">학생</option>

              {
                //학생 목록 띄우기
                studentList.map((student) => {
                  return (
                    <option key={student.userId} value={student.userId}>
                      {student.userName}
                    </option>
                  );
                })
              }
            </select>
          </div>
        </div>

        <div className="row">
          <Table
            columns={TableColumns}
            data={dummyData}
            onEditClick={handleEditClick}
          />
          <div className="row justify-content-end mt-3">
            총 근로: {total_work_hours}시간
          </div>
          <div className="row justify-content-end mt-3">
            <button
              className="btn btn-outline-secondary"
              type="button"
              style={{ width: "25%" }}
              onClick={() => {
                setEditModalOpen(true);
              }}
              disabled={!selectedRowData}
            >
              Edit
            </button>
          </div>
          <div className="row justify-content-end mt-3">
            <button
              className="btn btn-outline-secondary"
              type="button"
              style={{ width: "25%" }}
              onClick={() => {
                setAddModalOpen(true);
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditWorkRecords;
