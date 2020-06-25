import React from "react";
import {connect, useSelector} from "react-redux";
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
import { getSubjectsForStudent, setCurrentSubject} from "../../store/subjects/subjectActions";
import NotFound from "../layout/NotFound";
import "../../utils/styles/Containers.css"
import {getGradesBySubject} from "../../store/student/studentActions";


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

const SubjectsStudent = ({subjects:{loading,data},grades:{visible,grades},getGradesBySubject,setCurrentSubject,getSubjectsForStudent}) => {

    let currentSubject = "";

    const role = useSelector(state => {
        return state.auth.role;
    });

    if (loading) {
        getSubjectsForStudent();
    }

    function handleSelectTableRow (subjectId,subject){

        currentSubject = subject;
        setCurrentSubject(subjectId);
        getGradesBySubject(subjectId);
        console.log(currentSubject);
    }

    const classes = useStyles();

    let rows = [];
    if(data.length !== 0 ){
        rows = data.map(subject => {
            return {
                id: subject.id,
                name: subject.name,
                credits: subject.credits,
                specId: subject.specId,
                year: subject.year,
                selected: false
            }
        });
    }

    let rowsGrades = [];
    if(visible && grades.length !== 0){
        rowsGrades = grades.map(grade => {
            return{
                id: grade.gradeId,
                activity: grade.typeId,
                teacher: grade.teacher,
                value: grade.value,
                subject: grade.subject,
                date: grade.date,
                selected: false
            }
        })
    }

    const viewGrades = (
        <Container className="gradesTableContainer">
            <h3 style={{fontSize: '30px', marginBottom: '50px', marginTop: '50px'}}>Situație note {currentSubject}</h3>

            {rowsGrades.length === 0 ? (
                    <TableContainer component={Paper} id='gradeTableId'>
                        <Table
                            className={classes.table}
                            aria-label="customized table"
                            id='gradeTableId'
                        >
                            <TableHead className="tableHead" style={{backgroundColor: "blue"}}>
                                <TableRow className="tableHead">
                                    <StyledTableCell align="left">Lispă note&nbsp;</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow
                                    key={1}
                                    value={1}
                                    hover={true}
                                >
                                    <StyledTableCell key={'none'} component="th" scope="row">Pentru disciplina selectată
                                        nu există note înregistrate</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                            {/*</div>*/}
                        </Table>
                    </TableContainer>
                )
                :
                (
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="customized table"
                            id='gradeTableId'
                        >
                            {/*<div style={{width : '100%'}}>*/}
                            <TableHead className="tableHead" style={{backgroundColor: "blue"}}>
                                <TableRow className="tableHead">
                                    <StyledTableCell align="left">Activitate&nbsp;</StyledTableCell>
                                    <StyledTableCell align="center">Dată&nbsp;</StyledTableCell>
                                    <StyledTableCell align="center">Profesor&nbsp;</StyledTableCell>
                                    <StyledTableCell align="center">Notă&nbsp;</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsGrades.map((row) => (
                                    <StyledTableRow
                                        key={row.gradeId}
                                        className={row.selected ? 'background-hover' : null}
                                        onClick={() => {
                                            row.selected = true;
                                        }}
                                        value={row.gradeId}
                                        hover={true}
                                    >
                                        <StyledTableCell key={row.activity} component="th"
                                                         scope="row">{row.activity}</StyledTableCell>
                                        <StyledTableCell key={row.date}
                                                         align="center">{row.date}</StyledTableCell>
                                        <StyledTableCell key={row.teacher}
                                                         align="center">{row.teacher}</StyledTableCell>
                                        <StyledTableCell key={row.value} align="center">{row.value}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
        </Container>
    );


    const permissionForStudent = (
        <Container className="subjectStudentContainer">
            <h3 style={{fontSize: '30px', marginBottom: '50px'}}>Discipline curente</h3>
            <TableContainer component={Paper} id='subjectTableId'>
                <Table
                    className={classes.table}
                    aria-label="customized table"
                    id='subjectTableId'
                >
                    <TableHead className="tableHead" style={{backgroundColor: "blue"}}>
                        <TableRow className="tableHead">
                            <StyledTableCell align="left">Discipline&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">Credite&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">Id specializare&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">An&nbsp;</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow
                                key={row.id}
                                className = {row.selected ? 'background-hover' : null }
                                onClick={() => {handleSelectTableRow(row.id,row.name); row.selected = true;}}
                                value={row.id}
                                hover = {true}
                            >
                                <StyledTableCell key={row.name} component="th" scope="row">{row.name}</StyledTableCell>
                                <StyledTableCell key={row.credits} align="center">{row.credits}</StyledTableCell>
                                <StyledTableCell key={row.specId} align="center">{row.specId}</StyledTableCell>
                                <StyledTableCell key={row.year} align="center">{row.year}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {visible ? viewGrades : <p style={{fontSize: '25px', marginBottom: '50px', marginTop: '100px'}}>Selectați o materie pentru a vizualiza notele</p>}
        </Container>
    );


    return(
        <div>
            {role === 'STUDENT' ? permissionForStudent : <NotFound/>}
        </div>
    );
};

SubjectsStudent.propTypes = {
    subjects: PropTypes.object.isRequired,
    getSubjectsForStudent: PropTypes.func.isRequired,
    setCurrentSubject: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    grades: PropTypes.object.isRequired,
    getGradesBySubject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    subjects: state.subjects,
    auth: state.auth,
    grades: state.grades
});

export default connect(
    mapStateToProps, {getGradesBySubject,setCurrentSubject,getSubjectsForStudent}
)(SubjectsStudent);