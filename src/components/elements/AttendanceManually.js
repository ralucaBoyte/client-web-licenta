import React, {Fragment, useState} from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import {getSubjects,setCurrentSubject} from "../../store/subjects/subjectActions";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {StyledTableCell, StyledTableRow} from "../../utils/styles/StyleTableElements";
import {getStudentsBySubjects,setCurrentStudent} from "../../store/student/studentActions";
import {addAttendance} from "../../store/attendance/qrCodeActions";

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
    row: {
        "&:hover": {
            background: "red"
        }
    }
});

const AttendaceManually = ({attendance,activities,subjects,students,loading,getStudentsBySubjects,setCurrentStudent,addAttendance}) => {

    const classes = useStyles();

    if (loading) {
        if(subjects!=null)
            getStudentsBySubjects([subjects]);
    }

    let rows;
    if(students.data!=null)
        rows = students.data.map(student => {
            return {
                name: student,
                selected: false
            }
        });
    else
        rows = [{name: "no students",selected: false}];


    function handleSelectTableRow(student) {
        console.log("student param:" +student);
        setCurrentStudent(student);
        console.log("selected student: "+students.currentStudent);
        if(attendance) {
            console.log("++++ "+attendance);
            addAttendance(attendance, student);
        }
        else
            console.log("Generati o prezenta!!!"); //TODO: mesaj pe ecran
    }

    const visibleStudents = (
        <Table
            className={classes.table}
            aria-label="customized table"
        >
            <TableHead>
                <TableRow>
                    <StyledTableCell align="left">Username of students&nbsp;</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <StyledTableRow
                        key={row.name}
                        onClick={() => {handleSelectTableRow(row.name); row.selected = true;}}
                        value={row.name}
                        hover={true}
                        // style={
                        //     row.selected === true ? {background: '#EDE7E5'} : { background: '#8D8A89' }
                        // }
                    >
                        <StyledTableCell key={row.name} component="th" scope="row">{row.name}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    );

    const notVisibleStudents = (
        <div>
            Selectati o materie
        </div>
    );

    return (
        //TODO: try to change on ListGroup
        <TableContainer component={Paper} >
            {students.visible ? visibleStudents : notVisibleStudents}
        </TableContainer>
    );
};

AttendaceManually.propTypes = {
    getStudentsBySubjects: PropTypes.func.isRequired,
    setCurrentStudent: PropTypes.func.isRequired,
    addAttendance: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    students: PropTypes.element,
    activities: PropTypes.element,
    attendance: PropTypes.element
};

const mapStateToProps = state => ({
    students: state.students,
    loading: state.students.loading,
    subjects: state.subjects.currentSubject,
    activities: state.activities.currentActivityType,
    attendance: state.attendance.attendance_id
});

export default connect(mapStateToProps,{getStudentsBySubjects,setCurrentStudent,addAttendance})(AttendaceManually)