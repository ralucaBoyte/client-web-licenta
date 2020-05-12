import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import NotFound from "../layout/NotFound";
import MyProfile from "../profile/MyProfile";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";
import SubjectsTable from "../elements/SubjectsTable";
import AttendanceGenerator from "../elements/AttendanceGenerator";
//import ChatScreen from "../Chat/ChatScreen";
import DashboardComponent from "../chat/MainChat/dashboard";


const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/my-profile" component={MyProfile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/attendance" component={AttendanceGenerator} />

        <PrivateRoute exact path="/messages" component={DashboardComponent} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
