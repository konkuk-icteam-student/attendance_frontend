import React, { useEffect, useMemo, useState, useRef } from "react";
import styles from "../css/Modal.module.css";
import TimeAdditionPickers from "./TimeAdditionPickers";
import TimeModificationPickers from "./TimeModificationPickers";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
const ModalComponent = React.memo(
  ({ title, rowData, onClose, modifyWorktime, selectedHeader }) => {
    const modalBackground = useRef();
    const [editDate, setEditDate] = useState(dayjs(rowData.date));
    const [attendanceStatus, setAttendanceStatus] = useState();

    const [editAttendanceTime, setEditAttendanceTime] = useState(rowData);
    const style = {
      position: "relative",
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
      console.log(
        "newData setting: modal.js의 handleNewAttendanceData에서 호출됨",
        data
      );
    };
    const handleEditDate = (data) => {
      console.log("handle edatae", data);
      setEditDate(data);
    };
    const handleEditTime = (data) => {
      console.log("handle datetime", data);
      setEditAttendanceTime(dayjs(data).format("HH:mm"));
    };
    const handleAttendanceStatus = (attendanceStatus) => {
      setAttendanceStatus(attendanceStatus);
    };

    return (
      <div className={styles.modal_container}>
        <Box
          sx={{ ...style }}
          className={styles.modal_content}
          ref={modalBackground}
        >
          <h2>{title}</h2>
          <br />
          {title == "근로 시간 수정" ? (
            <TimeModificationPickers
              defaultdata={rowData}
              updatedTimeData={handleNewAttendanceData}
              selectedHeader={selectedHeader}
            />
          ) : (
            <TimeAdditionPickers
              // defaultdata={rowData}
              dateChange={handleEditDate}
              timeChange={handleEditTime}
              attendanceStatus={handleAttendanceStatus}
            />
          )}

          <div className={styles.btn_wrapper}>
            {title == "근로 시간 수정" ? (
              <button
                className={`${styles.modal_close_btn} btn btn-outline-secondary`}
                onClick={() => {
                  modifyWorktime(editAttendanceTime);
                }}
              >
                확인
              </button>
            ) : (
              <button
                className={`${styles.modal_close_btn} btn btn-outline-secondary`}
                onClick={() => {
                  modifyWorktime(
                    editDate,
                    editAttendanceTime,
                    attendanceStatus
                  );
                }}
              >
                확인
              </button>
            )}

            <button
              className={`${styles.modal_close_btn} btn btn-outline-secondary`}
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
