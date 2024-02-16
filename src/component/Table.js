import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import styles from "../css/Table.module.css";
function Table({ columns, data, onEditClick, onDeleteClick, flag }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (clickedData) => {
    console.log("handlerowclick실행", clickedData.original);
    onEditClick(clickedData);
  };
  const handleDeleteRowClick = (clickedData) => {
    console.log("table row 클릭", "deleterowclick실행");
    onEditClick(clickedData.original);
  };
  const handleRadioChange = (rowId) => {
    console.log(rowId, "table row 클릭");
    setSelectedRow(rowId);
  };
  const handleFieldClick = (selectedColHeader) => {
    flag(selectedColHeader);
    console.log("selectedColHeader", selectedColHeader);
  };
  useEffect(() => {
    console.log("selectedRow", selectedRow);
    // setSelectedRow(null);
  }, [data]);
  return (
    <table className="table" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroups) => (
          <tr {...headerGroups.getHeaderGroupProps()}>
            <th></th>
            {headerGroups.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIdx) => {
          prepareRow(row);
          return (
            <tr
              key={rowIdx}
              {...row.getRowProps()}
              onClick={() => {
                handleDeleteRowClick(row);
                handleRadioChange(row.id);
              }}
            >
              <td>
                <input
                  type="radio"
                  name="selectRow"
                  checked={selectedRow === row.id}
                  // onChange={() => {
                  //   handleDeleteRowClick(row);
                  //   handleRadioChange(row.id);
                  // }}
                />
              </td>
              {row.cells.map((cell) =>
                cell.column.id === "arriveAttendance.attendanceTime" ||
                cell.column.id === "leaveAttendance.attendanceTime" ? (
                  <td
                    className={styles.hoverable_cell}
                    onClick={() => {
                      console.log("table row 클릭 cell row", row.original);
                      if (
                        cell.column.id === "arriveAttendance.attendanceTime"
                      ) {
                        handleRowClick(row.original.arriveAttendance);
                      } else {
                        handleRowClick(row.original.leaveAttendance);
                      }

                      handleFieldClick(cell.column.Header);
                    }}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                ) : (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                )
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
