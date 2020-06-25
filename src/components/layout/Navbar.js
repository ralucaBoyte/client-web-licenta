import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../store/auth/authActions";

const Navbar = ({ auth: { isAuthenticated, loading, role}, logout }) => {

    const authTeacherLinks = (
        <ul>
            <li>
                <Link to="/students">Studenți</Link>
            </li>
            <li>
                <Link to="/attendance">Prezențe</Link>
            </li>
            <li>
                <a onClick={logout} href="/">
                    <i className="fas fa-sign-out-alt" />{" "}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );

    const authStudentLinks = (
        <ul>
            <li>
                <Link to="/attendanceStud">Prezență</Link>
            </li>
            <li>
                <Link to="/situation">Situație</Link>
            </li>
            <li>
                <Link to="/subject">Discipline</Link>
            </li>
            <li>
                <a onClick={logout} href="/">
                    <i className="fas fa-sign-out-alt" />{" "}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

    const authLinks = (
        <div>{role ==='PROFESSOR' ? authTeacherLinks : authStudentLinks}</div>
    );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/my-profile">
          <i className="fas fa-code" /> PSE system
        </Link>
      </h1>
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

export default connect(mapStateToProps, { logout })(Navbar);
