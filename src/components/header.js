import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "typeface-roboto";

const styles = {
  root: {
    width: "100%"
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const logo =
  "https://www.themoviedb.org/static_cache/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg";

export class Header extends Component {
  authButton() {
    if (this.props.authenticated) {
      return (
        <Button component={Link} to="/signout" color="secondary">
          Sign Out
        </Button>
      );
    }
    return [
      <Button key="{1}" component={Link} to="/signin" color="secondary">
        Sign In
      </Button>,
      <Button key="{2}" component={Link} to="/signup" color="secondary">
        Register
      </Button>
    ];
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {this.props.title}
            </Typography>
            <Button to="/" color="inherit">
              Theme
            </Button>
            <Button component={Link} to="/counter" color="inherit">
              Counter
            </Button>
            <Button component={Link} to="/movies" color="inherit">
              Movies
            </Button>
            <Button component={Link} to="/faceregister" color="inherit">
              Face Register
            </Button>
            <Button component={Link} to="/facesignin" color="inherit">
              Face Sign In
            </Button>
            {this.authButton()}
            <img alt="TMDb" src={logo} style={{ width: 50 }} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated.authenticated,
    title: state.title
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Header));
