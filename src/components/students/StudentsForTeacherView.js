import React from "react";
import {connect, useSelector} from "react-redux";
import PropTypes from "prop-types";
import '../../utils/styles/Tables.css';
import NotFound from "../layout/NotFound";
import GroupsList from "./GorupsList";
import StudentsList from "./StudentsList";
import "../../utils/styles/Containers.css";
import "../../App.css";
import AttendanceSituation from "./AttendanceSituation";


const StudentsForTeacherView = ({auth:{role}}) => {

    const permissionForTeacher = (
        <div className="svtDiv">
            <GroupsList/>
            <div className="svtDiv2">
                <StudentsList/>
                <AttendanceSituation/>
            </div>
        </div>

    );


    return(
        <div>
            {role === "PROFESSOR" ? permissionForTeacher : <NotFound/>}
        </div>
    );
};

StudentsForTeacherView.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(StudentsForTeacherView);