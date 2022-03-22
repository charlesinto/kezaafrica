import React from "react";
import { useGlobalContext } from "../context/global";
const Footer = () => {
  const { reportAction } = useGlobalContext();
  return (
    <footer data-aos="fade-up" className="footer">
      <div className="d-flex flex-column align-items-center gap-2">
        <p className="fs-5 text-white">Contact Us</p>
        <div className="footer-social-links d-flex align-items-center">
          <a
            onClick={() =>
              reportAction("Social", "Clicked the WhatsApp Button")
            }
            target="_blank"
            rel="noreferrer"
            href="https://api.whatsapp.com/send?phone=2349161112671"
            className="social-link"
          >
            <i className="bi bi-whatsapp"></i>
          </a>
          <a
            onClick={() => reportAction("Social", "Clicked the Twitter Button")}
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/KezaHQ"
            className="social-link"
          >
            <i className="bi bi-twitter"></i>
          </a>
          <a
            onClick={() =>
              reportAction("Social", "Clicked the Instagram Button")
            }
            target="_blank"
            rel="noreferrer"
            href="https://instagram.com/kezaafrica"
            className="social-link"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            onClick={() =>
              reportAction("Social", "Clicked the LinkedIn Button")
            }
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/company/keza-hq/"
            className="social-link"
          >
            <i className="rx ri-linkedin-fill"></i>
          </a>
          <a
            onClick={() => reportAction("Social", "Clicked the Mail Button")}
            target="_blank"
            rel="noreferrer"
            href="mailto:hello@kezaafrica.com"
            className="social-link"
          >
            <i className="rx ri-mail-send-line"></i>
          </a>
        </div>
        <p className="fs-6 text-white">
          Copyright &copy; <strong>Keza Africa</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
