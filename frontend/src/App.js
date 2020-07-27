import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import router from "routes/router";

import { me } from "services/user.service";

import SideBar from "components/SideBar/SideBar";
import { loggedIn, notLoggedIn } from "./components/SideBar/items";
import Footer from "components/Footer/Footer";
import { ToastContainer } from "react-toastify";

import { context } from "store/store";
import { types } from "store/types";

function App() {
  const [state, dispatch] = useContext(context);
  const { isLoggedIn } = state;

  useEffect(() => {
    const getMe = () => {
      me()
        .then((response) => {
          const { user } = response.data;
          dispatch({ type: types.UPDATE, user });
        })
        .catch(() => {
          dispatch({ type: types.LOGOUT });
        });
    };
    getMe();
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeOnClick
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Router>
        <SideBar items={isLoggedIn ? loggedIn : notLoggedIn} />
        {router}
        <Footer />
      </Router>
    </>
  );
}

export default App;
