import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import styles from "../css/Table.module.css";
function Table({ columns, data, onEditClick, onDeleteClick, flag }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (clickedData) => {
    console.log("handlerowclick실행", clickedData);
    onEditClick(clickedData);
  };
  const handleDeleteRowClick = async (clickedData) => {
    console.log("table row 클릭", "deleterowclick실행", clickedData.original);
    await onDeleteClick(clickedData.original);
    // setSelectedRow(null);
    console.log("selectedRow null인지 확인", selectedRow);
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
  }, []);
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
                />
              </td>
              {row.cells.map((cell) => {
                let isPossibleToClick = false;

                if (
                  (cell.column.id === "arriveAttendance.attendanceTime" &&
                    cell.row.original.arriveAttendance.attendanceTime !=
                      undefined) ||
                  (cell.column.id === "leaveAttendance.attendanceTime" &&
                    cell.row.original.leaveAttendance.attendanceTime !=
                      undefined)
                ) {
                  isPossibleToClick = true;
                }

                return (
                  <td
                    key={cell.column.id}
                    className={isPossibleToClick ? styles.hoverable_cell : ""}
                    onClick={
                      isPossibleToClick
                        ? () => {
                            console.log("table row 클릭 cell row", cell);
                            if (
                              cell.column.id ===
                              "arriveAttendance.attendanceTime"
                            ) {
                              handleRowClick(row.original.arriveAttendance);
                            } else {
                              handleRowClick(row.original.leaveAttendance);
                            }
                            handleFieldClick(cell.column.Header);
                          }
                        : undefined
                    }
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
