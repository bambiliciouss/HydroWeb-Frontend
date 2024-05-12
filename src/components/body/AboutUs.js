import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./Cards.css";
import "leaflet/dist/leaflet.css";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

const AboutUs = () => {
  return (
    <>
      <AuthNavbar />
      <div className="cards" id="about-section">
        <section
          className="section section-lg mt-8"
          style={{ backgroundColor: "#e0ffff", borderRadius: "20px" }}>
          <Container>
            <Row
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100%" }}>
              <Col md="6" className="text-center">
                <img
                  alt="Hydro App"
                  className="img-fluid floating"
                  src={require("../../assets/img/app.png")}
                  style={{ width: "350px" }}
                />
              </Col>
              <Col md="6">
                <div className="pr-md-5 text-center">
                  <h1 className="display-1 text-primary">Hydro App</h1>
                  <h2>Get the Hydro App</h2>
                  <p>
                    Download and install the app to quickly order water online
                    from a available water station once you've signed up!
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="section section-lg mt-8">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="Water Refilling Station"
                  className="img-fluid floating"
                  src={require("../../assets/img/landingpage-img2.jpg")}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h1 className="display-3 text-info">
                    Water Refilling Station
                  </h1>
                  <p>
                    Water refilling stations provide a convenient and
                    eco-friendly solution for replenishing drinking water
                    supplies. These stations typically offer purified water, allowing customers to refill their reusable
                    containers, reducing single-use plastic waste. They are
                    promoting hydration while minimizing environmental impact.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="section section-lg mt-9">
          <Container>
            <div className="text-center">
              <h1 className="display-3 text-black">Why Choose Us?</h1>
            </div>
            <Row className="mt-5">
              <Col lg="6" md="6" className="mb-4">
                <div className="cover text-center p-4 shadow-md bg-white">
                  <img
                    className="w-25"
                    src={require("../../assets/img/hassle.png")}
                    alt="Hassle Free"
                  />
                  <h2 className="fs-4 fw-bolder mt-4">Hassle Free</h2>
                  <p>
                    Our app provides a user-friendly and hassle-free ordering
                    experience. When customers use our app, they can easily
                    place orders and stay informed with real-time notifications
                    regarding the status of their orders. This streamlined
                    process ensures that customers can navigate through the
                    ordering process effortlessly and stay updated on their
                    order progress without any inconvenience.
                  </p>
                </div>
              </Col>
              {/* <Col lg="4" md="6" className="mb-4">
                <div className="cover text-center p-4 shadow-md bg-white">
                  <img
                    className="w-25"
                    src={require("../../assets/img/cash.png")}
                    alt="Easy Payments"
                  />
                  <h2 className="fs-4 fw-bolder mt-4">Easy Payments</h2>
                  <p>
                    Our app provides a seamless payment process, allowing you to
                    make transactions with just a few taps.
                  </p>
                </div>
              </Col> */}
              <Col lg="6" md="6" className="mb-4">
                <div className="cover text-center p-4 shadow-md bg-white">
                  <img
                    className="w-25"
                    src={require("../../assets/img/verified.png")}
                    alt="Quality and Reliability"
                  />
                  <h2 className="fs-4 fw-bolder mt-4">
                    Quality and Reliability
                  </h2>
                  <p>
                    We ensure that our water meets high standards for safety and
                    cleanliness, providing a reliable source of hydration.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
