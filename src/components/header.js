import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { toggleTheme } from '../actions';

const styles = {
  root: {
    width: '100%'
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
  'https://www.themoviedb.org/static_cache/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { toggleThemeBtn: 'Turn on light' };
  }
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
    const toggleTheme = () => {
      if (this.state.toggleThemeBtn === 'Turn off light') {
        this.props.toggleTheme('dark');
        this.setState({ toggleThemeBtn: 'Turn on light' });
      } else {
        this.props.toggleTheme('light');
        this.setState({ toggleThemeBtn: 'Turn off light' });
      }
    };

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="secondary" className={classes.menuButton} aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="secondary" className={classes.flex}>
              {this.props.title}
            </Typography>
            <Button onClick={toggleTheme} color="secondary">
              {this.state.toggleThemeBtn}
            </Button>
            <Button component={Link} to="/counter" color="secondary">
              Counter
            </Button>
            <Button component={Link} to="/movies" color="secondary">
              Movies
            </Button>
            <Button component={Link} to="/movies-virtualized" color="secondary">
              Virtualized Cards
            </Button>
            {/* <Button component={Link} to="/faceregister" color="secondary">
              Face Register
            </Button>
            <Button component={Link} to="/facesignin" color="secondary">
              Face Sign In
            </Button> */}
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
  authenticated: PropTypes.any,
  title: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated.authenticated,
    title: state.title
  };
}

export default connect(
  mapStateToProps,
  { toggleTheme }
)(withTheme()(withStyles(styles)(Header)));
