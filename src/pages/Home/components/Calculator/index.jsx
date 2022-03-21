import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../../context/global";
import { Alert } from "../../../../components";
import { useModal } from "../../../../hooks";
import Form from "./Form";
import Result from "./Result";
const Calculator = ({ init }) => {
  const { setModal } = useModal();
  const [form, setForm] = useState(init);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(0);
  const [info, setInfo] = useState(null);
  const { APP_URI } = useGlobalContext();
  const handleProductChange = ({ target: { name, value } }) => {
    setForm((form) => {
      return {
        ...form,
        product: {
          ...form.product,
          [name]: value,
        },
      };
    });
  };
  const handleMetaChange = ({ target: { name, value } }) => {
    setForm((form) => {
      return {
        ...form,
        meta: {
          ...form.meta,
          [name]: value,
        },
      };
    });
  };
  const handleSendMail = () => {
    if (info) setInfo(null);
    if (!form.meta.dividend) {
      return setInfo({
        message: "Please use the Form",
        status: "error",
      });
    }
    setModal({
      title: "Great Choice 😉",
      imageUrl: "assets/images/5621940-removebg.png",
      boldenText: true,
      text: "Now complete the application form to give us more details about yourself.",
      showCloseButton: true,
      confirmButtonText: "Proceed!",
      confirmAction: () => {
        axios
          .post(`${APP_URI}/reports/create-report`, form, {
            headers: {
              "Access-Control-Allow-Credentials": "true",
            },
          })
          .then(({ data }) => {
            if (data.ok) {
              window.location.replace(`/apply?reportId=${data.data.id}`);
            }
          })
          .catch(({ response, message }) =>
            setInfo({
              message: response ? response.data.message : message,
              status: "error",
            })
          );
        axios.defaults.withCredentials = true;
      },
    });
  };
  const handleReset = () => {
    setInfo(null);
    setForm(init);
    setLoading(false);
    setSuccess(0);
  };
  const conveneNumber = Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "NGN",
  }).format;
  return (
    <section className="calculator" id="calculator">
      <div className="container text-center">
        <h1>Phone Loan Calculator</h1>
        <p className="fs-4">Let's find out your repayment plan 🚀</p>
        <div className="d-flex justify-content-center">
          {info && (
            <Alert
              data-aos="fade-up"
              message={info.message}
              status={info.status}
              onClose={() => setInfo(null)}
              isDark={true}
            />
          )}
        </div>
        <div className="row align-items-center py-5">
          <Form
            setForm={setForm}
            form={form}
            setLoading={setLoading}
            setSuccess={setSuccess}
            setInfo={setInfo}
            conveneNumber={conveneNumber}
            handleProductChange={handleProductChange}
            handleMetaChange={handleMetaChange}
            handleReset={handleReset}
          />
          <Result
            form={form}
            success={success}
            loading={loading}
            setForm={setForm}
            conveneNumber={conveneNumber}
            handleSendMail={handleSendMail}
          />
        </div>
      </div>
    </section>
  );
};

export default Calculator;
