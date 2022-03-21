import React, { useEffect, useState } from "react";
import { InputAdornment, TextField, CircularProgress } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useGlobalContext } from "../../../context/global";
const Financial = ({ form, setForm, setProgress, setInfo, isMobile }) => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { APP_SECRET } = useGlobalContext();
  const handleChange = ({ target: { name, value } }) => {
    setForm((form) => {
      return {
        ...form,
        bank: {
          ...form.bank,
          [name]: value,
        },
      };
    });
  };
  const lookUpAccount = () => {
    const bank =
      banks.length > 1 && banks.find((b) => b.name === form.bank.accountBank);
    if (bank) {
      setLoading(true);
      setInfo(null);
      const headers = new Headers();
      headers.append("authorization", `Bearer ${APP_SECRET}`);
      const request = new Request(
        `https://api.paystack.co/bank/resolve?account_number=${form.bank.accountNumber}&bank_code=${bank.code}`,
        {
          headers,
          method: "GET",
          authority: "api.paystack.co",
        }
      );
      fetch(request)
        .then(async (res) => {
          const data = await res.json();
          if (data.status) {
            setForm((form) => {
              return {
                ...form,
                bank: {
                  ...form.bank,
                  accountName: data.data.account_name,
                },
              };
            });
            setLoading(false);
          } else {
            setLoading(false);
            setInfo({
              message: data.message,
              status: "error",
            });
          }
        })
        .catch(({ response, message }) => {
          setLoading(false);
          setInfo({
            message: response ? response.data.message : message,
            status: "error",
          });
        });
    }
  };
  useEffect(() => {
    const headers = new Headers();
    headers.append("authorization", `Bearer ${APP_SECRET}`);
    const request = new Request("https://api.paystack.co/bank", {
      headers,
      method: "GET",
      authority: "api.paystack.co",
    });
    fetch(request)
      .then(async (res) => {
        const data = await res.json();
        setBanks(data.data);
      })
      .catch(({ response, message }) => {
        setBanks([]);
        setInfo({
          message: response ? response.data.message : message,
          status: "error",
        });
      });
  }, [APP_SECRET, setInfo]);
  useEffect(() => {
    if (form.bank.accountNumber.length === 10) {
      lookUpAccount();
    }
    // eslint-disable-next-line
  }, [form.bank.accountNumber]);
  useEffect(() => {
    const accountNumberInput = window.document.querySelector("#accountNumber");
    accountNumberInput.setAttribute("maxlength", "10");
  }, []);
  const handleProgress = (current, total) => {
    setProgress((progress) => {
      return {
        ...progress,
        phone: 100,
        personal: 100,
        social: 100,
        identity: 100,
        employment: 100,
        financial: current,
        total,
      };
    });
  };
  return (
    <div data-aos="fade-in" className="mt-5">
      <div className="row align-items-center">
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <Autocomplete
              options={banks.map((bank) => bank.name)}
              value={form.bank.accountBank}
              onChange={(e, value) => {
                const event = {
                  target: {
                    name: "accountBank",
                    value,
                  },
                };
                handleProgress(50, 92);
                handleChange(event);
              }}
              getOptionLabel={(opt) => opt}
              renderOption={(option) => option}
              renderInput={(props) => (
                <TextField {...props} required label="Bank Name" fullWidth />
              )}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              id="accountNumber"
              required
              fullWidth
              name="accountNumber"
              label="Account Number"
              value={form.bank.accountNumber}
              onChange={(e) => {
                handleProgress(100, 100);
                handleChange(e);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <i
                        onClick={lookUpAccount}
                        style={{
                          color: "var(--keza-brown)",
                          cursor: "pointer",
                        }}
                        className="bi bi-search"
                      ></i>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      </div>
      {form.bank.accountName && (
        <div data-aos="fade-down" className={`d-flex justify-content-center`}>
          <div className={`form-group mb-5 ${isMobile ? "w-100" : "w-50"}`}>
            <TextField
              required
              fullWidth
              name="accountName"
              label="Account Name"
              value={form.bank.accountName}
              readOnly
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Financial;
