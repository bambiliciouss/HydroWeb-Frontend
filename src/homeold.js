// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   FormGroup,
//   Form,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Row,
//   Col,
//   Container,
// } from "reactstrap";

// import React from "react";
// import { useLocation } from "react-router-dom";
// import AuthNavbar from "components/Navbars/AuthNavbar.js";
// import AuthFooter from "components/Footers/AuthFooter.js";

// const Home = () => {
//   const location = useLocation();
//   React.useEffect(() => {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//   }, [location]);

//   return (
//     <>
//       <div className="main-content clear-filter" filter-color="blue">
//         <AuthNavbar />
//         <div
//           className="header py-7 py-lg-8"
//           style={{
//             backgroundImage: "url(" + require("assets/img/header.jpg") + ")",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             position: "relative",
//           }}>
//           <div
//             style={{
//               content: '""',
//               position: "absolute",
//               top: 0,
//               right: 0,
//               bottom: 0,
//               left: 0,
//               backgroundColor: "rgba(135, 206, 235, 0.5)",
//             }}></div>
//           <Container>
//             <div className="header-body text-center mb-5 mt-8">
//               <Row className="justify-content-center">
//                 <Col lg="5" md="6">
//                   <h1 className="text-black">Aquatic Dragon</h1>
//                   <p className="text-lead text-black">
//                     We Deliver Clean & Safe Water Right to your Door
//                   </p>
//                 </Col>
//               </Row>
//             </div>
//           </Container>
//         </div>
//       </div>
//       <AuthFooter />
//     </>
//   );
// };

// export default Home;

//DEFAULT HOME PAGE
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
  UncontrolledCarousel,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { allStoreBranch } from "actions/storebranchActions";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { storeBranch } = useSelector((state) => state.allStoreBranch);

  React.useEffect(() => {
    dispatch(allStoreBranch());
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    // console.log(storeBranch);
  }, [location, dispatch]);

  const items = [
    {
      src: require("assets/img/header.jpg"),
      altText: "",
      caption: "",
      header: "",
    },
    {
      src: require("assets/img/landingpage-img1.jpg"),
      altText: "",
      caption: "",
      header: "",
    },
  ];

  // const markers = [
  //   {
  //     geocode: [14.493885828552058, 121.0515581995835],
  //     popUp: "Aquatic Dragon (Branch No.1)",
  //   },
  //   {
  //     geocode: [14.493595, 121.052208],
  //     popUp: "Aquatic Dragon (Main Branch)",
  //   },
  // ];

  // const customIcon = new Icon({
  //   iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  //   // iconUrl: require("./icons/placeholder.png"),
  //   iconSize: [38, 38], // size of the icon
  // });

  return (
    <>
      <AuthNavbar />
      <main>
        <section className="section section-lg mt-8">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={require("assets/img/landingpage-img2.jpg")}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h1 className="display-3 text-info">
                    Water Refilling Station
                  </h1>

                  <p>
                    Water Refilling Station is your go-to location for clean,
                    pure, and sustainable refreshment. Our app is your one-stop
                    click for water delivery services here in Taguig. It offers
                    ordering water delivery easily, transparently, and
                    hassle-free. You can be able to track you water delivery
                    rider.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <br />
        <br />
        <br />

        <section className="section section-lg section-nucleo-icons pb-250">
          <Container>
            <Row className="justify-content-center">
              <Col className="text-center" lg="8">
                <h2 className="display-3 text-info">About Us</h2>
                <p className="lead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <br />
        <br />
        <br />

        <section className="section section-lg section-nucleo-icons pb-250">
          <Container>
            <Row className="justify-content-center">
              <Col className="text-center" lg="8">
                <h2 className="display-3 text-info">About Us</h2>
                <p className="lead">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="section section-lg section-nucleo-icons pb-250">
          <Container>
            <Row className="justify-content-between align-items-center">
              <Col className="mb-5 mb-lg-0" lg="5">
                <p className="lead text-black mt-4">
                  <h2 className="display-3 text-info">Our Services</h2>
                  {storeBranch.map((storeBranches) => (
                    <p className="lead">{storeBranches.branch}</p>
                  ))}
                </p>
              </Col>
              <Col className="mb-lg-auto" lg="6">
                <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                  <UncontrolledCarousel items={items} />
                </div>
              </Col>
            </Row>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0">
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>

        {/* <section className="section section-lg mt-8">
          <Container>
            <MapContainer
              center={[14.494066571438568, 121.0510134107358]}
              zoom={18}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {storeBranch.map((storeBranches) => (
                <Marker
                  position={{
                    lat: storeBranches.address.latitude,
                    lng: storeBranches.address.longitude,
                  }}
                  icon={customIcon}>
                  <Popup>{storeBranches.branch}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </Container>
        </section> */}
      </main>
      {/* <AuthFooter /> */}
    </>
  );
};

export default Home;

//LOCATE ME
// import React, { useState, useRef } from "react";
// import {
//   Badge,
//   Button,
//   Card,
//   CardBody,
//   CardImg,
//   FormGroup,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";
// import { useLocation } from "react-router-dom";
// import AuthNavbar from "components/Navbars/AuthNavbar.js";
// import AuthFooter from "components/Footers/AuthFooter.js";

// import "./styles.css";
// import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import MarkerClusterGroup from "react-leaflet-cluster";
// import { Icon, divIcon, point } from "leaflet";
// import { useDispatch, useSelector } from "react-redux";
// import { allStoreBranch } from "actions/storebranchActions";
// import useGeolocation from "react-hook-geolocation";

// const Home = () => {
//   const location = useGeolocation();
//   const dispatch = useDispatch();
//   const { storeBranch } = useSelector((state) => state.allStoreBranch);

//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);

//   React.useEffect(() => {
//     dispatch(allStoreBranch());
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;

//     console.log(storeBranch);
//   }, [dispatch]);

//   const customIcon = new Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
//     // iconUrl: require("./icons/placeholder.png"),
//     iconSize: [38, 38], // size of the icon
//   });

//   const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
//   const ZOOM_LEVEL = 9;
//   const mapRef = useRef();

//   const showMyLocation = () => {
//     console.log(location);
//     console.log("RESULT", location.latitude, location.longitude);
//     if (!location.error) {
//       if (location.latitude !== null && location.longitude !== null) {
//         if (mapRef.current) {
//           const lat = location.latitude;
//           const lng = location.longitude;

//           setLatitude(location.latitude);
//           setLongitude(location.longitude);
//           const ZOOM_LEVEL = 18;

//           mapRef.current.setView([lat, lng], ZOOM_LEVEL, { animate: true });

//           console.log("RESULT", lat, lng);
//         } else {
//           console.error("mapRef is not properly set.");
//         }
//       } else {
//         console.warn("Location coordinates are not available yet.");
//       }
//     } else if (location.error) {
//       alert(location.error.message || "An unknown error occurred.");
//     }
//   };

//   return (
//     <>
//       <AuthNavbar />
//       <main>
//         <section className="section section-lg mt-8">
//           <Container>
//             <Row className="row-grid align-items-center">
//               <Col className="order-md-2" md="6">
//                 <img
//                   alt="..."
//                   className="img-fluid floating"
//                   src={require("assets/img/landingpage-img2.jpg")}
//                 />
//               </Col>
//               <Col className="order-md-1" md="6">
//                 <div className="pr-md-5">
//                   <h1 className="display-3 text-info">Aquatic Dragon</h1>

//                   <p>
//                     Aquatic Dragon Water Refilling Station is your go-to
//                     location for clean, pure, and sustainable refreshment. At
//                     Aquatic Dragon Water Refilling Station, it passes into
//                     21-stages of water filtration purification and sterilization
//                     that makes the water safe to drink.
//                   </p>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         </section>

//         <section className="section section-lg mt-8">
//           <Container>
//             <MapContainer
//               center={[14.494066571438568, 121.0510134107358]}
//               zoom={18}>
//               <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
//               {storeBranch.map((storeBranches) => (
//                 <Marker
//                   position={{
//                     lat: storeBranches.address.latitude,
//                     lng: storeBranches.address.longitude,
//                   }}
//                   icon={customIcon}>
//                   <Popup>{storeBranches.branch}</Popup>
//                 </Marker>
//               ))}
//             </MapContainer>
//           </Container>
//         </section>

//         <section className="section section-lg mt-8">
//           <Container>
//             <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
//               <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />

//               {location.latitude !== null && location.longitude !== null && (
//                 <Marker
//                   icon={customIcon}
//                   position={[location.latitude, location.longitude]}></Marker>
//               )}
//             </MapContainer>
//           </Container>
//         </section>
//         <div className="row my-4">
//           <div className="col d-flex justify-content-center">
//             <button className="btn btn-primary" onClick={showMyLocation}>
//               Locate Me
//             </button>
//           </div>
//         </div>
//       </main>
//       {/* <AuthFooter /> */}
//     </>
//   );
// };

// export default Home;

//SEARCH THEN PIN LOCATION

// import React, { useState, useEffect } from "react";
// // nodejs library that concatenates classes
// import classnames from "classnames";

// // reactstrap components
// import {
//   Badge,
//   Button,
//   Card,
//   CardBody,
//   CardImg,
//   FormGroup,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";
// import { useLocation } from "react-router-dom";
// import AuthNavbar from "components/Navbars/AuthNavbar.js";
// import AuthFooter from "components/Footers/AuthFooter.js";

// import "./styles.css";
// import "leaflet/dist/leaflet.css";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   FeatureGroup,
// } from "react-leaflet";
// import { EditControl } from "react-leaflet-draw";
// import MarkerClusterGroup from "react-leaflet-cluster";
// import { Icon, divIcon, point } from "leaflet";
// import { useDispatch, useSelector } from "react-redux";
// import { allStoreBranch } from "actions/storebranchActions";

// import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
// import "leaflet-geosearch/dist/geosearch.css";
// import { useRef } from "react";

// const Home = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { storeBranch } = useSelector((state) => state.allStoreBranch);

//   const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
//   const ZOOM_LEVEL = 9;
//   const mapRef = useRef();

//   const handleSearch = (result) => {
//     setCenter({ lat: result.y, lng: result.x });
//   };

//   const customIcon = new Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
//     // iconUrl: require("./icons/placeholder.png"),
//     iconSize: [38, 38], // size of the icon
//   });

//   useEffect(() => {
//     const initializeMap = () => {
//       if (mapRef.current) {
//         const searchControl = new GeoSearchControl({
//           provider: new OpenStreetMapProvider(),
//           style: "bar",
//           showMarker: false,
//           onResultClick: handleSearch,
//         });
//         mapRef.current.addControl(searchControl);
//       } else {
//         setTimeout(initializeMap, 100);
//       }
//     };

//     dispatch(allStoreBranch());

//     initializeMap();
//   }, [dispatch]);

//   const [marker, setMarker] = useState(null);

//   const handleMarkerCreated = (e) => {
//     const newMarker = e.layer;
//     console.log(newMarker);

//     setMarker((prevMarker) => {
//       if (prevMarker) {
//         prevMarker.remove();
//       }

//       return newMarker;
//     });

//     const { lat, lng } = newMarker.getLatLng();
//     console.log(lat, lng);
//     // setLatitude(lat);
//     // setLongitude(lng);
//   };

//   return (
//     <>
//       <AuthNavbar />
//       <main>
//         <section className="section section-lg mt-8">
//           <Container>
//             <Row className="row-grid align-items-center">
//               <Col className="order-md-2" md="6">
//                 <img
//                   alt="..."
//                   className="img-fluid floating"
//                   src={require("assets/img/landingpage-img2.jpg")}
//                 />
//               </Col>
//               <Col className="order-md-1" md="6">
//                 <div className="pr-md-5">
//                   <h1 className="display-3 text-info">Aquatic Dragon</h1>

//                   <p>
//                     Aquatic Dragon Water Refilling Station is your go-to
//                     location for clean, pure, and sustainable refreshment. At
//                     Aquatic Dragon Water Refilling Station, it passes into
//                     21-stages of water filtration purification and sterilization
//                     that makes the water safe to drink.
//                   </p>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         </section>

//         <section className="section section-lg mt-8">
//           <Container>
//             <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
//               <FeatureGroup>
//                 <EditControl
//                   position="topright"
//                   onCreated={handleMarkerCreated}
//                   draw={{
//                     polygon: false,
//                     rectangle: false,
//                     circle: false,
//                     circlemarker: false,
//                     marker: true,
//                     polyline: false,
//                   }}
//                 />
//               </FeatureGroup>
//               <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
//             </MapContainer>
//           </Container>
//         </section>
//       </main>
//       {/* <AuthFooter /> */}
//     </>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// // nodejs library that concatenates classes
// import classnames from "classnames";

// // reactstrap components
// import {
//   Badge,
//   Button,
//   Card,
//   CardBody,
//   CardImg,
//   FormGroup,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";
// import { useLocation } from "react-router-dom";
// import AuthNavbar from "components/Navbars/AuthNavbar.js";
// import AuthFooter from "components/Footers/AuthFooter.js";

// import "./styles.css";
// import "leaflet/dist/leaflet.css";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   FeatureGroup,
// } from "react-leaflet";
// import { EditControl } from "react-leaflet-draw";
// import MarkerClusterGroup from "react-leaflet-cluster";
// import { Icon, divIcon, point } from "leaflet";
// import { useDispatch, useSelector } from "react-redux";
// import { allStoreBranch } from "actions/storebranchActions";

// import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
// import "leaflet-geosearch/dist/geosearch.css";
// import { useRef } from "react";

// import useGeolocation from "react-hook-geolocation";
// import L from "leaflet";
// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
// });

// const Home = () => {
//   const location = useGeolocation();
//   const dispatch = useDispatch();
//   const { storeBranch } = useSelector((state) => state.allStoreBranch);

//   const [center, setCenter] = useState({
//     lat: 14.494056184062693,
//     lng: 121.0509490377972,
//   });
//   //14.494056184062693, 121.0509490377972
//   const ZOOM_LEVEL = 14;
//   const mapRef = useRef();

//   const handleSearch = (result) => {
//     setCenter({ lat: result.y, lng: result.x });
//   };

//   const customIcon = new Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
//     // iconUrl: require("./icons/placeholder.png"),
//     iconSize: [38, 38], // size of the icon
//   });
//   const [marker, setMarker] = useState({
//     lat: 14.494056184062693,
//     lng: 121.0509490377972,
//   });

//   useEffect(() => {
//     console.log(marker)
//     const initializeMap = () => {
//       if (mapRef.current) {
//         const searchControl = new GeoSearchControl({
//           provider: new OpenStreetMapProvider(),
//           style: "bar",
//           showMarker: false,
//           onResultClick: handleSearch,
//         });
//         mapRef.current.addControl(searchControl);
//       } else {
//         setTimeout(initializeMap, 100);
//       }
//     };

//     dispatch(allStoreBranch());
//     initializeMap();

//     setMarker({
//       lat: center.lat,
//       lng: center.lng,
//     });
//   }, [dispatch, center]);

//   const handleMarkerCreated = (e) => {
//     const newMarker = e.layer;
//     console.log(newMarker);

//     setMarker((prevMarker) => {
//       if (prevMarker) {
//         prevMarker.remove();
//       }

//       return newMarker;
//     });

//     const { lat, lng } = newMarker.getLatLng();
//     console.log(lat, lng);
//     // setLatitude(lat);
//     // setLongitude(lng);
//   };

//   return (
//     <>
//       <AuthNavbar />
//       <main>
//         <section className="section section-lg mt-8">
//           <Container>
//             <Row className="row-grid align-items-center">
//               <Col className="order-md-2" md="6">
//                 <img
//                   alt="..."
//                   className="img-fluid floating"
//                   src={require("assets/img/landingpage-img2.jpg")}
//                 />
//               </Col>
//               <Col className="order-md-1" md="6">
//                 <div className="pr-md-5">
//                   <h1 className="display-3 text-info">Aquatic Dragon</h1>

//                   <p>
//                     Aquatic Dragon Water Refilling Station is your go-to
//                     location for clean, pure, and sustainable refreshment. At
//                     Aquatic Dragon Water Refilling Station, it passes into
//                     21-stages of water filtration purification and sterilization
//                     that makes the water safe to drink.
//                   </p>
//                 </div>
//               </Col>
//             </Row>
//           </Container>
//         </section>

//         <section className="section section-lg mt-8">
//           <Container>
//             <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
//               <FeatureGroup>
//                 <EditControl
//                   position="topright"
//                   onCreated={handleMarkerCreated}
//                   draw={{
//                     polygon: false,
//                     rectangle: false,
//                     circle: false,
//                     circlemarker: false,
//                     marker: true,
//                     polyline: false,
//                   }}
//                 />
//               </FeatureGroup>
//               <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />

//               {/* {marker && <Marker position={marker} icon={customIcon}></Marker>} */}
//             </MapContainer>
//           </Container>
//         </section>
//       </main>
//       {/* <AuthFooter /> */}
//     </>
//   );
// };

// export default Home;
