import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";
import { useState, useEffect } from "react";
import { logoutUser } from "../../../redux/actions/UserActions";
import { useDispatch } from "react-redux";
const FarmerPageComponent = ({ fetchFarmers, deleteFarmer }) => {
  const dispatch = useDispatch();
  const [farmers, setFarmers] = useState([]);
  const [farmerDeleted, setFarmerDeleted] = useState(false);
  const deleteHandler = async (farmerId) => {
    if (window.confirm("Are you sure?")) {
      const data = await deleteFarmer(farmerId);
      if (data.message === "Farmer removed") {
        setFarmerDeleted(!farmerDeleted);
      }
    }
  };
  useEffect(() => {
    const abctrl = new AbortController();
    fetchFarmers(abctrl)
      .then((res) => setFarmers(res))
      .catch((er) =>
      dispatch(logoutUser())
        // setFarmers([
        //   {
        //     name: er.response.data.message
        //       ? er.response.data.message
        //       : er.response.data,
        //   },
        // ])
      );
    return () => abctrl.abort();
  }, [farmerDeleted]);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>Farmer List </h1>
        {/* {console.log(users)} */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>S.no.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>phone number</th>
              <th>Is Admin</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((farmer, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{farmer.firstname}</td>
                <td>{farmer.lastname}</td>
                <td>{farmer.phoneNumber}</td>
                <td>
                  {farmer.isAdmin ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/edit-user/${farmer._id}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(farmer._id)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default FarmerPageComponent;
