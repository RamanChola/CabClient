import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../util/base.js";
import { AuthContext } from "../Auth.js";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Log in</h1>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flexStart",
          justifyContent: "center",
        }}
      >
        <TextField
          name="email"
          label="email"
          type="email"
          placeholder="Email"
          variant="outlined"
          style={{ margin: "10px" }}
          required
        />
        <TextField
          name="password"
          label="password"
          type="password"
          placeholder="password"
          style={{ margin: "10px" }}
          variant="outlined"
          required
        />
        <Button
          style={{ margin: "10px" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Log in
        </Button>
        <p style={{ textAlign: "center" }}>
          <b>or</b>
        </p>
      </form>
      <Button
        color="primary"
        variant="contained"
        type="submit"
      >
        <Link
          to="/loginwithotp"
          style={{ textDecoration: "none", color: "white" }}
        >
          Log in with otp
        </Link>
      </Button>
      <p>
        Dont have an account?{" "}
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <b>Sign up now.</b>
        </Link>
      </p>
    </div>
  );
};

export default withRouter(Login);
