import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const FarmerRegisterPageComponent = ({
  registerFarmerApiRequest,
  uploadImageApiRequest,
  uploadImagesCloudinaryApiRequest,
  uploadLicenseCloudinaryApiRequest,
  uploadLicenseApiRequest,
  reduxDispatch,
  setReduxFarmerState,
}) => {
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState(false);
  const [isImageCreating, setIsImageCreating] = useState("");
  const [registerFarmerResponseState, setRegisterFarmerResponseState] =
    useState({
      success: "",
      error: "",
      loading: false,
    });
    const [licenses, setLicenses] = useState(false);
  const [isLicenseCreating, setIsLicenseCreating] = useState("");

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
  const { farmerInfo } = useSelector((state) => state.farmerRegisterLogin);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget.elements;
    const formInputs = {
      phoneNumber: form.phoneNumber.value,
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      password: form.password.value,
      address: form.address.value,
      area: form.area.value,
      pincode: form.pincode.value,
    };

    if (event.currentTarget.checkValidity() === true) {
      registerFarmerApiRequest(formInputs)
        .then((data) => {
          if (images) {
            if(process.env.NODE_ENV==="production"){
              uploadImageApiRequest(images, data._id)
              .then((res) => {})
              .catch((er) =>
                setIsImageCreating(
                  er.response.data.message
                    ? er.response.data.message
                    : er.response.data
                )
              );
            }else{
              console.log(data.farmerCreated._id)
              uploadImagesCloudinaryApiRequest(images,data.farmerCreated._id)
            }

          }
          if (licenses) {
            if(process.env.NODE_ENV==="production"){
              uploadLicenseApiRequest(licenses, data._id)
              .then((res) => {})
              .catch((er) =>
                setIsLicenseCreating(
                  er.response.data.message
                    ? er.response.data.message
                    : er.response.data
                )
              );
            }else{
              console.log(data.farmerCreated._id)
              uploadLicenseCloudinaryApiRequest(licenses,data.farmerCreated._id)
            }

          }
         return data;
        })
        .then(data=>{
          setIsLicenseCreating("Farmer is being registered...");
          setTimeout(()=>{
            setIsLicenseCreating("");
            if (data && data.success === "Farmer Created") {
              setRegisterFarmerResponseState({
                success: data.success,
                loading: false,
              });
              reduxDispatch(setReduxFarmerState(data.farmerCreated));
              sessionStorage.setItem(
                "farmerInfo",
                JSON.stringify(data.farmerCreated)
              );
              if (data.success === "Farmer Created" && !data.farmerCreated.isAdmin) {
                window.location.href='/farmer/profile'; // Navigate to /user route
                // window.location.href='/user'
              }
            }
          },2000)
        })
        .catch((er) => {
          setRegisterFarmerResponseState(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          );
        });
    }
    setValidated(true);
  };
  const imageUploadHandler = (images) => {
    setImages(images);
  };
  const licenseUploadHandler = (license) => {
    setLicenses(license);
  };
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Farmer Registration</h1>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
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
              <Form.Control as="select" onChange={onChange}>
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

            <Form.Group controlId="formBasicProfileImage">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                required
                type="file"
                // accept=".jpg, .png, .jpeg"
                // name="profileImage"
                onChange={(e) => {
                  imageUploadHandler(e.target.files);
                }}
              />
              {isImageCreating}

              <Form.Text className="text-muted">
                Please upload your profile image.
              </Form.Text>
              {isImageCreating}
            </Form.Group>

            <Form.Group controlId="formBasicLicenseFile">
              <Form.Label>License File</Form.Label>
              <Form.Control
                required
                type="file"
                accept=".pdf"
                name="licenseFile"
                onChange={(e) => {
                  licenseUploadHandler(e.target.files);
                }}
              />
              <Form.Text className="text-muted">
                Please upload your license file in PDF format.
              </Form.Text>
            </Form.Group>
            <Row className="pb-2">
              <Col>
                Do you have an account already?
                <Link to={"/login"}> Login </Link>
              </Col>
            </Row>

            {/* Submit button */}
            <Button type="submit">
              {registerFarmerResponseState.error ?? ""}
              Submit
            </Button>
            <Alert
              show={
                registerFarmerResponseState &&
                registerFarmerResponseState.error === "farmer exists"
              }
              variant="danger"
            >
              Farmer with that phone Number already exists!
            </Alert>

            <Alert
              show={
                registerFarmerResponseState &&
                registerFarmerResponseState.success === "Farmer Created "
              }
              variant="info"
            >
              Farmer created
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmerRegisterPageComponent;
