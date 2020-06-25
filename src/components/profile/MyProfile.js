import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import "../../utils/styles/MyStyles.css";

class MyProfile extends Component {

  render() {

    return (
      <div>
        <div className="divProfile">
          <h1 className="textProfile" style={{fontSize: '50px'}}>Profil</h1>
        </div>
        <div className="infoProfile">
          <h3 className="textProfile" style={{fontStyle: "italic",width:'40%', fontSize: '30px'}}>Nume de utilizator:</h3>
          <p className="textProfile" style={{ fontSize: '20px'}}>{this.props.username}</p>
          <h3 className="textProfile" style={{fontStyle: "italic",width:'40%', fontSize: '30px'}}>În calitate de:</h3>
          <p className="textProfile" style={{textTransform: 'lowercase', fontSize: '20px'}}>{this.props.role}</p>
          {this.props.group != null &&
              <div>
                <h3 className="textProfile" style={{fontStyle: "italic",width:'40%', fontSize: '30px'}}>Din grupa:</h3>
                <p className="textProfile" style={{textTransform: 'lowercase', fontSize: '20px'}}>{this.props.group}</p>
              </div>
              }
        </div>

      </div>
    );
  }
}

MyProfile.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  role: PropTypes.string,
  group: PropTypes.string
};

const mapStateToProps = state => ({
  username: state.auth.username,
  password: state.auth.password,
  role: state.auth.role,
  group: state.auth.group
});

export default connect(mapStateToProps)(MyProfile);
