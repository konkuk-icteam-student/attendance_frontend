import React from "react";
import Nav from "../../component/Nav";
function App() {
  return (
    <div>
      {/* Responsive navbar */}
      <Nav></Nav>
      <div className="container px-5">
        {/* <a className="navbar-brand" href="#!">
          Start Bootstrap
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
      </div>

      {/* Page Content */}
      <div className="container px-4 px-lg-5">
        {/* Heading Row */}
        <div className="row gx-4 gx-lg-5 align-items-center my-5">
          {/* <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg"
              alt="..."
            />
          </div> */}
          {/* <div className="col-lg-5">
            <h1 className="font-weight-light">Business Name or Tagline</h1>
            <p>
              This is a template that is great for small businesses. It doesn't
              have too much fancy flare to it, but it makes great use of the
              standard Bootstrap core components. Feel free to use this template
              for any project you want!
            </p>
            <a className="btn btn-primary" href="#!">
              Call to Action!
            </a>
          </div> */}
        </div>

        {/* Call to Action */}
        {/* <div className="card text-white bg-secondary my-5 py-4 text-center">
          <div className="card-body">
            <p className="text-white m-0">
              This call to action card is a great place to showcase some
              important information or display a clever tagline!
            </p>
          </div>
        </div> */}

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
                <h2 className="card-title">기능3</h2>
                <p className="card-text">기능3</p>
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
