import React, { useState } from "react";
import { Row, Col, ListGroup, Form, Button, Modal } from "react-bootstrap";

const CartItemComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const handleSubscribeClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubscriptionSelect = (subscription) => {
    setSelectedSubscription(subscription);
    setShowModal(false);
    setShowCalendar(subscription === "weekly" || subscription === "daily");
    setShowSubmitButton(subscription === "daily");
  };

  const handleDaySelect = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleQuantityIncrement = () => {
    setSelectedQuantity(selectedQuantity + 1);
  };

  const handleQuantityDecrement = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handleSubmit = () => {
    setShowCalendar(false);

    if (selectedSubscription === "weekly") {
      alert(`Your milk will be delivered on ${selectedDay} every week.`);
    } else if (selectedSubscription === "daily") {
      alert(`Your milk will be delivered daily.`);
    }

    setShowSubmitButton(false);
  };

  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col md={2}>
            Logotech series <br />
            Gaming mouse
          </Col>
          
          <Col md={3}>
            <div className="d-flex align-items-center">
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={handleQuantityDecrement}
              >
                -
              </Button>
              <span>{selectedQuantity}</span>
              <Button
                variant="outline-primary"
                className="ms-2"
                onClick={handleQuantityIncrement}
              >
                +
              </Button>
            </div>
          </Col>
          <Col md={3}>
            
            <div className="d-flex justify-content-between align-items-center mt-3">
             
              <Button
                variant="success"
                size="sm"
                onClick={handleSubscribeClick}
              >
                {selectedSubscription === "weekly"
                  ? "Weekly"
                  : selectedSubscription === "daily"
                  ? "Daily"
                  : "Subscribe"}
              </Button>
            </div>
          </Col>
        </Row>
      </ListGroup.Item>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="primary"
            className="me-2"
            onClick={() => handleSubscriptionSelect("daily")}
          >
            Daily
          </Button>
          <Button
            variant="primary"
            className="me-2"
            onClick={() => handleSubscriptionSelect("weekly")}
          >
            Weekly
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
{showCalendar && selectedSubscription === "daily" && (
        <div className="mt-1">
          
          <Button variant="primary" className="mt-3" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}

      {showCalendar && selectedSubscription === "weekly" && (
        <div className="mt-1">
          <Form.Group>
            <Form.Label>Select Delivery Day:</Form.Label>
            <Form.Control
              as="select"
              onChange={handleDaySelect}
              value={selectedDay}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" className="mt-3" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}
     

    </>
  );
};

export default CartItemComponent;
