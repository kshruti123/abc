import { Row, Col, Container, ListGroup, Button } from "react-bootstrap";
// import ListGroup from "react-bootstrap/ListGroup";
import SortOptionsComponent from "../../components/filterQueryResultOptions/SortOptionsComponent.js";
import RatingfilterComponent from "../../components/filterQueryResultOptions/RatingFilterComponent.js";
// 3
import FarmerForListComponent from "../../components/FarmerForListComponent.js";
// import PaginationComponent from "../../components/PaginationComponent.js";
// import axios from "axios";
import { useEffect, useState } from "react";

const FarmerListPageComponent = ({ getFarmers }) => {
  const [showResetFiltersButton, setShowResetFiltersButton] = useState(false);
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({});
  const [ratingFromFilter, setRatingFromFilter] = useState({});
  const [sortOption,setSortOption]=useState("");
  console.log(filters);
  useEffect(() => {
    getFarmers(filters,sortOption)
      .then((farmers) => {
        setFarmers(farmers.farmers);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, [filters,sortOption]);

  const handleFilters = () => {
    setShowResetFiltersButton(true);
    setFilters({
      rating: ratingFromFilter,
      
    });
  };
  const resetFilters = () => {
    setShowResetFiltersButton(false);
    setFilters({});
    window.location.href = "/farmer-list";
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item className="mb-3 mt-3">
              <SortOptionsComponent setSortOption={setSortOption}/>
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingfilterComponent
                setRatingFromFilter={setRatingFromFilter}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary" onClick={handleFilters}>
                Filter
              </Button>{" "}
              {showResetFiltersButton && (
                <Button onClick={resetFilters} variant="danger">
                  Reset filters
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          {loading ? (
            <h1>Loading products ....</h1>
          ) : error ? (
            <h1>Error while loading products. Try again later.</h1>
          ) : (
            farmers.map((farmer) => (
              <FarmerForListComponent
                key={farmer._id}
                farmerId={farmer._id}
                firstname={farmer.firstname}
                lastname={farmer.lastname}
                phoneNumber={farmer.phoneNumber}
                area={farmer.area}
                rating={farmer.rating}
                reviewsNumber={farmer.reviewsNumber}
                images={farmer.images} // Add default empty array if images is undefined
              />
            ))
          )}
           </Col>
          {/* // //{" "}
       
        //{" "} */}
        {/* <Col md={12}>
          <PaginationComponent />
        </Col> */}
      </Row>
    </Container>
  );
};

export default FarmerListPageComponent;
