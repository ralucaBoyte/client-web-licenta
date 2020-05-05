import React, {useState} from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import {getSubjects} from "../../store/subjects/subjectActions";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const columns = [
    {
        name: 'Id',
        selector: 'subject_id',
        sortable: true,
    },
    {
        name: 'Credits',
        selector: 'credits',
        sortable: true,
    },
    {
        name: 'Name',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Year',
        selector: 'year',
        sortable: true,
    },
    {
        selector: "options",
        sortable: false,
        center: true
    }
];

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

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

const SubjectsTable = ({getSubjects, subjects, loading}) => {

    const [selected, setSelected] = useState(null);

    if (loading) {
        getSubjects();
    }

    const selectTableRow = event => {
      console.log(event.target.getAttribute("data-item"));
    };

    const classes = useStyles();

    let rows;
    rows = subjects.map(subject => {
       return {
           subject_id: subject.subject_id,
           name: subject.name,
           credits: subject.credits,
           year: subject.year,
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
                        <StyledTableCell align="right">Credits&nbsp;</StyledTableCell>
                        <StyledTableCell align="right">Year&nbsp;</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow
                            key={row.subject_id}
                            onClick={selectTableRow}
                            value={row.subject_id}
                        >
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.credits}</StyledTableCell>
                            <StyledTableCell align="right">{row.year}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
SubjectsTable.propTypes = {
    getSubjects: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    subjects: PropTypes.array
};

const mapStateToProps = state => ({
    subjects: state.subjects.data,
    loading: state.subjects.loading
});

export default connect(
    mapStateToProps,
    {getSubjects}
)(SubjectsTable);
