import axios from "axios";
const client = axios.create({
  withCredentials: true, // 이 옵션은 쿠키를 포함한 요청을 허용합니다.
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Cache: "no-cache",
  },
});
export default client;
