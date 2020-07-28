const routes = {
  HOME: "/",
  LOGIN: "/login",

  MY_AREA: "/my-area",
  MY_AREA_ID: "/my-area/:id",

  RESET_PASSWORD: "/reset-password",
  RESET_PASSWORD_SENT: "/reset-password-sent",
  NEW_PASSWORD: "/new-password/:token",
  PASSWORD_CHANGED: "/password-changed",

  PROFESSORS: "/professors",
  PROFESSOR_INVITE: "/professors/invite",
  PROFESSOR_ENROLL: "/professors/enroll",

  COURSES: "/courses",
  COURSE_NEW: "/courses/new",
  COURSE_DETAIL: "/courses/:id",
  COURSE_EDIT: "/courses/:id/edit",
  QUARANTINE: "/quarentenales",
};

export default routes;
