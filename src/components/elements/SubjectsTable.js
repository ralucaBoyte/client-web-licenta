import React, {useState} from "react";
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
import Tables from '../../utils/styles/Tables.css'

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

const SubjectsTable = ({setCurrentSubject,getSubjects, subjects, loading, students}) => {

    // const [selected, setSelected] = useState(null);
    let selected = false;

    if (loading) {
        getSubjects();
    }

    function handleSelectTableRow (subjectId){
      console.log(subjectId);
      setCurrentSubject(subjectId);
      selected = true;
      students = true;
    }

    const classes = useStyles();

    let rows;
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


    return (
        <TableContainer component={Paper}>
            <Table
                className={classes.table}
                aria-label="customized table"
            >
                <TableHead>
                    <TableRow>
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
    );
};
SubjectsTable.propTypes = {
    getSubjects: PropTypes.func.isRequired,
    setCurrentSubject: PropTypes.func.isRequired,
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
    {getSubjects,setCurrentSubject}
)(SubjectsTable);
