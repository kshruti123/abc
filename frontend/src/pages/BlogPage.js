import React, { useState } from 'react';
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';

const blogPageData = [
  {
    category: 'Milk',
    name: 'Cow Milk',
    image: 'https://media.istockphoto.com/id/904029680/photo/fresh-cows-milk.jpg?s=612x612&w=0&k=20&c=fMy4nI5IiK-Gserw6StIniwgEzI-ml9F6N9RSATgvmM=',
    description: 'Cow milk is an excellent source of essential nutrients such as calcium, vitamins D and B12. It is also rich in phosphorus, which is important for healthy bones and teeth. '
  },
  {
    category: 'Milk',
    name: 'Buffalo Milk',
    image: 'https://media.istockphoto.com/id/1141486982/photo/fresh-milk-in-a-glass-with-a-can.jpg?s=612x612&w=0&k=20&c=dAS9OBFDtkbNKhc2JVbd47MT8rYQ3E87BxzqVKfcLnM=',
    description: 'Buffalo milk is rich in fat and protein content, making it an excellent source of energy. It is also a good source of calcium, magnesium, and other essential nutrients. '
  },
  {
    category: 'Milk Products',
    name: 'Ghee',
    image: 'https://media.istockphoto.com/id/1208839203/photo/pure-or-desi-ghee-also-known-as-clarified-liquid-butter-pure-or-desi-ghee-in-ceramic-bowls-on.jpg?s=612x612&w=0&k=20&c=hmynnTflwVtt0L21bGI1VjOduBbwDJJxAkM5m7qlZBw=',
    description: 'Ghee is a good source of healthy fats and can help improve digestion. Ghee is also rich in antioxidants, which can help protect your body against free radical damage.'
  },
  {
    category: 'Milk Products',
    name: 'Curd',
    image: 'https://media.istockphoto.com/id/1218711576/photo/home-made-curd-in-a-earthen-bowl.jpg?s=612x612&w=0&k=20&c=fskKap0AScB1OUDRecIlxWcY4GasH-MgiU23GcQ2VDg=',
    description: ' Probiotics in curd are live bacteria that can help improve digestion and boost your immune system. Curd is also a good source of calcium and can help improve bone health.'
  },
  {
    category: 'Milk Products',
    name: 'Paneer',
    image: 'https://media.istockphoto.com/id/1210307319/photo/homemade-indian-paneer-cheese-made-from-fresh-milk-and-lemon-juice-diced-in-a-wooden-bowl-on.jpg?s=612x612&w=0&k=20&c=un5J14zHlPPEtR6IbR3Fxj9OGWz8Mvk5pR8mlpD7eQc=',
    description: 'Paneer is a good source of protein and can help promote muscle growth and repair. Paneer is also rich in calcium, which is important for healthy bones and teeth.'
  },
  {
    category: 'Milk Products',
    name: 'Butter',
    image: 'https://media.istockphoto.com/id/1164701481/photo/homemade-white-butter.jpg?s=612x612&w=0&k=20&c=dNIpwuplgU05z2OAXV2WxnXGVA2maJSeb-dmZtsOAuc=',
    description: 'Butter is rich in fat-soluble vitamins such as vitamins A, D, E, and K. It is also a good source of healthy fats and can help improve brain function.'
  },
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Milk');

  const categoryOptions = [
    { value: 'Milk', label: 'Milk' },
    { value: 'Milk Products', label: 'Milk Products' }
  ];

  const filteredProducts = blogPageData.filter((product) => product.category === selectedCategory);

  return (
    <div style={{ 
      backgroundImage: 'url("https://media.istockphoto.com/id/516180836/photo/green-rice-fild-with-evening-sky.jpg?s=612x612&w=0&k=20&c=ctpEGZYCM8-ST1YuJR99vcOInfOnIo4ghZolX18EK8Y=")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '180vh'
    }}>
      <Container>
        <h1 className="display-4 text-center mb-5" style={{ fontFamily: 'Arial', fontSize: '58px', fontWeight: 'bold', color: 'black' }}>Milk and Milk Products</h1>
        <Row>
          <Col md={4} className="mb-4">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="category-dropdown">
                {selectedCategory}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categoryOptions.map((option) => (
                  <Dropdown.Item key={option.value} onClick={() => setSelectedCategory(option.value)}>
                    {option.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.name} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default BlogPage;
