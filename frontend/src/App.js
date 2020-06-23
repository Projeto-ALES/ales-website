import React from "react";

import SideBar from "components/SideBar/SideBar";
import Footer from "components/Footer/Footer";

import Home from "views/Home/Home";
import Quarantine from "views/Quarantine/Quarantine";
import Login from "views/Login/Login";
import ResetPassword from "views/ResetPassword/ResetPassword";
import ResetPasswordSent from "views/ResetPasswordSent/ResetPasswordSent";
import NewPassword from "views/NewPassword/NewPassword";
import PasswordChanged from "views/PasswordChanged/PasswordChanged";
import MyArea from "views/MyArea/MyArea";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <SideBar />

      <Switch>
        <Route path="/quarentenales" component={Quarantine} />
        <Route path="/login" component={Login} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/reset-password-sent" component={ResetPasswordSent} />
        <Route path="/new-password/:token" component={NewPassword} />
        <Route path="/password-changed" component={PasswordChanged} />
        <Route path="/my-area" component={MyArea} />
        <Route path="/" component={Home} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
