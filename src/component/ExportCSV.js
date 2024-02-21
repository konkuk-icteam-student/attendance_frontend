import Button from "@mui/material/Button";
import { CSVLink } from "react-csv";
function ExportCSV(data) {
  return (
    <button
      className="btn btn-outline-success"
      type="button"
      style={{ width: "25%", marginBottom: "20px" }}
    >
      <CSVLink
        headers={data.headers}
        data={data.data}
        filename="users.csv"
        target="_blank"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        엑셀로 내보내기
      </CSVLink>
    </button>
  );
}
export default ExportCSV;
