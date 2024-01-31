import React, { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { DatePicker } from "@mui/x-date-pickers";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

function CustomModal({ defaultdata, updatedTimeData, selectedHeader }) {
  const [UpdatedAttendanceData, setUpdateAttendanceData] =
    useState(defaultdata);

  const customModalStyles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "360px",
      height: "180px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
    },
  };
  const handleEditTime = (data) => {
    if (selectedHeader === "출근") {
      const updatedData = {
        ...UpdatedAttendanceData,
        arriveAttendance: {
          ...UpdatedAttendanceData.arriveAttendance,
          attendanceTime:
            UpdatedAttendanceData.arriveAttendance.attendanceDate +
            "T" +
            dayjs(data).format("HH:mm") +
            ":00.000",
        },
        // leaveAttendance: {
        //   ...UpdatedAttendanceData.leaveAttendance,
        //   attendanceTime:
        //     UpdatedAttendanceData.leaveAttendance.attendanceDate +
        //     "T" +
        //     dayjs(data).format("HH:mm") +
        //     ":00.000",
        // },
      };
      setUpdateAttendanceData(updatedData);
      updatedTimeData(updatedData);
      console.log("updatedData", updatedData);
    } else {
      const updatedData = {
        ...UpdatedAttendanceData,
        // arriveAttendance: {
        //   ...UpdatedAttendanceData.arriveAttendance,
        //   attendanceTime:
        //     UpdatedAttendanceData.arriveAttendance.attendanceDate +
        //     "T" +
        //     dayjs(data).format("HH:mm") +
        //     ":00.000",
        // },
        leaveAttendance: {
          ...UpdatedAttendanceData.leaveAttendance,
          attendanceTime:
            UpdatedAttendanceData.leaveAttendance.attendanceDate +
            "T" +
            dayjs(data).format("HH:mm") +
            ":00.000",
        },
      };
      setUpdateAttendanceData(updatedData);
      updatedTimeData(updatedData);
    }
  };
  const handleEditDate = (data) => {
    console.log("date", data);
    const updatedData = {
      ...UpdatedAttendanceData,
      arriveAttendance: {
        ...UpdatedAttendanceData.arriveAttendance,
        attendanceDate: data.format("YYYY-MM-DD"),
        attendanceTime:
          data.format("YYYY-MM-DD") +
          "T" +
          dayjs(data[0]).format("HH:mm") +
          ":00.000",
      },
      leaveAttendance: {
        ...UpdatedAttendanceData.leaveAttendance,
        attendanceDate: data.format("YYYY-MM-DD"),
        attendanceTime:
          data.format("YYYY-MM-DD") +
          "T" +
          dayjs(data[1]).format("HH:mm") +
          ":00.000",
      },
    };
    setUpdateAttendanceData(updatedData);
    updatedTimeData(updatedData);
  };
  useEffect(() => {
    console.log("select???", selectedHeader);
    // console.log(
    //   defaultdata.arriveAttendance.attendanceDate +
    //     "T" +
    //     defaultdata.arriveAttendance.attendanceTime.format("HH:mm") +
    //     ":00.000"
    // );
  });
  // console.log("timepicker", defaultdata);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        defaultValue={
          defaultdata.arriveAttendance.attendanceDate
            ? dayjs(defaultdata.arriveAttendance.attendanceDate)
            : dayjs(defaultdata.leaveAttendance.attendanceDate)
        }
        onChange={(data) => {
          handleEditDate(data);
        }}
        disabled={selectedHeader !== "날짜"}
      />
      <DemoContainer
        components={[
          "DateField",
          "TimeField",
          "DateTimeField",
          "MultiInputDateRangeField",
          "MultiInputTimeRangeField",
          "MultiInputDateTimeRangeField",
        ]}
      >
        &nbsp;
        <TimePicker
          label="출근 time picker"
          // defaultValue={
          //   defaultdata.arriveAttendance.attendanceTime
          //     ? defaultdata.arriveAttendance.attendanceDate +
          //       "T" +
          //       defaultdata.arriveAttendance.attendanceTime
          //     : undefined
          // }
          onChange={(data) => {
            console.log("timedata", data);
            // dateChange(data);
            handleEditTime(data);
          }}
          disabled={selectedHeader !== "출근"}
        />
        <TimePicker
          label="퇴근 time picker"
          // defaultValue={
          //   defaultdata.leaveAttendance.attendanceTime
          //     ? defaultdata.leaveAttendance.attendanceDate +
          //       "T" +
          //       defaultdata.leaveAttendance.attendanceTime
          //     : undefined
          // }
          onChange={(data) => {
            // dateChange(data);

            handleEditTime(data);
          }}
          disabled={selectedHeader !== "퇴근"}
        />
        {/* <MultiInputTimeRangeField
          defaultValue={[
            dayjs(defaultdata.arriveAttendance.attendanceTime),
            dayjs(defaultdata.leaveAttendance.attendanceTime),
          ]}
          onChange={(data) => {
            console.log("timedata", data);
            handleEditTime(data);
          }}
        /> */}
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default CustomModal;
