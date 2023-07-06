import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const FarmerProfilepage = () => {
  const schemes = [
    {
      name: 'RASHTRIYA GOKUL MISSION',
      description: ' The Rashtriya Gokul Mission will result in enhanced productivity and benefit of the programme, percolating to all cattle and buffaloes of India especially with small and marginal farmers. This programme will also benefit women in particular since over 70% of the work involved in livestock farming is undertaken by women.',
      link: 'https://dahd.nic.in/schemes/programmes/rashtriya_gokul_mission'
    },
    {
      name: 'RYTHU BHIMA SCHEME',
      description: 'The main objective of the Farmers Group Life Insurance Scheme (Rythu Bima), is to provide financial relief and social security to the family members/ dependents, in case of loss of farmer’s life due to any reason.In the event of the loss of the farmer life, their families are facing severe financial problems even for their day-to-day needs',
      link: 'http://rythubandhu.telangana.gov.in/Default_LIC1.aspx'
    },
    {
        name: 'Supporting Dairy Cooperatives and Farmer Producer Organizations engaged in dairy activities',
        description: 'Union Cabinet approved implementation of SDCFPO engaged in dairy activities (SDCFPO) as a part of Umbrella Scheme “ Infrastructure Development Fund “ from 2021-22 to 2025-26 with an outlay of Rs 500 Cr.',
        link: 'https://dahd.nic.in/schemes/programmes/sdcfpo'
      },
    {
        name: 'ANDHRA PRADESH BHEEMA SCHEMA',
        description: 'This is an insurance scheme for farmers in Andhra Pradesh, which provides coverage for their crops and livestock, including dairy animals',
        link: 'https://ysrbima.ap.gov.in/new/AboutScheme.aspx'
      },
      {
        name: 'Bank Loans For Dairy Farmers in Telangana',
        description: 'Banks like SBI,IDBI,CANARA banks provide loans to the dairy farmers in Telangana',
        link: 'https://www.agrifarming.in/dairy-farm-subsidy-in-telangana-dairy-loans-schemes#bank-loans-for-dairy-farming-in-telangana'
      },
    
      {
        name: 'PASUPU KUMKUMA SCHEME',
        description: 'This is a scheme launched by the Andhra Pradesh government to provide financial assistance to women self-help groups engaged in dairy farming.',
        link: 'https://www.indiafilings.com/learn/pasupu-kumkuma-scheme/'
      }
  ];

  return (
    <div style={{ 
        backgroundImage: 'url("https://media.istockphoto.com/id/503160722/photo/farmer-spreads-fertilizers-in-the-field-wheat.jpg?s=612x612&w=0&k=20&c=H616JmwTXkV8LVsiriMyqx2M9W_LUHbMwKiHEsehz-E=")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
      }}>
    <Container>
      <Row>
        <Col>
          <h1 className="my-4">Government Schemes for Farmers</h1>
        </Col>
      </Row>
      <Row>
        {schemes.map((scheme, index) => (
          <Col key={index} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{scheme.name}</Card.Title>
                <Card.Text>{scheme.description}</Card.Text>
                <a href={scheme.link} className="btn btn-primary">Click Here for more Info</a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default FarmerProfilepage;
