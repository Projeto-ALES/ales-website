export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        user: {
          id: action.user._id,
          name: action.user.name,
          email: action.user.email,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: {
          id: "",
          name: "",
          email: "",
        },
      };
    case "UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email,
        },
      };
    default:
      return state;
  }
};
