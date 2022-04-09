import React, { useState, useEffect, useRef } from "react";
import { TextField, MenuItem, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  uploadApplicationFile,
  updateApplication,
} from "../../../data/actions/application";
const types = [
  {
    name: "International Passport",
    value: "passport",
  },
  {
    name: "Driver's License",
    value: "license",
  },
  {
    name: "National Identity Number",
    value: "nin",
  },
  {
    name: "Voter's card",
    value: "voter",
  },
  {
    name: "Nigerian Bank Verification Number",
    value: "bvn",
  },
];

const Identity = ({
  form,
  setForm,
  setProgress,
  isMobile,
  application,
  setInfo,
  setLoading,
  setDisabled,
  setLoadingValue,
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const dataURLtoFile = (dataurl) => {
    fetch(dataurl).then((res) =>
      res.blob().then((data) => {
        const metadata = {
          type: data.type || "*/*",
        };
        const file = new File([data], "Uploaded File", metadata);
        setNewFile(file);
      })
    );
  };
  const handleChange = ({ target: { name, value } }) => {
    setForm((details) => {
      return {
        ...details,
        identity: {
          ...details.identity,
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
        identity: current,
        total,
      };
    });
  };

  useEffect(() => {
    const proceedAction = () => {
      dispatch(updateApplication(form));
    };
    if (file) {
      setLoading(true);
      const form = new FormData();
      form.set("file", file, file.name);
      form.set("id", application.id);
      dispatch(
        uploadApplicationFile(
          form,
          proceedAction,
          setInfo,
          setLoading,
          setLoadingValue
        )
      );
    }
    // eslint-disable-next-line
  }, [file, dispatch]);

  useEffect(() => {
    if (application && application.identity.id) {
      dataURLtoFile(application.identity.id);
    }
  }, [application]);
  useEffect(() => {
    const bvnInput = window.document.querySelector("#bvn");
    bvnInput.setAttribute("maxlength", "11");
  }, []);
  useEffect(() => {
    if (
      (!file || !newFile) &&
      Object.values(form.identity).some((x) => x === "")
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [form, setDisabled, file, newFile]);
  return (
    <div data-aos="fade-in" className="mt-5">
      <div className="row align-items-center">
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              required
              fullWidth
              name="type"
              select
              label="Valid Identity Type"
              value={form.identity.type}
              onChange={(e) => {
                handleProgress(33, 66);
                handleChange(e);
              }}
            >
              {types.map((type, index) => (
                <MenuItem key={index} value={type.value}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <label className="form-label fs-5" htmlFor="id">
              Please upload your valid means of Identification *
            </label>
            <Button
              fullWidth
              style={{
                borderRadius: "1em",
                display: newFile || file ? "flex" : "",
                justifyContent: newFile || file ? "space-between" : "",
              }}
              variant="outlined"
            >
              <span
                onClick={() => {
                  handleProgress(100, 80);
                  inputRef.current.click();
                }}
              >
                {file
                  ? file.name
                  : newFile
                  ? newFile.name
                  : "PDF, DOCX, PNG, e.t.c"}
              </span>
              {(newFile || file) && (
                <i
                  className="bi bi-x-circle"
                  style={{
                    transform: "scale(2)",
                    color: "var(--keza-brown)",
                  }}
                  onClick={() => {
                    setFile(null);
                    setNewFile(null);
                  }}
                ></i>
              )}
            </Button>
            <input
              ref={inputRef}
              hidden
              type="file"
              multiple={false}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className={`form-group mb-5 ${isMobile ? "w-100" : "w-50"}`}>
          <TextField
            id="bvn"
            required
            fullWidth
            name="bvn"
            label="Bank Verification Number"
            value={form.identity.bvn}
            onChange={(e) => {
              handleProgress(66, 72);
              handleChange(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Identity;
