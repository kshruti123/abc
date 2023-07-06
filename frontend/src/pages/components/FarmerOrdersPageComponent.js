import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const FarmerOrderPageComponent = ({ fetchorders }) => {
  const [orders, setOrders] = useState([]);
  const { farmerInfo } = useSelector((state) => state.farmerRegisterLogin);
  console.log(farmerInfo._id);
  const farmerId = farmerInfo._id;

  useEffect(() => {
    fetchorders(farmerId)
      .then((res) => setOrders(res))
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, [fetchorders]);

  return (
    <Row className="m-5">
      <Col md={12}>
        <h1>My Orders</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Quantity </th>
              <th>Order Type</th>
              <th>No of Days Left</th>
              <th>End Date</th>
              {/* <th>Delivered</th> */}
              {/* <th>Order details</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{order.productname}</td>
                <td>
                  {order.user.firstname} {order.user.lastname}
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString("en-GB")}</td>
                <td>{order.quantity}</td>
                <td>{order.frequency}</td>
                <td>{order.NoOfDaysLeft}</td>
                <td>
                  {new Date(order.completedAt).toLocaleDateString("en-GB")}
                </td>
                {/* <td>{order.isCompleted ? '✔️' : '❌'}</td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default FarmerOrderPageComponent;
