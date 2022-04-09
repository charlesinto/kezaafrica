import React, { useState, useEffect } from "react";
import { Alert, Breadcrumb, Input, OtpInput, Progress } from "../../components";
import { useDispatch } from "react-redux";
import { PASSWORD_IDENTIFIER } from "../../data/constants";
import {
  verifyOtp,
  forgotPassword,
  resetPassword,
} from "../../data/actions/auth";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [samePassword, setSamePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [info, setInfo] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setInfo({
        message: "Your passwords do not match.",
        status: "error",
      });
    }
    setLoading(true);
    const newForm = {
      identifier: sessionStorage.getItem(PASSWORD_IDENTIFIER),
      password: form.password,
    };
    dispatch(resetPassword(newForm, setInfo, setLoading));
  };
  const handleVerifyOtp = (pin) => {
    setLoading(true);
    dispatch(verifyOtp(pin, setInfo, setLoading, setIsVerified));
  };
  const handleResendCode = () => {
    if (timer === 0) {
      setTimer(60);
      const identifier = sessionStorage.getItem(PASSWORD_IDENTIFIER);
      dispatch(forgotPassword(identifier, setInfo, setLoading));
    }
  };
  const handleChange = ({ target: { name, value } }) => {
    setForm((form) => {
      return {
        ...form,
        [name]: value,
      };
    });
  };
  const validatePasswords = (value) => {
    if (value !== form.password) {
      setSamePassword(false);
    } else {
      setSamePassword(true);
    }
  };
  useEffect(() => {
    const countdown =
      timer > 0 && setInterval(() => setTimer((timer) => timer - 1), 1000);
    return () => {
      clearInterval(countdown);
    };
    // eslint-disable-next-line
  }, [timer]);
  return (
    <main>
      <Breadcrumb parent={{ name: "Reset Password" }} />
      <section className="inner-page">
        <div className="container">
          <div className="row justify-content-center form-bg-image">
            <div className="col-12 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center mb-2">
                {info && (
                  <Alert
                    message={info.message}
                    status={info.status}
                    onClose={() => setInfo(null)}
                    isDark
                  />
                )}
              </div>
              <div className="bg-white shadow border-0 rounded p-4 p-lg-5 w-100 fmxw-500">
                {!isVerified ? (
                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <h1 className="h3 mb-4 text-center">What's your Code?</h1>
                    <p className="fs-6 text-center">
                      Please enter the OTP Code that was sent to you via email
                    </p>
                    <div
                      className={`d-flex justify-content-center ${
                        window.innerWidth > 991 ? "w-50" : "w-100"
                      }`}
                    >
                      <OtpInput digits={5} onChange={handleVerifyOtp} />
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <p className="text-grey">Didn't receive a code?</p>
                      <span
                        onClick={handleResendCode}
                        className={`${
                          timer > 0 ? "text-black-50" : "text-primary"
                        }`}
                      >
                        Resend Code{" "}
                        {timer > 0 &&
                          `in ${
                            Math.floor(timer / 60) < 10
                              ? `0${Math.floor(timer / 60)}`
                              : Math.floor(timer / 60)
                          }:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60}`}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="h3 mb-4 text-center">Reset password</h1>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="email">Your Email</label>
                        <div className="input-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder={sessionStorage.getItem(
                              PASSWORD_IDENTIFIER
                            )}
                            id="email"
                            required
                            disabled
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <Input
                          name="password"
                          label="Your Password"
                          value={form.password}
                          handleChange={handleChange}
                          className={samePassword ? "" : "err"}
                          error={!samePassword}
                          autoFocus
                          type={showPassword ? "text" : "password"}
                          handleShowPassword={() =>
                            setShowPassword((prev) => !prev)
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <Input
                          name="confirmPassword"
                          label="Confirm Password"
                          className={samePassword ? "" : "err"}
                          error={!samePassword}
                          value={form.confirmPassword}
                          handleChange={(e) => {
                            validatePasswords(e.target.value);
                            handleChange(e);
                          }}
                          type={showPassword ? "text" : "password"}
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-get-started"
                        >
                          Reset password
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
          {loading && <Progress />}
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
