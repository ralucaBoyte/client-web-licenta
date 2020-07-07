import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setRemainingTime} from "../../store/attendance/qrCodeActions";

const valabilityTime = [
    { key: 0, time: 3 },
    { key: 1, time: 5 },
    { key: 2, time: 10 },
    { key: 3,  time: 15 },
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

const RemainingTime = ({setRemainingTime}) => {
    const classes = useStyles();
    const [validity, setValidity] = useState(3);

    const handleChange = (event) => {
        console.log(event.target);
        setValidity(event.target.value);
        setRemainingTime(event.target.value);
    };


    return (
        <div style={time_style}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">QR expiration</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    value={validity}
                    onChange={handleChange}
                >

                    {valabilityTime.map(remaining => (
                        <MenuItem value={remaining.time} key={remaining.key}>{remaining.time} minutes</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

const time_style = {
    display: 'flex'
};

RemainingTime.propTypes = {
    setRemainingTime: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    activities: state.subjects.activities
});
export default connect(mapStateToProps, {setRemainingTime})(RemainingTime);
