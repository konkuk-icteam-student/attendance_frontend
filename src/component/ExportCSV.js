import Button from "@mui/material/Button";
import { CSVLink } from "react-csv";
function ExportCSV(data) {
  return (
    <div className="row justify-content-end mt-3">
      <button
        className="btn btn-outline-success"
        type="button"
        style={{ width: "26%" }}
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
    </div>
  );
}
export default ExportCSV;
