import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { useLocation } from "react-router-dom";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { newregister, clearErrors } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
const Register = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    houseNo: "",
    streetName: "",
    purokNum: "",
    barangay: "",
    city: "",
    email: "",
    password: "",
  });

  const [role, setRole] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const {
    fname,
    lname,
    phone,
    houseNo,
    streetName,
    purokNum,
    barangay,
    city,
    email,
    password,
  } = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const [terms, setTerms] = useState(false);

  const notifyError = (message = "") =>
    toast.error(message, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifySuccess = (message = "") =>
    toast.success(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    setRole("user");

    if (isAuthenticated) {
      setTimeout(() => {
        swal(
          "An email sent to your Email account, please verify",
          "",
          "success"
        );
      }, 5000);

      navigate("/");
      window.location.reload();
    }

    if (error) {
      swal(error, "", "error");
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    //e.preventDefault();

    const formData = new FormData();
    formData.set("fname", e.fname);
    formData.set("lname", e.lname);
    formData.set("phone", e.phone);
    formData.set("houseNo", e.houseNo);
    formData.set("streetName", e.streetName);
    formData.set("purokNum", e.purokNum);
    formData.set("barangay", e.barangay);
    formData.set("city", e.city);
    formData.set("email", e.email);
    formData.set("password", e.password);
    formData.set("avatar", avatar);
    formData.set("role", role);
    formData.set("terms", terms);

    dispatch(newregister(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setTerms(isChecked);
    console.log("Checkbox checked:", terms);
  };

  const location = useLocation();
  // React.useEffect(() => {
  //   document.body.classList.add("bg-default");
  //   return () => {
  //     document.body.classList.remove("bg-default");
  //   };
  // }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  return (
    <>
      {loading ? (
        <Loader loadingTime={20} /> // Display the loader for 3 seconds
      ) : (
        <>
          <div className="main-content">
            <AuthNavbar />
            <div className="header py-7 py-lg-8">
              <Container>
                <div className="header-body text-center mb-3">
                  <Row className="justify-content-center">
                    <Col lg="5" md="6">
                      <h1 className="text-black">
                        Welcome to Water Ordering and Delivery Station!
                      </h1>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>
            <Container className="mt--8 pb-5">
              <Row className="justify-content-center">
                <Col lg="6" md="8">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <big>Create your account</big>
                      </div>
                      <Form role="form" onSubmit={handleSubmit(submitHandler)}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="First Name..."
                              className="form-control"
                              type="text"
                              name="fname"
                              {...register("fname", {
                                required: "Please enter a valid name.",
                              })}
                            />
                          </InputGroup>
                          {errors.fname && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.fname.message}
                            </h2>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Last Name..."
                              className="form-control"
                              type="text"
                              name="lname"
                              {...register("lname", {
                                required: "Please enter a valid name.",
                              })}
                            />
                          </InputGroup>
                          {errors.lname && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.lname.message}
                            </h2>
                          )}
                        </FormGroup>

                        {/* <PhoneInput
                            international
                            defaultCountry="PH"
                            name="phone"
                           
                            style={{ padding: "10px" ,  border: '1px solid transparent'}}
                            {...register("phone", {
                              required: "Please enter a valid phone no.",
                            })}
                          />
                          {errors.phone && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.phone.message}
                            </h2>
                          )} */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <span disabled>+63</span>
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Phone..."
                              className="form-control"
                              type="text"
                              name="phone"
                              {...register("phone", {
                                required: "Please enter a valid phone no.",
                                pattern: {
                                  value: /^[0-9]*$/,
                                  message:
                                    "Phone number must contain only numeric characters.",
                                },
                                maxLength: {
                                  value: 10,
                                  message:
                                    "Phone number must be 10 characters or less.",
                                },
                              })}
                            />
                          </InputGroup>
                          {errors.phone && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.phone.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Email..."
                              className="form-control"
                              name="email"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value:
                                    /^[a-zA-Z0-9_.+-]+@[a-zAZ0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                  message:
                                    "Entered email is in the wrong format",
                                },
                              })}
                            />
                          </InputGroup>
                          {errors.email && (
                            <div className="error">
                              {errors.email.type === "required" && (
                                <h2
                                  className="h1-seo"
                                  style={{
                                    color: "red",
                                    fontSize: "small",
                                  }}>
                                  {errors.email.message}
                                </h2>
                              )}
                              {errors.email.type === "pattern" && (
                                <h2
                                  className="h1-seo"
                                  style={{
                                    color: "red",
                                    fontSize: "small",
                                  }}>
                                  {errors.email.message}
                                </h2>
                              )}
                            </div>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Password..."
                              className="form-control"
                              type="password"
                              name="password"
                              {...register("password", {
                                required: "Password is required",
                              })}
                            />
                          </InputGroup>
                          {errors.password && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.password.message}
                            </h2>
                          )}
                        </FormGroup>

                        <Row className="my-4">
                          <Col xs="12">
                            <div className="custom-control custom-checkbox mb-3">
                              <FormGroup check>
                                <Input
                                  id="checkbox2"
                                  type="checkbox"
                                  onChange={handleCheckboxChange}
                                  checked={terms}
                                />
                                <span className="text-muted">
                                  I agree with the{" "}
                                  <a href="#pablo" onClick={toggle}>
                                    Terms and Conditions
                                  </a>
                                </span>
                                <Modal
                                  className="modal-dialog-centered modal-lg "
                                  isOpen={modal}
                                  toggle={toggle}>
                                  <Form
                                    role="form"
                                    onSubmit={handleSubmit(submitHandler)}>
                                    <ModalHeader toggle={toggle}></ModalHeader>
                                    <ModalBody>
                                      <div style={{ textAlign: "center" }}>
                                        <h2>Terms and Conditions</h2>
                                      </div>
                                      <p
                                        style={{
                                          textIndent: "20px",
                                          textAlign: "justify",
                                        }}>
                                        By using the services of the water
                                        refilling station, customers acknowledge
                                        and agree to these terms and conditions.
                                      </p>
                                      <ol>
                                        <li>
                                          <strong>Introduction</strong>
                                          <ul>
                                            <li>
                                              By using our water refilling
                                              station e-commerce platform and
                                              making transactions from our
                                              website, you consent to be bound
                                              by the following terms and
                                              conditions. These terms and
                                              conditions cover a wide range of
                                              topics, including delivery
                                              methods, dispute resolution
                                              procedures, usage policies,
                                              payment terms, and return
                                              policies. These terms and
                                              conditions, which are intended to
                                              guarantee an equitable and
                                              transparent experience for all
                                              users and customers, are impliedly
                                              accepted by your continuing use of
                                              our platform and services.
                                            </li>
                                          </ul>
                                        </li>
                                        <li>
                                          <strong>Ordering Process</strong>
                                          <ul>
                                            <li>
                                              Clients can easily place orders
                                              online by exploring our extensive
                                              product selection (5L gallons and
                                              PET bottles). This optimized
                                              process guarantees our esteemed
                                              clients a smooth and delightful
                                              purchasing encounter, augmenting
                                              contentment and developing
                                              enduring connections.
                                            </li>

                                            <li>
                                              We provide easy ways to pay to
                                              meet your needs, such as in-person
                                              transactions and Maya payments. We
                                              work hard to give our customers a
                                              seamless and safe payment
                                              experience, regardless of whether
                                              they prefer the more conventional
                                              method of making payments in
                                              person or the convenience of
                                              digital transactions through Maya.
                                              Our dedication to offering a
                                              variety of payment options
                                              guarantees that you can select the
                                              one that most closely matches your
                                              needs and tastes, making
                                              transactions with us simple and
                                              hassle-free.
                                            </li>
                                          </ul>
                                        </li>
                                        <li>
                                          <strong>
                                            Product/Service Description
                                          </strong>
                                          <ul>
                                            <li>
                                              Our platform offers services and
                                              solutions for refilling water that
                                              are specifically designed to
                                              fulfill your hydration demands. In
                                              order to meet your specific needs
                                              and preferences, we provide a
                                              range of water bottles in
                                              different sizes. We also offer new
                                              water containers that are made to
                                              provide a steady flow of pure,
                                              revitalizing water for your house
                                              or place of business. With
                                              dependable services and
                                              high-quality products, our
                                              platform has you covered.
                                            </li>
                                          </ul>
                                        </li>
                                        <li>
                                          <strong>Delivery and Shipping</strong>
                                          <ul>
                                            <li>
                                              We deliver within specified areas.
                                            </li>
                                            <li>
                                              You will receive precise
                                              information on delivery schedules
                                              when you place your order. Please
                                              be aware that delays resulting
                                              from outside causes beyond our
                                              control are not subject to our
                                              liability. Unexpected natural
                                              disasters, delays at customs, and
                                              transportation problems are a few
                                              examples of these variables. You
                                              can be confident that we'll work
                                              hard to make sure your order gets
                                              to you on time, and we'll keep you
                                              updated as things happen so you
                                              know what's going on.
                                            </li>
                                            <li>
                                              It is the customers'
                                              responsibility to promptly inspect
                                              all delivered products and report
                                              any damage or inconsistency to the
                                              supplier within the allotted time
                                              frame. This proactive inspection
                                              and reporting method promotes
                                              customer happiness and upholds
                                              product quality standards by
                                              ensuring that any concerns can be
                                              resolved quickly.● It is the
                                              customers' responsibility to
                                              promptly inspect all delivered
                                              products and report any damage or
                                              inconsistency to the supplier
                                              within the allotted time frame.
                                              This proactive inspection and
                                              reporting method promotes customer
                                              happiness and upholds product
                                              quality standards by ensuring that
                                              any concerns can be resolved
                                              quickly.
                                            </li>
                                          </ul>
                                        </li>
                                        <li>
                                          <strong>
                                            Customer Responsibilities
                                          </strong>
                                          <ul>
                                            <li>
                                              By supplying accurate information
                                              and actively upholding account
                                              security procedures, customers are
                                              essential to the ordering
                                              process's seamless operation and
                                              the protection of their accounts.
                                              In order to ensure smooth
                                              transactions and prevent any
                                              inconsistencies or delays,
                                              customers must take reasonable
                                              steps to provide accurate
                                              information when placing orders.
                                              Their accounts are further
                                              protected from fraudulent activity
                                              and illegal access by adhering to
                                              strict security standards like
                                              using strong passwords, enabling
                                              two-factor authentication, and
                                              reporting any suspicious activity
                                              right once. By carrying out these
                                              obligations, consumers make a
                                              substantial contribution to a
                                              trustworthy and safe purchasing
                                              environment.
                                            </li>
                                          </ul>
                                        </li>
                                        <li>
                                          <strong>Privacy Policy</strong>
                                          <ul>
                                            <li>
                                              Our privacy policy governs the
                                              collection, use, and protection of
                                              client data in our system.
                                              Customers automatically agree to
                                              and acknowledge adherence to our
                                              privacy rules when they use our
                                              site.
                                            </li>
                                          </ul>
                                        </li>
                                      </ol>

                                      <p
                                        style={{
                                          textIndent: "20px",
                                          textAlign: "justify",
                                        }}>
                                        <p
                                          style={{
                                            textIndent: "20px",
                                            textAlign: "justify",
                                          }}>
                                          By using our services, you consent to
                                          the collection, use, and sharing of
                                          your personal information as described
                                          in this privacy policy. If you have
                                          any questions or concerns about our
                                          privacy policy, please contact us.
                                        </p>
                                      </p>
                                      <hr />
                                      {/* <div style={{ textAlign: "center" }}>
                                        <h2>Privacy Policy</h2>
                                      </div>
                                      <p
                                        style={{
                                          textIndent: "20px",
                                          textAlign: "justify",
                                        }}>
                                        AQUATIC DRAGON Water Refilling Business
                                        (referred to as "we", "us", and "our")
                                        respects your privacy and is committed
                                        to protecting your personal information.
                                        This privacy policy describes how we
                                        collect, use, and share information when
                                        you use our services.
                                      </p>
                                      <ol type="1">
                                        <li>
                                          <strong>
                                            Information We Collect:{" "}
                                          </strong>
                                          We may collect personal information
                                          from you, such as your name, address,
                                          phone number, and email address when
                                          you use our services. We may also
                                          collect non-personal information such
                                          as your device's IP address, browser
                                          type, and operating system.
                                        </li>
                                        <li>
                                          <strong>
                                            How We Use Your Information:{" "}
                                          </strong>
                                          We may use your personal information
                                          to provide you with our services,
                                          communicate with you about our
                                          services, and improve our services. We
                                          may also use your non-personal
                                          information for statistical analysis,
                                          troubleshooting, and improving our
                                          website and services.
                                        </li>
                                        <li>
                                          <strong>
                                            Sharing Your Information:{" "}
                                          </strong>
                                          We may share your personal information
                                          with our employees and riders who need
                                          access to the information to provide
                                          our services. We will never sell your
                                          personal information to third parties.
                                        </li>
                                        <li>
                                          <strong>Security: </strong>
                                          We take appropriate measures to
                                          protect your personal information from
                                          unauthorized access, disclosure,
                                          alteration, or destruction. We
                                          implement industry-standard security
                                          measures such as encryption and
                                          password protection to safeguard your
                                          personal information.
                                        </li>
                                        <li>
                                          <strong>Cookies: </strong>
                                          We use cookies on our website to
                                          enhance your user experience and
                                          personalize your interactions with us.
                                          You can choose to disable cookies in
                                          your browser settings, but this may
                                          affect your ability to use our
                                          website.
                                        </li>
                                        <li>
                                          <strong>Third-Party Websites:</strong>
                                          Our website may contain links to
                                          third-party websites. We are not
                                          responsible for the privacy practices
                                          or content of these websites. We
                                          encourage you to read the privacy
                                          policies of these websites before
                                          using them.
                                        </li>

                                        <li>
                                          <strong>Children's Privacy: </strong>
                                          Our services are not intended for
                                          children under the age of 13. We do
                                          not knowingly collect personal
                                          information from children under 13. If
                                          we learn that we have collected
                                          personal information from a child
                                          under 13, we will promptly delete the
                                          information.
                                        </li>

                                        <li>
                                          <strong>
                                            Changes to This Policy:{" "}
                                          </strong>
                                          We may update this privacy policy from
                                          time to time to reflect changes in our
                                          business practices or legal
                                          requirements. We will post the updated
                                          policy on our website and notify you
                                          of any significant changes.We may
                                          update this privacy policy from time
                                          to time to reflect changes in our
                                          business practices or legal
                                          requirements. We will post the updated
                                          policy on our website and notify you
                                          of any significant changes.
                                        </li>
                                      </ol>

                                      <p
                                        style={{
                                          textIndent: "20px",
                                          textAlign: "justify",
                                        }}>
                                        By using our services, you consent to
                                        the collection, use, and sharing of your
                                        personal information as described in
                                        this privacy policy. If you have any
                                        questions or concerns about our privacy
                                        policy, please contact us.
                                      </p> */}
                                    </ModalBody>
                                    {/* <ModalFooter>
                                      <Button
                                        color="primary"
                                        type="submit"
                                        onClick={toggle}>
                                        Register
                                      </Button>{" "}
                                      <Button
                                        color="secondary"
                                        onClick={toggle}>
                                        Cancel
                                      </Button>
                                    </ModalFooter>{" "} */}
                                  </Form>
                                </Modal>
                              </FormGroup>
                            </div>
                          </Col>
                        </Row>

                        <div className="text-center">
                          <Button
                            className="mt-4 mb-4"
                            color="primary"
                            type="submit"
                            style={{ width: "300px" }}>
                            Create account
                          </Button>
                        </div>
                      </Form>{" "}
                      <div className="text-center text-muted mb-4">
                        Have already an account? <a href="/login">Login here</a>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
          <AuthFooter />
        </>
      )}
    </>
  );
};

export default Register;
