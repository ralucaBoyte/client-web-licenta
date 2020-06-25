import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setCurrentActivity} from "../../store/attendance/attendanceActions";
import {getActivityTypesByTeacher} from "../../store/subjects/subjectActions";
import classnames from 'classnames';


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

const ActivityTypes = ({setCurrentActivity,getActivityTypesByTeacher,activities,loading,attendanceErr}) => {

    const classes = useStyles();
    const [typeId, setTypeId] = useState("");

    if(loading){
        getActivityTypesByTeacher();
    }

    const handleChange = (event) => {
        setTypeId(event.target.value);
        setCurrentActivity(event.target.value);
    };


    let rows;
    rows = activities.map(activity => {
        return {
            typeId: activity.typeId,
            name: activity.name
        }
    });


    return (
        <FormControl className={classnames(classes.formControl,{'is-invalid': attendanceErr.name})} >
            <InputLabel id="demo-controlled-open-select-label" className={classnames('',{'is-invalid': attendanceErr.name})}>Activitate</InputLabel>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={typeId}
                onChange={handleChange}
            >
                {rows.map(row => (
                    <MenuItem value={row.typeId} key={row.typeId}>{row.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

ActivityTypes.propTypes = {
    setCurrentActivity: PropTypes.func.isRequired,
    getActivityTypesByTeacher: PropTypes.func.isRequired,
    activities: PropTypes.array,
    loading: PropTypes.bool,
    attendanceErr: PropTypes.element
};

const mapStateToProps = state => ({
    activities: state.activities.data,
    loading: state.activities.loading,
    attendanceErr: state.attendance.error
});

export default connect(mapStateToProps, {setCurrentActivity,getActivityTypesByTeacher})(ActivityTypes);
