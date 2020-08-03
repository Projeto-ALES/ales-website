import { logout } from "services/auth.service";

const notLoggedIn = [
  { id: 1, text: "Home", icon: "fas fa-home", to: "/", onClick: () => {} },
  { id: 2, text: "Contato", icon: "fas fa-paper-plane", to: "/contact", onClick: () => {} },
  { id: 3, text: "Entrar", icon: "fa fa-sign-in", to: "/login", onClick: () => {} },
];

const loggedIn = [
  { id: 1, text: "Dashboard", icon: "fas fa-home", to: "/my-area" },
  {
    id: 2,
    text: "Matérias",
    icon: "far fa-calendar-check",
    to: "/quarentenales",
    onClick: () => {},
  },
  {
    id: 3,
    text: "Sair",
    icon: "fa fa-sign-out",
    to: "/login",
    onClick: () => {
      logout();
    },
  },
];

export { notLoggedIn, loggedIn };
