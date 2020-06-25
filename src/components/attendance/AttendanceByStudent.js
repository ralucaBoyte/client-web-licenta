import React, { useState } from "react";
import {addAttendanceByStudent} from "../../store/attendance/attendanceActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Container} from "react-bootstrap";
import "../../utils/styles/Tables.css";
import "../../utils/styles/Containers.css"
import "../../App.css";
import "../../utils/styles/MyStyles.css"
import { useSelector } from "react-redux";
import NotFound from "../layout/NotFound";


const AttendanceByStudent = ({subjects:{data},attendance:{subject,activity},addAttendanceByStudent}) => {

    const role = useSelector(state => {
        return state.auth.role;
    });

    const [formData, setFormData] = useState({
        code: ""
    });

    const { code } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {

        e.preventDefault();
        addAttendanceByStudent(code)
    };

    const infoView = (
      <div className="info-text-div">
          <p style={{color: '#e6ffff'}}>Tocmai s-a adăugat o prezență la dispiciplina {subject} pentru activitatea de {activity}</p>
      </div>
    );

    const permissionForStudent = (
        <Container className='attendanceByStudent'>
            <div className="add-code-form">
                <p className="lead">
                    <i className="fas fa-user" /> Introduceți codul pentru prezență
                </p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group-att">
                        <input
                            type="text"
                            placeholder="Cod prezență"
                            name="code"
                            value={code}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <input type="submit"  className="btnAddAtt" value="Salvează prezență" />
                </form>
            </div>
            <div className="info-attendance-div">
                {(subject !== "" && activity !== "") && infoView}
            </div>
        </Container>
    );

    return (
        <div>
            {role === 'STUDENT' ? permissionForStudent : <NotFound/>}
        </div>
    );
};
AttendanceByStudent.propTypes = {
    attendance: PropTypes.object.isRequired,
    subjects: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addAttendanceByStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    attendance: state.attendance,
    subjects: state.subjects
});

export default connect(mapStateToProps, {addAttendanceByStudent})(AttendanceByStudent);