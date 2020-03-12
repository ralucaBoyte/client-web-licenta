import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Dashboard = ({ auth }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Dashboard);
