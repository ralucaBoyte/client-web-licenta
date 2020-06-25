import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import NotFound from "../layout/NotFound";
import MyProfile from "../profile/MyProfile";
import PrivateRoute from "../routing/PrivateRoute";
import AttendanceGenerator from "../attendance/AttendanceView";
import "../../utils/styles/Containers.css";
import SubjectsStudent from "../subjects/SubjectsStudent";
import StudentForTeacherView from "../students/StudentsForTeacherView";
import AttendanceSituation from "../students/AttendanceSituation";
import AttendanceByStudent from "../attendance/AttendanceByStudent";

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/my-profile" component={MyProfile} />
        <PrivateRoute exact path="/attendance" component={AttendanceGenerator}/>
        <PrivateRoute exact path="/attendanceStud" component={AttendanceByStudent}/>
        <PrivateRoute exact path="/subject" component={SubjectsStudent}/>
        <PrivateRoute exact path="/students" component={StudentForTeacherView}/>
        <PrivateRoute exact path="/situation" component={AttendanceSituation}/>
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
