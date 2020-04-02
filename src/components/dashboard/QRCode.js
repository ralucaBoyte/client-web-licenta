import {connect} from "react-redux";
import PropTypes from "prop-types";
import React, { Component, useState }  from 'react';
import {getQRCode} from "../../store/attendance/qrCodeActions";

const QRCode = ({attendance, getQRCode}) => {
    const [qrCode, setQRCode] = useState(null);

    const handleGetQRCode = (event) => {
        getQRCode();
        setQRCode(attendance.qrCode);
    };

    return (
       <div>
               <button className='btn btn-primary' onClick={handleGetQRCode}>
                   <i className='fas fa-user-minus' /> Get QR code
               </button>
       </div>
    );
};

QRCode.propTypes = {
    attendance: PropTypes.object.isRequired,
    getQRCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    attendance: state.attendance,
});

export default connect(mapStateToProps, {getQRCode})(QRCode);
