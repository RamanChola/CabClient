import React, { useContext, useEffect, useRef, useState } from "react";
import firebase from "firebase";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import { AuthContext } from "../Auth";
import { Redirect, useHistory } from "react-router";
const LoginWithOtp = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [number, setNumber] = useState("");
  const numberRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const configureCaptcha = () => {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          defaultCountry: "IN",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log(response);
          },
        }
      );
    };
    configureCaptcha();
    return () => {};
  }, [number]);
  const handleStart = () => {
    setNumber(numberRef.current.value);
    console.log(numberRef.current.value);
    const phoneNumber = "+91" + numberRef.current.value;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (data) => {
    const code = data.otp;
    console.log(code);
    const usersRef = firebase.database().ref(`users`);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        usersRef
          .push({ uid: user.uid })
          .then((e) => {
            // Update successful
            // ..
          })
          .catch((error) => {
            // An error occurred
            // ...
            console.log(error);
          });
        setCurrentUser(user);
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        setError(error);
      });
  };
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
      {!number ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>Enter mobile number</h3>

          <div id="recaptcha-container"></div>
          <input
            type="number"
            placeholder="Mobile number"
            required
            ref={numberRef}
            style={{ padding: "15px" }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={handleStart}
          >
            Submit
          </Button>
        </div>
      ) : (
        <>
          <div id="recaptcha-container"></div>
          <h2>Enter OTP</h2>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              style={{ padding: "15px" }}
              type="number"
              name="otp"
              placeholder="OTP Number"
              required
              {...register("otp", { required: true })}
            />
            {error && <p style={{ color: "red" }}>Invalid OTP!</p>}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </form>
          <p style={{ color: "green" }}>OTP has been sent successfully!</p>
        </>
      )}
    </div>
  );
};

export default LoginWithOtp;
