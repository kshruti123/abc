import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

const FarmerDetailsPageComponent = ({
  orderUserApiRequest,
  fetchProducts,
  farmerId,
  getFarmerDetails,
  userInfo,
  writeReviewApiRequest,
}) => {
  const [products, setProducts] = useState([]);
  const [farmer, setFarmer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState([]);
  const [licenseModal, setLicenseModal] = useState(false); // Added state for license modal
  const [showModal, setShowModal] = useState(false);
  const [farmerReviewed, setFarmerReviewed] = useState(false);
  // const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const userId = userInfo._id;
  useEffect(() => {
    getFarmerDetails(farmerId)
      .then((data) => {
        setFarmer(data);
        setLoading(false);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [farmerId, farmerReviewed]);
  useEffect(() => {
    fetchProducts()
      .then((res) => setProducts(res.products))
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
    console.log(farmer);
  }, []);
  const handleQuantityIncrement = (index) => {
    setSelectedQuantity((prevQuantity) => {
      const updatedQuantity = [...prevQuantity];
      updatedQuantity[index] = (updatedQuantity[index] || 0) + 1;
      return updatedQuantity;
    });
  };

  const handleQuantityDecrement = (index) => {
    setSelectedQuantity((prevQuantity) => {
      const updatedQuantity = [...prevQuantity];
      if (updatedQuantity[index] > 0) {
        updatedQuantity[index] -= 1;
      }
      return updatedQuantity;
    });
  };

  const handleFrequencyChange = (event, idx) => {
    const { value } = event.target;
    setSelectedFrequency((prevFrequency) => {
      const updatedFrequency = [...prevFrequency];
      updatedFrequency[idx] = value;
      return updatedFrequency;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedProducts = products
      .map((product, idx) => {
        const quantity = selectedQuantity[idx];
        const frequency =
          selectedFrequency[idx] === "Once" ? "Once" : selectedFrequency[idx];
        if (quantity > 0 && frequency) {
          return {
            farmerId,
            userId,
            id: product._id,
            name: product.name,
            quantity,
            frequency,
          };
        }
        return null;
      })
      .filter(Boolean);

    if (selectedProducts.length > 0) {
      try {
        const orderRequests = selectedProducts.map((selectedProduct) =>
          orderUserApiRequest(
            selectedProduct.farmerId,
            selectedProduct.id,
            selectedProduct.name,
            selectedProduct.quantity,
            selectedProduct.frequency
          )
        );
        await Promise.all(orderRequests);
        setShowModal(true);
      } catch (error) {
        console.log("Error placing orders:", error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const openLicenseModal = () => {
    setLicenseModal(true);
  };

  const closeLicenseModal = () => {
    setLicenseModal(false);
  };
  const sendReviewHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    };
    if (e.currentTarget.checkValidity() === true) {
      writeReviewApiRequest(farmerId, formInputs)
        .then((data) => {
          if (data === "review created") {
            setFarmerReviewed("You successfully reviwed the farmer !");
          }
        })
        .catch((er) =>
          setFarmerReviewed(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }
  };
  return (
    <Container>
      <Row className="mt-5">
        {loading ? (
          <h2>Loading farmer details ...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <Col md={4}>
              <Image
                fluid
                src={farmer.images}
                alt="Farmer Image"
                style={{ width: "80%", height: "auto" }}
              />
              {/* <h3 style={{ textAlign: "center" }}>{farmer.firstname} {farmer.lastname}</h3> */}
            </Col>
            <Col md={8}>
              <Row>
                <Col md={8}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h1>
                        {farmer.firstname} {farmer.lastname}
                      </h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating readonly size={20} initialValue={farmer.rating} />{" "}
                      ({farmer.reviewsNumber})
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        variant="primary"
                        size="sm"
                        className="mt-3"
                        onClick={openLicenseModal}
                      >
                        View License
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4}></Col>
              </Row>
              <Form onSubmit={handleSubmit}>
                <Row className="mt-5">
                  <Col>
                    <h5>Products (Milk in litres and products in 500gms)</h5>
                    <Row xs={1} md={2} className="g-4">
                      {products.map((product, idx) => (
                        <Col key={idx}>
                          <Card>
                            <Card.Body>
                              <Card.Title>{product.name}</Card.Title>
                              <Card.Text>
                                <Row className="align-items-center">
                                  <Col xs={5}>
                                    <Button
                                      variant="outline-primary"
                                      className="me-2"
                                      onClick={() =>
                                        handleQuantityDecrement(idx)
                                      }
                                    >
                                      -
                                    </Button>
                                    <span>{selectedQuantity[idx] || 0}</span>
                                    <Button
                                      variant="outline-primary"
                                      className="ms-2"
                                      onClick={() =>
                                        handleQuantityIncrement(idx)
                                      }
                                    >
                                      +
                                    </Button>
                                  </Col>
                                  <Col xs={7}>
                                    <br />
                                    <Row>
                                      <Col>
                                        <Form.Group
                                          controlId={`subscribe-${idx}`}
                                          className="mb-0"
                                        >
                                          <Form.Label as="h6">
                                            Select Your Product Frequency
                                          </Form.Label>
                                          <Form.Control
                                            as="select"
                                            name={`subscribe-${idx}`}
                                            onChange={(e) =>
                                              handleFrequencyChange(e, idx)
                                            }
                                            value={selectedFrequency[idx] || ""}
                                          >
                                            <option value="" disabled>
                                              Select the frequency
                                            </option>
                                            <option value="Once">Once</option>
                                            {[
                                              "1 month",
                                              "3 months",
                                              "6 months",
                                            ].map((subscription) => (
                                              <option
                                                key={subscription}
                                                value={subscription}
                                              >
                                                {subscription}
                                              </option>
                                            ))}
                                          </Form.Control>
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
                <Button variant="danger" type="submit" className="mb-3 mt-3">
                  Place Order
                </Button>
              </Form>
              <Row className="mt-5">
                <Col>
                  <h5>Customer Reviews</h5>
                  <ListGroup variant="flush">
                    {farmer.reviews &&
                      farmer.reviews.map((review, idx) => (
                        <ListGroup.Item key={idx}>
                          {review.user.firstname} {review.user.lasstname}
                          <br />
                          <Rating
                            readonly
                            size={20}
                            initialValue={review.rating}
                          />
                          <br />
                          {review.createdAt.substring(0, 10)}
                          <br />
                          {review.comment}
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Col>
                <Form onSubmit={sendReviewHandler}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Write Review</Form.Label>
                    <Form.Control
                      name="comment"
                      as="textarea"
                      disabled={!userInfo.firstname && !userInfo.lastname}
                      rows={3}
                    />
                  </Form.Group>
                  <Form.Select
                    name="rating"
                    disabled={!userInfo.firstname && !userInfo.lastname}
                    aria-label="Default select example"
                  >
                    <option value="">Your Rating</option>
                    <option value="5">Very good</option>
                    <option value="4">Good</option>
                    <option value="3">Average</option>
                    <option value="2">Three</option>
                    <option value="1">Three</option>
                  </Form.Select>
                  <br />
                  <Button
                    disabled={!userInfo.firstname && !userInfo.lastname}
                    type="submiit"
                    variant="primary"
                  >
                    Submit
                  </Button><br/>
                  {farmerReviewed}
                </Form>
              </Row>
              <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Order Placed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Your order has been placed successfully!</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={closeModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal show={licenseModal} onHide={closeLicenseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>License</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <embed
                    src={farmer.license}
                    width="100%"
                    height="auto"
                    type="application/pdf"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={closeLicenseModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default FarmerDetailsPageComponent;
