import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import NavLink from "../NavLink";
import routes from "./routes";
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        padding: '8px 4px',
        backgroundColor: '#004b4b',
        alignItems: 'center'
    },
    
    route: {
        color: 'white',
        padding: '12px 24px',
        margin: '0 16px',
        fontSize: '20px',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: '0.25s backgroundColor'
    },

    endRoute: {
        color: 'white',
        padding: '12px 24px',
        margin: '0 16px',
        fontSize: '20px',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: '0.25s backgroundColor',
        marginLeft: 'auto'
    },
    
    hover: {
        backgroundColor: '#002d2d'
    },

    selected: {
        backgroundColor: '#002d2d'
    }
    
}));

const Header = function head ({ loggedIn, currentRoute }) {
  const styles = useStyles();
  return (
  <div className={styles.root}>
    {routes
      .filter((route) => (loggedIn && route.auth) || (!loggedIn && !route.auth))
      .map(({ name, link, atEnd }) => (
        <NavLink href={link} key={name}>
          <div
            className={clsx(
              atEnd ? styles.endRoute : styles.route,
              currentRoute === link && styles.selected
            )}
          >
            {name}
          </div>
        </NavLink>
      ))}
  </div>)
}

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  currentRoute: PropTypes.string.isRequired,
};

export default Header;
