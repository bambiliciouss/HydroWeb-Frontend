import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import { DELETE_STOREBRANCH_RESET } from "../../constants/storebranchConstants";
import swal from "sweetalert";
import { allStoreBranch, deleteStoreBranch } from "actions/storebranchActions";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Form,
} from "reactstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
  createStoreBranch,
  allAdminStoreBranch,
  clearErrors,
} from "../../actions/storebranchActions";

import { CREATE_STOREBRANCH_RESET } from "../../constants/storebranchConstants";
import { useForm } from "react-hook-form";

import {
  allStoreStaff,
  deleteStoreStaff,
} from "../../actions/storestaffAction";
import {
  ALL_STORESTAFF_RESET,
  DELETE_STORESTAFF_RESET,
} from "../../constants/storestaffConstants";

import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import osm from "./osm-providers";
import { useRef } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const StoreBranchList = (args) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, storeBranch } = useSelector((state) => state.allStoreBranch);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { isDeleted } = useSelector((state) => state.storeBranch);

  const { storeBranchCreated, error } = useSelector(
    (state) => state.newStoreBranch
  );

  const { isDeletedStoreStaff } = useSelector((state) => state.storeStaff);

  console.log("Initial storeBranch state:", storeBranch);
  const [storeBranches, setstoreBranch] = useState({
    branch: "",
    houseNo: "",
    streetName: "",
    purokNum: "",
    barangay: "",
    city: "",
    deliverFee: "",
  });

  const {
    branchNo,
    houseNo,
    streetName,
    purokNum,
    barangay,
    city,
    deliverFee,
  } = storeBranch;

  const [storeImage, setstoreImage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //FOR LIST OF EMPLOYEES PER STORE
  const [storeEmployeeModalVisible, setStoreEmployeeModalVisible] =
    useState(false);
  const [storeRiderModalVisible, setStoreRiderModalVisible] = useState(false);
  const [storeIdModal, setStoreIdModal] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { storeStaff } = useSelector((state) => state.allStoreStaff);

  const toggleStoreEmployeeModal = () =>
    setStoreEmployeeModalVisible(!storeEmployeeModalVisible);

  const toggleStoreRiderModal = () =>
    setStoreRiderModalVisible(!storeRiderModalVisible);

  const openStoreEmployeeModal = (storebranch) => {
    setStoreIdModal(storebranch);
    toggleStoreEmployeeModal();
  };

  const openStoreRiderModal = (storebranch) => {
    setStoreIdModal(storebranch);
    toggleStoreRiderModal();
  };

  const deleteStoreBranchHandler = (id) => {
    swal({
      title: "Are you sure you want to delete this branch?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Branch has been deleted!", "", "success");
        dispatch(deleteStoreBranch(id));
      } else {
        swal("Branch is not deleted!", "", "info");
        console.log(id);
      }
    });
  };

  const deleteStoreStaffHandler = (id) => {
    swal({
      title: "Are you sure you want to remove this assigned staff?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Store Staff has been removed!", "", "success");
        dispatch(deleteStoreStaff(id));
      } else {
        swal("Store Staff is not deleted!", "", "info");
        console.log(id);
      }
    });
  };

  const submitHandler = (e) => {
    if (latitude && longitude !== null) {
      const formData = new FormData();
      formData.set("address[houseNo]", e.houseNo);
      formData.set("address[streetName]", e.streetName);
      formData.set("address[purokNum]", e.purokNum);
      formData.set("address[barangay]", e.barangay);
      formData.set("address[city]", e.city);
      formData.set("address[latitude]", latitude);
      formData.set("address[longitude]", longitude);
      formData.set("deliverFee", e.deliverFee);
      formData.set("branch", e.branch);
      formData.set("storeImage", storeImage);

      dispatch(createStoreBranch(formData));
    } else {
      swal("Please Pin Store Location", "", "error");
    }

    //window.location.reload();
  };

  // const onChange = (e) => {
  //   if (e.target.name === "storeImage") {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setAvatarPreview(reader.result);
  //         setstoreImage(reader.result);
  //       }
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   } else {
  //     setstoreBranch({ ...storeBranches, [e.target.name]: e.target.value });
  //   }
  // };

  const onChange = (e) => {
    const file = e.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed image file types

    if (e.target.name === "storeImage") {
      if (file && allowedImageTypes.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setstoreImage(reader.result);
          }
        };

        reader.readAsDataURL(e.target.files[0]);
      } else {
        swal("Please select a valid image file (PNG, JPEG, JPG).", "", "error");
        e.target.value = null; // Clear the input value
      }
    }
  };

  const setStoreBranch = () => {
    const data = {
      columns: [
        {
          label: "Store",
          field: "storeImage",
          sort: "asc",
        },
        {
          label: "Branch",
          field: "branchNo",
          sort: "asc",
        },
        {
          label: "Address",
          field: "address",
          sort: "asc",
        },
        {
          label: "Delivery Fee",
          field: "deliverFee",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
        // {
        //   label: "List of assigned Staff",
        //   field: "list",
        // },
        {
          label: "Barangay Scope",
          field: "barangay",
        },

        // {
        //   label: "Barangay Health Records",
        //   field: "barangay",
        // },
      ],

      rows: [],
    };

    storeBranch.forEach((storeBranches) => {
      data.rows.push({
        storeImage: (
          <img
            className="d-block w-100"
            src={storeBranches.storeImage.url}
            alt={storeBranches.branchNo}
            img
            style={{ width: 70, height: 70 }}
          />
        ),
        branchNo: storeBranches.branch,
        address: `${storeBranches.address.houseNo} ${storeBranches.address.purokNum} ${storeBranches.address.streetName} ${storeBranches.address.barangay} ${storeBranches.address.city}`,
        deliverFee: `₱ ${storeBranches.deliverFee}.00`,
        actions: (
          <Fragment>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() => navigate(`/store/details/${storeBranches._id}`)}>
              <i className="fa fa-info-circle"></i>
            </button>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteStoreBranchHandler(storeBranches._id)}>
              <i className="fa fa-trash"></i>
            </button>

            {/* <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() =>
                navigate(`/create/store/machincecleaning/${storeBranches._id}`)
              }>
              <i className="fa fa-info-circle"></i> View
            </button> */}
          </Fragment>
        ),

        barangay: (
          <Fragment>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() =>
                navigate(`/create/store/barangay/${storeBranches._id}`)
              }>
              View Record
            </button>
          </Fragment>
        ),

        list: (
          <Fragment>
            <button
              className="btn btn-info py-1 px-2 ml-2"
              onClick={() => openStoreEmployeeModal(storeBranches._id)}>
              Employees
            </button>

            <button
              className="btn btn-info py-1 px-2 ml-2"
              onClick={() => openStoreRiderModal(storeBranches._id)}>
              Riders
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const setStoreStaffEmployee = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },

        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [],
    };

    const employeeStaff = storeStaff.filter(
      (staff) => staff.user.role === "employee"
    );

    employeeStaff.forEach((storeStaffs) => {
      data.rows.push({
        name: `${storeStaffs.user.fname} ${storeStaffs.user.lname}`,
        email: storeStaffs.user.email,
        action: (
          <Fragment>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteStoreStaffHandler(storeStaffs._id)}>
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  useEffect(() => {
    //DISPLAY OF STORE BRANCH
    // dispatch(allStoreBranch());

    dispatch(allAdminStoreBranch());
    console.log("Lat:", latitude);
    console.log("Long:", longitude);

    //LIST OF EMPLOYEES
    if (storeIdModal !== null) {
      dispatch(allStoreStaff(storeIdModal));
    }

    if (storeBranchCreated) {
      console.log("success registration");
      swal("New Store Branch Created!", "", "success");
      toggle();
      navigate("/storebranchlist", { replace: true });
      dispatch({
        type: CREATE_STOREBRANCH_RESET,
      });
      reset();
    }

    if (isDeleted) {
      console.log("store branch deleted ");
      navigate("/storebranchlist");
      window.location.reload();
      dispatch({ type: DELETE_STOREBRANCH_RESET });
    }

    if (isDeletedStoreStaff) {
      console.log("store branch deleted ");
      navigate("/storebranchlist");
      //window.location.reload();
      dispatch({ type: DELETE_STORESTAFF_RESET });
    }

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [
    dispatch,
    isDeleted,
    navigate,
    storeIdModal,
    isDeletedStoreStaff,
    storeBranchCreated,
    reset,
    longitude,
    latitude,
  ]);

  const setStoreStaffRider = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [],
    };

    const riderStaff = storeStaff.filter(
      (staff) => staff.user.role === "rider"
    );

    riderStaff.forEach((storeStaffs) => {
      data.rows.push({
        name: `${storeStaffs.user.fname} ${storeStaffs.user.lname}`,
        email: storeStaffs.user.email,
        action: (
          <Fragment>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteStoreStaffHandler(storeStaffs._id)}>
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const [center, setCenter] = useState({
    lat: 14.493945331650867,
    lng: 121.0518236625988,
  });

  const ZOOM_LEVEL = 18;
  const mapRef = useRef();
  const [marker, setMarker] = useState(null);

  const handleMarkerCreated = (e) => {
    const newMarker = e.layer;

    setMarker((prevMarker) => {
      if (prevMarker) {
        prevMarker.remove();
      }

      return newMarker;
    });

    const { lat, lng } = newMarker.getLatLng();
    console.log(lat, lng);
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <>
      <MetaData title={"Store(s)"} />
      <Sidebar
        logo={{
          innerLink: "/",
          imgSrc: require("../../assets/img/brand/logo2.1.jpg"),
          imgAlt: "...",
        }}
      />
      <div className="main-content">
        <AdminNavbar />
        <Header2 />
        <Container className="mt--7" fluid>
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">List of Store(s) </h3>
                </Col>
                <Col md="4">
                  <Button
                    block
                    className="mb-3"
                    color="primary"
                    type="button"
                    onClick={toggle}>
                    Register New Store Branch
                  </Button>
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={modal}
                    toggle={toggle}
                    {...args}>
                    <Form role="form" onSubmit={handleSubmit(submitHandler)}>
                      <ModalHeader toggle={toggle}>
                        Register New Store Branch
                      </ModalHeader>
                      <ModalBody>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-square-pin" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Store Name..."
                              className="form-control"
                              type="text"
                              name="branch"
                              {...register("branch", {
                                required: "Please enter a valid info",
                              })}></input>
                          </InputGroup>
                          {errors.branch && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              {errors.branch.message}
                            </h2>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-square-pin" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="House No..."
                              className="form-control"
                              type="text"
                              name="houseNo"
                              {...register("houseNo", {
                                required: "Please enter a valid house No.",
                              })}></input>
                          </InputGroup>
                          {errors.houseNo && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              {errors.houseNo.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-square-pin" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Purok No..."
                              className="form-control"
                              type="text"
                              name="purokNum"
                              {...register("purokNum", {
                                required: "Please enter a valid Purok No.",
                              })}></input>
                          </InputGroup>
                          {errors.purokNum && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              {errors.purokNum.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-square-pin" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Street Name..."
                              className="form-control"
                              type="text"
                              name="streetName"
                              {...register("streetName", {
                                required: "Please enter a valid Street Name.",
                              })}></input>
                          </InputGroup>
                          {errors.streetName && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              {errors.streetName.message}
                            </h2>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-square-pin" />
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
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-delivery-fast" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Delivery Fee..."
                              className="form-control"
                              type="text"
                              name="deliveryFee"
                              {...register("deliverFee", {
                                required: "Please enter a valid fee.",
                              })}></input>
                          </InputGroup>
                          {errors.deliverFee && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              {errors.deliverFee.message}
                            </h2>
                          )}
                        </FormGroup>

                        <Row>
                          <Col md="12">
                            <div className="form-group">
                              <label htmlFor="avatar_upload">Store Image</label>

                              <div className="row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-6">
                                  <div className="text-center">
                                    <img
                                      className="avatar border-gray"
                                      style={{
                                        width: "200px",
                                        height: "200px",
                                      }}
                                      src={avatarPreview}
                                      alt="User"
                                    />
                                  </div>

                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      name="storeImage"
                                      className="custom-file-input"
                                      id="customFile"
                                      accept="images/*"
                                      {...register("storeImage", {
                                        required: true,
                                      })}
                                      onChange={(e) => {
                                        onChange(e);
                                        e.target.blur();
                                      }}
                                    />
                                    <label
                                      className="custom-file-label"
                                      htmlFor="customFile">
                                      Choose Image
                                    </label>
                                  </div>
                                </div>
                              </div>
                              {errors.storeImage && !storeImage && (
                                <h2
                                  className="h1-seo"
                                  style={{
                                    color: "red",
                                    fontSize: "small",
                                  }}>
                                  Please select a valid image.
                                </h2>
                              )}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <MapContainer
                            center={center}
                            zoom={ZOOM_LEVEL}
                            ref={mapRef}>
                            <FeatureGroup>
                              <EditControl
                                position="topright"
                                onCreated={handleMarkerCreated}
                                draw={{
                                  polygon: false,
                                  rectangle: false,
                                  circle: false,
                                  circlemarker: false,
                                  marker: true,
                                  polyline: false,
                                }}
                              />
                            </FeatureGroup>
                            <TileLayer
                              url={osm.maptiler.url}
                              attribution={osm.maptiler.attribution}
                            />
                          </MapContainer>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" type="submit">
                          Register
                        </Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                          Cancel
                        </Button>
                      </ModalFooter>{" "}
                    </Form>
                  </Modal>
                </Col>
              </Row>

              <ReactHTMLTableToExcel
                className="btn btn-success"
                table="storebranchtable"
                filename="list-of-store"
                sheet="sheet 1"
                buttonText="Export to Excel"
              />
            </CardHeader>
            <CardBody style={{ overflowX: "auto" }}>
              <MDBDataTable
                data={setStoreBranch()}
                className="px-3"
                bordered
                hover
                noBottomColumns
                responsive
                id="storebranchtable"
              />
            </CardBody>
          </Card>
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>

      <Modal
        className="modal-dialog-centered modal-lg"
        isOpen={storeEmployeeModalVisible}
        toggle={toggleStoreEmployeeModal}
        {...args}>
        <ModalHeader toggle={toggleStoreEmployeeModal}>
          List of Employees
        </ModalHeader>
        <ModalBody>
          <MDBDataTable
            data={setStoreStaffEmployee()}
            className="px-3"
            bordered
            hover
            noBottomColumns
            responsive
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleStoreEmployeeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        className="modal-dialog-centered modal-lg"
        isOpen={storeRiderModalVisible}
        toggle={toggleStoreRiderModal}
        {...args}>
        <ModalHeader toggle={toggleStoreRiderModal}>List of Riders</ModalHeader>
        <ModalBody>
          <MDBDataTable
            data={setStoreStaffRider()}
            className="px-3"
            bordered
            hover
            noBottomColumns
            responsive
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleStoreRiderModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default StoreBranchList;
