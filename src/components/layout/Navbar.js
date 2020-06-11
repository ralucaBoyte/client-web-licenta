import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../store/auth/authActions";

import { makeStyles, createStyles } from '@material-ui/core/styles'

/*import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
*/
const Navbar = ({ auth: { isAuthenticated, loading, role}, logout }) => {

    //const classes = useStyles();
    const authTeacherLinks = (
        <ul>
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
          <i className="fas fa-code" /> AMS
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
