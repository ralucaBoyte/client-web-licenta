import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../store/auth/authActions";


import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconBarChart from '@material-ui/icons/BarChart'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const classes = useStyles();

    const authLinks = (
       /*<List component="nav" className={classes.appMenu} disablePadding>
            <ListItem button className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                    <IconDashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                    <IconShoppingCart />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItem>

            <ListItem button className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                    <IconPeople />
                </ListItemIcon>
                <ListItemText primary="Customers" />
            </ListItem>

            <ListItem button className={classes.menuItem}>
                <ListItemIcon className={classes.menuItemIcon}>
                    <IconBarChart />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItem>

        </List>*/
    <ul>
        <li>
            <Link to="/dashboard">Dashboard</Link>
        </li>
      <li>
        <Link to="/customers">Customers</Link>
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
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/dashboard">
          <i className="fas fa-code" /> AMS
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
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
