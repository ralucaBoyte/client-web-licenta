import React from "react";
import { connect } from "react-redux";
import {getSubjects,setCurrentSubject} from "../../store/subjects/subjectActions";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {StyledTableCell, StyledTableRow} from "../../utils/styles/StyleTableElements";
import '../../utils/styles/Tables.css';
import {getStudentsBySubjects} from "../../store/student/studentActions";

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

const SubjectsTable = ({getStudentsBySubjects,setCurrentSubject,getSubjects, subjects, loading, students}) => {

    if (loading) {
        getSubjects();
    }

    function handleSelectTableRow (subjectId){

      setCurrentSubject(subjectId);
      getStudentsBySubjects([subjectId]);
      students = true;
    }

    const classes = useStyles();

    let rows;
    let noSubjects = true;
    if(subjects !== null){
        rows = subjects.map(subject => {
            return {
                id: subject.id,
                name: subject.name,
                credits: subject.credits,
                specId: subject.specId,
                year: subject.year,
                selected: false
            }
        });
        noSubjects = false;
    }
    else{
        noSubjects = true;
    }

    const notVisibleSubjects = (
        <p className='subjectAttendanceDiv'>Nu exista discipline pentru dumneavoastra</p>
    );

    const visibleSubjects = (
        <div className='subjectAttendanceDiv'>
            <TableContainer component={Paper} id='subjectTableId'>
                <Table
                    className={classes.table}
                    aria-label="customized table"
                    id='subjectTableId'
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Nume&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">Credite&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">Id specializare&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">An&nbsp;</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map((row) => (
                                <StyledTableRow
                                    key={row.id}
                                    className = {row.selected ? 'background-hover' : null }
                                    onClick={() => {handleSelectTableRow(row.id); row.selected = true;}}
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
        </div>
    );

    return (
            noSubjects ? notVisibleSubjects : visibleSubjects
    );
};
SubjectsTable.propTypes = {
    getSubjects: PropTypes.func.isRequired,
    setCurrentSubject: PropTypes.func.isRequired,
    getStudentsBySubjects: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    subjects: PropTypes.array,
    students: PropTypes.element,
};

const mapStateToProps = state => ({
    subjects: state.subjects.data,
    loading: state.subjects.loading,
    students: state.students.visible
});

export default connect(
    mapStateToProps,
    {getSubjects,setCurrentSubject,getStudentsBySubjects}
)(SubjectsTable);
