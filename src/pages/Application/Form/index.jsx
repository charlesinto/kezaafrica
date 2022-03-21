import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ApplicationForm from "./Form";
const Form = ({ report }) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <div id="apply" className="application-form">
      <div className="d-flex justify-content-center p-3">
        {info && (
          <Alert
            className="fw-bold"
            data-aos="fade-up"
            onClose={() => setInfo(null)}
            severity={info.status}
          >
            {info.message}
          </Alert>
        )}
      </div>
      <ApplicationForm
        report={report}
        setInfo={setInfo}
        setLoading={setLoading}
      />
      {loading && (
        <>
          <CircularProgress
            style={{
              position: "absolute",
              bottom: "25%",
              left: "50%",
            }}
          />
          <div
            style={{
              opacity: "0.3",
              height: " 95%",
              width: "96%",
              transform: "scale(2)",
            }}
            className="modal-backdrop fade show"
          ></div>
        </>
      )}
    </div>
  );
};

export default Form;
