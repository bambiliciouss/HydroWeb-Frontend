import React, { useState } from "react";
import { Button, Container, Row, Col, Input, Label, FormGroup } from "reactstrap";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Valid email is required";
    }

    if (!formData.mobile) {
      errors.mobile = "Mobile number is required";
    }

    if (!formData.message) {
      errors.message = "Message is required";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log("Form data submitted:", formData);
      // Send form data to the server
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <AuthNavbar />
      <section className="section section-lg mt-6">
        <Container className="text-center" style={{ marginTop: "150px" }}>
          <h1 className="display-3 text-black">Contact Us</h1>
        </Container>

        <Container className="text-center" style={{ marginTop: "70px" }}>
        <iframe
            style={{ width: "100%" }}
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d249759.19784092825!2d79.10145254589841!3d12.009924873581818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1448883859107"
            height="450"
            frameBorder="0"
            allowFullScreen
          />
        </Container>

        <Container style={{ padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col sm="3">
                <Label htmlFor="name">Enter Name</Label>
              </Col>
              <Col sm="9">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-danger">{errors.name}</p>}
              </Col>
            </Row>
            <Row>
              <Col sm="3">
                <Label htmlFor="email">Email Address</Label>
              </Col>
              <Col sm="9">
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </Col>
            </Row>
            <Row>
              <Col sm="3">
                <Label htmlFor="mobile">Mobile Number</Label>
              </Col>
              <Col sm="9">
                <Input
                  type="text"
                  name="mobile"
                  id="mobile"
                  placeholder="Enter Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
              </Col>
            </Row>
            <Row>
              <Col sm="3">
                <Label htmlFor="message">Enter Message</Label>
              </Col>
              <Col sm="9">
                <Input
                  type="textarea"
                  name="message"
                  id="message"
                  placeholder="Enter Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && <p className="text-danger">{errors.message}</p>}
              </Col>
            </Row>
            <Row style={{ marginTop: "20px", marginBottom: "100px" }} >
              <Col sm="3"></Col>
              <Col sm="9">
                <Button color="primary" type="submit">
                  Send Message
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default ContactUs;
