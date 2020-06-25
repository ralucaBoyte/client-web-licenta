import React, { useRef, useState } from "react";
import CodeGenerator from "./CodeGenerator";
import SubjectsTable from "./SubjectsTable";
import {getCode} from "../../store/attendance/attendanceActions";
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

const AttendanceView = ({subjects,attendance,getCode}) => {

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
            <div className='subjectActivity'>
                <SubjectsTable />
                <ActivityTypes/>
            </div>
            <div id='id2'>
                <AttendanceManually/>
                <div id='qrGenerator'>
                    <CodeGenerator/>
                    <OverlayTrigger

                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip(subjects.currentSubject,attendance.activity_id)}
                    >
                        <button ref={target} className='btn btn-primary' onClick={() => {getCode(attendance.activity_id,subjects.currentSubject); setShow(!show);}}>
                            <i className='fas fa-user-minus' /> Generare cod prezență
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
AttendanceView.propTypes = {
    attendance: PropTypes.element.isRequired,
    subjects: PropTypes.element.isRequired,
    getCode: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    attendance: state.attendance,
    subjects: state.subjects
});

export default connect(mapStateToProps, {getCode})(AttendanceView);