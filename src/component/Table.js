import React, { useState } from "react";
import { useTable } from "react-table";

function Table({ columns, data, onEditClick }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    onEditClick(row.original);
  };
  const handleRadioChange = (rowId) => {
    setSelectedRow(rowId);
  };
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
                handleRowClick(row);
                handleRadioChange(row.id);
              }}
            >
              <td>
                <input
                  type="radio"
                  name="selectRow"
                  checked={selectedRow === row.id}
                  onChange={() => handleRadioChange(row.id)}
                />
              </td>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;
