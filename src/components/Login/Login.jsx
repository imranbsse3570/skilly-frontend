import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink as Link } from "react-router-dom";

import { validateEmail, validatePassword } from "../../util/validate";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div
      style={{
        backgroundImage: "url(https://picsum.photos/id/231/1600/900)",
      }}
    >
      <div class="container py-5 login-page">
        <div className="mx-auto col-md-5 login-box-shadow background-color">
          <Form className="py-5 container text-center">
            <h3 className="text-center font-weight-bold pb-3">Login</h3>
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
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="text-left" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
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
              style={{ fontSize: "13px", marginTop: -10 }}
              className="text-left font-size-6"
              controlId="formBasicCheckbox"
            >
              <Form.Check
                type="checkbox"
                label="Remember Me"
                onChange={(e) => setRememberMe(e.target.checked)}
                value={rememberMe}
              />
            </Form.Group>
            <Button
              className="mt-3 w-100"
              style={{ padding: "12px 0" }}
              variant="primary"
              type="submit"
            >
              Login
            </Button>
            <Form.Text className="text-muted">
              Don’t have an account?
              <Link className="pl-1 font-weight-bold" to="/register" as="a">
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
