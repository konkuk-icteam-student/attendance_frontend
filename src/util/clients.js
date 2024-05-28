import axios from "axios";
const client = axios.create({
  withCredentials: true, // 이 옵션은 쿠키를 포함한 요청을 허용합니다.
});
export default client;
