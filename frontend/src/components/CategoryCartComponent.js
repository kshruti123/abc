import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const CategoryCartComponent = ({category,idx}) => {
  const images=[
    "/images/carousal-1.png",
    "/images/carousal-3.png",
    "/images/carousal-3.png",
    "/images/carousal-4.png",
  ]
  return (
    <Card>
      <Card.Img crossorigin="anonymous" variant="top" src={images[idx]} />
      <Card.Body>
        <Card.Title style={{objectFit: "cover"}}>{category}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <LinkContainer to="/product-list">
        <Button className="bg-info p-2 text-dark bg-opacity-75">Go somewhere</Button>
        </LinkContainer>
        
      </Card.Body>
    </Card>
  );
};
export default CategoryCartComponent;