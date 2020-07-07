import React, { useEffect } from "react";
import QRCode_Generator from "../dashboard/QRCode_Generator";
import SubjectsTable from "./SubjectsTable";
import {getQRCode, setQrVisibility, getStudents, setModalVisibility} from "../../store/attendance/qrCodeActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ActivityTypes from "./ActivityTypes";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import RemainingTime from "./RemainingTime";
import Week from "./Week";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import {setCurrentStudent, markAttendance} from "../../store/attendance/qrCodeActions";
import {getLatestAttendanceInfo} from "../../store/reviews/reviewsActions";
import CountdownElement from "./CountdownElement";


const AttendanceGenerator = ({attendance,currentAttendanceId, getLatestAttendanceInfo, getQRCode, setQrVisibility, getStudents, setCurrentStudent, markAttendance, setModalVisibility}) => {

    useEffect(() => {
        getStudents();
    }, []);

    useEffect(() => {
        getLatestAttendanceInfo();
    }, []);
    return (
            <MDBContainer className="container_attendance">
                <MDBRow>
                    <MDBCol md="6">
                        <SubjectsTable/>
                    </MDBCol>
                    <MDBCol md="2" style={{marginTop: '0.2rem'}}>

                        <Autocomplete
                            id="combo-box-demo"
                            options={attendance.students}
                            getOptionLabel={(option) => option.username}
                            onChange={(event, newValue) => {
                                setCurrentStudent(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Choose student" variant="outlined" />}
                        />
                        <button id="butoane-qr"  className="btn purple-gradient" onClick={() => markAttendance(currentAttendanceId, attendance.currentStudent.username)}>Mark attnd.</button>

                        <ActivityTypes/>
                        <RemainingTime/>
                        <Week/>
                        <button id="butoane-qr" className="btn peach-gradient" onClick={() => getQRCode(attendance.subject_id, attendance.activity_id, attendance.week, attendance.remaining_time)}>Generate QR</button>
                        <button id="butoane-qr" className="btn peach-gradient" onClick={() => setQrVisibility()}>Clear QR</button>
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
    currentAttendanceId: state.reviews.currentAttendanceId
});

export default connect(mapStateToProps, {getQRCode, setQrVisibility, getStudents, setCurrentStudent, markAttendance, setModalVisibility, getLatestAttendanceInfo})(AttendanceGenerator);
