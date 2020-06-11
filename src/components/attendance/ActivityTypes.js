import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setCurrentActivity} from "../../store/attendance/qrCodeActions";
import {getActivityTypesByTeacher} from "../../store/subjects/subjectActions";
import Tables from "../../utils/styles/Tables.css";
import classnames from 'classnames';

// const options = [
//     { key: 1, text: 'Curs' },
//     { key: 2, text: 'Laborator' },
//     { key: 3, text: 'Seminar' },
// ];

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
    const [open, setOpen] = useState(false);
    const [typeId, setTypeId] = useState("");
    let currentActivity = "";


    if(loading){
        getActivityTypesByTeacher();
    }

    const handleChange = (event) => {
        setTypeId(event.target.value);
        setCurrentActivity(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    let rows;
    rows = activities.map(activity => {
        return {
            typeId: activity.typeId,
            name: activity.name
        }
    });

    function handleSelectedActivity() {

    }

    //div/container - folosesc cand vreau sa returnez mai multe componente
    return (

        <FormControl className={classnames(classes.formControl,{'is-invalid': attendanceErr.name})} >
            <InputLabel id="demo-controlled-open-select-label" className={classnames('',{'is-invalid': attendanceErr.name})}>Activity type</InputLabel>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={typeId}
                onChange={handleChange}
            >
                {rows.map(row => (
                    <MenuItem value={row.typeId} key={row.typeId} onClick={handleSelectedActivity}>{row.name}</MenuItem>
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
