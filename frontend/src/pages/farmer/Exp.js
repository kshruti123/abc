import React from "react";
import styled from "styled-components";
import FarmerComponent from "../../components/farmer/ExpIndex";

const Container = styled.div`
border-radius: 300px;
border: 1px solid #000000;

  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  align-items: center;
  height: 100vh;
  width: 98%;
  padding-top: 30px ;
 
`;

const Header = styled.div`

  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 22px;
  font-size: 25px;
  font-weight: bold;
`;
const Exp = () => {
  return (
    <Container>
      <Header>Expense Tracker</Header>
      <FarmerComponent />
    </Container>
  );
};

export default Exp;
