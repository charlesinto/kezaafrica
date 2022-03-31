import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
const Social = ({ form, setForm, setProgress, setDisabled }) => {
  const user = useSelector(({ user }) => user);
  const handleChange = ({ target: { name, value } }) => {
    setForm((details) => {
      return {
        ...details,
        social: {
          ...details.social,
          [name]: value,
        },
      };
    });
  };
  const handleProgress = (current, total) => {
    setProgress((progress) => {
      return {
        ...progress,
        phone: 100,
        personal: 100,
        social: current,
        total,
      };
    });
  };
  useEffect(() => {
    if (user) {
      setForm((form) => {
        return {
          ...form,
          social: {
            ...form.social,
            ...user?.social,
          },
        };
      });
    }
  }, [user, setForm]);
  useEffect(() => {
    if (Object.values(form.social).every((x) => x === "")) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [form, setDisabled]);
  return (
    <div data-aos="fade-in" className="mt-5">
      <p className="text-center fs-6">
        Please enter a Minimum of two Social Media Accounts
      </p>
      <div className="row align-items-center">
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              type="text"
              name="facebook"
              fullWidth
              label="Facebook"
              placeholder="Please enter your Facebook Handle"
              value={form.social.facebook}
              onChange={(e) => {
                handleProgress(25, 45);
                handleChange(e);
              }}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              type="text"
              name="twitter"
              fullWidth
              label="Twitter"
              placeholder="Please enter your Twitter username"
              value={form.social.twitter}
              onChange={(e) => {
                handleProgress(50, 50);
                handleChange(e);
              }}
            />
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              type="text"
              name="instagram"
              fullWidth
              label="Instagram"
              placeholder="Please enter your Instagram username"
              value={form.social.instagram}
              onChange={(e) => {
                handleProgress(75, 55);
                handleChange(e);
              }}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              type="text"
              name="linkedin"
              fullWidth
              label="LinkedIn"
              placeholder="Please enter your Linkedin Handle"
              value={form.social.linkedin}
              onChange={(e) => {
                handleProgress(100, 60);
                handleChange(e);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
