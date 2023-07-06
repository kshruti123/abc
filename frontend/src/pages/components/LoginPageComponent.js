import React, { useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const LoginPageComponent = ({
  loginUserApiRequest,
  loginFarmerApiRequest,
  reduxDispatch,
 setReduxFarmerState,
 setReduxUserState,
}) => {
  const [farmervalidated, setFarmerValidated] = useState(false);
  const [uservalidated, setUserValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const [loginFarmerResponseState, setLoginFarmerResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const handleFarmerSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const phoneNumber = form.elements.farmerPhoneNumber.value;
    const password = form.elements.farmerPassword.value;
    const doNotLogout = form.elements.farmerdoNotLogout.checked;
    if (e.currentTarget.checkValidity() === true && phoneNumber && password) {
      setLoginFarmerResponseState({ loading: true });
      loginFarmerApiRequest(phoneNumber, password, doNotLogout)
        .then((res) => {
          setLoginFarmerResponseState({
            success: res.success,
            loading: false,
            error: "",
          });
          if (res.farmerLoggedIn) {
            reduxDispatch(setReduxFarmerState(res.farmerLoggedIn));
            if (res.success === "farmer logged in" && !res.farmerLoggedIn.isAdmin) {
              window.location.href = '/farmer/profile';
            } else {
              window.location.href = '/admin/farmers';
            }
          } else {
            setLoginFarmerResponseState({ error: "wrong credentials" });
          }
        })
        .catch((er) => {
          setLoginFarmerResponseState({ error: "wrong credentials" });
        });
    }
    setFarmerValidated(true);
  };
  
  const userNavigate = useNavigate();

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const phoneNumber = form.userPhoneNumber.value;
    const password = form.userPassword.value;
    const doNotLogout = form.userDoNotLogout.checked;

    if (e.currentTarget.checkValidity() === true && phoneNumber && password) {
      setLoginUserResponseState({ loading: true });
      loginUserApiRequest(phoneNumber, password, doNotLogout)
        .then((res) => {
          setLoginUserResponseState({
            success: res.success,
            loading: false,
            error: "",
          });
          if (res.userLoggedIn) {
            reduxDispatch(setReduxUserState(res.userLoggedIn));
            if (res.success === "user logged in" && !res.userLoggedIn.isAdmin) {
              userNavigate("/user");
            } else {
              userNavigate("/admin/farmers");
            }
          } else {
            setLoginUserResponseState({ error: "wrong credentials" });
          }
        })
        .catch((er) => {
          setLoginUserResponseState({ error: "wrong credentials" });
        });
    }
    setUserValidated(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="row">
        <div className="col-md-12 text-center mb-4">
          <h1>Login Page</h1>
        </div>
        <div className="col-md-6">
          <Card className="w-95" style={{ width: "400px", height: "300px" }}>
            <Card.Body>
              <Card.Title>Farmer Login</Card.Title>
              <Form
                noValidate
                validated={farmervalidated}
                onSubmit={handleFarmerSubmit}
              >
                <Form.Group controlId="formFarmerPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="farmerPhoneNumber"
                    required
                    // onChange={(e) => setFarmerPhoneNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formFarmerPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="farmerPassword"
                    required
                    // onChange={(e) => setFarmerPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFarmerCheckbox">
                  <Form.Check
                    name="farmerdoNotLogout"
                    type="checkbox"
                    label="Do not logout"
                  />
                  <Row className="pb-2">
                    <Col>
                      Don't you have an account?
                      <Link to={"/farmer/register"}> Register </Link>
                    </Col>
                  </Row>
                </Form.Group>
                <Button variant="primary" type="submit">
                  {loginFarmerResponseState &&
                  loginFarmerResponseState.loading === true ? (
                    <Spinner
                      as="span"
                      annimation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    ""
                  )}
                  Submit
                </Button>
                <Alert
                  show={
                    loginFarmerResponseState &&
                    loginFarmerResponseState.error === "wrong credentials"
                  }
                  variant="danger"
                >
                  Wrong credentials
                </Alert>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6">
          <Card className="w-95" style={{ width: "400px", height: "300px" }}>
            <Card.Body>
              <Card.Title>Customer Login</Card.Title>

              <Form
                noValidate
                validated={uservalidated}
                onSubmit={handleCustomerSubmit}
              >
                <Form.Group controlId="formUserPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="userPhoneNumber"
                    required
                    // onChange={(e) => setCustomerPhoneNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formUserPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="userPassword"
                    required
                    // onChange={(e) => setCustomerPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUserCheckbox">
                  <Form.Check
                    name="userDoNotLogout"
                    type="checkbox"
                    label="Do not logout"
                  />
                  <Row className="pb-2">
                    <Col>
                      Don't you have an account?
                      <Link to={"/user/register"}> Register </Link>
                    </Col>
                  </Row>
                </Form.Group>
                <Button variant="primary" type="submit">
                  {loginUserResponseState &&
                  loginUserResponseState.loading === true ? (
                    <Spinner
                      as="span"
                      annimation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    ""
                  )}
                  Submit
                </Button>
                <Alert
                  show={
                    loginUserResponseState &&
                    loginUserResponseState.error === "wrong credentials"
                  }
                  variant="danger"
                >
                  Wrong credentials
                </Alert>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPageComponent;
