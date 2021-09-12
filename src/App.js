import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./auth/components/Login";
import SignUp from "./auth/components/SignUp";
import { AuthContext, AuthProvider } from "./auth/Auth";
import PrivateRoute from "./PrivateRoute";
import LoginWithOtp from "./auth/components/LoginWithOtp";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import RidePageFull from "./pages/RidePageFull";
import RidesPage from "./pages/RidesPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <PrivateRoute component={Navbar} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute exact path="/ride/:id" component={RidePageFull} />
        <PrivateRoute exact path="/rides" component={RidesPage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/loginwithotp" component={LoginWithOtp} />
        <Route exact path="/login" component={Login} />
      </Router>
    </AuthProvider>
  );
};

export default App;
