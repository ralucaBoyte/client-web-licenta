import React from "react";
import { connect } from "react-redux"
import PropTypes from "prop-types";
import {makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {StyledTableCell, StyledTableRow} from "../../utils/styles/StyleTableElements";
import {getStudentsBySubjects,setCurrentStudent} from "../../store/student/studentActions";
import {addAttendance} from "../../store/attendance/attendanceActions";
import "../../App.css";
import {toast} from "react-toastify";

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

const AttendanceManually = ({attendance,subjects,students,loading,getStudentsBySubjects,setCurrentStudent,addAttendance}) => {

    const classes = useStyles();
    const noStudents = "Nu există studenți la materia selectată";
    let rows;

    if (loading) {
        if(subjects!=null)
            getStudentsBySubjects([subjects]);
    }


    if(students.data.length !== 0)
        rows = students.data.map(student => {
            return {
                name: student,
                selected: false
            }
        });
    else
        rows = [{name: noStudents,selected: false}];


    function handleSelectTableRow(student) {
        setCurrentStudent(student);
        if(attendance) {
            if (student !== noStudents) {
                console.log("++++ " + attendance);
                addAttendance(attendance, student);
            }
        }
        else
            toast.info("Generati un cod de prezenta");
    }

    const visibleStudents = (
        <TableContainer component={Paper} >
            <Table
                className={classes.table}
                aria-label="customized table"
            >
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="left">Numele de utilizator a studenților înscriși&nbsp;</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow
                            key={row.name}
                            onClick={() => {handleSelectTableRow(row.name); row.selected = true;}}
                            value={row.name}
                            hover={true}
                        >
                            <StyledTableCell key={row.name} component="th" scope="row">{row.name}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const notVisibleStudents = (
        <p className='studentTable'>Studenții vor fi afișați când se va selecta o materie</p>
    );

    return (
        <div>
            {students.visible ? visibleStudents : notVisibleStudents}
        </div>
    );
};

AttendanceManually.propTypes = {
    getStudentsBySubjects: PropTypes.func.isRequired,
    setCurrentStudent: PropTypes.func.isRequired,
    addAttendance: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    students: PropTypes.element,
    attendance: PropTypes.element
};

const mapStateToProps = state => ({
    students: state.students,
    loading: state.students.loading,
    subjects: state.subjects.currentSubject,
    attendance: state.attendance.attendance_id
});

export default connect(mapStateToProps,{getStudentsBySubjects,setCurrentStudent,addAttendance})(AttendanceManually)