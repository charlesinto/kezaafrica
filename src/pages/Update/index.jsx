import React, { useState, useEffect } from "react";
import UpdateForm from "./Form";
import { Breadcrumb, Progress, PrivateRoute } from "../../components";
import { useModal } from "../../hooks";
import { useHistory } from "react-router-dom";
const report = {
  product: {
    name: "",
    color: "",
    rom: "",
    condition: "",
  },
  meta: {
    payment: "",
    months: 0,
    amount: 0,
    dividend: 0,
  },
  user: {
    agent: window.navigator.userAgent,
  },
};
const Update = () => {
  const history = useHistory();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setModal } = useModal();
  useEffect(() => {
    if (info) {
      setModal({
        title: `${info.status.charAt().toUpperCase()}${info.status.substring(
          1,
          info.status.length
        )}`,
        icon: info.status,
        text: info.message,
        boldenText: true,
        showCloseButton: true,
        confirmButtonText: info.status === "success" ? "Finish" : "Try Again",
        confirmAction: () => {
          if (info.status === "success") {
            history.push("/dashboard");
          }
        },
      });
    }
  }, [info, history, setModal]);
  return (
    <PrivateRoute>
      <main>
        <Breadcrumb
          parent={{ name: "Dashboard", link: "/dashboard" }}
          child={{ name: "Update Application" }}
        />
        <section id="application">
          <div className="container">
            <UpdateForm
              report={report}
              setLoading={setLoading}
              setInfo={setInfo}
            />
          </div>
        </section>
        {loading && <Progress />}
      </main>
    </PrivateRoute>
  );
};

export default Update;
