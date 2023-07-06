import { Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const ProductCarousalComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          crossOrigin="anonymous"
          className="d-block w-100"
          style={{
            height: "350px",
            objectFit: "auto",
          }}
          src="\images\carousal\carousal-1.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          crossOrigin="anonymous"
          className="d-block w-100"
          style={{
            height: "350px",
            objectFit: "auto",
          }}
          src="\images\carousal\carousal-2.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          crossOrigin="anonymous"
          className="d-block w-100"
          style={{
            height: "350px",
            objectFit: "auto",
          }}
          src="\images\carousal\carousal-3.png"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{
            height: "350px",
            objectFit: "auto",
          }}
          src="\images\carousal\carousal-4.png"
          alt="Fourth slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};
export default ProductCarousalComponent;
