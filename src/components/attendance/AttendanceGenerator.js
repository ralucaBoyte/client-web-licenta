import React, {Fragment, useRef, useState} from "react";
import QRCode_Generator from "../dashboard/QRCode_Generator";
import SubjectsTable from "./SubjectsTable";
import {getQRCode} from "../../store/attendance/qrCodeActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ActivityTypes from "./ActivityTypes";
import AttendanceManually from "./AttendanceManually";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {Container} from "react-bootstrap";
import "../../utils/styles/Tables.css";
import "../../utils/styles/Containers.css"
import "../../App.css";
import styles from '../../utils/styles/MyStyles.css';
import { useSelector } from "react-redux";
import NotFound from "../layout/NotFound";

const AttendanceGenerator = ({subjects,attendance,getQRCode}) => {

    function renderTooltip(subject,activityType) {
        return (
            <div className={styles.textStyle} style={{textAlign: "center"}}>
                <Tooltip id="button-tooltip" style={{width:200}}>
                    <p style={{fontSize: 12}}>Prezență pentru materia cu id-ul {subject} la activitatea cu id-ul {activityType}</p>
                </Tooltip>
            </div>
        );
    }

    const role = useSelector(state => {
        return state.auth.role;
    });

    const [show, setShow] = useState(false);
    const target = useRef(null);

    const permissionForTeacher = (
        <Container id='containerAttendance'>
            <div id='id1'>
                <SubjectsTable />
                <ActivityTypes/>
            </div>
            <div id='id2'>
                <AttendanceManually/>
                <div id='qrGenerator'>
                    <QRCode_Generator/>
                    <OverlayTrigger

                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip(subjects.currentSubject,attendance.activity_id)}
                    >
                        <button ref={target} className='btn btn-primary' onClick={() => {getQRCode(attendance.activity_id,subjects.currentSubject); setShow(!show);}}>
                            <i className='fas fa-user-minus' /> Generate qr code
                        </button>
                    </OverlayTrigger>
                </div>
            </div>
        </Container>
    );

    return (
       <div>
           {role === 'PROFESSOR' ? permissionForTeacher : <NotFound/>}
       </div>
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