import React, { useState } from "react";
import { Breadcrumb, Input, Alert, Progress } from "../../components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../data/actions/auth";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(forgotPassword(identifier, setInfo, setLoading));
  };
  return (
    <main>
      <Breadcrumb parent={{ name: "Forgot Password" }} />
      <section className="inner-page">
        <div className="container">
          <div className="row justify-content-center form-bg-image">
            <p className="text-center">
              <Link
                to="/login"
                className="text-primary d-flex align-items-center justify-content-center"
              >
                Back to log in
              </Link>
            </p>
            <div className="d-flex justify-content-center mb-3">
              {info && (
                <Alert
                  message={info.message}
                  status={info.status}
                  onClose={() => setInfo(null)}
                  isDark
                />
              )}
            </div>
            <div className="col-12 d-flex align-items-center justify-content-center">
              <div className="signin-inner my-3 my-lg-0 bg-white shadow border-0 rounded p-4 p-lg-5 w-100 fmxw-500">
                <h1 className="h3 text-center">Forgot your password?</h1>
                <p className="mb-4">
                  Don't fret! Just type in your email and we will send you a
                  code to reset your password!
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <Input
                      autoFocus
                      name="identifier"
                      label="Your Email Address"
                      placeholder="example@kezaafrica.com"
                      value={identifier}
                      handleChange={(e) => setIdentifier(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-get-started"
                    >
                      Recover password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {loading && <Progress />}
      </section>
    </main>
  );
};

export default ForgotPassword;
