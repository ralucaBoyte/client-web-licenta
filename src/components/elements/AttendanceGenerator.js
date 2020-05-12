import React, {Fragment, useState} from "react";
import QRCode_Generator from "../dashboard/QRCode_Generator";
import SubjectsTable from "./SubjectsTable";
import {getQRCode} from "../../store/attendance/qrCodeActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ActivityTypes from "./ActivityTypes";
import { withStyles, makeStyles } from '@material-ui/core/styles';

const activityTypes = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
];


const AttendanceGenerator = ({attendance, getQRCode}) => {

     return (
        <Fragment>
                <SubjectsTable/>
                <div>
                    <ActivityTypes/>
                    <QRCode_Generator/>
                    <button className='btn btn-primary' onClick={() => getQRCode(attendance.activity_id)}>
                    <i className='fas fa-user-minus' /> Generate qr code
                </button>
                </div>
        </Fragment>
    );


};

AttendanceGenerator.propTypes = {
   attendance: PropTypes.func.isRequired,
   getQRCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    attendance: state.attendance,
    auth: state.auth,
});

export default connect(mapStateToProps, {getQRCode})(AttendanceGenerator);
