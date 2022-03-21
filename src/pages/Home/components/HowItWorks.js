import React from "react";
import { useGlobalContext } from "../../../context/global";
function HowItWorks() {
  const { reportAction } = useGlobalContext();
  return (
    <section id="how-it-works" className="why-us">
      <div className="container">
        <div className="d-flex text-center justify-content-center align-items-stretch">
          <div className="content">
            <h3>How it works</h3>
            <p className="fs-4">
              Keza lets you buy a smartphone without breaking the bank. <br />
              Explore Keza in just 3 steps!
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div
              onClick={() => {
                window.location.replace("/apply");
                reportAction("How It Works", "Clicked the Pick A Phone Image");
              }}
              className="box"
            >
              <img
                src="assets/images/5614049-removebg.png"
                className="img-fluid"
                alt="Pick a Phone"
              />
              <h3>Pick a Phone</h3>
              <p>
                Choose from a wide range of phones. Brand new or pre owned,
                we’ve got you. 😉
              </p>
            </div>
          </div>

          <div className="col-lg-4 mt-4 mt-lg-0">
            <div
              onClick={() => {
                window.location.replace("/apply");
                reportAction(
                  "How It Works",
                  "Clicked the Choose your Payment Terms Image"
                );
              }}
              className="box"
            >
              <img
                src="assets/images/5601723-removebg.png"
                className="img-fluid"
                alt="Choose your Payment"
              />
              <h3>Choose your Payment Plan</h3>
              <p>Select how many months you want to pay for.</p>
            </div>
          </div>

          <div className="col-lg-4 mt-4 mt-lg-0">
            <div
              onClick={() => {
                window.location.replace("/apply");
                reportAction(
                  "How It Works",
                  "Clicked the Make your First Installment Image"
                );
              }}
              className="box"
            >
              <img
                src="assets/images/5591060-removebg.png"
                className="img-fluid"
                alt="Make your First Installment"
              />
              <h3>Make your First Installment</h3>
              <p>Make a down payment and the phone is yours!</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center m-3">
          <button
            onClick={() => window.location.replace("/apply")}
            className="btn btn-primary btn-get-started"
          >
            <span>Try Keza</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
