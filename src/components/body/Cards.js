import React from "react";
import "./Cards.css"; 
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Badge,
} from "reactstrap"; 
import AuthNavbar from "components/Navbars/AuthNavbar.js"; 
import Footer from "components/Footers/Footer.js"; 
import CardItem from "./CardItem"; 

function Cards() {
  return (
    <>
      <AuthNavbar /> 
      <div className="cards" id="cards-section"> 
        <section className="section section-lg mt-6">
          <h1 className="display-3 text-black">Our Products</h1>

          <div className="cards__container">
            <div className="cards__wrapper">
              <ul className="cards__items"> 
                <CardItem
                  src="/images/gallons.png" 
                  text="Slim Blue Gallon: Its slim design saves space, while its durable build ensures you have fresh, clean water wherever you go. Grab yours today and stay hydrated effortlessly!"
                  label="₱200.00"
                  // path="/storeselection"
                />
                <CardItem
                  src="/images/splash.png" 
                  text="Round Blue Gallon: Durable, reliable, and perfect for all your water storage needs. Its durable design ensures fresh water at home, work, or on the go. Get your Round Blue Gallon today!"
                  label="₱200.00"
                  // path="/storeselection"
                />
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Cards;
