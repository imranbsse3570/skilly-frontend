import React from "react";
import * as formik from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import "yup-phone";

const Contact = () => {
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required().min(3),
    lastName: yup.string().required().min(3),
    email: yup.string().email().required(),
    phone: yup.string().phone().required(),
    message: yup.string().min(10).max(2000).required(),
  });

  return (
    <div className="text-left">
      <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="ContactFormFirstName">
                <Form.Control
                  className="rounded-0 box-shadow p-4"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="ContactFormLastName">
                <Form.Control
                  className="rounded-0 box-shadow p-4"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="ContactFormEmail">
                <Form.Control
                  className="rounded-0 box-shadow p-4"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="email"
                  isInvalid={!!errors.email}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="ContactFormPhone">
                <Form.Control
                  className="rounded-0 box-shadow p-4"
                  type="tel"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="phone"
                  isInvalid={!!errors.phone}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="ContactFormMessage">
                <Form.Control
                  className="rounded-0 box-shadow p-4"
                  type="textarea"
                  as="textarea"
                  rows={5}
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="message"
                  isInvalid={!!errors.message}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit" class="p-3 btn btn-primary">
              Send Message
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Contact;
