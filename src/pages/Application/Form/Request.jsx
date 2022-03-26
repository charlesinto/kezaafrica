import React from "react";
import { useGlobalContext } from "../../../context/global";
const Request = ({ report }) => {
  const { conveneNumber } = useGlobalContext();
  const {
    product: { name },
    meta: { months, dividend },
    user,
  } = report;
  return (
    <div className="card shadow-lg">
      <div className="card-header">
        <h3>Request information</h3>
      </div>
      <div className="card-body p-3">
        <div className="report-item">
          <i className="bi bi-person-circle"></i>
          <p style={{ textTransform: "capitalize" }}>{user.name}</p>
        </div>
        <div className="report-item">
          <i className="bi bi-phone"></i>
          <p>{name}</p>
        </div>
        <div className="report-item">
          <i className="rx ri-history-line"></i>
          <p>{months} Months</p>
        </div>
        <div className="report-item">
          <i className="bi bi-cash"></i>
          <p>{conveneNumber(dividend)}</p>
        </div>
      </div>
    </div>
  );
};

export default Request;
