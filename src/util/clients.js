import axios from "axios";
const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL, //서버주소(.env파일에 저장된 값)
});
export default client;
