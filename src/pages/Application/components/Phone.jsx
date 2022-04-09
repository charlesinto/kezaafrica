import React, { useState, useEffect, useLayoutEffect } from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useGlobalContext } from "../../../context/global";
import { useModal } from "../../../hooks";
import axios from "axios";
const Phone = ({ form, setInfo, setForm, setProgress, setDisabled }) => {
  const { APP_URI, conveneNumber } = useGlobalContext();
  const [products, setProducts] = useState([]);
  const [width, setWidth] = useState("");
  const { setToast } = useModal();
  const handleProgress = (current, total) => {
    setProgress((progress) => {
      return {
        ...progress,
        personal: 100,
        phone: current,
        total,
      };
    });
  };
  useLayoutEffect(() => {
    axios
      .get(`${APP_URI}/products/without-images`)
      .then((res) => {
        if (res.data.ok) {
          setProducts(res.data.data);
        }
      })
      .catch(({ message }) => {
        setProducts([]);
        setInfo({
          message,
          status: "error",
        });
      });
    axios.defaults.withCredentials = true;
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () =>
      window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  useEffect(() => {
    if (
      Object.values(form.report.product).some((x) => x === "") &&
      Object.values(form.report.meta).some((x) => x === "")
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [form, setDisabled]);
  const handleChange = ({ target: { name, value }, attributes: { id } }) => {
    setForm((form) => {
      // eslint-disable-next-line
      const object = eval(`form.report.${id.value}`);
      return {
        ...form,
        report: {
          ...form.report,
          [id.value]: {
            ...object,
            [name]: value,
          },
        },
      };
    });
  };
  const isMobile = width <= 991;
  const product =
    products.length > 1 && form.report.product.name
      ? products.find((p) => p.name === form.report.product.name)
      : null;
  const productPrice = product
    ? form.report.product.condition
      ? product.meta.conditions
        ? product.meta.conditions.find(
            (con) => con.price && con.type === form.report.product.condition
          )
          ? product.meta.conditions.find(
              (con) => con.type === form.report.product.condition
            ).price
            ? product.meta.conditions.find(
                (con) => con.type === form.report.product.condition
              ).price
            : form.report.product.rom
            ? product.rates
              ? product.rates.find(
                  (rate) => rate.storage === form.report.product.rom
                )
                ? product.rates.find(
                    (rate) => rate.storage === form.report.product.rom
                  ).price
                  ? product.rates.find(
                      (rate) => rate.storage === form.report.product.rom
                    ).price
                  : product.meta.price.min === product.meta.price.max
                  ? product.meta.price.min
                  : (product.meta.price.min + product.meta.price.max) / 2
                : product.meta.price.min === product.meta.price.max
                ? product.meta.price.min
                : (product.meta.price.min + product.meta.price.max) / 2
              : product.meta.price.min === product.meta.price.max
              ? product.meta.price.min
              : (product.meta.price.min + product.meta.price.max) / 2
            : product.meta.price.min === product.meta.price.max
            ? product.meta.price.min
            : (product.meta.price.min + product.meta.price.max) / 2
          : product.meta.price.min === product.meta.price.max
          ? product.meta.price.min
          : (product.meta.price.min + product.meta.price.max) / 2
        : product.meta.price.min === product.meta.price.max
        ? product.meta.price.min
        : (product.meta.price.min + product.meta.price.max) / 2
      : product.meta.price.min === product.meta.price.max
      ? product.meta.price.min
      : (product.meta.price.min + product.meta.price.max) / 2
    : null;
  const handleSubmit = (rom) => {
    if (rom) {
      const payment = productPrice * 0.3;
      const months = parseFloat(form.report.meta.months);
      const principal = productPrice - payment;
      const init = parseFloat(principal / months);
      const rate = 0.03;
      const increment = rate * init;
      const amount = parseFloat((increment + init) * months);
      const dividend = parseFloat(amount / months);
      const extra = 4000;
      setForm((form) => {
        return {
          ...form,
          report: {
            ...form.report,
            meta: {
              ...form.report.meta,
              payment: payment + extra,
              amount: parseFloat(amount),
              dividend: parseFloat(dividend),
            },
          },
        };
      });
    }
  };
  useEffect(() => {
    if (form.report.product.rom) {
      handleSubmit(form.report.product.rom);
    }
    // eslint-disable-next-line
  }, [form.report.product.rom, productPrice]);
  return (
    <div data-aos="fade-in" className="mt-5">
      <div className="row align-items-center">
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              required
              select
              id="product"
              label="Desired Condition"
              fullWidth
              name="condition"
              value={form.report.product.condition}
            >
              <MenuItem
                onClick={() => {
                  const event = {
                    attributes: {
                      id: {
                        value: "product",
                      },
                    },
                    target: {
                      name: "condition",
                      value: "old",
                    },
                  };
                  handleProgress(20, 24);
                  handleChange(event);
                }}
                value="old"
              >
                Pre Owned
              </MenuItem>
              <MenuItem
                onClick={() => {
                  const event = {
                    attributes: {
                      id: {
                        value: "product",
                      },
                    },
                    target: {
                      name: "condition",
                      value: "new",
                    },
                  };
                  handleProgress(20, 24);
                  handleChange(event);
                }}
                value="new"
              >
                Brand New
              </MenuItem>
            </TextField>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <Autocomplete
              options={
                products.length > 1
                  ? form.report.product.condition
                    ? products
                        .filter(
                          (p) =>
                            p.meta.price.min !== 123456 &&
                            p.meta.price.max !== 123456 &&
                            p.meta.conditions &&
                            p.meta.conditions.find(
                              (con) =>
                                con.type.trim() ===
                                form.report.product.condition.trim()
                            )
                        )
                        .map((p) => p.name)
                    : products.map((p) => p.name)
                  : []
              }
              value={form.report.product.name}
              onChange={(e, value) => {
                const event = {
                  attributes: {
                    id: {
                      value: "product",
                    },
                  },
                  target: {
                    name: "name",
                    value,
                  },
                };
                handleProgress(40, 28);
                setToast({
                  position: isMobile ? "center" : "top",
                  title:
                    "You are required to make a first installment of 30% of the value of the phone",
                  icon: "info",
                  timer: 10000,
                });
                handleChange(event);
              }}
              getOptionLabel={(opt) => opt}
              renderOption={(option) => option}
              renderInput={(props) => (
                <TextField
                  required
                  {...props}
                  id="product"
                  label="Desired Phone"
                  fullWidth
                  name="name"
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              readOnly
              label="Minimum Down Payment"
              fullWidth
              value={
                productPrice
                  ? conveneNumber(parseFloat(productPrice * 0.3))
                  : ""
              }
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              required
              select
              label="Desired Loan Tenure"
              fullWidth
              value={
                form.report.meta.months === 0 ? "" : form.report.meta.months
              }
            >
              {[...Array(6).keys()].map((n, i) => {
                const int = n + 1;
                return (
                  <MenuItem
                    onClick={(e) => {
                      const event = {
                        attributes: {
                          id: {
                            value: "meta",
                          },
                        },
                        target: {
                          name: "months",
                          value: parseFloat(e.target.textContent.split(" ")[0]),
                        },
                      };
                      handleProgress(60, 32);
                      handleChange(event);
                    }}
                    value={int}
                    key={i}
                  >{`${int} ${int === 1 ? "month" : "months"}`}</MenuItem>
                );
              })}
            </TextField>
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              required
              select
              value={form.report.product.color}
              label="Desired Colour"
              fullWidth
            >
              {!product ? (
                <MenuItem>Please Select your Desired Phone</MenuItem>
              ) : (
                product.meta.colors.map((c, i) => (
                  <MenuItem
                    onClick={(e) => {
                      const event = {
                        attributes: {
                          id: {
                            value: "product",
                          },
                        },
                        target: {
                          name: "color",
                          value: e.target.textContent,
                        },
                      };
                      handleProgress(80, 36);
                      handleChange(event);
                    }}
                    value={c}
                    key={i}
                  >
                    {c}
                  </MenuItem>
                ))
              )}
            </TextField>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="form-group mb-5">
            <TextField
              required
              select
              value={form.report.product.rom}
              label="Desired Storage"
              fullWidth
            >
              {!product ? (
                <MenuItem>Please Select your Desired Phone</MenuItem>
              ) : (
                product.storage.rom.map((r, i) => {
                  return (
                    <MenuItem
                      onClick={(e) => {
                        const event = {
                          attributes: {
                            id: {
                              value: "product",
                            },
                          },
                          target: {
                            name: "rom",
                            value: e.target.textContent,
                          },
                        };
                        handleProgress(100, 40);
                        setToast({
                          position: isMobile ? "center" : "top",
                          title:
                            "Prices of phones vary depending on the storage",
                          icon: "info",
                          timer: 10000,
                        });
                        handleChange(event);
                      }}
                      value={r}
                      key={i}
                    >
                      {r}
                    </MenuItem>
                  );
                })
              )}
            </TextField>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phone;
