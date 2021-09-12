import { Button, TextField } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import firebase from "firebase";
import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/Auth";

const Profile = () => {
  const user = firebase.auth().currentUser;
  const [success, setSuccess] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username } = e.target.elements;
    user
      .updateProfile({
        displayName: username.value,
      })
      .then(() => {
        // Update successful
        // ...
        setSuccess(true);
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flexStart",
        justifyContent: "flexStart",
        marginTop: "10vh",
        marginLeft: "30vh",
        height: "100vh",
      }}
    >
      <h2>Hi {user && user.displayName},</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flexStart",
        }}
      >
        <h3>{user && user.displayName ? "Change username" : "Add username"}</h3>
        <TextField
          name="username"
          label="username"
          type="username"
          placeholder={user ? user.displayName : "username"}
          variant="outlined"
          required
          style={{ margin: "10px", maxWidth: "50%" }}
        />
        {success && (
          <p style={{ color: "green", display: "flex", alignItems: "center" }}>
            <CheckCircle style={{ marginRight: "5px" }} /> Successfully updated!
          </p>
        )}
        <Button
          style={{ margin: "10px", maxWidth: "10%" }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => setSuccess(false)}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default Profile;
