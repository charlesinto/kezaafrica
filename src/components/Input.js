import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";

const Input = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
  autoComplete,
  variant,
  className,
  error,
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      autoComplete={autoComplete}
      name={name}
      error={error}
      className={className}
      onChange={handleChange}
      variant={variant || "standard"}
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={
        name === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? (
                      <i className="bi bi-eye"></i>
                    ) : (
                      <i className="bi bi-eye-slash"></i>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
  </Grid>
);

export default Input;
