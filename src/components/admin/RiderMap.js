import React, { Fragment, useEffect, useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { allRider, allUsers, deleteUser } from "actions/userActions";
import { MDBDataTable } from "mdbreact";

import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import { DELETE_USER_RESET } from "../../constants/userConstants";
import swal from "sweetalert";

import { newrider, clearErrors } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

import {
  createStoreStaff,
  singleStoreStaff,
} from "../../actions/storestaffAction";
import { allStoreBranch } from "actions/storebranchActions";

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
  Input,
  CardText,
} from "reactstrap";
import { CREATE_STORESTAFF_RESET } from "../../constants/storestaffConstants";
import { getStoreDetails } from "actions/storebranchActions";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import {
  GoogleMap,
  useJsApiLoader,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { mapOptions } from "./MapConfiguration";
import { riderLoc } from "actions/userActions";
const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const RiderMap = (args) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { id } = useParams();
  const { riderlatlong } = useSelector((state) => state.riderLocation);

  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapsApiKey,
    googleMapsApiKey: "AIzaSyCKllvUiu_RD2Yphmk7gSPOTuXaLjQjRuA",
  });

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: 14.494066571370974,
    lng: 121.0509383094235,
  };

  useEffect(() => {
    dispatch(riderLoc(id));
    console.log("Location", riderlatlong);
  }, [dispatch, riderlatlong]);

  return (
    <>
      <MetaData title={"Rider Location"} />
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
                  <h3 className="mb-0">Rider Location</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody style={{ overflowX: "auto" }}>
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{
                    lat: riderlatlong.latitude || 0,
                    lng: riderlatlong.longitude || 0,
                  }}
                  zoom={18}>
                  <Marker
                    position={{
                      lat: riderlatlong.latitude || 0,
                      lng: riderlatlong.longitude || 0,
                    }}
                  />
                </GoogleMap>
              )}
            </CardBody>
          </Card>
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default RiderMap;
