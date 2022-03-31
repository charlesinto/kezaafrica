import React, { useEffect } from "react";
import { MenuItem, TextField, InputAdornment } from "@material-ui/core";
import { useGlobalContext } from "../../../context/global";
const statuses = [
  {
    name: "Employed",
    value: "employed",
  },
  {
    name: "Self-Employed",
    value: "entrepreneur",
  },
  {
    name: "Ride Hailing Partner",
    value: "driver",
  },
];

const Employment = ({ form, setForm, setProgress, setDisabled }) => {
  const { conveneNumber } = useGlobalContext();
  const handleChange = ({ target: { name, value } }) => {
    setForm((form) => {
      return {
        ...form,
        employment: {
          ...form.employment,
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
        social: 100,
        identity: 100,
        employment: current,
        total,
      };
    });
  };
  useEffect(() => {
    if (Object.values(form.employment).some((x) => x === "")) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [form, setDisabled]);
  return (
    <div data-aos="fade-in" className="mt-5">
      <div className="row align-items-center">
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              required
              fullWidth
              select
              name="status"
              label="Employment Status"
              value={form.employment.status}
              onChange={(e) => {
                handleProgress(25, 85);
                handleChange(e);
              }}
            >
              {statuses.map((status, index) => (
                <MenuItem key={index} value={status.value}>
                  {status.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              required
              fullWidth
              name="company"
              label="Company Name"
              value={form.employment.company}
              onChange={(e) => {
                handleProgress(50, 90);
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
              required
              fullWidth
              name="address"
              label="Office Address"
              value={form.employment.address}
              onChange={(e) => {
                handleProgress(75, 95);
                handleChange(e);
              }}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              required
              fullWidth
              name="salary"
              label="Monthly Income"
              value={form.employment.salary}
              onChange={(e) => {
                handleProgress(100, 100);
                handleChange(e);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <span className="fs-6 fw-bold">
                      {conveneNumber(parseInt(form.employment.salary || 0))}
                    </span>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employment;
