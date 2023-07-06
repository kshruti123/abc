import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const UserRegisterPageComponent = ({
    registerUserApiRequest,
    reduxDispatch,
    setReduxUserState,
  }) => {
    const [validated, setValidated] = useState(false);
    const [registerUserResponseState, setRegisterUserResponseState] = useState({
      success: "",
      error: "",
      loading: false,
    });
    const areas = [
      "Chikkadpally",
      "Narayanguda",
      "Tank-bund",
      "Abids",
      "Lakdikapul",
      "Secunderabad",
      "Kondapur",
      "Miyapur",
      "Madhapur",
      "Manikonda",
      "Gachibowli",
      "Nizampet",
      "JNTUH",
      "Erragadda",
      "Ameerpet",
      "Panjagutta",
    ];
  
    const onChange = () => {
      const password = document.querySelector("input[name=password]");
      const confirm = document.querySelector("input[name=confirmPassword]");
      if (confirm.value === password.value) {
        confirm.setCustomValidity("");
      } else {
        confirm.setCustomValidity("Passwords do not match");
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const form = event.currentTarget.elements;
      const phoneNumber = form.phoneNumber.value;
      const firstname = form.firstname.value;
      const lastname = form.lastname.value;
      const password = form.password.value;
      const address = form.address.value;
      const area = form.area.value;
      const pincode = form.pincode.value;
  
      if (
        event.currentTarget.checkValidity() === true &&
        phoneNumber &&
        firstname &&
        lastname &&
        password &&
        address &&
        area &&
        pincode &&
        form.password.value === form.confirmPassword.value
      ) {
        setRegisterUserResponseState({ loading: true });
        registerUserApiRequest(
          firstname,
          lastname,
          phoneNumber,
          password,
          address,
          area,
          pincode
        )
          .then((data) => {
            if (data && data.success === "User Created") {
              setRegisterUserResponseState({
                success: data.success,
                loading: false,
              });
              reduxDispatch(setReduxUserState(data.userCreated));
              sessionStorage.setItem(
                "userInfo",
                JSON.stringify(data.userCreated)
              );
              if (data.success === "User Created" && !data.userCreated.isAdmin) {
                window.location.href='/user'; // Navigate to /user route
                // window.location.href='/user'
              }
            } else {
              console.log("Invalid response:", data);
            }
          })
          .catch((error) => {
            if (
              error.response &&
              error.response.data &&
              error.response.data.error
            ) {
              setRegisterUserResponseState({
                error: error.response.data.error,
              });
            } else {
              console.log("Invalid response:", error);
            }
          });
      }
  
      setValidated(true);
    };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Register</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Your firstname</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your firstname"
                name="firstname"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a first name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Your last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your last name"
                name="lastname"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>phoneNumber</Form.Label>
              <Form.Control
                name="phoneNumber"
                required
                type="text"
                placeholder="Enter phoneNumber"
              />
              <Form.Control.Feedback type="invalid">
                Please anter a valid phone number
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please anter a valid password
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Password should have at least 6 characters
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="Repeat Password"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Both passwords should match
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Your address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your address"
                name="address"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a address
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="area">
              <Form.Label>Area</Form.Label>
              <Form.Control as="select" onChange={onChange} name="area">
                <option disabled>Select an area</option>
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>Your pincode</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Enter your pincode"
                name="pincode"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a pincode
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Do you have an account already?
                <Link to={"/login"}> Login </Link>
              </Col>
            </Row>

            <Button type="submit">
              {registerUserResponseState &&
              registerUserResponseState.loading === true ? (
                <Spinner
                  as="span"
                  animation="border"
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
                registerUserResponseState &&
                registerUserResponseState.error === "user exists"
              }
              variant="danger"
            >
              User with that phone Number already exists!
            </Alert>

            <Alert
              show={
                registerUserResponseState &&
                registerUserResponseState.success === "User Created "
              }
              variant="info"
            >
              User created
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserRegisterPageComponent;
