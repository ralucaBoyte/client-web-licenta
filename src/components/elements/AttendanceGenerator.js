import React, {Fragment, useState} from "react";
import QRCode_Generator from "../dashboard/QRCode_Generator";
import SubjectsTable from "./SubjectsTable";
import {getQRCode} from "../../store/attendance/qrCodeActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ActivityTypes from "./ActivityTypes";
import AttendaceManually from "./AttendanceManually";

const AttendanceGenerator = ({subjects,attendance,getQRCode}) => {

     return (
        <Fragment>
                <SubjectsTable/>
                <ActivityTypes/>
                <QRCode_Generator/>
            <button className='btn btn-primary' onClick={() => getQRCode(attendance.activity_id,subjects.currentSubject)}>
                <i className='fas fa-user-minus' /> Generate qr code
            </button>
                <AttendaceManually/>
        </Fragment>
    );
};
AttendanceGenerator.propTypes = {
    attendance: PropTypes.element.isRequired,
    subjects: PropTypes.element.isRequired,
    getQRCode: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    attendance: state.attendance,
    subjects: state.subjects
});

export default connect(mapStateToProps, {getQRCode})(AttendanceGenerator);