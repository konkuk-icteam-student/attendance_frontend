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
      accessor: "arriveAttendance.attendanceDate",
      Header: "날짜",
    },
    {
      accessor: "arriveAttendance.attendanceTime",
      Header: "출근",
    },
    {
      accessor: "leaveAttendance.attendanceTime",
      Header: "퇴근",
    },
  ];
  const dummydata = [
    {
      arriveAttendance: {
        id: 29,
        attendanceTime: "2024-01-21T15:10:08",
        attendanceDate: "2024-01-21",
        createId: null,
        createTime: null,
        status: "출근",
      },
      leaveAttendance: {
        id: 28,
        attendanceTime: "2024-01-21T16:10:08",
        attendanceDate: "2024-01-21",
        createId: null,
        createTime: null,
        status: "퇴근",
      },
    },
    {
      arriveAttendance: {
        id: 30,
        attendanceTime: "2024-01-23T15:10:08",
        attendanceDate: "2024-01-23",
        createId: null,
        createTime: null,
        status: "출근",
      },
      leaveAttendance: {
        id: 31,
        attendanceTime: "2024-01-23T16:11:08",
        attendanceDate: "2024-01-23",
        createId: null,
        createTime: null,
        status: "퇴근",
      },
    },
  ];
  const total_work_hours = 32.5;
  const handleSelectRow = (rowData) => {
    setSelectedRowData(rowData);
    // setModalOpen(true);
    console.log("editworkrecord:??", rowData);
  };
  const modifyWorktime = async (
    editDate,
    editAttendanceTime,
    id,
    attendanceStatus
  ) => {
    const body = {
      attendanceDate: editDate.format("YYYY-MM-DD"),

      attendanceTime:
        editDate.format("YYYY-MM-DD") + " " + editAttendanceTime + ":00.000",
      userId: selectedStudentId,
      status: attendanceStatus,
    };
    console.log("body", body);
    await client.put(`/user/attendance/${id}`, body).then((res) => {
      console.log("res", res);
    });

    setEditModalOpen(false);
  };
  const addWorktime = async (
    editDate,
    editAttendanceTime,
    attendanceStatus
  ) => {
    const body = {
      attendanceDate: editDate.format("YYYY-MM-DD"),

      attendanceTime:
        editDate.format("YYYY-MM-DD") + " " + editAttendanceTime + ":00.000",
      userId: selectedStudentId,
      status: attendanceStatus,
    };
    console.log("body", body);
    await client.post(`/user/admin-attendance`, body).then((res) => {
      console.log("res", res);
    });
    setAddModalOpen(false);
  };
  //부서에 속한 학생 목록 가져오기 (현재는 1번 부서)
  const fetchStudentList = () => {
    client.get("/dept/1").then((res) => {
      if (res.data.users.length == 0) {
        alert("해당 부서에 속한 학생이 없습니다.");
      } else {
        setStudentList(res.data.users);
      }
    });
    console.log("studentList", studentList);
  };
  const handleDeleteButtonClick = async () => {
    await client
      .delete(`/user/attendance/${selectedRowData.id}`)
      .then(alert("삭제되었습니다."));
  };
  //select 박스에서 선택된 학생의 아이디로 근로 시간 데이터 가져오기
  const handleSelectStudent = async (event) => {
    setSelectedStudentId(event.target.value);

    console.log("event.target.value", event.target.value);
    setWorkTimeData(dummydata);

    //추후 개발 건의: default year, month는 2024년 1월(Dayjs써서 현시점으로 세팅하고, 사용자가 조작할 수 있는 UI추가하면 좋을듯)
    // await client
    //   .get(`/user/attendance/monthly/${event.target.value}?year=2024&month=1`)
    //   .then((res) => {
    //     console.log("res.data", res.data);
    //     res.data.sort((a, b) => {
    //       return new Date(a.attendanceTime) - new Date(b.attendanceTime);
    //     });

    //     // const groupedData = [];
    //     // var groupedItem = {};
    //     // res.data.forEach((item, index) => {
    //     //   if (item.status == "출근") {
    //     //     groupedItem = {
    //     //       ...item,
    //     //       startTime: item.attendanceTime,
    //     //       endTime: undefined,
    //     //       formatStartTime: dayjs(item.attendanceTime).format("HH:mm"),
    //     //       formatEndTime: undefined,
    //     //     };
    //     //   } else if (item.status == "퇴근") {
    //     //     groupedItem = {
    //     //       ...item,
    //     //       startTime: undefined,
    //     //       endTime: item.attendanceTime,
    //     //       formatStartTime: undefined,
    //     //       formatEndTime: dayjs(item.attendanceTime).format("HH:mm"),
    //     //     };
    //     //   } else {
    //     //     groupedItem = {
    //     //       ...item,
    //     //       startTime: undefined,
    //     //       endTime: undefined,
    //     //       formatStartTime: undefined,
    //     //       formatEndTime: undefined,
    //     //     };
    //     //   }
    //     //   groupedData.push(groupedItem);
    //     // });
    //     // setWorkTimeData(groupedData);
    //   });
  };
  useEffect(() => {
    console.log("?");
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
            data={dummydata}
            onEditClick={handleSelectRow}
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
          <div className="row justify-content-end mt-3">
            <button
              className="btn btn-outline-secondary"
              type="button"
              style={{ width: "25%" }}
              onClick={handleDeleteButtonClick}
              disabled={!selectedRowData}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditWorkRecords;
