import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  Alert,
  Container,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Spinner from "../../components/farmer/Spinner";

const FarmerCapitalBudgettingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [frequency, setFrequency] = useState("7");

  //   useEffect(() => {
  //     getAllTransactions();
  //   }, []);

  const handleSubmit = async (values) => {
    try {
      const farmer = JSON.parse(localStorage.getItem("farmer"));
      setLoading(true);
      await axios.post("/transaction/add-transaction", {
        ...values,
        farmer: farmer._id,
      });
      console.log(values);
      setLoading(false);
      setShowSuccessMessage("Transactions added successfully");
      setShowModal(false);
      setAllTransactions([...allTransactions, values]); // Add the new transaction to the existing transactions
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to add transactions");
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const dataSource = allTransactions.map((transaction, index) => {
    return {
      ...transaction,
      key: index,
    };
  });

  return (
    <Container>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Form.Control
            as="select"
            value={frequency}
            onChange={(event) => setFrequency(event.target.value)}
          >
            {/* <option value="select">select</option> */}
            <option value="7">Last 1 week</option>
            <option value="30">Last 1 month</option>
            <option value="365">Last 1 year</option>
            <option value="custom">custom</option>
          </Form.Control>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleShowModal}>
            Add New
          </button>
        </div>
      </div>
      {/* <div className="content"> <Table columns={columns} dataSource={allTransactions} /></div> */}
      <div className="content">
        <Row className="m-5">
          <Col md={12}>
            <h1>My Transactions</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map(
                  (item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>Mark Twain</td>
                      <td>2022-09-12</td>
                      <td>$124</td>
                      <td>
                        <i className={item}></i>
                      </td>
                      <td>
                        <Link to="/user/order-details">go to order</Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <FormControl type="text" />
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control as="select">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <FormControl type="date" />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <FormControl type="text" />
            </Form.Group>
            <div style={{ height: "10px" }}></div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default FarmerCapitalBudgettingPage;
