import React from "react";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { useGlobalContext } from "../../../../context/global";
const Result = ({ loading, success, form, conveneNumber, handleSendMail }) => {
  const { reportAction } = useGlobalContext();
  return (
    <div id="result" className="col-lg-6">
      <LinearProgress variant="determinate" value={success} />
      <div
        style={{
          background: "var(--keza-tertiary)",
        }}
        className="result alert alert-dismissible fade show"
        role="alert"
      >
        <h3 className="alert-heading">Your Estimated Monthly Payment</h3>

        <h5 className="my-3 fs-3 fw-bold">
          {conveneNumber(
            parseFloat(
              !loading ? (form.meta.dividend ? form.meta.dividend : 0) : 0
            )
          )}
        </h5>
        {!loading && form.meta.amount ? (
          <>
            <p data-aos="fade-up">
              <strong className="fw-bold fs-5">
                {`You will pay ${conveneNumber(
                  parseFloat(form.meta.dividend || 0)
                )} monthly for ${form.meta.months} months to own a ${
                  form.product.condition === "old" ? "Pre Owned" : "Brand New"
                } ${form.product.name} 🥳`}
              </strong>
            </p>
          </>
        ) : (
          <p></p>
        )}
        <div className="mt-3 d-flex justify-content-center">
          <button
            onClick={() => {
              reportAction("Calculator", "Requested for a monthly breakdown");
              handleSendMail();
            }}
            className="btn btn-primary btn-get-started btn-lg fs-6"
          >
            Get Your Phone Now
          </button>
        </div>
      </div>
      {loading && (
        <>
          <CircularProgress
            style={{
              position: "absolute",
              bottom: "50%",
              left: "50%",
            }}
          />
          <div
            style={{
              opacity: "0.3",
              height: " 95%",
              width: "96%",
              transform: "translateX(2.5%)",
            }}
            className="modal-backdrop fade show"
          ></div>
        </>
      )}
    </div>
  );
};

export default Result;
