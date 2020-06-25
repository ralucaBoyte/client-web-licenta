import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {login, setUsernameAndPassword, getRole} from "../../store/auth/authActions";

const Login = ({ login, isAuthenticated, setUsernameAndPassword, getRole }) => {

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const { username, password } = formData;

  const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(username, password);
  };

  if (isAuthenticated) {
    setUsernameAndPassword(username,password);
    getRole();
    return <Redirect to="/my-profile" />;
  }

  //references
  const visibilityToggle = document.querySelector(".material-icons");
  const inputPassword = document.querySelector('.form-group-password input');

  var passwordVisible = false;
  const onClickVisibility= () =>{
    if(!passwordVisible){
      inputPassword.setAttribute('type','text');
      visibilityToggle.innerHTML = 'visibility';
    }
    else{
      inputPassword.setAttribute('type','password');
      visibilityToggle.innerHTML = 'visibility_off';
    }
    passwordVisible = !passwordVisible;
  };

  return (
      <Fragment>
        <div className="fragmentLogin">
          <p className="lead">
            <i className="fas fa-user" /> Introduceți datele pentru autentificare
          </p>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={e => onChange(e)}
                  required
              />
            </div>
            <div className="form-group-password">
              <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                  required
              />
              <span className="material-icons" onClick={onClickVisibility}>visibility_off</span>
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
        </div>
      </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  getRole: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setUsernameAndPassword: PropTypes.func.isRequired,
  getGroup: PropTypes.func.isRequired,
  setGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login,setUsernameAndPassword,getRole })(Login);
