import React, {Fragment} from "react";
import QRCode_Generator from "../dashboard/QRCode_Generator";
import SubjectsTable from "./SubjectsTable";
import {getQRCode} from "../../store/attendance/qrCodeActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ActivityTypes from "./ActivityTypes";
//import { withStyles, makeStyles } from '@material-ui/core/styles';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import RemainingTime from "./RemainingTime";
import Week from "./Week";

// const activityTypes = [
//     { key: 1, text: 'Choice 1', value: 1 },
//     { key: 2, text: 'Choice 2', value: 2 },
//     { key: 3, text: 'Choice 3', value: 3 },
// ];


const AttendanceGenerator = ({attendance, getQRCode}) => {

     return (

            <MDBContainer className="container_attendance">
                <MDBRow>
                    <MDBCol md="6">
                        <SubjectsTable/>
                    </MDBCol>
                    <MDBCol md="2">
                        <ActivityTypes/>
                        <RemainingTime/>
                        <Week/>
                        <button className="btn peach-gradient" onClick={() => getQRCode(attendance.subject_id, attendance.activity_id, attendance.week, attendance.remaining_time)}>Generate QR code</button>
                    </MDBCol>
                    <MDBCol md="4">
                        <QRCode_Generator/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

    );


};

AttendanceGenerator.propTypes = {
   attendance: PropTypes.object.isRequired,
   getQRCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    attendance: state.attendance,
    auth: state.auth,
});

export default connect(mapStateToProps, {getQRCode})(AttendanceGenerator);
