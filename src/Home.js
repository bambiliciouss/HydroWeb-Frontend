import React from "react";
// // nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Navbar,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import Cards from "components/body/Cards";
import AboutUs from "components/body/AboutUs";
import Footer from "components/Footers/Footer";

import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
 
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

  }, [location, dispatch]);


  return (
    <>
      <AuthNavbar />
      <main>
        <section className="section section-lg mt-6">
          <div className="hero-container">
            <video src="/videos/water.mp4" autoPlay loop muted />
            <h1>Hydration Starts Here</h1>
            <p>What are you waiting for?</p>
            <div className="hero-btns">
              {user && user.role === "user" && (
                <Button
                  className="btns"
                  buttonStyle="btn--outline"
                  buttonSize="btn--large"
                >
                  <Link to="/storeselection" className="text-decoration-none">
                    {" "}
                    ORDER NOW
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
        <AboutUs />
        <Cards />
        <Footer />

      </main>

    </>
  );
};

export default Home;
