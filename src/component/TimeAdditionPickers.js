import React, { useEffect, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

function TimeAdditionPickers({ dateChange, timeChange, attendanceStatus }) {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const handleEditTime = (data) => {
    timeChange(data);
  };
  const handleEditDate = (data) => {
    dateChange(data.format("YYYY-MM-DD"));
  };
  const handleAttendanceStatus = (data) => {
    //선택된 버튼 배경색 바꾸기 위해 현재 선택 되어있는 status설정
    setSelectedStatus(data);
    //출퇴근 정보 넘겨주기
    attendanceStatus(data);
  };
  useEffect(() => {
    // console.log("status check", defaultdata);
  }, []);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          showDaysOutsideCurrentMonth
          onChange={(data) => handleEditDate(data)}
        />
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            label="Basic time picker"
            onChange={(data) => {
              handleEditTime(data);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <br />

      <ButtonGroup>
        <Button
          onClick={() => handleAttendanceStatus("출근")}
          style={{
            backgroundColor:
              selectedStatus === "출근" ? "rgba(135, 206, 235, 0.8)" : "",
          }}
        >
          출근
        </Button>
        <Button
          onClick={() => handleAttendanceStatus("퇴근")}
          style={{
            backgroundColor:
              selectedStatus === "퇴근" ? "rgba(135, 206, 235, 0.8)" : "",
          }}
        >
          퇴근
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default TimeAdditionPickers;
