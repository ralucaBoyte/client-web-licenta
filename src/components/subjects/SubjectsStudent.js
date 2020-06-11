import React, {useState} from "react";
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
import {getSubjects, getSubjectsForStudent, setCurrentSubject} from "../../store/subjects/subjectActions";
import NotFound from "../layout/NotFound";

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

const SubjectsStudent = ({subjects:{loading,data},setCurrentSubject,getSubjectsForStudent}) => {

    // const [selected, setSelected] = useState(null);
    let selected = false;

    const role = useSelector(state => {
        return state.auth.role;
    });

    if (loading) {
        getSubjectsForStudent();
    }

    function handleSelectTableRow (subjectId){
        console.log(subjectId);
        setCurrentSubject(subjectId);
        // getStudentsBySubjects([subjectId]);
        // setStudents
        selected = true;
        // students = true;
    }

    const classes = useStyles();

    let rows;
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

    const permissionForStudent = (
        <Container>
            <p>Discipline curente</p>
            <TableContainer component={Paper} id='subjectTableId'>
                <Table
                    className={classes.table}
                    aria-label="customized table"
                    id='subjectTableId'
                >
                    <TableHead className="tableHead" style={{backgroundColor: "blue"}}>
                        <TableRow className="tableHead">
                            <StyledTableCell align="left">Subjects&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">Credits&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">Specialization Id&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">Year&nbsp;</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow
                                key={row.id}
                                className = {row.selected ? 'background-hover' : null }
                                onClick={() => {handleSelectTableRow(row.id); row.selected = true;}}
                                value={row.id}
                                // style = {{hover: {background: '#9EC8BC'}}} //TODO: change color on Click
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
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    subjects: state.subjects,
    auth: state.auth
});

export default connect(
    mapStateToProps, {setCurrentSubject,getSubjectsForStudent}
)(SubjectsStudent);