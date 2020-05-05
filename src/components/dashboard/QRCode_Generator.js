import {connect} from "react-redux";
import PropTypes from "prop-types";
import QRCode from 'qrcode.react';
import React, { Fragment} from 'react';
import {getQRCode} from "../../store/attendance/qrCodeActions";

const QRCode_Generator = ({attendance, getQRCode}) => {
    const visibleQR = (
        <QRCode value={attendance.value}/>
    );

    const notVisibleQR = (
        <div>
            Niciun cod QR generat
        </div>
    );

    return (
        <Fragment>
            {attendance.visible ? visibleQR : notVisibleQR}
        </Fragment>

    );
};

QRCode_Generator.propTypes = {
    attendance: PropTypes.object.isRequired,
    getQRCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    attendance: state.attendance,
});

export default connect(mapStateToProps, {getQRCode})(QRCode_Generator);
