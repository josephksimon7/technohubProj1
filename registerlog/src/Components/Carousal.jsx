import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { images } from "../images/assets";
import { Button } from "react-bootstrap";

const HomeCarousal = () => {
  return (
    <div className="mt-5 mb-5">
      <Carousel>
        <Carousel.Item>
          <div
            className="d-flex justify-content-between align-items-center ms-3 me-3 mb-4 shadow-lg "
            style={{
              border: "1px solid #fff",
              backgroundColor: "#416E6F",
              borderRadius: "5px",
            }}
          >
            <div className="ms-4 mt-3 ">
              <h3 className="text-white">Bremont Star</h3>
              <p className="text-white">$169</p>
            </div>
            <Button
              className="me-3"
              style={{ backgroundColor: "#77CF16", borderColor: "#77CF16" }}
            >
              Buy Now
            </Button>
          </div>

          <img
            src={images.watch2}
            alt="First slide"
            className="d-block mx-auto "
            height="400px"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div
            className="d-flex justify-content-between align-items-center ms-3 me-3 mb-4 shadow-lg "
            style={{
              border: "1px solid #fff",
              backgroundColor: "#416E6F",
              borderRadius: "5px",
            }}
          >
            <div className="ms-4 mt-3 ">
              <h3 className="text-white">Bremont Star</h3>
              <p className="text-white">$169</p>
            </div>
            <Button
              className="me-3"
              style={{ backgroundColor: "#77CF16", borderColor: "#77CF16" }}
            >
              Buy Now
            </Button>
          </div>

          <img
            src={images.watch2}
            alt="First slide"
            className="d-block mx-auto "
            height="400px"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="d-flex justify-content-between align-items-center ms-3 me-3 mb-4 shadow-lg "
            style={{
              border: "1px solid #fff",
              backgroundColor: "#416E6F",
              borderRadius: "5px",
            }}
          >
            <div className="ms-4 mt-3 ">
              <h3 className="text-white">Bremont Star</h3>
              <p className="text-white">$169</p>
            </div>
            <Button
              className="me-3"
              style={{ backgroundColor: "#77CF16", borderColor: "#77CF16" }}
            >
              Buy Now
            </Button>
          </div>

          <img
            src={images.watch2}
            alt="First slide"
            className="d-block mx-auto "
            height="400px"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HomeCarousal;
