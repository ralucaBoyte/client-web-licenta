import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setCurrentActivity} from "../../store/attendance/qrCodeActions";
import {getActivityTypesByTeacher} from "../../store/subjects/subjectActions";
import "../../utils/styles/MyStyles.css";
import "./ProfileStyle.css";

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state={
      username: props.username,
      password: props.password,
      role: props.role
    }
  }
  render() {
    return (
      <div>
        <div className="textProfile">
          <h1 style={{fontSize: '50px'}}>Profil</h1>
        </div>
        <div className="infoProfile">
          <h3 style={{fontStyle: "italic",width:'40%', fontSize: '30px'}}>Nume de utilizator:</h3>
          <p style={{ fontSize: '20px'}}>{this.state.username}</p>
          <h3 style={{fontStyle: "italic",width:'40%', fontSize: '30px'}}>În calitate de:</h3>
          <p style={{textTransform: 'lowercase', fontSize: '20px'}}>{this.state.role}</p>
        </div>

      </div>
    );
  }
}

MyProfile.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  role: PropTypes.string
};

const mapStateToProps = state => ({
  username: state.auth.username,
  password: state.auth.password,
  role: state.auth.role
});

export default connect(mapStateToProps)(MyProfile);
