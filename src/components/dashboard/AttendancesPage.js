import React, {  Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQRCode } from "../../store/attendance/qrCodeActions";
import QRCode_Generator from "./QRCode_Generator";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import SubjectsTable from "../elements/SubjectsTable";
import ActivityTypes from "../elements/ActivityTypes";
import RemainingTime from "../elements/RemainingTime";
import Week from "../elements/Week";
import AttendancesTable from "../elements/AttendancesTable";
import Subjects from "../elements/Subjects";
import {getAttendances} from "../../store/attendance/attendanceViewActions";

const AttendancesPage = ({getAttendances, attendances_view, attendance}) => {

    return (
        <MDBContainer className="container_attendance">
            <MDBRow>

                <MDBCol md="4">
                    <Subjects/>
                    <ActivityTypes/>
                    <Week/>
                    <button className="btn peach-gradient" onClick={() => getAttendances(attendances_view.subject_id, attendance.activity_id, attendances_view.week)}>View present students</button>
                </MDBCol>
                <MDBCol md="8">
                    <AttendancesTable/>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

AttendancesPage.propTypes = {
    attendances_view: PropTypes.object.isRequired,
    getAttendances: PropTypes.func.isRequired,
    attendance: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    attendances_view: state.attendances_view,
    activities: state.subjects.activities,
    attendance: state.attendance
});

export default connect(mapStateToProps, {getAttendances})(AttendancesPage);
