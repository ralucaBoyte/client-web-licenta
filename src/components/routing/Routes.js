import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import NotFound from "../layout/NotFound";
import MyProfile from "../profile/MyProfile";
import PrivateRoute from "../routing/PrivateRoute";
import AttendanceGenerator from "../attendance/AttendanceGenerator";
//import ChatScreen from "../Chat/ChatScreen";
import DashboardComponent from "../../views/MainChat/dashboard";
import "../../utils/styles/Containers.css";
import SubjectsStudent from "../subjects/SubjectsStudent";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/my-profile" component={MyProfile} />
        <PrivateRoute exact path="/attendance" component={AttendanceGenerator}/>
        <PrivateRoute exact path="/messages" component={DashboardComponent} />
        <PrivateRoute exact path="/subject" component={SubjectsStudent}/>
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
