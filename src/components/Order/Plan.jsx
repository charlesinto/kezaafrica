import React from "react";
import { useGlobalContext } from "../../context/global";
const Plan = ({ cardinal, amount, active, disabled }) => {
  const { conveneNumber } = useGlobalContext();
  return (
    <div
      className={`plan d-flex align-items-center justify-content-between p-2 mb-1 
      ${active ? "active" : ""}
      ${disabled ? "disabled" : ""}
      `}
    >
      <span className="fs-6">
        {active && <i className="bi bi-check-circle me-2"></i>}
        {`${cardinal ? `${cardinal} Installment` : "Down Payment"} `}
      </span>
      <span className="fs-5 fw-bold">
        {conveneNumber(parseFloat(amount ? amount : 0))}
      </span>
    </div>
  );
};

export default Plan;
