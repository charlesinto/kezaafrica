import React from "react";

const NotFound = () => {
  return (
    <main className="mt-5">
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center d-flex align-items-center justify-content-center">
              <div>
                <img
                  className="img-fluid w-75"
                  src={`${process.env.PUBLIC_URL}/assets/images/404.svg`}
                  alt="404 not found"
                />
                <h1 className="mt-5">
                  Page not{" "}
                  <span
                    style={{ color: "var(--keza-brown)" }}
                    className="fw-bolder"
                  >
                    found
                  </span>
                </h1>
                <p className="lead my-4">
                  Oops! Looks like you followed a bad link. If you think this is
                  a problem with us, please tell us.
                </p>
                <a href="/" className="btn btn-primary  mb-4">
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
