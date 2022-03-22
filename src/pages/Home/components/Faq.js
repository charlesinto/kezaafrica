import React from "react";
import { useGlobalContext } from "../../../context/global";
const Faq = () => {
  const { reportAction } = useGlobalContext();
  return (
    <section id="faq" className="faq">
      <div className="container p-3">
        <h3 className="text-center fw-bold m-5">Frequently Asked Questions</h3>
        <div className="row align-items-center">
          <div className="col-lg-4">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/unnamed-removebg.png`}
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-lg-8" style={{ zIndex: 1 }}>
            <div className="accordion accordion-flush" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    onClick={() => {
                      reportAction("FAQ", 'Asked the "What is Keza" Question');
                    }}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    What is Keza?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong className="fw-bolder fs-5">
                      Keza is a platform that allows you to buy a phone and pay
                      in monthly installments conveniently.
                    </strong>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    onClick={() => {
                      reportAction(
                        "FAQ",
                        'Asked the "What type of phones can I get on Keza?" Question'
                      );
                    }}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    What type of phones can I get on Keza?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong className="fw-bolder fs-5">
                      Keza provides smartphones by Apple, Samsung, Huawei,
                      Infinix and Google Pixel.
                    </strong>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    onClick={() => {
                      reportAction(
                        "FAQ",
                        'Asked the "Are the pre owned phones in good condition?" Question'
                      );
                    }}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Are the pre owned phones in good condition?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong className="fw-bolder fs-5">
                      Certainly! Keza only lists pre owned phones that have been
                      thoroughly inspected and are in excellent condition.
                    </strong>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    onClick={() => {
                      reportAction(
                        "FAQ",
                        'Asked the "When will I get my phone after placing an order?" Question'
                      );
                    }}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    When will I get my phone after placing an order?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong className="fw-bolder fs-5">
                      Your phone will be delivered 24 hours after you fill the
                      application form.
                    </strong>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    onClick={() => {
                      reportAction(
                        "FAQ",
                        'Asked the "Can I pay half of the gadget cost and collect my gadget immediately?" Question'
                      );
                    }}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    Can I pay half of the gadget cost and collect my gadget
                    immediately?
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <strong className="fw-bolder fs-5">
                      Yes you can, as long as your application is approved you
                      can get your phone immediately
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
