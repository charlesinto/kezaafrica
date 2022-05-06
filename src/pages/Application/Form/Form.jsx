import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BROWSER_ID } from "../../../data/constants";
import {
  Personal,
  Social,
  Suspense,
  Success,
  Phone,
  Identity,
  Employment,
} from "../components";
import {
  getApplication,
  initiateApplication,
  createApplication,
  updateApplication,
} from "../../../data/actions/application";
import { useGlobalContext } from "../../../context/global";
import BankStatement from "../components/BankStatement";
import { useModal } from "../../../hooks";
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
const ApplicationForm = ({ report, setInfo, setLoading, setLoadingValue }) => {
  const { conveneNumber } = useGlobalContext();
  const dispatch = useDispatch();
  const modal = useModal();
  const navbar = useRef();
  const application = useSelector(({ application }) => application);
  const [disabled, setDisabled] = useState(false);
  const [form, setForm] = useState({
    ...init,
    report,
  });
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [isExecuted, setIsExecuted] = useState(false);
  const [progress, setProgress] = useState({
    phone: 0,
    personal: 0,
    social: 0,
    identity: 0,
    employment: 0,
    financial: 0,
    total: 0,
    bankStatement: 0,
  });
  const isMobile = window.innerWidth <= 991;
  const nextStep = () => {
    setStep((step) => {
      if (step === 1 && !isExecuted) {
        dispatch(initiateApplication(form));
        setIsExecuted(true);
      }
      return step + 1;
    });
    if (isExecuted) {
      if (application && application.id) {
        dispatch(
          updateApplication({
            ...form,
            id: application.id,
          })
        );
      }
    }
  };
  const handleSubmit = () => {
    if (progress.bankStatement !== 100) {
      setStep(6);
      return modal.setToast({
        title: "Please connect with Mono and upload statement",
        icon: "info",
      });
    }
    setLoading(true);
    if (application && application.id) {
      dispatch(
        updateApplication(
          {
            ...form,
            id: application.id,
          },
          setLoading
        )
      );
      dispatch(
        createApplication(
          { ...form, id: application !== null ? application.id : "" },
          setLoading,
          setSuccess,
          setInfo
        )
      );
    }
  };
  const previousStep = () => {
    setStep((step) => step - 1);
    if (application && application.id) {
      dispatch(
        updateApplication({
          ...form,
          id: application.id,
        })
      );
    }
  };

  const returnStep = () => {
    switch (step) {
      case 1:
        return (
          <Personal
            setDisabled={setDisabled}
            setProgress={setProgress}
            form={form}
            setForm={setForm}
          />
        );
      case 2:
        return (
          <Phone
            setDisabled={setDisabled}
            setProgress={setProgress}
            form={form}
            setInfo={setInfo}
            setForm={setForm}
          />
        );
      case 3:
        return (
          <Social
            setDisabled={setDisabled}
            setProgress={setProgress}
            form={form}
            setForm={setForm}
          />
        );
      case 4:
        return (
          <Identity
            setDisabled={setDisabled}
            isMobile={isMobile}
            setProgress={setProgress}
            form={form}
            setForm={setForm}
            setInfo={setInfo}
            application={application}
            setLoading={setLoading}
            setLoadingValue={setLoadingValue}
          />
        );
      case 5:
        return (
          <Employment
            setDisabled={setDisabled}
            setProgress={setProgress}
            form={form}
            setForm={setForm}
          />
        );
      case 6:
        return (
          <BankStatement
            setDisabled={setDisabled}
            setProgress={setProgress}
            form={form}
            setForm={setForm}
            isDisabled={disableMonoButton}
          />
        );
      default:
        return <Suspense />;
    }
  };

  const [disableMonoButton, setDisabledMonoButton] = useState(false);
  useEffect(() => {
    const localAgents = localStorage.getItem(BROWSER_ID);
    const agents = localAgents ? JSON.parse(localAgents) : [];

    if (agents.length > 0) {
      dispatch(getApplication(agents[0].agent));
    }
  }, [dispatch]);

  useEffect(() => {
    if (progress.bankStatement === 100) {
      setDisabledMonoButton(true);
    }
  }, [progress.bankStatement, modal]);

  useEffect(() => {
    if (application) {
      setIsExecuted(true);
      setForm((form) => {
        return {
          ...form,
          ...application,
          personal: {
            ...form.personal,
            ...application.personal,
          },
        };
      });
    }
  }, [application]);
  useEffect(() => {
    if (progress.total) {
      navbar.current.scrollLeft = progress.total;
    }
  }, [progress.total]);
  return success ? (
    <Success form={form} setLoading={setLoading} />
  ) : (
    <form onSubmit={(e) => e.preventDefault()}>
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
        ref={navbar}
        style={{
          overflow: isMobile ? "scroll" : "",
        }}
        aria-label="..."
      >
        <ul className="pagination pagination-lg shadow-lg">
          <li
            style={{
              background: `linear-gradient(90deg, var(--keza-progress) ${progress.personal}%, var(--keza-white) ${progress.personal}%`,
            }}
            onClick={() => {
              if (application && application.id) {
                dispatch(
                  updateApplication({
                    ...form,
                    id: application.id,
                  })
                );
              }
              setStep(1);
            }}
            className={`page-item ${step === 1 ? "active" : ""}`}
            aria-current="page"
          >
            <span className="report-item page-link">
              <i className="bi bi-person"></i>
              {!isMobile && "Personal"}
            </span>
          </li>
          <li
            style={{
              background: `linear-gradient(90deg, var(--keza-progress) ${progress.phone}%, var(--keza-white) ${progress.phone}%`,
            }}
            onClick={() => {
              if (application && application.id) {
                dispatch(
                  updateApplication({
                    ...form,
                    id: application.id,
                  })
                );
              }
              setStep(2);
            }}
            className={`page-item ${step === 2 ? "active" : ""}`}
          >
            <span className="report-item page-link">
              <i className="bi bi-phone"></i>
              {!isMobile && "Phone"}
            </span>
          </li>
          <li
            style={{
              background: `linear-gradient(90deg, var(--keza-progress) ${progress.social}%, var(--keza-white) ${progress.social}%`,
            }}
            onClick={() => {
              if (application && application.id) {
                dispatch(
                  updateApplication({
                    ...form,
                    id: application.id,
                  })
                );
              }
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
              if (application && application.id) {
                dispatch(
                  updateApplication({
                    ...form,
                    id: application.id,
                  })
                );
              }
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
              if (application && application.id) {
                dispatch(
                  updateApplication({
                    ...form,
                    id: application.id,
                  })
                );
              }
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
              background: `linear-gradient(90deg, var(--keza-progress) ${progress.bankStatement}%, var(--keza-white) ${progress.bankStatement}%`,
            }}
            onClick={() => {
              if (application && application.id) {
                dispatch(
                  updateApplication({
                    ...form,
                    id: application.id,
                  })
                );
              }
              setStep(6);
            }}
            className={`page-item ${step === 6 ? "active" : ""}`}
          >
            <span className="report-item page-link">
              <i className="bi bi-briefcase"></i>
              {!isMobile && "Statement"}
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
              disabled={disabled}
              className="btn btn-primary btn-get-started fw-bold"
              onClick={() => {
                if (isMobile) {
                  window.scrollTo({ top: 1 });
                }
                if (step > 5) {
                  handleSubmit();
                } else {
                  nextStep();
                }
              }}
            >
              {step > 5 ? "Submit" : "Next"}
            </button>
          </div>
          {step > 1 && (
            <div className="col-lg-6 mb-3">
              <button
                style={{
                  background: "white",
                  color: "var(--keza-brown)",
                }}
                className="btn btn-get-started fw-bold"
                onClick={() => {
                  if (isMobile) {
                    window.scrollTo({ top: 1 });
                  }
                  previousStep();
                }}
              >
                Previous
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default ApplicationForm;

// if (localAgents) {
//   const agents = JSON.parse(localAgents);
//   if (agents.length > 1) {
//     const inputOptions = {};
//     agents.forEach((agent, index) => {
//       inputOptions[index] = new Date(agent.time)
//         .toDateString()
//         .substring(4);
//     });
//     modal.setPrompt({
//       title: "Hold Up",
//       icon: "info",
//       text: "We've noticed you have started more than one applications with us.",
//       textTwo:
//         "To continue, Please select the application you chose to continue with.",
//       input: "select",
//       inputOptions,
//       inputPlaceholder: `Application on ${new Date(Date.now())
//         .toDateString()
//         .substring(4)}`,
//       confirmButtonText: "Continue",
//       denyButtonText: "Start Over",
//       confirmAction: (res) => {
//         const newAgent = agents.find(
//           (agent) =>
//             new Date(agent.time).toDateString().substring(4) ===
//             res.value.replace("Application on ", "")
//         );
//         if (newAgent) {
//           dispatch(getApplication(newAgent.agent));
//         }
//       },
//       denyAction: () => {
//         setForm({ ...init, report });
//       },
//     });
//   } else {
//     dispatch(getApplication(agents[0].agent));
//   }
// }
