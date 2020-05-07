import React, {  Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQRCode } from "../../store/attendance/qrCodeActions";
import QRCode_Generator from "./QRCode_Generator";

const Dashboard = ({attendance,getQRCode}) => {

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
        <QRCode_Generator/>
        <button className='btn btn-primary' onClick={() => getQRCode(attendance.activity_id)}>
            <i className='fas fa-user-minus' /> Generate qr code
        </button>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  attendance: PropTypes.element.isRequired,
  getQRCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  attendance: state.attendance
});

export default connect(mapStateToProps, {getQRCode})(Dashboard);
