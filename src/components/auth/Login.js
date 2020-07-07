import React, {useEffect, useState} from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../store/auth/authActions";
import {MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow} from "mdbreact";
import Alert from "../layout/Alert";

const Login = ({ login, isAuthenticated, role }) => {

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const { username, password } = formData;

  const onChangeUsername = e => {
    setFormData({...formData, username: e.target.value});
  };

  const onChangePassword = e => {
    setFormData({...formData, password: e.target.value});
  };
  const onSubmit = async e => {
    e.preventDefault();
    login(username, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/attendance" />;
  }

  let handleChange = (e) => {
    // Set the state dynamically using the event param
    this.setState({[e.target.name]: e.target.value})
  };

  return (
      <MDBContainer className="container_login">
        <Alert className="alert"/>
        <MDBRow className="container_login_row">
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={e => onSubmit(e)}>
                  <p className="h4 text-center py-4">Log into your account</p>
                  <div className="grey-text">
                    <MDBInput
                        label="Your username"
                        icon="user"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onKeyUp={e => onChangeUsername(e)}
                        required
                    />
                    <MDBInput
                        label="Your password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        error="wrong"
                        success="right"
                        onKeyUp={e => onChangePassword(e)}
                        required
                    />
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="light-blue" type="submit">
                      Log in
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  role: PropTypes.string
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role
});

export default connect(mapStateToProps, { login })(Login);
