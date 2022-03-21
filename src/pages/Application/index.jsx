import React, { useState, useEffect, useLayoutEffect } from "react";
import { Breadcrumb, Information } from "../../components";
import { CircularProgress } from "@material-ui/core";
import Form from "./Form";
import axios from "axios";
import { useGlobalContext } from "../../context/global";
const useQuery = () => new URLSearchParams(window.location.search);
const init = {
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
const Application = () => {
  const [report, setReport] = useState(null);
  const [info, setInfo] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const query = useQuery();
  const { APP_URI } = useGlobalContext();
  const reportId = query.get("reportId");
  useLayoutEffect(() => {
    window.addEventListener("load", () => setLoaded(true));
  }, []);
  useEffect(() => {
    if (reportId) {
      axios
        .get(`${APP_URI}/reports/get-report/${reportId}`)
        .then(({ data }) => {
          if (data.ok) {
            setReport(data.data);
          }
        })
        .catch(({ response, message }) => {
          const heading =
            response.status === 404
              ? "This Report does not exist"
              : response.status === 500 || response.status === 403
              ? "Something went wrong"
              : "";
          setInfo({
            heading,
            content: response ? response.data.message : message,
          });
        });
      axios.defaults.withCredentials = true;
    }
  }, [reportId, APP_URI]);
  return (
    <main>
      <Breadcrumb parent={{ name: "Apply" }} />
      <section id="application">
        <div className="container">
          {!loaded ? (
            <div className="progressing">
              <CircularProgress />
            </div>
          ) : (
            <>
              {!reportId ? (
                <Form report={init} setReport={setReport} />
              ) : !report ? (
                info !== null && (
                  <Information heading={info.heading} content={info.content} />
                )
              ) : (
                <Form report={report} setReport={setReport} />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Application;
