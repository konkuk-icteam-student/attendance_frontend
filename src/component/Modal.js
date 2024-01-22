import React, { useEffect, useMemo, useState, useRef } from "react";
import styles from "../css/Modal.module.css";
import TimePickerModal from "../component/TimePickerModal";
import MultiTimePickerModal from "../component/MultiTimePickerModal";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
const ModalComponent = React.memo(
  ({ title, rowData, onClose, modifyWorktime }) => {
    const modalBackground = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const [editDate, setEditDate] = useState(dayjs(rowData.date));
    const [attendanceStatus, setAttendanceStatus] = useState();
    // const [editStartTime, setEditStartTime] = useState(
    //   dayjs(rowData.startTime)
    // );
    // const [editEndTime, setEditEndTime] = useState(dayjs(rowData.endTime));
    const [editAttendanceTime, setEditAttendanceTime] = useState(rowData);
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      pt: 2,
      px: 4,
      pb: 3,
      borderRadius: "15px",
    };
    const handleNewAttendanceData = (data) => {
      setEditAttendanceTime(data);
      console.log("dnewnewneata", data);
    };
    const handleEditDate = (data) => {
      setEditDate(data);
    };
    const handleEditTime = (data) => {
      console.log("etstdata", data);
      setEditAttendanceTime(dayjs(data).format("HH:mm"));
    };
    const handleAttendanceStatus = (attendanceStatus) => {
      console.log("attendanceStatus", attendanceStatus);
      setAttendanceStatus(attendanceStatus);
    };
    useEffect(() => {
      console.log("data", rowData);
      console.log("starttime", editDate.format("YYYY-MM-DD"));
    });
    return (
      <div className={styles.modal_container}>
        <Box
          sx={{ ...style }}
          className={styles.modal_content}
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              onClose();
            }
          }}
        >
          <h2>{title}</h2>
          <br />
          {title == "근로 시간 수정" ? (
            <MultiTimePickerModal
              defaultdata={rowData}
              updatedTimeData={handleNewAttendanceData}
            />
          ) : (
            <TimePickerModal
              defaultdata={rowData}
              dateChange={handleEditDate}
              timeChange={handleEditTime}
              attendanceStatus={handleAttendanceStatus}
            />
          )}

          <div className={styles.btn_wrapper}>
            <button
              className={styles.modal_close_btn}
              onClick={() => {
                rowData.id
                  ? modifyWorktime(editAttendanceTime)
                  : modifyWorktime(
                      editDate,
                      editAttendanceTime,
                      attendanceStatus
                    );
              }}
            >
              확인
            </button>
            <button
              className={styles.modal_close_btn}
              onClick={() => onClose()}
            >
              닫기
            </button>
          </div>
        </Box>
      </div>
    );
  }
);
export default ModalComponent;
