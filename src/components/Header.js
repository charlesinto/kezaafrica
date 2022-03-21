import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/global";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../data/actions/auth";
const Header = () => {
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarlinks = window.document.querySelectorAll("#navbar .scrollto");
  const { reportAction } = useGlobalContext();
  // eslint-disable-next-line
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash && !navbarlink.href) {
        return;
      }
      const search =
        navbarlink.href.includes("apply") || navbarlink.href.includes("login")
          ? `#${navbarlink.href.substr(-5)}`
          : navbarlink.href.includes("dashboard")
          ? `#${navbarlink.href.substr(-9)}`
          : navbarlink.hash;
      const section = document.querySelector(search);
      if (!section) {
        return null;
      }
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  const reportLink = (type) => {
    reportAction("Link", type);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      navbarlinksActive();
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, [navbarlinksActive]);
  return (
    <header
      data-aos="fade-down"
      id="header"
      className={`${isScrolled ? "header-scrolled" : ""} header fixed-top`}
    >
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a
          href="/"
          onClick={() => reportAction("Logo", "Clicked the Keza Logo")}
          className="logo d-flex align-items-center"
        >
          <img
            alt="Keza Africa"
            className="img-fluid"
            src={`${process.env.PUBLIC_URL}/assets/images/Keza-brown-logo@2x.png`}
          />
        </a>

        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <a
                onClick={() => reportLink("Clicked the How it works Link")}
                className="nav-link scrollto"
                href="/#how-it-works"
              >
                How it Works
              </a>
            </li>
            <li>
              <a
                onClick={() => reportLink("Clicked the Calculator Link")}
                className="nav-link scrollto"
                href="/#calculator"
              >
                Calculator
              </a>
            </li>
            <li>
              <a
                onClick={() => reportLink("Clicked the FAQs Link")}
                className="nav-link scrollto"
                href="/#faq"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                onClick={() => reportLink("Clicked the Apply Now Link")}
                className="nav-link scrollto"
                href="/apply"
              >
                Apply Now
              </a>
            </li>
            {user !== null ? (
              <li>
                <a
                  onClick={() => reportLink("Clicked the Dashboard Link")}
                  className="nav-link scrollto"
                  href="/dashboard"
                >
                  Dashboard
                </a>
              </li>
            ) : (
              <li>
                <a
                  onClick={() => reportLink("Clicked the Sign In Link")}
                  className="nav-link scrollto"
                  href="/login"
                >
                  Sign In
                </a>
              </li>
            )}
            <li>
              <a
                onClick={() =>
                  reportAction("Button", "Clicked the Call Us Button")
                }
                className="getstarted d-flex align-items-center gap-3"
                href="tel:+2349161112671"
              >
                <i className="bi bi-telephone-fill"></i>
                Call Us
              </a>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
        {user && (
          <nav className="header-nav">
            <ul className="d-flex align-items-center list-unstyled m-0">
              <li className="nav-item dropdown">
                <span
                  className="nav-link nav-profile d-flex align-items-center pe-0"
                  data-bs-toggle="dropdown"
                  style={{ cursor: "pointer" }}
                >
                  <Avatar
                    style={{ background: "var(--keza-brown)" }}
                    alt={`${user.name.firstName} ${user.name.lastName}`}
                  >
                    {user.name.firstName.substr(0, 1).toUpperCase()}
                  </Avatar>
                  <span
                    style={{ color: "var(--keza-secondary)" }}
                    className="d-none d-md-block dropdown-toggle ps-2"
                  ></span>
                </span>
                <div className="dropdown-menu">
                  <div className="d-flex justify-content-center">
                    <ul className="dropdown-menu-end dropdown-menu-arrow profile list-unstyled w-100">
                      <li className="dropdown-header">
                        <h6 className="user-name">{`${user.name.firstName} ${user.name.lastName}`}</h6>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="gap-2 dropdown-item d-flex align-items-center"
                          href="/dashboard"
                        >
                          <i className="bi bi-grid"></i>
                          <span>My Dashboard</span>
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          onClick={() => dispatch(logoutUser())}
                          className="dropdown-item d-flex align-items-center"
                        >
                          <i className="bi bi-box-arrow-right"></i>
                          <span>Sign Out</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
