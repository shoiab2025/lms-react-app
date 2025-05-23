import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/uselogin";
import { Button } from "reactstrap";
import { useAuthcontext } from "../contexts/Authcontext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthUser } = useAuthcontext();
  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/users/sign_in", {
        usernameOrEmail: username,
        password: password,
      });
      localStorage.setItem("status", response.status);
      setAuthUser(data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">
                Please enter your login and password!
              </p>

              <form onSubmit={handleSubmit}>
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="username" className="form-label">
                  Password
                </label>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  id="formControl"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="d-flex justify-content-between">
                  <MDBCheckbox
                    name="flexCheck"
                    id="flexCheckDefault"
                    className=""
                    label="Remember password"
                  />

                  <Link
                    to="/signup"
                    className="text-sm hover:underline hover:text-blue-600 inline-block"
                  >
                    {"Don't"} have an account?
                  </Link>
                </div>
                <br />
                <div className="d-flex justify-content-between my-1">
                  <Button
                    size="lg"
                    color="light"
                    className=""
                    style={{ width: "47%" }}
                    onClick={() => navigate("/")}
                  >
                    Back
                  </Button>
                  <MDBBtn
                    size="lg"
                    className=""
                    type="submit"
                    style={{ width: "47%" }}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Login"
                    )}
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
