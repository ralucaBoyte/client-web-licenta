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
import {getGroups, getStudentsByGroup, setCurrentGroup} from "../../store/student/studentActions";

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

const GroupsList = ({groups:{loading,groups},getGroups,setCurrentGroup,getStudentsByGroup}) => {

    if (loading) {
        getGroups();
    }

    function handleSelectTableRow (groupId){
        console.log(groupId);
        setCurrentGroup(groupId);
        getStudentsByGroup(groupId);
    }

    const classes = useStyles();
    let rowsGroups;
    rowsGroups = groups.map(group => {
        return {
            groupId: group.groupId,
            name: group.name,
            specId: group.specId,
            year: group.year,
            selected: false
        }
    });

    return(
        <Container>
            <h3 style={{fontSize: '30px', marginBottom: '50px'}}>Grupe</h3>
            <TableContainer component={Paper} id='subjectTableId'>
                <Table
                    className={classes.table}
                    aria-label="customized table"
                    id='subjectTableId'
                >
                    <TableHead className="tableHead" style={{backgroundColor: "blue"}}>
                        <TableRow className="tableHead">
                            <StyledTableCell align="left">Grupa&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">Specializare&nbsp;</StyledTableCell>
                            <StyledTableCell align="center">An&nbsp;</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsGroups.map((row) => (
                            <StyledTableRow
                                key={row.groupId}
                                className = {row.selected ? 'background-hover' : null }
                                onClick={() => {handleSelectTableRow(row.groupId); row.selected = true;}}
                                value={row.groupId}
                                hover = {true}
                            >
                                <StyledTableCell key={row.name} component="th" scope="row">{row.name}</StyledTableCell>
                                <StyledTableCell key={row.specId} align="center">{row.specId}</StyledTableCell>
                                <StyledTableCell key={row.year} align="center">{row.year}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

GroupsList.propTypes = {
    groups: PropTypes.object.isRequired,
    setCurrentGroup: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getGroups: PropTypes.func.isRequired,
    getStudentsByGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    groups: state.groups,
    auth: state.auth
});

export default connect(
    mapStateToProps, {getGroups,setCurrentGroup,getStudentsByGroup}
)(GroupsList);