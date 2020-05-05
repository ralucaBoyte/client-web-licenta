import React, {Fragment, useState} from "react";
import QRCode_Generator from "../dashboard/QRCode_Generator";
import SubjectsTable from "./SubjectsTable";
import {getQRCode} from "../../store/attendance/qrCodeActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ActivityTypes from "./ActivityTypes";

const activityTypes = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
];

const AttendanceGenerator = ({getQRCode}) => {

     return (
        <Fragment>
                <SubjectsTable/>
                <ActivityTypes/>
                <QRCode_Generator/>
            <button className='btn btn-primary' onClick={() => getQRCode()}>
                <i className='fas fa-user-minus' /> Generate qr code
            </button>
        </Fragment>
    );
};
AttendanceGenerator.propTypes = {
   getQRCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {getQRCode})(AttendanceGenerator);
