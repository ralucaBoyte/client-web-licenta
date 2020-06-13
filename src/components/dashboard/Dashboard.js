import React, {  Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getQRCode } from "../../store/attendance/qrCodeActions";
import QRCode_Generator from "./QRCode_Generator";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
const Dashboard = ({getQRCode}) => {

  return (
    <Fragment>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="9">
            <QRCode_Generator/>
          </MDBCol>
          <MDBCol md="3">
            <button className='btn btn-primary' onClick={() => getQRCode(this.attendance.activity_id)}>
              <i className='fas fa-user-minus' />Generate qr code
            </button>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  attendance: PropTypes.object.isRequired,
  getQRCode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  attendance: state.attendance
});

export default connect(mapStateToProps, {getQRCode})(Dashboard);
