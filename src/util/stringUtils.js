//화면에 띄워줄 시간 포맷 함수 PT10H10M10S -> 10:10:10
export const formatTime = (time) => {
  //시간에 H,M두개 다 들어가있으면
  if (time.includes("H") && time.includes("M")) {
    let hour = time.split("H")[0].replace("PT", "");
    let minute = time.split("H")[1].split("M")[0];
    if (hour.length === 0) hour = "0";

    if (minute.length === 0) minute = "0";

    return `${hour}시간 ${minute}분`;
  } else if (time.includes("H")) {
    let hour = time.split("H")[0].replace("PT", "");
    if (hour.length === 0) hour = "0";

    return `${hour}시간`;
  } else if (time.includes("M")) {
    let minute = time.split("M")[0].replace("PT", "");
    if (minute.length === 0) minute = "0";

    return `${minute}분`;
  } else {
    return "0분";
  }
};

//백엔드 서버로 보내줄 시간 포맷 함수 2024-01-24T00:15:00.000 -> 2024-01-24 00:15:00.000
export const formatTimeForServer = (time) => {
  return time.replace("T", " ");
};
