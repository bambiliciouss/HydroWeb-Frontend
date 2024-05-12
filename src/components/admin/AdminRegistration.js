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
import { adminregister, clearErrors } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

const AdminRegister = () => {
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
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [validID, setvalidID] = useState("");
  const [mayorsPermit, setmayorsPermit] = useState("");

  const [selectedFilevalidID, setSelectedFilevalidID] = useState("");
  const [selectedFilemayorsPermit, setSelectedFilemayorsPermit] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const [terms, setTerms] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      swal(
        "An email sent to your Email account, please verify and wait for admin activation",
        "",
        "success"
      );
      navigate("/");
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
    formData.set("validID", validID);
    formData.set("mayorsPermit", mayorsPermit);
    formData.set("terms", terms);

    dispatch(adminregister(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "validID") {
      const validID = e.target.files[0] ? e.target.files[0].name : "";
      setSelectedFilevalidID(validID);
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setvalidID(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "mayorsPermit") {
      // Handle barangayclearance file upload
      const mayorsPermit = e.target.files[0] ? e.target.files[0].name : "";
      setSelectedFilemayorsPermit(mayorsPermit);

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setmayorsPermit(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setTerms(isChecked);
    console.log("Checkbox checked:", terms);
  };

  const location = useLocation();
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
                                <i className="ni ni-pin-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="House No..."
                              className="form-control"
                              type="text"
                              name="houseNo"
                              {...register("houseNo", {
                                required: "Please enter a valid info.",
                              })}
                            />
                          </InputGroup>
                          {errors.houseNo && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.houseNo.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-pin-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Street Name..."
                              className="form-control"
                              type="text"
                              name="streetName"
                              {...register("streetName", {
                                required: "Please enter a valid info.",
                              })}
                            />
                          </InputGroup>
                          {errors.houseNo && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.houseNo.message}
                            </h2>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-pin-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Purok No..."
                              className="form-control"
                              type="text"
                              name="purokNum"
                              {...register("purokNum", {
                                required: "Please enter a valid info.",
                              })}
                            />
                          </InputGroup>
                          {errors.purokNum && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.purokNum.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-pin-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <select
                              className="form-control"
                              name="barangay"
                              {...register("barangay", {
                                required: "Please select a barangay.",
                              })}>
                              <option value="" disabled selected>
                                Select Barangay...
                              </option>
                              <option value="Bagumbayan">Bagumbayan</option>
                              <option value="Bambang">Bambang</option>
                              <option value="Calzada">Calzada</option>
                              <option value="Central Bicutan">
                                Central Bicutan
                              </option>
                              <option value="Central Signal Village">
                                Central Signal Village
                              </option>
                              <option value="Fort Bonifacio">
                                Fort Bonifacio
                              </option>
                              <option value="Hagonoy">Hagonoy</option>
                              <option value="Ibayo-Tipas">Ibayo-Tipas</option>
                              <option value="Katuparan">Katuparan</option>
                              <option value="Ligid-Tipas">Ligid-Tipas</option>
                              <option value="Lower Bicutan">
                                Lower Bicutan
                              </option>
                              <option value="Maharlika Village">
                                Maharlika Village
                              </option>
                              <option value="Napindan">Napindan</option>
                              <option value="New Lower Bicutan">
                                New Lower Bicutan
                              </option>
                              <option value="North Daang Hari">
                                North Daang Hari
                              </option>
                              <option value="North Signal Village">
                                North Signal Village
                              </option>
                              <option value="Palingon">Palingon</option>
                              <option value="Pinagsama">Pinagsama</option>
                              <option value="San Miguel">San Miguel</option>
                              <option value="Santa Ana">Santa Ana</option>
                              <option value="Sta. Cruz">Sta. Cruz</option>
                              <option value="Tanyag">Tanyag</option>
                              <option value="Tuktukan">Tuktukan</option>
                              <option value="Upper Bicutan">
                                Upper Bicutan
                              </option>
                              <option value="Ususan">Ususan</option>
                              <option value="South Daang Hari">
                                South Daang Hari
                              </option>
                              <option value="South Signal Village">
                                South Signal Village
                              </option>
                              <option value="Wawa">Wawa</option>
                              <option value="Western Bicutan">
                                Western Bicutan
                              </option>
                            </select>
                          </InputGroup>
                          {errors.barangay && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.barangay.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-pin-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <select
                              className="form-control"
                              name="city"
                              {...register("city", {
                                required: "Please select a city.",
                              })}>
                              <option value="" disabled selected>
                                Select City...
                              </option>
                              <option value="Taguig City">Taguig City</option>
                            </select>
                          </InputGroup>
                          {errors.city && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.city.message}
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

                        <FormGroup>
                          <label className="form-control-label">Valid ID</label>

                          <div className="row">
                            <div className="col-sm-12">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  name="validID"
                                  className="custom-file-input"
                                  id="customFilevalidID"
                                  accept="images/*"
                                  {...register("validID", {
                                    required: true,
                                  })}
                                  onChange={(e) => {
                                    onChange(e);
                                    e.target.blur();
                                  }}
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="customFilevalidID">
                                  {" "}
                                  {selectedFilevalidID || "Choose Image"}
                                </label>
                              </div>
                            </div>
                          </div>
                          {errors.validID && !validID && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              Please select a valid image.
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <label className="form-control-label">
                            Mayor's Permit
                          </label>

                          <div className="row">
                            <div className="col-sm-12">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  name="mayorsPermit"
                                  className="custom-file-input"
                                  id="customFilemayorsPermit"
                                  accept="images/*"
                                  {...register("mayorsPermit", {
                                    required: true,
                                  })}
                                  onChange={(e) => {
                                    onChange(e);
                                    e.target.blur();
                                  }}
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="customFilemayorsPermit">
                                  {selectedFilemayorsPermit || "Choose Image"}
                                </label>
                              </div>
                            </div>
                          </div>
                          {errors.mayorsPermit && !mayorsPermit && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              Please select a valid image.
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
                                        These terms and conditions govern the
                                        registration of your water refilling
                                        station with our system. By registering
                                        your water refilling station with us,
                                        you are automatically agreeing to accept
                                        and abide by these terms.
                                      </p>
                                      <ol>
                                        <li>
                                          <strong>
                                            Legitimacy of Documents:{" "}
                                          </strong>
                                          <ul>
                                            <li>
                                              Making sure that the legal
                                              documentation for your water
                                              refilling station is legitimate is
                                              very important. Presenting
                                              legitimate and legally recognized
                                              documentation is necessary for
                                              this, and may include your
                                              business permit, health
                                              certificate, and any further
                                              permits that the local government
                                              may require. To preserve
                                              operational integrity and public
                                              trust, all documentation must be
                                              current and adhere to regulatory
                                              standards.
                                            </li>
                                          </ul>
                                        </li>
                                        <li>
                                          <strong>
                                            Accuracy of the Information:{" "}
                                          </strong>
                                          <ul>
                                            <li>
                                              When registering, you must submit
                                              accurate and up-to-date
                                              information. You are responsible
                                              for maintaining this accuracy and
                                              making sure we always get the most
                                              recent information.
                                            </li>
                                          </ul>
                                        </li>
                                        <li>
                                          <strong>Compliance with Laws:</strong>
                                          <ul>
                                            <li>
                                              When it comes to water quality,
                                              public health, safety, and
                                              environmental preservation, your
                                              station must abide by all
                                              applicable laws, rules, and
                                              guidelines. This entails
                                              continuing to follow the rules and
                                              procedures designed to preserve
                                              these important elements.
                                            </li>
                                          </ul>
                                        </li>
                                      </ol>
                                      <hr />

                                      <p
                                        style={{
                                          textIndent: "20px",
                                          textAlign: "justify",
                                        }}>
                                        You agree to these Terms by registering
                                        your water refilling station with our
                                        system, indicating that you have read,
                                        understood, and accepted them. A legally
                                        enforceable agreement between you and
                                        our business is represented by these
                                        Terms.
                                      </p>
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

export default AdminRegister;
