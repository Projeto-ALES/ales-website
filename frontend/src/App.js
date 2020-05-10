import React from "react";

import SideBar from "components/SideBar/SideBar";
import Footer from "components/Footer/Footer";

import Home from "views/Home/Home";
import Quarantine from "views/Quarantine/Quarantine";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <SideBar />

      <Switch>
        <Route path="/quarentenales">
          <Quarantine />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
