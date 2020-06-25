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
import {getStudentsByGroup, setCurrentStudent} from "../../store/student/studentActions";
import {getAttendanceByTeacher} from "../../store/attendance/attendanceActions";

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

const StudentsList = ({students:{loading, data, visibleFromGroup},getAttendanceByTeacher,currentGroup,getStudentsByGroup,setCurrentStudent}) => {

    const classes = useStyles();
    const noStudents = "Nu există studenți la materia selectată";
    let rows;

    if (loading) {
        if(currentGroup!=null)
            getStudentsByGroup(currentGroup);
    }


    if(data.length !== 0)
        rows = data.map(student => {
            return {
                name: student,
                selected: false
            }
        });
    else
        rows = [{name: noStudents,selected: false}];


    function handleSelectTableRow(student) {
        console.log("student param:" +student);
        setCurrentStudent(student);
        getAttendanceByTeacher(student);
    }
    const visibleList = (
        <Container>
            <h3 style={{fontSize: '30px', marginBottom: '50px'}}>Studenții din grupa selectată</h3>
            <TableContainer component={Paper} style={{width: "auto"}}>
                <Table
                    className={classes.table}
                    aria-label="customized table"
                    style={{maxWidth: '400px'}}
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
        </Container>

    );

    return(
        <div style={{marginRight: '200x'}}>
            {visibleFromGroup && visibleList}
        </div>
    );
};

StudentsList.propTypes = {
    students: PropTypes.object.isRequired,
    getStudentsByGroup: PropTypes.func.isRequired,
    setCurrentStudent: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    currentGroup: PropTypes.element,
    getAttendanceByTeacher: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    students: state.students,
    auth: state.auth,
    currentGroup: state.groups.currentGroup,
    getAttendanceByTeacher: state.attendance.isRequired
});

export default connect(
    mapStateToProps, {getStudentsByGroup,setCurrentStudent,getAttendanceByTeacher}
)(StudentsList);