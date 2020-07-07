import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../store/auth/authActions";

import { makeStyles, createStyles } from '@material-ui/core/styles'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const authLinks = (
    <ul>
        <li className="nav-item">
            <Link to="/view"><i className="fas fa-book"/> <span
                className="clearfix d-none d-sm-inline-block">View attendances</span></Link>
        </li>
      <li className="nav-item">
        <Link to="/attendance"><i className="fas fa-pen-fancy"/> <span
            className="clearfix d-none d-sm-inline-block">Attendance</span></Link>
      </li>
    <li className="nav-item">
        <Link to="/reviews" ><i className="fas fa-comments"/> <span
            className="clearfix d-none d-sm-inline-block">My reviews</span></Link>
    </li>
    <li className="nav-item">
        <Link to="/messages"><i className="fas fa-envelope"/> <span
            className="clearfix d-none d-sm-inline-block">Messages</span></Link>
    </li>
      <li className="nav-item">
        <a onClick={logout} href="/">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li className="nav-item">
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark indigo">
        <a className="navbar-brand" href="#"><strong>Attender</strong></a>
      {
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      }
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});


const drawerWidth = 240;
const useStyles = makeStyles(theme =>
    createStyles({
        appMenu: {
            width: '100%',
        },
        navList: {
            width: drawerWidth,
        },
        menuItem: {
            width: drawerWidth,
        },
        menuItemIcon: {
            color: '#97c05c',
        },
    }),
);

export default connect(mapStateToProps, { logout })(Navbar);
