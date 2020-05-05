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

const options = [
    { key: 1, text: 'Curs' },
    { key: 2, text: 'Laborator' },
    { key: 3, text: 'Seminar' },
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

const ActivityTypes = ({setCurrentActivity}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [typeId, setTypeId] = useState("");

    const handleChange = (event) => {
        setTypeId(event.target.value);
        setCurrentActivity(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Activity type</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    value={typeId}
                    onChange={handleChange}
                >

                    {options.map(option => (
                        <MenuItem value={option.key} key={option.key}>{option.text}</MenuItem>
                    ))}

                </Select>
            </FormControl>
        </div>
    );
};

ActivityTypes.propTypes = {
    setCurrentActivity: PropTypes.func.isRequired,
};

export default connect(null, {setCurrentActivity})(ActivityTypes);
