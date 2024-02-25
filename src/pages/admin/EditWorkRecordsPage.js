import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import styles from "../../css/EditWorkRecords.module.css";

import { formatTime } from "../../util/stringUtils";
import client from "../../util/clients";

//사용된 Component
import Table from "../../component/Table";
import ModalComponent from "../../component/Modal";
import ExportCSV from "../../component/ExportCSV";

// 학생 근로시간을 수정할 수 있는 페이지
function EditWorkRecords() {
  //모달 오픈 여부
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  //선택된 학생 아이디(학번)
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  //선택된 row
  const [selectedRowData, setSelectedRowData] = useState(null);
  //근로 학생 리스트
  const [studentList, setStudentList] = useState([]);
  //근로 시간 데이터 세팅
  const [workTimeData, setWorkTimeData] = useState([]);
  //출근, 퇴근, 날짜 중 어떤 것을 선택했는지 알기위한 flag
  const [flag, setFlag] = useState(null);

  //현재 날짜
  let now = dayjs();
  // 출근 기록을 확인할 날짜 (DatePicker에서 선택한 날짜)
  const [attendanceDateToCheck, setAttendanceDateToCheck] = useState(null);
  //총 근로시간
  const [TotalWorkTime, setTotalWorkTime] = useState(null);

  //근로 시간 데이터 임시 저장소(학생을 선택할 때마다 초기화, 백엔드에서 받아온 데이터 정제 필요해서 만듦)
  const groupedData = [];

  const TableColumns = [
    {
      //퇴근 데이터만 들어온 row라면 날짜 띄워줄 때 출근 데이터가 없는 경우 퇴근 데이터의 날짜로 띄워줘야함
      accessor: (row) =>
        row.arriveAttendance.attendanceDate
          ? row.arriveAttendance.attendanceDate
          : row.leaveAttendance.attendanceDate,
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
    { label: "총 근로시간", key: "totalWorkTime" },
  ];
  //테이블에서 edit할 cell 선택시 호출되는 함수
  const handleSelectRow = (rowData) => {
    setSelectedRowData(rowData);
    setEditModalOpen(true);
  };
  //테이블에서 delete할 row 선택시 호출되는 함수
  const handleDeleteSelectRow = (rowData) => {
    setSelectedRowData(rowData);
  };
  const handleSelectedColHeader = (selectedColHeader) => {
    setFlag(selectedColHeader);
  };
  /**Modal에서 시간이 수정된 데이터를 받아와서 api 호출
  근로 시간 수정 모달의 edit 확인 버튼 클릭시 호출됨**/
  const handleModalEditClick = async (data) => {
    if (flag == "출근") {
      const arriveBody = {
        attendanceDate: data.arriveAttendance.attendanceDate,
        attendanceTime:
          data.arriveAttendance.attendanceDate + " " + data.attendanceTime,
        status: 1,
      };
      await client
        .patch(`/user/attendance/${data.arriveAttendance.id}`, arriveBody)
        .then(() => {
          alert("수정되었습니다.");
          handleSelectStudent({ target: { value: selectedStudentId } });
        })
        .catch((err) => {
          console.log("err", err);
          alert("날짜, 시간, 퇴근 여부 정보를 잘 입력하였는지 확인해주세요.");
        });
    } else if (flag == "퇴근") {
      const leaveBody = {
        attendanceDate: data.leaveAttendance.attendanceDate,
        attendanceTime:
          data.leaveAttendance.attendanceDate + " " + data.attendanceTime,
        status: 0,
      };
      await client
        .patch(`/user/attendance/${data.leaveAttendance.id}`, leaveBody)
        .then(() => {
          alert("수정되었습니다.");
          handleSelectStudent({ target: { value: selectedStudentId } });
        })
        .catch((err) => {
          console.log("err", err);
          alert("날짜, 시간, 퇴근 여부 정보를 잘 입력하였는지 확인해주세요.");
        });
    }

    setEditModalOpen(false);
    setFlag(null);
  };
  //근로 시간 추가 api 호출
  const handleModalAddClick = async (
    editDate,
    editAttendanceTime,
    attendanceStatus
  ) => {
    console.log("editDate", editDate);
    const body = {
      attendanceDate: editDate,

      attendanceTime: editDate + " " + editAttendanceTime + ":00.000",
      userId: selectedStudentId,
      status: attendanceStatus == "출근" ? 1 : 0,
    };
    console.log("body", body);
    await client
      .post(`/user/admin-attendance`, body)
      .then((res) => {
        alert("추가되었습니다.");
        handleSelectStudent({ target: { value: selectedStudentId } });
      })
      .catch((err) => {
        console.log("err", err);
        alert(
          "날짜, 시간, 출근/퇴근 여부 정보를 잘 입력하였는지 확인해주세요."
        );
      });
    setAddModalOpen(false);
  };
  //부서에 속한 학생 목록 가져오기 (현재는 1번 부서)
  const fetchStudentList = () => {
    const deptID = window.localStorage.getItem("deptID");
    client.get(`/dept/${deptID}`).then((res) => {
      if (res.data.users.length == 0) {
        alert("해당 부서에 속한 학생이 없습니다.");
      } else {
        setStudentList(res.data.users);
      }
    });
  };
  //근로 시간 삭제 api 호출
  const handleDeleteButtonClick = async () => {
    console.log("지금 딜리트 ㅎ츌:", selectedRowData);
    if (
      selectedRowData.arriveAttendance.id &&
      selectedRowData.leaveAttendance.id
    ) {
      await client.delete(
        `/user/attendance/${selectedRowData.arriveAttendance.id}`
      );
      await client
        .delete(`/user/attendance/${selectedRowData.leaveAttendance.id}`)
        .then(alert("출/퇴근 기록 삭제되었습니다."));
      setSelectedRowData(null);
    } else if (selectedRowData.arriveAttendance.id) {
      await client
        .delete(`/user/attendance/${selectedRowData.arriveAttendance.id}`)
        .then(alert("출근 기록 삭제되었습니다."));
      setSelectedRowData(null);
    } else if (selectedRowData.leaveAttendance.id) {
      await client
        .delete(`/user/attendance/${selectedRowData.leaveAttendance.id}`)
        .then(alert("퇴근 기록 삭제되었습니다."));
      setSelectedRowData(null);
    }

    handleSelectStudent({ target: { value: selectedStudentId } });
  };

  //select 박스에서 선택된 학생의 아이디로 근로 시간 데이터 가져오기
  const handleSelectStudent = async (event) => {
    setSelectedStudentId(event.target.value);

    if (attendanceDateToCheck) {
      console.log(
        "date choose",
        attendanceDateToCheck.$M,
        attendanceDateToCheck.$y
      );
      await client
        .get(
          `/user/attendance/monthly/${event.target.value}?year=${
            attendanceDateToCheck.$y
          }&month=${attendanceDateToCheck.$M + 1}`
        )
        .then((res) => {
          setTotalWorkTime(formatTime(res.data.totalDuration));

          var groupedItem = {};
          if (res.data.length == 0) {
            alert("해당 학생의 근로 데이터가 없습니다.");
          } else {
            /** 서버로부터 받는 학생 근로 기록은 형태는 총 3가지. 각 케이스별로 처리 
                1. 출근 기록이 없는 경우
                2. 퇴근 기록이 없는 경우
                3. 둘 다 정상 값이 들어오는 경우 **/
            res.data.attendanceDataList.forEach((item, index) => {
              if (item.arriveAttendance == null) {
                groupedItem = {
                  ...item,
                  arriveAttendance: {
                    ...item.arriveAttendance,
                    attendanceTime: undefined,
                  },
                  leaveAttendance: {
                    ...item.leaveAttendance,
                    attendanceTime: dayjs(
                      item.leaveAttendance.attendanceTime
                    ).format("HH:mm"),
                  },
                  workDuration: null,
                };
              } else if (item.leaveAttendance == null) {
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
                    attendanceTime: undefined,
                  },
                  workDuration: null,
                };
              } else {
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
                    attendanceTime: dayjs(
                      item.leaveAttendance.attendanceTime
                    ).format("HH:mm"),
                  },
                  workDuration: formatTime(item.workDuration),
                };
              }
              groupedItem.totalWorkTime = formatTime(res.data.totalDuration);
              //groupItem에 totalWorkTime 추가
              if (index == 0) {
                groupedItem.totalWorkTime = formatTime(res.data.totalDuration);
              } else {
                groupedItem.totalWorkTime = "";
              }
              groupedData.push(groupedItem);
            });
          }
          setWorkTimeData(groupedData);
        });
    } else {
      alert("날짜가 선택되지 않았습니다. 날짜를 선택해주세요.");
    }
  };
  const handleAttendanceDateToCheck = async (newValue) => {
    setAttendanceDateToCheck(newValue);
    setSelectedStudentId(null);
    //studentSelectbox index 초기화
    document.getElementById(styles.studentSelectBox).selectedIndex = 0;
  };
  useEffect(() => {
    fetchStudentList();
  }, []);

  return (
    <>
      <div>
        {/* 학생 근로 시간 수정하는 모달 */}
        {editModalOpen && (
          <ModalComponent
            title="근로 시간 수정"
            rowData={selectedRowData}
            onClose={() => {
              setEditModalOpen(false);
              setFlag(null);
            }}
            modifyWorktime={handleModalEditClick}
            selectedHeader={flag}
          />
        )}
        {/* 근로 시간 새로 추가하는 모달 */}
        {addModalOpen && (
          <ModalComponent
            title="근로 시간 추가"
            rowData={dayjs("2024-01-01T09:00")}
            onClose={() => setAddModalOpen(false)}
            modifyWorktime={handleModalAddClick}
          />
        )}
      </div>

      <div className="container text-center">
        <div className="row">
          <div className="col-sm-3">
            {" "}
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              dateFormats={{ monthShort: `M` }}
            >
              {/* <DemoContainer components={["DatePicker", "DatePicker"]}> */}
              <DatePicker
                format="YYYY-MM"
                views={["year", "month"]}
                value={attendanceDateToCheck}
                onChange={handleAttendanceDateToCheck}
              />
              {/* </DemoContainer> */}
            </LocalizationProvider>
          </div>
          <div className="col-sm-7">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleSelectStudent}
              id={styles.studentSelectBox}
              disabled={!attendanceDateToCheck}
            >
              <option value="" disabled selected>
                학생 선택
              </option>
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
                onDeleteClick={handleDeleteSelectRow}
                flag={handleSelectedColHeader}
              />
              <h5 className="row justify-content-end mt-3">
                총 근로시간: {TotalWorkTime}
              </h5>

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
                  id={
                    !selectedRowData
                      ? styles.disabled_deleteButton
                      : styles.deleteButton
                  }
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
              학생과 조회할 근로 년/월을 선택해주세요.
            </div>
          )
        }
      </div>
    </>
  );
}

export default EditWorkRecords;
