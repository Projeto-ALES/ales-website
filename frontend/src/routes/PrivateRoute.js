import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import routes from "./routes";

import { context } from "store/store";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, dispatch] = useContext(context);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: routes.LOGIN,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
