import { Button, TextField } from "@material-ui/core";
import firebase from "firebase";
import React, { useCallback, useContext } from "react";
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";
import app from "../../util/base";
import { AuthContext } from "../Auth";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, username } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        try {
          const user = firebase.auth().currentUser;
          const usersRef = firebase.database().ref(`users`);
          user
            .updateProfile({
              displayName: username.value,
            })
            .then(() => {
              // Update successful
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
          usersRef
            .push({uid: user.uid})
            .then((e) => {
              // Update successful
              // ..
            })
            .catch((error) => {
              // An error occurred
              // ...
              console.log(error);
            });
          history.push("/");
        } catch (error) {
          console.log(error);
        }
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
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSignUp}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flexStart",
          justifyContent: "center",
        }}
      >
        <TextField
          name="username"
          label="username"
          type="username"
          placeholder="username"
          variant="outlined"
          required
          style={{ margin: "10px" }}
        />
        <TextField
          name="email"
          label="email"
          type="email"
          placeholder="Email"
          variant="outlined"
          required
          style={{ margin: "10px" }}
        />

        <TextField
          name="password"
          label="password"
          type="password"
          placeholder="password"
          variant="outlined"
          required
          style={{ margin: "10px" }}
        />

        <Button
          style={{ margin: "10px" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
      <p>
        Already have an account?
        <Link to="/login" style={{ textDecoration: "none" }}>
          <b> Sign in.</b>
        </Link>
      </p>
    </div>
  );
};

export default withRouter(SignUp);
