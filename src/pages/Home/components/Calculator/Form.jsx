import React, { useState, useLayoutEffect, useEffect } from "react";
import { FormControl, TextField, Select, MenuItem } from "@material-ui/core";
import axios from "axios";
import { useGlobalContext } from "../../../../context/global";
import { Autocomplete } from "@material-ui/lab";
import { useModal } from "../../../../hooks";
const CalculatorForm = ({
  form,
  setForm,
  setInfo,
  setLoading,
  setSuccess,
  conveneNumber,
  handleProductChange,
  handleMetaChange,
  handleReset,
}) => {
  const { setToast } = useModal();
  const [products, setProducts] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const { APP_URI } = useGlobalContext();
  const product =
    products.length > 1 && form.product.name
      ? products.find((p) => p.name === form.product.name)
      : null;
  const productPrice = product
    ? form.product.condition
      ? product.meta.conditions
        ? product.meta.conditions.find(
            (con) => con.price && con.type === form.product.condition
          )
          ? product.meta.conditions.find(
              (con) => con.type === form.product.condition
            ).price
            ? product.meta.conditions.find(
                (con) => con.type === form.product.condition
              ).price
            : form.product.rom
            ? product.rates
              ? product.rates.find((rate) => rate.storage === form.product.rom)
                ? product.rates.find(
                    (rate) => rate.storage === form.product.rom
                  ).price
                  ? product.rates.find(
                      (rate) => rate.storage === form.product.rom
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
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () =>
      window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  const clear = () => {
    const isMobile = width <= 768;
    setTimeout(() => {
      setLoading(false);
      if (isMobile) {
        window.location.replace("#result");
      }
    }, 3000);
  };

  const handleSubmit = () => {
    setLoading(true);
    const payment = productPrice * 0.3;
    const months = parseFloat(form.meta.months);
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
        meta: {
          ...form.meta,
          payment: payment + extra,
          amount: parseFloat(amount),
          dividend: parseFloat(dividend),
        },
        productPrice,
      };
    });
    clear();
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

  return (
    <div className="col-lg-6">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="row align-items-center mb-3">
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor="condition" className="form-label">
                What condition would you prefer?
              </label>
              <Select
                className="bg-white shadow"
                id="condition"
                variant="outlined"
                defaultValue=""
                name="condition"
                required
                value={form.product.condition}
              >
                <MenuItem
                  onClick={() => {
                    handleProductChange({
                      target: { name: "condition", value: "old" },
                    });
                    setSuccess(20);
                  }}
                  value="old"
                >
                  Pre Owned
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleProductChange({
                      target: { name: "condition", value: "new" },
                    });
                    setSuccess(20);
                  }}
                  value="new"
                >
                  Brand New
                </MenuItem>
              </Select>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                What phone would you like?
              </label>
              <FormControl required>
                <Autocomplete
                  options={
                    products.length > 1
                      ? form.product.condition
                        ? products
                            .filter(
                              (p) =>
                                p.meta.price.min !== 123456 &&
                                p.meta.price.max !== 123456 &&
                                p.meta.conditions &&
                                p.meta.conditions.find(
                                  (con) =>
                                    con.type.trim() ===
                                    form.product.condition.trim()
                                )
                            )
                            .map((p) => p.name)
                        : products.map((p) => p.name)
                      : []
                  }
                  value={form.product.name}
                  onChange={(e, value) => {
                    setForm((form) => {
                      return {
                        ...form,
                        product: {
                          ...form.product,
                          name: value,
                        },
                      };
                    });
                    setSuccess(40);
                    setToast({
                      title:
                        "You are required to make a first installment of 30% of the value of the phone",
                      icon: "info",
                      timer: 10000,
                    });
                  }}
                  getOptionLabel={(opt) => opt}
                  renderOption={(option) => option}
                  renderInput={(props) => (
                    <TextField {...props} variant="outlined" />
                  )}
                  className="bg-white shadow"
                />
              </FormControl>
            </div>
          </div>
        </div>
        <div className="row align-items-center mb-3">
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor="down" className="text-dark form-label">
                Here's the down Payment
              </label>
              <TextField
                variant="outlined"
                id="down"
                value={
                  productPrice
                    ? conveneNumber(parseFloat(productPrice * 0.3))
                    : ""
                }
                className="bg-white shadow"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor="over" className="form-label">
                How long do you want to split your monthly payments?
              </label>
              <Select
                className="bg-white shadow"
                variant="outlined"
                fullWidth
                labelId="over"
                name="months"
                defaultValue=""
                value={form.meta.months}
                required
              >
                {[...Array(6).keys()].map((n, i) => {
                  const int = n + 1;
                  return (
                    <MenuItem
                      onClick={(e) => {
                        const event = {
                          target: {
                            name: "months",
                            value: parseFloat(
                              e.target.textContent.split(" ")[0]
                            ),
                          },
                        };
                        handleMetaChange(event);
                        setSuccess(60);
                      }}
                      value={int}
                      key={i}
                    >{`${int} ${int === 1 ? "month" : "months"}`}</MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
        {product && (
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="color" className="form-label">
                  What colour from this brand would you like?
                </label>
                <Select
                  className="bg-white shadow"
                  variant="outlined"
                  value={form.product.color}
                  defaultValue=""
                  id="color"
                  name="color"
                >
                  {product.meta.colors.map((c, i) => (
                    <MenuItem
                      onClick={(e) => {
                        const event = {
                          target: {
                            name: "color",
                            value: e.target.textContent,
                          },
                        };
                        handleProductChange(event);
                        setSuccess(80);
                      }}
                      value={c}
                      key={i}
                    >
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label htmlFor="rom" className="form-label">
                  What is your preferred phone storage
                </label>
                <Select
                  className="bg-white shadow"
                  variant="outlined"
                  value={form.product.rom}
                  id="rom"
                  name="rom"
                >
                  {product.storage.rom.map((r, i) => {
                    return (
                      <MenuItem
                        onClick={(e) => {
                          const event = {
                            target: {
                              name: "rom",
                              value: e.target.textContent,
                            },
                          };
                          handleProductChange(event);
                          setSuccess(100);
                          setToast({
                            title:
                              "Prices of phones vary depending on the storage",
                            icon: "info",
                            timer: 10000,
                          });
                          handleSubmit();
                        }}
                        value={r}
                        key={i}
                      >
                        {r}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            </div>
          </div>
        )}
        <div className="d-flex justify-content-center">
          <button
            onClick={() => {
              handleReset();
            }}
            className="mt-2 btn btn-primary btn-get-started"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;
