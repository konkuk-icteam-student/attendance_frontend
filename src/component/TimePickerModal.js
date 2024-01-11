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

function CustomModal({ defaultdata, dateChange, timeChange }) {
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
    timeChange(data);
  };
  const handleEditDate = (data) => {
    dateChange(data);
  };
  useEffect(() => {
    console.log("data", defaultdata);
    // timeChange(defaultdata.start_time);
  });
  // console.log("timepicker", defaultdata);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        defaultValue={dayjs(defaultdata.date)}
        onChange={(data) => handleEditDate(data)}
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
        <MultiInputTimeRangeField
          defaultValue={[
            dayjs(`${defaultdata.date}T${defaultdata.start_time}`),
            dayjs(`${defaultdata.date}T${defaultdata.end_time}`),
          ]}
          onChange={(data) => {
            // dateChange(data);
            console.log("timedata", data);
            handleEditTime(data);
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default CustomModal;
