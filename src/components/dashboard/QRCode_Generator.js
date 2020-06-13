import {connect} from "react-redux";
import PropTypes from "prop-types";
//import QRCode from 'qrcode.react';
import QRCode from "react-qr-code";
import React, { Fragment} from 'react';
import {getQRCode} from "../../store/attendance/qrCodeActions";

const QRCode_Generator = ({attendance, getQRCode}) => {
    const visibleQR = (
        <QRCode value={attendance.value}/>
    );

    const notVisibleQR = (
        <div>
            No QR code generated
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
