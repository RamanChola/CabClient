import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const RidePageFull = () => {
  const user = firebase.auth().currentUser;
  const rideId = useParams().id;
  const [status, setStatus] = useState("");
  useEffect(() => {
    const fullRideRef = firebase.database().ref(`rides/${user.uid}/tripStatus/${rideId}`);
    fullRideRef.on("value", (snapshot) => {
      setStatus(snapshot.val().status);
    });
  }, [user.uid, rideId]);

  return (
    <div style={{ position: "absolute", top: "100px", left: "260px" }}>
      Hi {user && user.displayName}
      <p>Ride id : {rideId}</p>
      <p>Status : {status}</p>
    </div>
  );
};

export default RidePageFull;
