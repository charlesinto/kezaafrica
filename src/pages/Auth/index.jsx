import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { Alert, Breadcrumb, Input, Progress } from "../../components";
import { loginUser } from "../../data/actions/auth";
import useStyles from "./styles";
import { Link } from "react-router-dom";
const Auth = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginUser(form, setInfo, setLoading));
  };
  const handleChange = ({ target: { name, value } }) => {
    setForm((form) => {
      return { ...form, [name]: value };
    });
  };
  return (
    <main>
      <Breadcrumb parent={{ name: "Login" }} />
      <section className="inner-page">
        <div className="container">
          <Container id="login" component="main" maxWidth="sm">
            <Paper className={classes.paper} elevation={6}>
              <Avatar className={classes.avatar}>
                <i className="bx bxs-lock"></i>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {info && (
                <Alert
                  status={info.status}
                  message={info.message}
                  isDark
                  onClose={() => setInfo(null)}
                />
              )}
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2} className="mb-3">
                  <Input
                    name="username"
                    label="Email Address"
                    handleChange={handleChange}
                    type="text"
                  />
                  <Input
                    name="password"
                    label="Password"
                    autoComplete="current password"
                    handleChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    handleShowPassword={handleShowPassword}
                  />
                </Grid>
                <Link to="/forgot-password" className="fs-5 text-primary">
                  Forgot your Password?
                </Link>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              </form>
            </Paper>
            {loading && <Progress />}
          </Container>
        </div>
      </section>
    </main>
  );
};

export default Auth;
