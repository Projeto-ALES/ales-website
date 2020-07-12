import React, { useContext } from "react";

import { ToastContainer } from "react-toastify";
import SideBar from "components/SideBar/SideBar";
import { loggedIn, notLoggedIn } from "./components/SideBar/items";

import Footer from "components/Footer/Footer";

import Home from "views/Home/Home";
import Quarantine from "views/Quarantine/Quarantine";
import Login from "views/Login/Login";
import ResetPassword from "views/ResetPassword/ResetPassword";
import ResetPasswordSent from "views/ResetPasswordSent/ResetPasswordSent";
import NewPassword from "views/NewPassword/NewPassword";
import PasswordChanged from "views/PasswordChanged/PasswordChanged";
import MyArea from "views/MyArea/MyArea";
import Profile from "views/Profile/Profile";
import ProfessorList from "views/Professor/ProfessorList/ProfessorList";
import NewProfessor from "views/Professor/NewProfessor/NewProfessor";
import ProfessorEnroll from "views/Professor/ProfessorEnroll/ProfessorEnroll";
import CourseList from "views/Course/CourseList/CourseList";
import CourseDetail from "views/Course/CourseDetail/CourseDetail";
import CourseNew from "views/Course/CourseNew/CourseNew";
import CourseEdit from "views/Course/CourseEdit/CourseEdit";

import { context } from "store/store";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [state, dispatch] = useContext(context);
  const { isLoggedIn } = state;

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeOnClick
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Router>
        <SideBar items={isLoggedIn ? loggedIn : notLoggedIn} />

        <Switch>
          <Route path="/quarentenales" component={Quarantine} />
          <Route path="/login" component={Login} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/reset-password-sent" component={ResetPasswordSent} />
          <Route path="/new-password/:token" component={NewPassword} />
          <Route path="/password-changed" component={PasswordChanged} />
          <Route path="/my-area" component={MyArea} />
          <Route path="/profile" component={Profile} />
          <Route path="/professors/new" component={NewProfessor} />
          <Route path="/professors/enroll/:token" component={ProfessorEnroll} />
          <Route path="/professors" component={ProfessorList} />
          <Route path="/courses/:id/edit" component={CourseEdit} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/courses/new" component={CourseNew} />
          <Route path="/courses" component={CourseList} />
          <Route path="/" component={Home} />
        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
