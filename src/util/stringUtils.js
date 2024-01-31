//화면에 띄워줄 시간 포맷 함수 PT10H10M10S -> 10:10:10
export const formatTime = (time) => {
  let hour = time.split("T")[1].split("H")[0];
  let minute = time.split("T")[1].split("H")[1].split("M")[0];
  return `${hour}시간 ${minute}분`;
};

//백엔드 서버로 보내줄 시간 포맷 함수 2024-01-24T00:15:00.000 -> 2024-01-24 00:15:00.000
export const formatTimeForServer = (time) => {
  return time.replace("T", " ");
};
