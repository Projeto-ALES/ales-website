import React from "react";
import { Route, Switch } from "react-router-dom";

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
    <Route path="/login" component={Login} />

    <Route path="/my-area/:id" component={Profile} />
    <Route path="/my-area" component={MyArea} />

    <Route path="/reset-password" component={ResetPassword} />
    <Route path="/reset-password-sent" component={ResetPasswordSent} />
    <Route path="/new-password/:token" component={NewPassword} />
    <Route path="/password-changed" component={PasswordChanged} />

    <Route path="/professors/invite" component={NewProfessor} />
    <Route path="/professors/enroll/:token" component={ProfessorEnroll} />
    <Route path="/professors" component={ProfessorList} />

    <Route path="/courses/:id/edit" component={CourseEdit} />
    <Route path="/courses/:id" component={CourseDetail} />
    <Route path="/courses/new" component={CourseNew} />
    <Route path="/courses" component={CourseList} />
    <Route path="/quarentenales" component={Quarantine} />

    <Route path="/" component={Home} />
  </Switch>
);

export default router;
