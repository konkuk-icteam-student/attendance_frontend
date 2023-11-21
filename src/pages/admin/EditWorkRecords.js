import React, { useEffect, useMemo, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Nav from "../../component/Nav";
import { useTable, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";
import PageIndex from "../../component/PageIndex";
import CustomModal from "../../component/TimePickerModal"; // 모달 컴포넌트 임포트
import styles from "../../css/Modal.module.css";
import TimePickerModal from "../../component/TimePickerModal";
function EditWorkRecords() {
  //   const secondcolumns = useMemo(() => TableColumns, []);
  //const [pageSize, setPageSize] = useState(12);
  // const [tableData, setTableData] = useState([]);
  //const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const TableColumns = [
    {
      accessor: "date",
      Header: "날짜",
    },
    {
      accessor: "working_time",
      Header: "근로 시간",
    },
    {
      accessor: "sum",
      Header: "합",
    },
  ];
  const dummyData = [
    { date: "11.01", working_time: "09:00~11:00", sum: 2.0 },
    { date: "11.02", working_time: "08:30~11:00", sum: 2.5 },
    { date: "11.03", working_time: "10:00~12:00", sum: 2.0 },
    { date: "11.04", working_time: "09:30~11:30", sum: 2.0 },
    { date: "11.05", working_time: "08:00~10:30", sum: 2.5 },
    { date: "11.06", working_time: "09:00~11:30", sum: 2.5 },
    { date: "11.07", working_time: "08:30~11:30", sum: 3.0 },
    { date: "11.08", working_time: "10:00~12:00", sum: 2.0 },
    { date: "11.09", working_time: "09:30~11:30", sum: 2.0 },
    { date: "11.10", working_time: "08:00~10:00", sum: 2.0 },
    { date: "11.11", working_time: "09:00~11:00", sum: 2.0 },
    { date: "11.12", working_time: "08:30~10:30", sum: 2.0 },
    { date: "11.13", working_time: "09:30~11:30", sum: 2.0 },
    { date: "11.14", working_time: "08:00~10:00", sum: 2.0 },
    { date: "11.15", working_time: "10:00~12:00", sum: 2.0 },
  ];

  // const handleRowClick = (rowIdx) => {
  //   // const editedRowData = [...editData];

  //   console.log(rowIdx);
  //   if (!showModal) {
  //     setShowModal(true);
  //   }
  // };

  // const gotoPage = (page) => {
  //   if (currentPage !== page) {
  //     setCurrentPage(page);
  //   }
  // };

  // const getCurrentPageData = () => {
  //   if (dummyData) {
  //     const startIndex = (currentPage - 1) * pageSize;
  //     const endIndex = startIndex + pageSize;
  //     return dummyData.slice(startIndex, endIndex);
  //   }
  //   return [];
  // };

  // // 현재 페이지에 해당하는 데이터를 가져옵니다.
  // const currentPageData = useMemo(
  //   () => getCurrentPageData(),
  //   [dummyData, currentPage]
  // );
  // const {
  //   getTableProps: getTableProps,
  //   getTableBodyProps: getTableBodyProps,
  //   headerGroups: tableHeaderGroups,
  //   rows: tableRows,
  //   prepareRow: prepareTableRow,
  // } = useTable(
  //   {
  //     columns: TableColumns,
  //     data: currentPageData,
  //     initialState: { pageIndex: 0, pageSize },
  //   },
  //   usePagination // 페이지네이션 사용
  // );
  const ModalComponent = React.memo(() => {
    return (
      <div className={styles.modal_container}>
        <div
          className={styles.modal_content}
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <h2>근로 시간 수정</h2>
          <TimePickerModal />
          <div className={styles.btn_wrapper}>
            <button
              className={styles.modal_close_btn}
              onClick={() => setModalOpen(false)}
            >
              모달 닫기
            </button>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <Nav />
      <div>{modalOpen && <ModalComponent />}</div>
      {/* <div class="container text-center">
        <div class="row">
          <div class="col">
            {" "}
            <select class="form-select" aria-label="Default select example">
              <option selected>부서</option>
              <option value="1">정보운영팀</option>
              <option value="2">입학처</option>
              <option value="3">공과대학행정</option>
            </select>
          </div>
          <div class="col">
            <select class="form-select" aria-label="Default select example">
              <option selected>학생</option>
              <option value="1">김나경</option>
              <option value="2">박준형</option>
            </select>
          </div>
        </div>

        <div className="row">
          <table className="table" {...getTableProps()}>
            <thead>
              {tableHeaderGroups.map((header) => (
                <tr {...header.getHeaderGroupProps()}>
                  {header.headers.map((col) => (
                    <th {...col.getHeaderProps()}>{col.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {tableRows.map((row, rowIdx) => {
                prepareTableRow(row);
                return (
                  <tr key={rowIdx} {...row.getRowProps()}>
                    {row.cells.map((cell, colIdx) => (
                      <td {...cell.getCellProps()}>
                        {
                          cell.render("Cell") // 편집 모드가 아닐 때
                        }
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="row justify-content-end mt-3">
            <button
              className="btn btn-outline-secondary"
              type="button"
              style={{ width: "25%" }} // 버튼의 너비를 25%로 지정
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div> */}
      <button
        className="btn btn-outline-secondary"
        type="button"
        style={{ width: "25%" }} // 버튼의 너비를 25%로 지정
        onClick={() => setModalOpen(true)}
      >
        Edit
      </button>
    </>
  );
}

export default EditWorkRecords;
