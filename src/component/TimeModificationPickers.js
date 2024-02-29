import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

function TimeModificationPickers({
  defaultdata,
  updatedTimeData,
  selectedHeader,
}) {
  const [UpdatedAttendanceData, setUpdateAttendanceData] =
    useState(defaultdata);
  const handleEditTime = (data) => {
    const updatedata = {
      ...UpdatedAttendanceData,
      attendanceTime: dayjs(data).format("HH:mm") + ":00.000",
    };

    updatedTimeData(updatedata);
  };
  const handleEditDate = (data) => {
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
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={(data) => {
          handleEditDate(data);
        }}
        disabled={selectedHeader !== "날짜"}
        defaultValue={dayjs(defaultdata.arriveAttendance.attendanceDate)}
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
          onChange={(data) => {
            // dateChange(data);
            handleEditTime(data);
          }}
          disabled={selectedHeader !== "출근"}
          defaultValue={dayjs(
            defaultdata.arriveAttendance.attendanceDate +
              "T" +
              defaultdata.arriveAttendance.attendanceTime
          )}
        />
        <TimePicker
          label="퇴근 time picker"
          onChange={(data) => {
            handleEditTime(data);
          }}
          disabled={selectedHeader !== "퇴근"}
          defaultValue={dayjs(
            defaultdata.leaveAttendance.attendanceDate +
              "T" +
              defaultdata.leaveAttendance.attendanceTime
          )}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default TimeModificationPickers;
