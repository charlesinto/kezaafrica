import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Personal,
  Social,
  Suspense,
  Phone,
  Identity,
  Employment,
  Financial,
} from "../Application/components";
import { updateApplication } from "../../data/actions/application";
import { useLocation } from "react-router-dom";
import { getUserApplications } from "../../data/actions/user";
import { CircularProgress } from "@material-ui/core";
import { useGlobalContext } from "../../context/global";
const useQuery = () => new URLSearchParams(useLocation().search);
const init = {
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    address: "",
  },
  identity: {
    bvn: "",
    type: "",
    id: "",
    number: "",
    nin: "",
  },
  bank: {
    accountName: "",
    accountNumber: "",
    accountBank: "",
    statement: "",
  },
  employment: {
    status: "",
    company: "",
    address: "",
    salary: "",
  },
  social: {
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  },
};
const UpdateForm = ({ report, setInfo, setLoading }) => {
  const dispatch = useDispatch();
  const query = useQuery();
  const applicationId = query.get("applicationId");
  const user = useSelector(({ user }) => user);
  const { conveneNumber } = useGlobalContext();
  const application =
    user !== null &&
    user.applications &&
    user.applications.find((app) =>
      applicationId ? app.id === applicationId : null
    );
  const [isLoaded, setIsLoaded] = useState(false);
  const [form, setForm] = useState({
    ...init,
    report,
  });
  const [step, setStep] = useState(1);
  const [width, setWidth] = useState(0);
  const [progress, setProgress] = useState({
    phone: 0,
    personal: 0,
    social: 0,
    identity: 0,
    employment: 0,
    financial: 0,
    total: 0,
  });
  const isMobile = width <= 991;
  const nextStep = () => {
    setStep((step) => step + 1);
    dispatch(
      updateApplication({
        ...form,
        id: application !== null ? application.id : "",
      })
    );
  };
  const handleSubmit = () => {
    setLoading(true);
    const proceedAction = (isSuccess, message) => {
      if (isSuccess) {
        setLoading(false);
        setInfo({
          message,
          status: "success",
        });
      } else {
        setLoading(false);
        setInfo({
          message,
          status: "error",
        });
      }
    };
    dispatch(
      updateApplication(
        {
          ...form,
          id: application !== null ? application.id : "",
        },
        setLoading,
        proceedAction
      )
    );
  };
  const previousStep = () => {
    setStep((step) => step - 1);
    dispatch(
      updateApplication({
        ...form,
        id: application !== null ? application.id : "",
      })
    );
  };
  const returnStep = () => {
    switch (step) {
      case 1:
        return (
          <Phone
            setProgress={setProgress}
            form={form}
            setInfo={setInfo}
            setForm={setForm}
          />
        );
      case 2:
        return (
          <Personal setProgress={setProgress} form={form} setForm={setForm} />
        );
      case 3:
        return (
          <Social setProgress={setProgress} form={form} setForm={setForm} />
        );
      case 4:
        return (
          <Identity
            isMobile={isMobile}
            setProgress={setProgress}
            form={form}
            setForm={setForm}
            application={application}
          />
        );
      case 5:
        return (
          <Employment setProgress={setProgress} form={form} setForm={setForm} />
        );
      case 6:
        return (
          <Financial
            isMobile={isMobile}
            setInfo={setInfo}
            setProgress={setProgress}
            setForm={setForm}
            form={form}
          />
        );
      default:
        return <Suspense />;
    }
  };
  useLayoutEffect(() => {
    window.addEventListener("resize", setWidth(window.innerWidth));
    return () => {
      window.addEventListener("resize", setWidth(window.innerWidth));
    };
  }, []);
  useEffect(() => {
    if (applicationId && user) {
      dispatch(getUserApplications(user?.id, setIsLoaded));
    }
  }, [dispatch, user, applicationId]);
  useEffect(() => {
    if (user && user.applications) {
      setForm((form) => {
        return {
          ...form,
          ...application,
          report: {
            ...form.report,
            ...application.report,
          },
          personal: {
            ...form.personal,
            ...application.personal,
          },
        };
      });
    }
  }, [user, application]);
  return !isLoaded ? (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <CircularProgress />
    </div>
  ) : (
    <form className="application-form" onSubmit={(e) => e.preventDefault()}>
      {application && (
        <p data-aos="fade-up" className="text-center fs-5">
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
      )}
      <nav
        style={{
          width: isMobile ? "200%" : "100%",
          transition: "all 0.3s ease",
          transform: isMobile ? `translateX(-${progress.total / 2}%)` : "",
        }}
        aria-label="..."
      >
        <ul className="pagination pagination-lg shadow-lg">
          <li
            style={{
              background: `linear-gradient(90deg, var(--keza-progress) ${progress.phone}%, var(--keza-white) ${progress.phone}%`,
            }}
            onClick={() => {
              dispatch(
                updateApplication({
                  ...form,
                  id: application !== null ? application.id : "",
                })
              );
              setStep(1);
            }}
            className={`page-item ${step === 1 ? "active" : ""}`}
            aria-current="page"
          >
            <span className="report-item page-link">
              <i className="bi bi-phone"></i>
              {!isMobile && "Phone"}
            </span>
          </li>
          <li
            style={{
              background: `linear-gradient(90deg, var(--keza-progress) ${progress.personal}%, var(--keza-white) ${progress.personal}%`,
            }}
            onClick={() => {
              dispatch(
                updateApplication({
                  ...form,
                  id: application !== null ? application.id : "",
                })
              );
              setStep(2);
            }}
            className={`page-item ${step === 2 ? "active" : ""}`}
          >
            <span className="report-item page-link">
              <i className="bi bi-person-circle"></i>
              {!isMobile && "Personal"}
            </span>
          </li>
          <li
            style={{
              background: `linear-gradient(90deg, var(--keza-progress) ${progress.social}%, var(--keza-white) ${progress.social}%`,
            }}
            onClick={() => {
              dispatch(
                updateApplication({
                  ...form,
                  id: application !== null ? application.id : "",
                })
              );
              setStep(3);
            }}
            className={`page-item ${step === 3 ? "active" : ""}`}
          >
            <span className="report-item page-link">
              <i className="bi bi-share-fill"></i>
              {!isMobile && "Social"}
            </span>
          </li>
          <li
            style={{
              background: `linear-gradient(90deg, var(--keza-progress) ${progress.identity}%, var(--keza-white) ${progress.identity}%`,
            }}
            onClick={() => {
              dispatch(
                updateApplication({
                  ...form,
                  id: application !== null ? application.id : "",
                })
              );
              setStep(4);
            }}
            className={`page-item ${step === 4 ? "active" : ""}`}
          >
            <span className="report-item page-link">
              <i className="bi bi-card-text"></i>
              {!isMobile && "Identity"}
            </span>
          </li>
          <li
            style={{
              background: `linear-gradient(90deg, var(--keza-progress) ${progress.employment}%, var(--keza-white) ${progress.employment}%`,
            }}
            onClick={() => {
              dispatch(
                updateApplication({
                  ...form,
                  id: application !== null ? application.id : "",
                })
              );
              setStep(5);
            }}
            className={`page-item ${step === 5 ? "active" : ""}`}
          >
            <span className="report-item page-link">
              <i className="bi bi-briefcase"></i>
              {!isMobile && "Employment"}
            </span>
          </li>
          <li
            style={{
              background: `linear-gradient(90deg, var(--keza-progress) ${progress.financial}%, var(--keza-white) ${progress.financial}%`,
            }}
            onClick={() => {
              dispatch(
                updateApplication({
                  ...form,
                  id: application !== null ? application.id : "",
                })
              );
              setStep(6);
            }}
            className={`page-item ${step === 6 ? "active" : ""}`}
          >
            <span className="report-item page-link">
              <i className="bi bi-credit-card-2-front"></i>
              {!isMobile && "Financial"}
            </span>
          </li>
        </ul>
      </nav>
      <div className="w-100">{returnStep()}</div>
      <div className="d-flex justify-content-center text-center">
        <div
          className={`${
            step < 2
              ? "d-flex justify-content-center"
              : "row align-items-center"
          }`}
        >
          <div
            className={`${step < 2 ? "col-lg-12" : "col-lg-6"} order-lg-2 mb-3`}
          >
            <button
              className="btn btn-primary btn-get-started fw-bold"
              onClick={() => (step > 5 ? handleSubmit() : nextStep())}
            >
              {step > 5 ? "Submit" : "Next"}
            </button>
            {step > 1 && (
              <div className="col-lg-6 mb-3">
                <button
                  style={{
                    background: "white",
                    color: "var(--keza-brown)",
                  }}
                  className="btn btn-get-started fw-bold"
                  onClick={() => previousStep()}
                >
                  Previous
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateForm;
