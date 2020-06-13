import React, {useState} from "react";
//import DataTable from "react-data-table-component";
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
import MaterialTable from 'material-table'
import {setCurrentSubject} from "../../store/attendance/qrCodeActions";
import Spinner from "../layout/Spinner";

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
    container: {
        width: '60%'
    },
    table: {
        //minWidth: 500,
        //width: '60%'
    },
    row: {
        "&:hover": {
            background: "red"
        }
    }
});

const AttendancesTable = ({attendances, loadingAttendances}) => {


    return loadingAttendances ? (
        <Spinner/>
    ) : (

        <MaterialTable
            title="Present students"
            columns={[
                { title: 'Student', field: 'student_id' },
                { title: 'Course', field: 'name' },
                { title: 'Type', field: 'type'}

            ]}
            data={attendances}
        />
    );
};
AttendancesTable.propTypes = {
    loadingAttendances: PropTypes.bool,
    attendances: PropTypes.array
};

const mapStateToProps = state => ({
    attendances: state.attendances_view.attendances,
    loadingAttendances: state.attendances_view.loadingAttendances
});

export default connect(
    mapStateToProps,
    {getSubjects, setCurrentSubject}
)(AttendancesTable);
