import React, { useEffect, useMemo, useState, useRef } from "react";
import Nav from "../../component/Nav";
import Table from "../../component/Table";
import ModalComponent from "../../component/Modal";
import dayjs from "dayjs";
import client from "../../util/clients";
import ExportCSV from "../../component/ExportCSV";
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
  const groupedData = [];

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
    {
      accessor: "workDuration",
      Header: "근로시간",
    },
  ];
  const CSVHeaders = [
    { label: "날짜", key: "arriveAttendance.attendanceDate" },
    { label: "출근", key: "arriveAttendance.attendanceTime" },
    { label: "퇴근", key: "leaveAttendance.attendanceTime" },
    { label: "근로시간", key: "workDuration" },
  ];
  const handleSelectRow = (rowData) => {
    setSelectedRowData(rowData);
    // setModalOpen(true);
    console.log("editworkrecord:??", rowData);
  };
  const modifyWorktime = async (data) => {
    //api 요청시 필요한 형식에 맞게 body 수정
    const arriveBody = {
      attendanceDate: data.arriveAttendance.attendanceDate,

      attendanceTime:
        data.arriveAttendance.attendanceDate +
        " " +
        data.arriveAttendance.attendanceTime.match(/T(\d{2}:\d{2})/)[1] +
        ":00.000",
      status: data.arriveAttendance.status,
    };
    //api 요청시 필요한 형식에 맞게 body 수정
    const leaveBody = {
      attendanceDate: data.arriveAttendance.attendanceDate,

      attendanceTime:
        data.leaveAttendance.attendanceDate +
        " " +
        data.leaveAttendance.attendanceTime.match(/T(\d{2}:\d{2})/)[1] +
        ":00.000",
      status: data.leaveAttendance.status,
    };
    //출근 시간 수정 api 호출
    await client
      .put(`/user/attendance/${data.arriveAttendance.id}`, arriveBody)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
    //퇴근 시간 수정 api 호출
    await client
      .put(`/user/attendance/${data.leaveAttendance.id}`, leaveBody)
      .then((res) => {
        console.log("res", res);
        alert("수정되었습니다.");
      })
      .catch((err) => {
        console.log("err", err);
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
    await client
      .post(`/user/admin-attendance`, body)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
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
    await client.delete(
      `/user/attendance/${selectedRowData.leaveAttendance.id}`
    );
    await client
      .delete(`/user/attendance/${selectedRowData.arriveAttendance.id}`)
      .then(alert("삭제되었습니다."));
  };
  //select 박스에서 선택된 학생의 아이디로 근로 시간 데이터 가져오기
  const handleSelectStudent = async (event) => {
    setSelectedStudentId(event.target.value);

    //추후 개발 건의: default year, month는 2024년 1월(Dayjs써서 현시점으로 세팅하고, 사용자가 조작할 수 있는 UI추가하면 좋을듯)
    await client
      .get(`/user/attendance/monthly/${event.target.value}?year=2024&month=1`)
      .then((res) => {
        console.log("res.data", res.data);

        var groupedItem = {};
        res.data.forEach((item, index) => {
          groupedItem = {
            ...item,
            arriveAttendance: {
              ...item.arriveAttendance,
              attendanceTime: dayjs(
                item.arriveAttendance.attendanceTime
              ).format("HH:mm"),
            },
            leaveAttendance: {
              ...item.leaveAttendance,
              attendanceTime: dayjs(item.leaveAttendance.attendanceTime).format(
                "HH:mm"
              ),
            },
            workDuration: item.workDuration.substring(2),
          };
          groupedData.push(groupedItem);
        });

        setWorkTimeData(groupedData);
        console.log("worktimedata?????", groupedData);
      });
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
        {
          //선택된 학생이 있을 때만 근로 시간 데이터 띄우기
          selectedStudentId ? (
            <div className="row">
              <Table
                columns={TableColumns}
                data={workTimeData}
                onEditClick={handleSelectRow}
              />
              {/* <div className="row justify-content-end mt-3">
      총 근로: 시간
    </div> */}
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
              <div className="row justify-content-end mt-3">
                <ExportCSV data={workTimeData} headers={CSVHeaders} />
              </div>
            </div>
          ) : (
            <div className="row justify-content-center mt-3">
              학생을 선택해주세요.
            </div>
          )
        }
      </div>
    </>
  );
}

export default EditWorkRecords;
