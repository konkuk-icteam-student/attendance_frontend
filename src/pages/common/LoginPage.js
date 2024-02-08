import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
function Login() {
  let navigate = useNavigate();

  return (
    <>
      <div className="position-relative text-center">
        {" "}
        <h2 className="mb-3">로그인</h2>
        <InputGroup className="mb-3 w-25 mx-auto">
          <InputGroup.Text id="basic-addon1">ID</InputGroup.Text>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="학번"
            aria-label=".form-control-sm example"
          />
        </InputGroup>
        <InputGroup className="mb-3 w-25 mx-auto">
          <InputGroup.Text id="basic-addon1">PW</InputGroup.Text>
          <input
            className="form-control form-control-sm"
            type="password"
            placeholder="비밀번호"
            aria-label=".form-control-sm example"
          />
        </InputGroup>
        <button
          className="ms-2 mb-3 btn btn-outline-secondary"
          type="button"
          onClick={() => navigate("/")}
        >
          Login
        </button>
        <button
          className="ms-3 mb-3 btn btn-outline-secondary"
          type="button"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
      </div>
    </>
  );
}

export default Login;
