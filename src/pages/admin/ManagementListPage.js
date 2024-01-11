import React from "react";
import Nav from "../../component/Nav";
function App() {
  return (
    <div>
      <Nav />

      {/* Page Content */}
      <div className="container px-4 px-lg-5">
        {/* Content Row */}
        <div className="row gx-4 gx-lg-5">
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">학생 출퇴근 정보 수정</h2>
                <p className="card-text">
                  학생들의 출퇴근 시간을 수동으로 수정할 수 있는 페이지
                </p>
              </div>
              <div className="card-footer">
                <a className="btn btn-primary btn-sm" href="workinginfo">
                  More Info
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">근로 스케줄 확인 </h2>
                <p className="card-text">
                  학생들의 근로 스케줄 표를 볼 수 있는 페이지
                </p>
              </div>
              <div className="card-footer">
                <a className="btn btn-primary btn-sm" href="#!">
                  More Info
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">부서 관리</h2>
                <p className="card-text">
                  부서를 추가하거나 부서 정보 수정이 가능한 페이지
                </p>
              </div>
              <div className="card-footer">
                <a className="btn btn-primary btn-sm" href="department-manage">
                  More Info
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title">기능4</h2>
                <p className="card-text">기능4</p>
              </div>
              <div className="card-footer">
                <a className="btn btn-primary btn-sm" href="#!">
                  More Info
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="py-5 bg-dark">
        <div className="container px-4 px-lg-5">
          <p className="m-0 text-center text-white">
            Copyright &copy; Your Website 2023
          </p>
        </div>
      </footer> */}
    </div>
  );
}

export default App;
