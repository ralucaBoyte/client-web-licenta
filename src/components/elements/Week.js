import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setWeek} from "../../store/attendance/qrCodeActions";
import Spinner from "../layout/Spinner";

const weeks = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
];

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

const Week = ({setWeek}) => {
    const classes = useStyles();
    const [weekId, setWeekId] = useState(1);

    const handleChange = (event) => {
        setWeekId(event.target.value);
        setWeek(event.target.value);
    };


    return (

        <div style={activity_style}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label" min="1" max="14">Week</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    value={weekId}
                    min = "1"
                    max = "14"
                    onChange={handleChange}
                >
                    {weeks.map(week => (
                        <MenuItem value={week} key={week}>Week {week}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

const activity_style = {
    display: 'flex'
};

Week.propTypes = {
    setWeek: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    activities: state.subjects.activities
});
export default connect(mapStateToProps, {setWeek})(Week);
