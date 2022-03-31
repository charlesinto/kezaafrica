import React, { useState } from "react";
import { Alert } from "@material-ui/lab";
import ApplicationForm from "./Form";
import { Progress } from "../../../components";
const Form = ({ report }) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingValue, setLoadingValue] = useState(0);
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
        setLoadingValue={setLoadingValue}
      />
      {loading && <Progress value={loadingValue} />}
    </div>
  );
};

export default Form;
