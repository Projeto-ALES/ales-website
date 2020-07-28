import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import router from "routes/router";

import { me } from "services/user.service";

import { ToastContainer } from "react-toastify";
import SideBar from "components/SideBar/SideBar";
import Footer from "components/Footer/Footer";

import { loggedIn, notLoggedIn } from "./components/SideBar/items";

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
    // eslint-disable-next-line
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
      </Router>
      <Footer />
    </>
  );
}

export default App;
