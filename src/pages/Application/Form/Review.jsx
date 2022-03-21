import React from "react";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import { useGlobalContext } from "../../../context/global";
const Review = ({
  loading,
  success,
  form,
  conveneNumber,
  handleApplication,
  handleReset,
}) => {
  const { reportAction } = useGlobalContext();
  return (
    <div id="result" data-aos="fade-left" className="col-lg-6">
      <LinearProgress variant="determinate" value={success} />
      <div
        style={{
          background: "var(--keza-tertiary)",
        }}
        className="result alert alert-dismissible fade show"
        role="alert"
      >
        <h3 className="alert-heading">Your Estimated Monthly Payment</h3>

        <h5 className="my-3 fs-4 fw-bold">
          {conveneNumber(
            parseFloat(
              !loading ? (form.meta.dividend ? form.meta.dividend : 0) : 0
            )
          )}
        </h5>
        {!loading && form.meta.amount ? (
          <>
            <p>
              <strong>
                {`You had requested to pay ${conveneNumber(
                  parseFloat(form.meta.dividend)
                )} monthly for ${form.meta.months} months to own a ${
                  form.product.condition === "old" ? "Pre Owned" : "Brand New"
                } ${form.product.name}`}
              </strong>
            </p>
            <p>
              Do you have a change of heart? You can always edit your request.
              Once you are done, please click the button below and proceed to
              the next stage.
            </p>
          </>
        ) : (
          <p></p>
        )}
        <div className="mt-3 d-flex justify-content-between">
          <button
            onClick={() => {
              handleApplication();
              reportAction("Apply", "Proceeded to the Application Form");
            }}
            className="btn btn-primary"
            disabled={success !== 100}
          >
            Continue
          </button>
          <button onClick={() => handleReset()} className="btn btn-primary">
            Reset
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

export default Review;
