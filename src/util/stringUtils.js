import { Minimize } from "@mui/icons-material";

//화면에 띄워줄 시간 포맷 함수 PT10H10M10S -> 10:10:10
export const formatTime = (time) => {
  if (time == "PT0S") return "0시간 0분";
  let hour = time.split("T")[1].split("H")[0];
  let minute = time.split("T")[1].split("H")[1].split("M")[0];
  if (hour.length === 1) hour = "0" + hour;
  else if (hour.length === 0) hour = "00";

  if (minute.length === 1) minute = "0" + minute;
  else if (minute.length === 0) minute = "00";

  return `${hour}시간 ${minute}분`;
};

//백엔드 서버로 보내줄 시간 포맷 함수 2024-01-24T00:15:00.000 -> 2024-01-24 00:15:00.000
export const formatTimeForServer = (time) => {
  return time.replace("T", " ");
};
