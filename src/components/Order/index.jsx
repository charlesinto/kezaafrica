import "./style.css";
import React, { useState, useEffect, useMemo } from "react";
import { Tooltip } from "@material-ui/core";
import { useGlobalContext } from "../../context/global";
import { useDispatch, useSelector } from "react-redux";
import MonoConnect from "@mono.co/connect.js";
import { connectMono, deleteApplication } from "../../data/actions/user";
import { useDashboardcontext } from "../../pages/Dashboard";
import { useModal } from "../../hooks";
import Plan from "./Plan";
const Order = ({
  id,
  createdAt,
  current,
  name,
  down,
  payment,
  isNotConnected,
  months,
  currentMonth,
  paid,
  balance,
  errorStatus,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const { setPrompt } = useModal();
  const { conveneNumber, key } = useGlobalContext();
  const { setLoading, setInfo, setIsLoaded } = useDashboardcontext();
  const [status, setStatus] = useState(0);
  const [error, setError] = useState(0);
  const mono = useMemo(() => {
    const instance = new MonoConnect({
      key,
      onSuccess: ({ code }) => {
        setLoading(true);
        const monoForm = {
          code,
          email: user !== null ? user.email : "",
        };
        dispatch(connectMono(monoForm, setInfo, setLoading));
      },
      onError: (res) => {
        console.log(res ? res : "error");
      },
    });
    instance.setup();
    return instance;
  }, [dispatch, user, key, setLoading, setInfo]);
  useEffect(() => {
    if (current) {
      const currents = [
        "review",
        "accepted",
        "paid",
        "processed",
        "shipped",
        "confirmed",
      ];
      const errors = [
        "rejected",
        "unpaid",
        "unprocessed",
        "unshipped",
        "declined",
      ];
      currents.forEach((c, i) => {
        if (c === current) {
          setStatus(i + 1);
        }
      });
      errors.forEach((e, i) => {
        if (e === errorStatus) {
          setError(i + 1);
        }
      });
    }
  }, [current, errorStatus]);
  const handleDeleteApplication = () => {
    setPrompt({
      title: "Are you sure you want to do this?",
      text: "By doing this, you are going to clear any progress made on this application",
      textTwo: "If this was a mistake, you can click the cancel button below",
      confirmButtonText: "Continue",
      denyButtonText: "Cancel",
      confirmAction: () => {
        dispatch(deleteApplication(id, setLoading, setIsLoaded));
      },
    });
  };
  return (
    <div className="card w-100">
      <div
        style={{ position: "relative" }}
        className="row d-flex justify-content-center"
      >
        <div className="pro col-md-10">
          <ul id="progressbar" className="text-center">
            <Tooltip
              placement="top"
              arrow
              title={`${
                status > 1
                  ? "Your application has been reviewed"
                  : "Your application is under review"
              }`}
            >
              <li
                id="one"
                className={`step ${status > 0 ? "active" : ""}`}
              ></li>
            </Tooltip>
            <Tooltip
              placement="top"
              arrow
              title={`${
                error === 1
                  ? "Your application has been rejected"
                  : status < 2
                  ? "Your application has not yet been approved"
                  : "Your application has been approved"
              }`}
            >
              <li
                id="two"
                className={`step ${error === 1 ? "error" : ""} ${
                  status > 1 ? "active" : ""
                }`}
              ></li>
            </Tooltip>
            <Tooltip
              placement="top"
              arrow
              title={`${
                error === 2
                  ? "You haven't paid your down payment."
                  : status < 3
                  ? "Pay required down payment"
                  : "You have paid the required down payment"
              }`}
            >
              <li
                id="three"
                className={`step ${error === 2 ? "error" : ""}${
                  status > 2 ? "active" : ""
                }`}
              ></li>
            </Tooltip>
            <Tooltip
              placement="top"
              arrow
              title={`${
                error === 3
                  ? "Your application was not able to be processed"
                  : status < 4
                  ? "Your order is being processed"
                  : "Your order has been processed"
              }`}
            >
              <li
                id="four"
                className={`step ${error === 3 ? "error" : ""}${
                  status > 3 ? "active" : ""
                }`}
              ></li>
            </Tooltip>
            <Tooltip
              placement="top"
              arrow
              title={`${
                error === 4
                  ? "Your application could not be shipped"
                  : status < 5
                  ? "Your order has not yet been shipped"
                  : "Your order has been shipped"
              }`}
            >
              <li
                id="five"
                className={`step ${error === 4 ? "error" : ""}${
                  status > 4 ? "active" : ""
                }`}
              ></li>
            </Tooltip>
            <Tooltip
              placement="top"
              arrow
              title={`${
                error === 5
                  ? "You haven't confirmed your order."
                  : status < 6
                  ? "Confirm your order."
                  : "Your order has been confirmed."
              }`}
            >
              <li
                id="six"
                className={`step ${error === 5 ? "error" : ""}${
                  status > 5 ? "active" : ""
                }`}
              ></li>
            </Tooltip>
          </ul>
        </div>
      </div>
      <div className="row d-flex justify-content-between top">
        <div className="col-md-9">
          <div className="d-flex flex-column">
            <h5 className="fs-4 fw-bold">{name}</h5>
            <p className="fs-6">
              Paid :
              <span className="text-primary fs-5 fw-bold">
                {" "}
                {conveneNumber(parseFloat(paid ? paid : 0))}
              </span>
            </p>
            <p className="fs-6">
              Balance :
              <span className="text-primary fs-5 fw-bold">
                {" "}
                {conveneNumber(parseFloat(balance ? balance : 0))}
              </span>
            </p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="d-flex gap-3 align-items-center">
            {Date.now() - new Date(createdAt).getTime() <=
              1000 * 60 * 60 * 24 && (
              <button
                onClick={() =>
                  window.location.replace(
                    `/dashboard/update-application?applicationId=${id}`
                  )
                }
                className="btn btn-md"
              >
                <i className="bi bi-pen"></i>
              </button>
            )}
            <button onClick={handleDeleteApplication} className="btn btn-md">
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
        <div className="d-flex flex-column mt-3 text-sm-right">
          <Plan active={currentMonth > 1} disabled={false} amount={down} />
          {[...Array(months + 1).keys()].map(
            (mon, i) =>
              mon !== 0 && (
                <Plan
                  key={i}
                  active={currentMonth > mon + 1}
                  disabled={currentMonth < mon + 1}
                  cardinal={
                    mon === 1
                      ? `${mon}st`
                      : mon === 2
                      ? `${mon}nd`
                      : mon === 3
                      ? `${mon}rd`
                      : `${mon}th`
                  }
                  amount={payment}
                  status={current}
                />
              )
          )}
        </div>
      </div>
      {isNotConnected && status === 2 && (
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary btn-get-started"
            onClick={() => mono.open()}
          >
            Connect With Mono
          </button>
        </div>
      )}
    </div>
  );
};

export default Order;
