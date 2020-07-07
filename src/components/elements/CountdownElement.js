import React, { Fragment} from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {connect} from "react-redux";
import PropTypes from "prop-types";
//import "./styles.css";

const minuteSeconds = 60;
const hourSeconds = 3600;
//const daySeconds = 86400;

const timerProps = {
    isPlaying: true,
    size: 100,
    strokeWidth: 6
};

const renderTime = (dimension, time) => {
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
        </div>
    );
};

const getTimeSeconds = time => (minuteSeconds - time / 1000) | 0;
const getTimeMinutes = time => ((time % hourSeconds) / minuteSeconds) | 0;
// const getTimeHours = time => ((time % daySeconds) / hourSeconds) | 0;
// const getTimeDays = time => (time / daySeconds) | 0;
const CountdownElement = ({attendance}) => {
    const stratTime = Math.round((new Date()).getTime() / 1000); // use UNIX timestamp in seconds
    const endTime = stratTime + 15 * 60; // use UNIX timestamp in seconds

    console.log(stratTime);
    const remainingTime = endTime - stratTime;
    // const days = Math.ceil(remainingTime / daySeconds);
    // const daysDuration = days * daySeconds;
    return (
        attendance.coundtdownvisible ? (
                <div>
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[["#EF798A"]]}
                        duration={hourSeconds}
                        initialRemainingTime={remainingTime % hourSeconds}
                        onComplete={totalElapsedTime => [
                            remainingTime - totalElapsedTime > minuteSeconds
                        ]}
                    >
                        {({ elapsedTime }) =>
                            renderTime(
                                "minutes",
                                getTimeMinutes(hourSeconds - elapsedTime / 1000)
                            )
                        }
                    </CountdownCircleTimer>
                    <CountdownCircleTimer
                        {...timerProps}
                        colors={[["#218380"]]}
                        duration={minuteSeconds}
                        initialRemainingTime={remainingTime % minuteSeconds}
                        onComplete={totalElapsedTime => [remainingTime - totalElapsedTime > 0]}
                    >
                        {({ elapsedTime }) =>
                            renderTime("seconds", getTimeSeconds(elapsedTime))
                        }
                    </CountdownCircleTimer>
                </div>
    )
        :
            <div/>
    )
};

CountdownElement.propTypes = {
    attendance: PropTypes.object.isRequired,
};


const myStyle = {
    "display": "flex",
    "justify-content": "space-around",
    "font-family": "sans-serif",
    "text-align": "center",
    "margin-bottom": "10px"
};


const mapStateToProps = state => ({
    attendance: state.attendance,
});
export default connect(mapStateToProps, null)(CountdownElement);
