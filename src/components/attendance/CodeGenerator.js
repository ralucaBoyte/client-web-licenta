import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment} from 'react';

const CodeGenerator = ({attendance}) => {

    const visibleCode = (
        <Fragment>
            <div className="attendanceCodeText">
                <p>{attendance.value}</p>
            </div>
        </Fragment>
    );

    const notVisibleCode = (
        <div>
            Nu este generat cod pentru prezență
        </div>
    );

    return (
        <div>
            <Fragment>
                {attendance.visible ? visibleCode : notVisibleCode}
            </Fragment>
        </div>
    );
};

CodeGenerator.propTypes = {
    attendance: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    attendance: state.attendance,
});

export default connect(mapStateToProps)(CodeGenerator);
