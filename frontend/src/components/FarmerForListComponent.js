import { Row, Col, Card, Button } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { LinkContainer } from "react-router-bootstrap";

const FarmerForListComponent = ({
  farmerId,
  firstname,
  lastname,
  phoneNumber,
  area,
  rating,
  images,
  reviewsNumber,
}) => {
  return (
    <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row>
        <Col lg={5}>
          <Card.Img
            variant="top"
            src={images}
            style={{ width: "287px", height: "220px" }}
          />
          {/* <Card.Img variant="top" src="/uploads/f4.jpg" /> */}
        </Col>
        <Col lg={7}>
          <Card.Body>
            <Card.Title>
              {firstname} {lastname}
            </Card.Title>
            <Card.Text>Phone Number: {phoneNumber}</Card.Text>
            <Card.Text>Area: {area}</Card.Text>
            <Card.Text>
              <Rating readonly size={20} initialValue={rating} />(
              {reviewsNumber})
            </Card.Text>
            <Card.Text className="h4">
              <LinkContainer to={`/farmer-details/${farmerId}`}>
                <Button variant="primary">Select</Button>
              </LinkContainer>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default FarmerForListComponent;
