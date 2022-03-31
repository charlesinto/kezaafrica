import React, { useEffect } from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { states } from "../../../data/constants";
import { useSelector } from "react-redux";
const Personal = ({ form, setForm, setProgress, setDisabled }) => {
  const user = useSelector(({ user }) => user);
  const handleChange = ({ target: { name, value } }) => {
    setForm((details) => {
      return {
        ...details,
        personal: {
          ...details.personal,
          [name]: value,
        },
      };
    });
  };
  const handleProgress = (current, total) => {
    setProgress((progress) => {
      return {
        ...progress,
        personal: current,
        total,
      };
    });
  };
  useEffect(() => {
    if (Object.values(form.personal).some((x) => x === "")) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [form, setDisabled]);
  useEffect(() => {
    if (user) {
      setForm((form) => {
        return {
          ...form,
          personal: {
            ...form.personal,
            firstName: user?.name?.firstName,
            lastName: user?.name?.lastName,
            phone: user?.phone?.number,
            email: user?.email,
            state: user?.state,
            address: user?.address,
          },
        };
      });
    }
  }, [user, setForm]);
  useEffect(() => {
    const phoneInput = window.document.querySelector("#phone");
    phoneInput.setAttribute("maxlength", "11");
  }, []);
  return (
    <div data-aos="fade-in" className="mt-5">
      <div className="row align-items-center">
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              required
              type="text"
              label="First Name"
              fullWidth
              name="firstName"
              value={form.personal.firstName}
              onChange={(e) => {
                handleChange(e);
                handleProgress(16, 3);
              }}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              required
              type="text"
              label="Last Name"
              fullWidth
              name="lastName"
              value={form.personal.lastName}
              onChange={(e) => {
                handleChange(e);
                handleProgress(32, 6);
              }}
            />
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              id="phone"
              required
              type="tel"
              label="Phone Number"
              fullWidth
              name="phone"
              value={form.personal.phone}
              onChange={(e) => {
                handleChange(e);
                handleProgress(48, 9);
              }}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              required
              value={form.personal.email}
              onChange={(e) => {
                handleChange(e);
                handleProgress(64, 13);
              }}
              type="text"
              label="E-Mail Address"
              fullWidth
              name="email"
            />
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              required
              name="state"
              select
              label="State of Residence"
              fullWidth
              value={form.personal.state}
              onChange={(e) => {
                const event = {
                  target: {
                    name: "state",
                    value: e.target.value,
                  },
                };
                handleChange(event);
                handleProgress(80, 16);
              }}
            >
              {states
                .map(
                  (state) =>
                    `${state.charAt().toUpperCase()}${state.substring(
                      1,
                      state.length
                    )}`
                )
                .map((state, index) => (
                  <MenuItem
                    style={{ textTransform: "capitalize" }}
                    key={index}
                    value={state}
                  >
                    {state}
                  </MenuItem>
                ))}
            </TextField>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              required
              name="address"
              multiline
              fullWidth
              minRows={1}
              label="Residential Address"
              value={form.personal.address}
              onChange={(e) => {
                handleChange(e);
                handleProgress(100, 20);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
