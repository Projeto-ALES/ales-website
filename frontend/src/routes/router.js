import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "./routes";
import PrivateRoute from "./PrivateRoute";

import Home from "views/Home/Home";
import Login from "views/Login/Login";

import MyArea from "views/MyArea/MyArea";
import Profile from "views/Profile/Profile";

import ResetPassword from "views/ResetPassword/ResetPassword";
import ResetPasswordSent from "views/ResetPasswordSent/ResetPasswordSent";
import NewPassword from "views/NewPassword/NewPassword";
import PasswordChanged from "views/PasswordChanged/PasswordChanged";

import ProfessorList from "views/Professor/ProfessorList/ProfessorList";
import ProfessorDetail from "views/Professor/ProfessorDetail/ProfessorDetail";
import NewProfessor from "views/Professor/NewProfessor/NewProfessor";
import ProfessorEnroll from "views/Professor/ProfessorEnroll/ProfessorEnroll";

import CourseList from "views/Course/CourseList/CourseList";
import CourseDetail from "views/Course/CourseDetail/CourseDetail";
import CourseNew from "views/Course/CourseNew/CourseNew";
import CourseEdit from "views/Course/CourseEdit/CourseEdit";
import Quarantine from "views/Quarantine/Quarantine";

const router = (
  <Switch>
    <Route path={routes.LOGIN} component={Login} />

    <PrivateRoute path={routes.MY_AREA_ID} component={Profile} />
    <PrivateRoute path={routes.MY_AREA} component={MyArea} />

    <Route path={routes.RESET_PASSWORD} component={ResetPassword} />
    <Route path={routes.RESET_PASSWORD_SENT} component={ResetPasswordSent} />
    <Route path={routes.NEW_PASSWORD} component={NewPassword} />
    <Route path={routes.PASSWORD_CHANGED} component={PasswordChanged} />

    <PrivateRoute path={routes.PROFESSOR_INVITE} component={NewProfessor} />
    <Route path={routes.PROFESSOR_ENROLL} component={ProfessorEnroll} />
    <PrivateRoute path={routes.PROFESSOR_DETAIL} component={ProfessorDetail} />
    <PrivateRoute path={routes.PROFESSORS} component={ProfessorList} />

    <PrivateRoute path={routes.COURSE_EDIT} component={CourseEdit} />
    <PrivateRoute path={routes.COURSE_NEW} component={CourseNew} />
    <PrivateRoute path={routes.COURSE_DETAIL} component={CourseDetail} />
    <PrivateRoute path={routes.COURSES} component={CourseList} />
    <Route path={routes.QUARANTINE} component={Quarantine} />

    <Route path={routes.HOME} component={Home} />
  </Switch>
);

export default router;
