import React, {useState} from "react";
import {connect, useDispatch} from "react-redux";
import {getSubjects} from "../../store/subjects/subjectActions";
import PropTypes from "prop-types";
import { MDBDataTable, MDBBtn, MDBInput } from "mdbreact";
import MaterialTable from 'material-table'
import {setCurrentSubject} from "../../store/attendance/qrCodeActions";
import Spinner from "../layout/Spinner";
import {deleteAttendances, getAttendances} from "../../store/attendance/attendanceViewActions";
import DeleteIcon from '@material-ui/icons/Delete';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from '@material-ui/core/Paper';
import Table from "@material-ui/core/Table";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
const AttendancesTable = ({attendances, attendanceView, attendanceInfo, loadingAttendances}) => {

    const dispatch = useDispatch();
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    const classes = useStyles();
    let btnTapped  = (event) => {
        console.log(event);
        dispatch(deleteAttendances(event, attendanceView.subject_id, attendanceView.activity_id, attendanceView.week));
        dispatch(getAttendances(attendanceView.subject_id, attendanceView.activity_id, attendanceView.week));
    };

  // const [data, setData] = useState(attendances);
            return (attendances ? <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student name</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Activity Type</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>

            {attendances.map(attendance => (
                    <TableRow key={attendance.student_id}>
                        <TableCell>{attendance.student_id}</TableCell>
                        <TableCell>{attendance.name}</TableCell>
                        <TableCell>{attendance.type}</TableCell>
                        <TableCell>
                            <IconButton
                                onClick={() => btnTapped(attendance.student_id)}>
                                <DeleteIcon color="secondary" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                )
                )
            }
                </TableBody>
                </Table>
            </TableContainer> :  (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Student name</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Activity Type</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
                )

    )
};
AttendancesTable.propTypes = {
    loadingAttendances: PropTypes.bool,
    attendances: PropTypes.array
};

const mapStateToProps = state => ({
    attendances: state.attendances_view.attendances,
    attendanceView: state.attendances_view,
    loadingAttendances: state.attendances_view.loadingAttendances,
    attendanceInfo: state.attendances_view
});

export default connect(
    mapStateToProps,
    {getSubjects, setCurrentSubject}
)(AttendancesTable);
