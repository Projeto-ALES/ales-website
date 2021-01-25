export const getItems = (id) => {
  const items = [
    { id: 1, route: `/my-area/${id}`, text: "Perfil", icon: "fa fa-user" },
    { id: 2, route: "/professors", text: "Professores", icon: "fa fa-graduation-cap" },
    {
      id: 3,
      route: "/courses",
      text: "Matérias",
      icon: "fa fa-flask",
    },
    { id: 4, route: "/recruitment", text: "Recrutamento", icon: "fas fa-bullseye" },
  ];

  return items;
};
