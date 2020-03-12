import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import NotFound from "../layout/NotFound";
import MyProfile from "../profile/MyProfile";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../routing/PrivateRoute";
import CustomersTable from "../elements/CustomersTable";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/my-profile" component={MyProfile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/customers" component={CustomersTable} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
