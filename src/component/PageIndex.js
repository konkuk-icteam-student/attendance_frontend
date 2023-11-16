function PageIndex({ currentPage, totalPages, gotoPage }) {
  const pages = [...Array(totalPages).keys()];

  return (
    <div>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => gotoPage(page)}>
              {page + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PageIndex;
