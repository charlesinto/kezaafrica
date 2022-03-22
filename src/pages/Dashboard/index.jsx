import React, { useState, useEffect, createContext, useContext } from "react";
import { CircularProgress } from "@material-ui/core";
import { Order, PrivateRoute, Breadcrumb, Progress } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getUserApplications, updateUser } from "../../data/actions/user";
import { useModal } from "../../hooks";
export const useDashboardcontext = () => useContext(Dashboardcontext);
const Dashboardcontext = createContext();
const Dashboard = () => {
  const dispatch = useDispatch();
  const modal = useModal();
  const user = useSelector(({ user }) => user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user !== null && !user.isSetPassword) {
      modal.setModal({
        title: "Awesome!",
        icon: "info",
        text: "Your application is looking good and an account was set up for you,",
        textTwo: "Now secure your account with a new password.",
        confirmButtonText: "Save my password",
        input: "password",
        inputLabel: "Password",
        inputPlaceholder: "* * * * * *",
        allowOutsideClick: false,
        showCloseButton: false,
        confirmAction: (res) => {
          setLoading(true);
          dispatch(
            updateUser({ ...user, password: res.value }, setInfo, setLoading)
          );
        },
      });
    }
    // eslint-disable-next-line
  }, [user]);
  useEffect(() => {
    if (user) {
      dispatch(getUserApplications(user?.id, setIsLoaded));
    }
  }, [user, modal, dispatch]);
  useEffect(() => {
    if (info) {
      modal.setModal({
        title: `${info.status.charAt().toUpperCase()}${info.status.substring(
          1,
          info.status.length
        )}`,
        icon: info.status,
        text: info.message,
        boldenText: true,
        confirmButtonText: "Okay",
      });
    }
  }, [info, modal]);
  return (
    <Dashboardcontext.Provider
      value={{ useDashboardcontext, setInfo, setLoading, setIsLoaded }}
    >
      <PrivateRoute>
        {!user || !isLoaded ? (
          <section className="inner-page">
            <div className="container">
              <div
                style={{
                  height: "60vh",
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <CircularProgress />
              </div>
            </div>
          </section>
        ) : (
          <>
            <Breadcrumb parent={{ name: "Dashboard" }} />
            <section id="dashboard" className="inner-page">
              <div className="container">
                {user.applications && user.applications.length > 0 ? (
                  <>
                    <h1 className="fs-2 text-center fw-bold mt-3">
                      My Applications
                    </h1>
                    <div className="row align-items-baseline">
                      {user.applications.map((application) => (
                        <div key={application.id} className="col-lg-6">
                          <Order
                            id={application.id}
                            createdAt={application.createdAt}
                            name={application.report.product.name}
                            payment={application.report.meta.dividend}
                            down={application.report.meta.payment}
                            isNotConnected={!user.mono.isConnected}
                            current={application.user.status}
                            months={application.report.meta.months}
                            currentMonth={application?.financial?.currentMonth}
                            paid={application?.financial?.paid}
                            balance={application?.financial?.balance}
                            errorStatus={application.user?.error}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-flex justify-content-center">
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/3024051-removebg.png`}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="d-flex justify-content center align-items-center flex-column">
                      <h3 className="fw-bold">You have no Applications</h3>
                      <p className="text-center">
                        To create an application, click the button below.
                      </p>
                      <button
                        className="btn btn-primary btn-get-started"
                        onClick={() => window.location.replace("/apply")}
                      >
                        Start an Application
                      </button>
                    </div>
                  </>
                )}
              </div>
              {loading && <Progress />}
            </section>
          </>
        )}
      </PrivateRoute>
    </Dashboardcontext.Provider>
  );
};

export default Dashboard;
