export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { _id, name, email } = action.user;
      return {
        ...state,
        isLoggedIn: true,
        user: {
          id: _id,
          name,
          email,
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
    default:
      return state;
  }
};
