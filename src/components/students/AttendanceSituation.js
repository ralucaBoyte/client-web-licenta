import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Container} from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {StyledTableCell, StyledTableRow} from "../../utils/styles/StyleTableElements";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {makeStyles} from "@material-ui/core/styles";
import '../../utils/styles/Tables.css';
import {setCurrentStudent} from "../../store/student/studentActions";
import {getAttendanceByStudent, getAttendanceByTeacher} from "../../store/attendance/attendanceActions";

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

const AttendanceSituation = ({students:{currentStudent},auth:{role},attendance:{loadingForTeacher,loadingForStudent,dataByTeacher,dataByStudent,visible},getAttendanceByStudent,getAttendanceByTeacher}) => {

    if (loadingForTeacher) {
        if(currentStudent != null)
            getAttendanceByTeacher(currentStudent);
    }

    if(loadingForStudent){
        if(role === 'STUDENT')
            getAttendanceByStudent();
    }

    const classes = useStyles();
    let rowsAttForT, rowsAttForS;
    if(dataByTeacher.length !==0 )
    {
        rowsAttForT = dataByTeacher.map(data => {
            return {
                id: data.id,
                course: data.course,
                activity: data.activity,
                professor: data.professor,
                date: data.date,
                selected: false
            }});
    }
    else{
        rowsAttForT =[];
    }

    if(dataByStudent.length !==0 )
    {
        rowsAttForS = dataByStudent.map(data => {
            return {
                id: data.id,
                course: data.course,
                activity: data.activity,
                professor: data.professor,
                date: data.date,
                selected: false
            }});
        console.info(rowsAttForS);
    }
    else{
        rowsAttForS =[];
    }


    const permissionForStudent = (
        <Container style={{marginLeft:'10px'}}>
            <h2 style={{fontSize: '30px', marginBottom: '50px'}}>Situație Prezențe</h2>
            {rowsAttForS.length !== 0 ?
                (
                    <TableContainer component={Paper} id='subjectTableId'>
                        <Table
                            className={classes.table}
                            aria-label="customized table"
                            id='subjectTableId'
                        >
                            <TableHead className="tableHead" style={{backgroundColor: "blue"}}>
                                <TableRow className="tableHead">
                                    <StyledTableCell align="left">Disciplina&nbsp;</StyledTableCell>
                                    <StyledTableCell align="center">Activitate&nbsp;</StyledTableCell>
                                    <StyledTableCell align="center">Profesor&nbsp;</StyledTableCell>
                                    <StyledTableCell align="center">Dată&nbsp;</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsAttForS.map((row) => (
                                    <StyledTableRow
                                        key={row.id}
                                        className={row.selected ? 'background-hover' : null}
                                        onClick={() => {
                                            row.selected = true;
                                        }}
                                        value={row.id}
                                        hover={true}
                                    >
                                        <StyledTableCell key={row.course} component="th"
                                                         scope="row">{row.course}</StyledTableCell>
                                        <StyledTableCell key={row.activity}
                                                         align="center">{row.activity}</StyledTableCell>
                                        <StyledTableCell key={row.professor}
                                                         align="center">{row.professor}</StyledTableCell>
                                        <StyledTableCell key={row.date} align="center">{row.date}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
                :
                (<div>
                    <h3 style={{fontSize: '30px', marginBottom: '50px', fontColor: 'red'}}>Nu există prezențe înregistrate</h3>
                </div>)
            }
        </Container>
    );

    const permissionForTeacher = (
        <Container style={{marginLeft:'10px'}}>
            <h3 style={{fontSize: '30px', marginBottom: '50px'}}>Situație Prezențe</h3>
                    {rowsAttForT.length === 0 ? (
                        <TableContainer component={Paper} id='subjectTableId'>
                            <Table
                                className={classes.table}
                                aria-label="customized table"
                                id='subjectTableId'
                            >
                            <TableHead className="tableHead" style={{backgroundColor: "blue"}}>
                                <TableRow className="tableHead">
                                    <StyledTableCell align="left">Lispă prezențe&nbsp;</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow
                                    key={1}
                                    value={1}
                                    hover={true}
                                >
                                    <StyledTableCell key={'none'} component="th" scope="row">Pentru studentul selectat
                                        nu există prezențe înregistrate</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                            </Table>
                        </TableContainer>
                        )
                        :
                        (
                        <TableContainer component={Paper} id='subjectTableId'>
                        <Table
                            className={classes.table}
                            aria-label="customized table"
                            id='subjectTableId'
                        >
                        <TableHead className="tableHead" style={{backgroundColor: "blue"}}>
                            <TableRow className="tableHead">
                                <StyledTableCell align="left">Disciplina&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Activitate&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Profesor&nbsp;</StyledTableCell>
                                <StyledTableCell align="center">Dată&nbsp;</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsAttForT.map((row) => (
                                <StyledTableRow
                                    key={row.id}
                                    className={row.selected ? 'background-hover' : null}
                                    onClick={() => {
                                        row.selected = true;
                                    }}
                                    value={row.id}
                                    hover={true}
                                >
                                    <StyledTableCell key={row.course} component="th"
                                                     scope="row">{row.course}</StyledTableCell>
                                    <StyledTableCell key={row.activity}
                                                     align="center">{row.activity}</StyledTableCell>
                                    <StyledTableCell key={row.professor}
                                                     align="center">{row.professor}</StyledTableCell>
                                    <StyledTableCell key={row.date} align="center">{row.date}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                        </Table>
                        </TableContainer>
                        )
                    }
        </Container>
    );

    return(
        <div >
            {role === 'STUDENT' ? permissionForStudent : (visible && permissionForTeacher )}

        </div>
    );
};

AttendanceSituation.propTypes = {
    students: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    attendance: PropTypes.object.isRequired,
    getAttendanceByTeacher: PropTypes.func.isRequired,
    getAttendanceByStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    students: state.students,
    auth: state.auth,
    attendance: state.attendance
});

export default connect(
    mapStateToProps, {getAttendanceByTeacher,getAttendanceByStudent}
)(AttendanceSituation);