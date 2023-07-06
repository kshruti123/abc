import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaRegHandshake, FaTractor, FaHeart } from 'react-icons/fa';
import { GiFarmTractor } from 'react-icons/gi';
import { MdLocalOffer } from 'react-icons/md';
import ProductCarousalComponent from "../components/user/ProductCarousalComponent";
const HomePage = () => {
    const [backgroundImage, setBackgroundImage] = useState("url('/images/ab1.jpg')");

    useEffect(() => {
        const interval = setInterval(() => {
            document.body.style = 'rgba(255, 255, 255, 0.25)';
            const images = [
                "url('/images/ab1.jpg')",
                "url('/images/ab2.jpg')",
                "url('/images/ab3.jpg')"
               
            ];
            const randomImage = images[Math.floor(Math.random() * images.length)];
            setBackgroundImage(randomImage);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <ProductCarousalComponent />
        <p></p>
            <div
                style={{
                    // backgroundImage,
                    // backgroundRepeat: "no-repeat",
                    backgroundSize: "fill",
                    // backgroundPosition: "center",
                    height: "92vh",
                    backgroundColor:"#ECF8F9",
                }}
            >
                <Container>
                    <Row>
                        <Col>
                            <h1 className="display-4 text-center mb-5" style={{ fontFamily: 'Arial', fontSize: '48px', fontWeight: 'bold', color: 'black' }}>About Us</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2 className="mb-3">
                                <GiFarmTractor className="mr-2" /> Dairy Farmer's Situation
                            </h2>
                            <p className="dark text-justify" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                Dairy farmers in India face several challenges such as low milk productivity, inadequate infrastructure,
                                limited access to finance and markets, and climate change issues. These challenges lead to lower prices and
                                income for many farmers. However, the government and other organizations are implementing various initiatives to
                                address these issues, such as improving productivity, access to markets, and infrastructure for dairy farmers.
                                Despite these challenges, dairy farming remains an essential source of livelihood for millions of people in India.
                            </p>
                        </Col>
                        <Col md={6}>
                            <h2 className="mb-3">
                                < FaRegHandshake className="mr-2" /> Our Mission
                            </h2>
                            <p className="dark text-justify" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                We are an online platform that connects dairy farmers directly to
                                customers without any middlemen. Our mission is to create a
                                sustainable future for dairy farmers by providing them with a
                                direct connection to customers. By cutting out the middlemen, we
                                ensure that farmers receive fair prices for their products so
                                that customers can get the freshest dairy products possible.
                            </p>
                        </Col>
                    </Row>
                    <div></div>
                    <Row className="mt-5">
                        <Col>
                            <h2 className="mb-3">
                                <MdLocalOffer className="mr-2" /> Our Values
                            </h2>
                            <div className="d-flex flex-wrap">
                                <div
                                    className="card mb-3 mx-2"
                                    style={{ maxWidth: "22rem" }}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <FaTractor className="mr-2" /> Farm Fresh
                                        </h5>
                                        <p className="card-text" style={{ fontSize: '20px' }}>
                                            We believe in providing our customers with the freshest milk,dairy
                                            products possible. All of our products come directly from
                                            the farm to your doorstep.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="card mb-3 mx-2"
                                    style={{ maxWidth: "22rem" }}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title"><FaHeart className="mr-2" /> Commitment</h5>
                                        <p className="card-text" style={{ fontSize: '20px' }}>
                                            Our website also offers farmers the opportunity to showcase their products to a wider audience.
                                            This helps farmers to expand their customer base,
                                            increase their revenue, and build a sustainable business model for the future.
                                        </p>
                                    </div>

                                </div>
                                <div className="card mb-3 mx-2" style={{ maxWidth: "22rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title"><FaRegHandshake className="mr-2" /> Fairness</h5>
                                        <p className="card-text" style={{ fontSize: '20px' }}>We believe in treating our farmers and customers with fairness and respect. That's why we ensure that our farmers receive fair prices for their products.</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <p style={{
                    height: "50vh"
                }}></p>
        </>
    );
};
export default HomePage;
