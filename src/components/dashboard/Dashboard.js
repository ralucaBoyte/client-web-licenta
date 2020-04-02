import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQRCode } from "../../store/attendance/qrCodeActions";
import QRCode from "./QRCode";
const Dashboard = ({auth,getQRCode}) => {
  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <QRCode/>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
    getQRCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {getQRCode})(Dashboard);
