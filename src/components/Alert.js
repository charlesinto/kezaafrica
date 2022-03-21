import React from "react";
import { Alert as Info } from "@material-ui/lab";
const Alert = ({ status, message, onClose, isDark, ...props }) => {
  return (
    <Info
      data-aos={props["data-aos"]}
      severity={status}
      onClose={() => onClose && onClose()}
      className={`
    ${isDark ? "fw-bold" : ""}`}
    >
      {message}
    </Info>
  );
};

export default Alert;
