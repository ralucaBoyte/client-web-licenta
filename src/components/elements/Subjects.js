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
import {setCurrentSubject} from "../../store/attendance/attendanceViewActions";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

const Subjects = ({getSubjects, subjects, loading, setCurrentSubject}) => {
    const classes = useStyles();
    const [selectedRow, setSelectedRow] = useState(1);
    const [subjectId, setSubjectId] = useState(1);


    const handleChange = (event) => {
        setSubjectId(event.target.value);
        console.log(event.target.value);
        setCurrentSubject(event.target.value);
    };

    return (

        <div style={activity_style}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Subject</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    value={subjectId}
                    onChange={handleChange}
                >
                    {subjects.map(subject => (
                        <MenuItem value={subject.id} key={subject.id}>{subject.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

const activity_style = {
    display: 'flex'
};
Subjects.propTypes = {
    getSubjects: PropTypes.func.isRequired,
    setCurrentSubject: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    subjects: PropTypes.array
};

const mapStateToProps = state => ({
    subjects: state.subjects.data,
    loading: state.subjects.loading
});

export default connect(
    mapStateToProps,
    {setCurrentSubject}
)(Subjects);
