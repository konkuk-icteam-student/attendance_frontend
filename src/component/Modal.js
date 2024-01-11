import React, { useEffect, useMemo, useState, useRef } from "react";
import styles from "../css/Modal.module.css";
import TimePickerModal from "../component/TimePickerModal";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
const ModalComponent = React.memo(
  ({ title, rowData, onClose, modifyWorktime }) => {
    const modalBackground = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const [editDate, setEditDate] = useState(dayjs(rowData.date));
    const [editStartTime, setEditStartTime] = useState(rowData.start_time);
    const [editEndTime, setEditEndTime] = useState(rowData.end_time);
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

    const handleEditDate = (data) => {
      setEditDate(data);
    };
    const handleEditTime = (data) => {
      setEditStartTime(dayjs(data[0].$d).format("HH:mm"));
      setEditEndTime(dayjs(data[1].$d).format("HH:mm"));
      console.log("editStartTime", editStartTime);
      console.log("editEndTime", editEndTime);
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
          <TimePickerModal
            defaultdata={rowData}
            dateChange={handleEditDate}
            timeChange={handleEditTime}
          />

          <div className={styles.btn_wrapper}>
            <button
              className={styles.modal_close_btn}
              onClick={() =>
                modifyWorktime(editDate, editStartTime, editEndTime)
              }
            >
              수정
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
