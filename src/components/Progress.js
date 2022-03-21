import React from "react";
import { CircularProgress } from "@material-ui/core";
const Progress = () => {
  return (
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
  );
};

export default Progress;
