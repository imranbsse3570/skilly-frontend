import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import validator from "validator";
import { NavLink as Link } from "react-router-dom";

const LogIn = () => {
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const checkPasswordInput = (e) => {
    setValidPassword(
      validator.matches(
        e.target.value,
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
      )
    );
  };

  const checkEmailInput = (e) => {
    setValidEmail(validator.isEmail(e.target.value));
  };

  return (
    <div
      style={{
        backgroundImage: "url(https://picsum.photos/id/231/1600/900)",
      }}
    >
      <div class="container py-5 login-page">
        <div className="mx-auto col-md-4 login-box-shadow background-color">
          <Form className="py-5 container">
            <h3 className="text-center font-weight-bold pb-3">Login</h3>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                style={
                  validEmail
                    ? { boxShadow: "0 0 0 0.2rem rgb(13 207 23 / 25%)" }
                    : { boxShadow: "0 0 0 0.2rem rgb(207 13 13 / 25%)" }
                }
                onChange={checkEmailInput}
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                style={
                  validPassword
                    ? { boxShadow: "0 0 0 0.2rem rgb(13 207 23 / 25%)" }
                    : { boxShadow: "0 0 0 0.2rem rgb(207 13 13 / 25%)" }
                }
                onChange={checkPasswordInput}
              />
              <Form.Text className="text-muted">
                <ul className={validPassword ? "d-none" : ""}>
                  <li>Password Must be 8-20 Characters Long</li>
                  <li>Password must contains an Uppercase Letter</li>
                  <li>Password must contains a Lowercase Letter</li>
                  <li>Password must contains a Digit</li>
                </ul>
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Form.Text className="text-muted">
              Don’t have an account?
              <Link className="pl-1" to="/register" as="a">
                Signup Now
              </Link>
            </Form.Text>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
