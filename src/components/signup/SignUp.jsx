import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { NavLink as Link, useNavigate } from "react-router-dom";

import {
  validateEmail,
  validatePassword,
  validateName,
  comparePassword,
} from "../../util/validate";
import AlertDismissible from "../higher-order-component/AlertDismissible";
import { signUp } from "../../services/account";
import { GlobalContext } from "../../App";

const SignUp = () => {
  const { setIsLoading } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [role, setRole] = useState("student");
  const [requestedToSignUp, setRequestedToSignUp] = useState(false);
  const [showPopup, setShowPopUp] = useState(false);
  const [popupData, setPopUpData] = useState({});

  // signup form submit function
  const signUpFormSubmit = (e) => {
    e.preventDefault();
    setRequestedToSignUp(true);
  };

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const result = await signUp(
          name,
          email,
          password,
          confirmPassword,
          role
        );

        if (result.status === "fail") {
          throw new Error(result.message);
        }

        localStorage.setItem("token", result.token);

        setShowPopUp(true);
        setPopUpData({
          popupType: "success",
          heading: "Success",
          body: "Your Account is created successfully, we have sent you a verification mail please check your inbox.",
        });

        setTimeout(() => {
          setIsLoading(true);
          navigate("/");
        }, 5000);
      } catch (err) {
        setShowPopUp(true);
        setRequestedToSignUp(false);
        setPopUpData({
          popupType: "danger",
          heading: "Error",
          body: err.message,
        });
      }
    };

    if (requestedToSignUp) {
      fetchingData();
    }
  }, [
    requestedToSignUp,
    email,
    name,
    password,
    role,
    confirmPassword,
    navigate,
  ]);

  return (
    <div
      style={{
        backgroundImage: "url(https://picsum.photos/id/231/1600/900)",
      }}
    >
      <div className="container py-5 login-page">
        <div className="mx-auto col-md-5 login-box-shadow background-color rounded shadow-sm">
          <Form
            onSubmit={(e) => signUpFormSubmit(e)}
            className="py-5 container text-center custom-form shadow-none"
          >
            <h3 className="text-center font-weight-bold pb-3">Sign Up</h3>
            <Form.Group className="text-left" controlId="userName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                style={
                  validateName(name) || name === ""
                    ? { boxShadow: "0 0 0 0.2rem rgb(13 207 23 / 25%)" }
                    : { boxShadow: "0 0 0 0.2rem rgb(207 13 13 / 25%)" }
                }
                value={name}
              />
            </Form.Group>
            <Form.Group className="text-left" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                style={
                  validateEmail(email) || email === ""
                    ? { boxShadow: "0 0 0 0.2rem rgb(13 207 23 / 25%)" }
                    : { boxShadow: "0 0 0 0.2rem rgb(207 13 13 / 25%)" }
                }
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
                value={email}
                autoComplete="username"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group
              className="text-left custom-form"
              controlId="formUserRole"
            >
              <Form.Label>Role</Form.Label>
              <div>
                <Form.Check
                  inline
                  onChange={() => {
                    setRole("student");
                  }}
                  defaultChecked
                  value="student"
                  label="Student"
                  name="userRoles"
                  type="radio"
                  id="student"
                />
                <Form.Check
                  inline
                  value="instructor"
                  onChange={() => {
                    setRole("instructor");
                  }}
                  label="Instructor"
                  name="userRoles"
                  type="radio"
                  id="instructor"
                />
              </div>
            </Form.Group>

            <Form.Group className="text-left" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="cc-number cc-csc new-password"
                style={
                  validatePassword(password) || password === ""
                    ? { boxShadow: "0 0 0 0.2rem rgb(13 207 23 / 25%)" }
                    : { boxShadow: "0 0 0 0.2rem rgb(207 13 13 / 25%)" }
                }
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Form.Text className="text-muted">
                <ul className={validatePassword(password) ? "d-none" : ""}>
                  <li>Password Must be 8-20 Characters Long</li>
                  <li>Password must contains an Uppercase Letter</li>
                  <li>Password must contains a Lowercase Letter</li>
                  <li>Password must contains a Digit</li>
                </ul>
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="text-left"
              controlId="formBasicConfirmPassword"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="confirm-password new-password"
                placeholder="Confirm Password"
                style={
                  comparePassword(password, confirmPassword)
                    ? { boxShadow: "0 0 0 0.2rem rgb(13 207 23 / 25%)" }
                    : { boxShadow: "0 0 0 0.2rem rgb(207 13 13 / 25%)" }
                }
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                disabled={
                  !validatePassword(password) || password === ""
                    ? "disabled"
                    : ""
                }
              />
              <Form.Text className="text-muted">
                <p
                  className={
                    comparePassword(password, confirmPassword) ? "d-none" : ""
                  }
                >
                  Confirm password must be same as password
                </p>
              </Form.Text>
            </Form.Group>

            <Form.Group
              style={{ fontSize: "13px", marginTop: -10 }}
              className="text-left font-size-6 custom-form"
              controlId="formBasicCheckbox"
            >
              <Form.Check
                type="checkbox"
                label="By signing up, you agree to our Terms of Use and Privacy Policy."
                onChange={(e) => setTermsAgreed(e.target.checked)}
                key="userRole"
              />
            </Form.Group>

            <Button
              className="mt-3 w-100"
              style={{ padding: "12px 0" }}
              variant="primary"
              type="submit"
              disabled={termsAgreed ? "" : "disabled"}
            >
              Sign Up
            </Button>
            <Form.Text className="text-muted">
              Do, you have an account?
              <Link className="pl-1 font-weight-bold" to="/login" as="a">
                Login
              </Link>
            </Form.Text>
          </Form>
        </div>
      </div>
      <AlertDismissible
        data={{
          showPopup,
          setShowPopUp,
          popupData,
        }}
      />
    </div>
  );
};

export default SignUp;
