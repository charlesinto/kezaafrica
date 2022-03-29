import React, { useState, useEffect, useMemo } from "react";
import MonoConnect from "@mono.co/connect.js";
import { useModal } from "../../../hooks";
import { useDispatch } from "react-redux";
import { connectMono } from "../../../data/actions/user";
import { useGlobalContext } from "../../../context/global";
const Success = ({ form, setLoading }) => {
  const { setModal } = useModal();
  const [info, setInfo] = useState();
  const { conveneNumber, key } = useGlobalContext();
  const dispatch = useDispatch();
  const mono = useMemo(() => {
    const instance = new MonoConnect({
      key,
      onSuccess: ({ code }) => {
        setLoading(true);
        const monoForm = {
          code,
          email: form.personal.email,
        };
        dispatch(connectMono(monoForm, setInfo, setLoading));
      },
      onError: (res) => {
        console.log(res ? res : "error");
      },
    });
    instance.setup();
    return instance;
  }, [dispatch, setLoading, form, key]);
  useEffect(() => {
    if (info) {
      setModal({
        title: `${info.status.charAt().toUpperCase()}${info.status.substring(
          1,
          info.status.length
        )}`,
        icon: info.status,
        text: info.message,
        showCloseButton: true,
        boldenText: true,
        confirmButtonText: info.status === "success" ? "Proceed" : "Try Again",
        confirmAction: () => {
          if (info.status === "success") {
            window.location.replace("/dashboard");
          } else {
            setInfo(null);
            mono.open();
          }
        },
      });
    }
  }, [info, setModal, mono]);
  return (
    <div data-aos="fade-in" className="d-flex justify-content-center">
      <div className="d-flex flex-column align-items-center">
        <div className="form-group mb-3">
          <div className="report-item success">
            <i
              style={{ background: "var(--keza-brown)", color: "white" }}
              className="rx ri-checkbox-circle-fill"
            ></i>
          </div>
        </div>
        <div className="form-group mb-3">
          <h4 className="fw-bold text-center">{`Congratulations, ${form.personal.firstName} 🎉`}</h4>
        </div>
        <div className="form-group mb-3">
          <p className="text-center fs-5">
            Your Monthly repayment plan is{" "}
            <strong>
              {conveneNumber(
                parseFloat(
                  form.report.meta.dividend ? form.report.meta.dividend : 0
                )
              )}
            </strong>{" "}
            🤩
          </p>
          <p className="text-center fs-5">
            Congratulations! You just took the first step towards upgrading your
            phone and Keza is glad to help. We would respond to your application
            shortly.
          </p>
        </div>
        <div className="form-group mb-3">
          <div className="d-flex justify-content-center">
            <button
              onClick={() => window.location.replace("/dashboard")}
              className="btn btn-primary btn-get-started"
            >
              Track Your Application
            </button>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center gap-3">
          <div className="footer-social-links d-flex align-items-center">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://api.whatsapp.com/send?phone=2349161112671"
              className="social-link success"
            >
              <i className="bi bi-whatsapp"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/KezaHQ"
              className="social-link success"
            >
              <i className="bi bi-twitter"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://instagram.com/kezaafrica"
              className="social-link success"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/company/keza-hq/"
              className="social-link success"
            >
              <i className="rx ri-linkedin-fill"></i>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="mailto:hello@kezaafrica.com"
              className="social-link success"
            >
              <i className="rx ri-mail-send-line"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
