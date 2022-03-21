import React from "react";
import { useGlobalContext } from "../../../context/global";
const Hero = () => {
  const { reportAction } = useGlobalContext();
  return (
    <section id="hero" className="hero d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h1>Get a smart phone on a smart plan</h1>
            <h2 style={{ lineHeight: 1.4 }}>
              Stop paying so much to buy a new phone. <br /> Try Keza and
              conveniently pay in monthly installments.
            </h2>
            <div>
              <div className="text-center text-lg-start">
                <button
                  onClick={() => {
                    reportAction("Button", "Clicked the Try Keza Button");
                    window.location.replace("/apply");
                  }}
                  className="btn-get-started btn btn-primary align-self-center"
                >
                  <span>Start Your Phone Plan</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 hero-img">
            <img
              src="assets/images/unnamed__1_-removebg.png"
              style={{ cursor: "pointer" }}
              alt=""
              className="img-fluid"
              onClick={() => {
                window.location.replace("/apply");
                reportAction("Image", "Clicked the Hero Image");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
