import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "./routes";

import Home from "views/Home/Home";
import Login from "views/Login/Login";

import MyArea from "views/MyArea/MyArea";
import Profile from "views/Profile/Profile";

import ResetPassword from "views/ResetPassword/ResetPassword";
import ResetPasswordSent from "views/ResetPasswordSent/ResetPasswordSent";
import NewPassword from "views/NewPassword/NewPassword";
import PasswordChanged from "views/PasswordChanged/PasswordChanged";

import ProfessorList from "views/Professor/ProfessorList/ProfessorList";
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

    <Route path={routes.MY_AREA_ID} component={Profile} />
    <Route path={routes.MY_AREA} component={MyArea} />

    <Route path={routes.RESET_PASSWORD} component={ResetPassword} />
    <Route path={routes.RESET_PASSWORD_SENT} component={ResetPasswordSent} />
    <Route path={routes.NEW_PASSWORD} component={NewPassword} />
    <Route path={routes.PASSWORD_CHANGED} component={PasswordChanged} />

    <Route path={routes.PROFESSOR_INVITE} component={NewProfessor} />
    <Route path={routes.PROFESSOR_ENROLL} component={ProfessorEnroll} />
    <Route path={routes.PROFESSORS} component={ProfessorList} />

    <Route path={routes.COURSE_EDIT} component={CourseEdit} />
    <Route path={routes.COURSE_NEW} component={CourseNew} />
    <Route path={routes.COURSE_DETAIL} component={CourseDetail} />
    <Route path={routes.COURSES} component={CourseList} />
    <Route path={routes.QUARANTINE} component={Quarantine} />

    <Route path={routes.HOME} component={Home} />
  </Switch>
);

export default router;
