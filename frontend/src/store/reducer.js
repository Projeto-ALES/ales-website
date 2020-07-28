import { types } from "./types";

export const reducer = (state, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: {
          id: action.user._id,
          name: action.user.name,
          email: action.user.email,
        },
      };
    case types.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {
          id: "",
          name: "",
          email: "",
        },
      };
    case types.UPDATE:
      return {
        ...state,
        isLoggedIn: true,
        user: {
          id: action.user._id,
          name: action.user.name,
          email: action.user.email,
        },
      };
    default:
      return state;
  }
};
