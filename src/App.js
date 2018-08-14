import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import blueGrey from '@material-ui/core/colors/blueGrey';
import teal from '@material-ui/core/colors/teal';
import history from './helper/history';
import PropTypes from 'prop-types';

//import requireAuth from "./containers/require_auth";
import signup from './containers/auth/signup';
import facesignup from './components/auth/facesignup';
import facesignin from './components/auth/facesignin';

import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const signin = Loadable({
  loader: () => import('./containers/auth/signin' /* webpackChunkName: "signin" */),
  loading: Loading
});

const signout = Loadable({
  loader: () => import('./components/auth/signout' /* webpackChunkName: "signout" */),
  loading: Loading
});

const Unauthorized = Loadable({
  loader: () => import('./components/unauthorized' /* webpackChunkName: "unauthorized" */),
  loading: Loading
});

const Home = Loadable({
  loader: () => import('./components/home' /* webpackChunkName: "home" */),
  loading: Loading
});

const moviesVirtualized = Loadable({
  loader: () =>
    import('./containers/moviesVirtualized' /* webpackChunkName: "moviesVirtualized" */),
  loading: Loading
});

const Movies = Loadable({
  loader: () => import('./containers/Movies' /* webpackChunkName: "Movies" */),
  loading: Loading
});

const Counter = Loadable({
  loader: () => import('./containers/counter' /* webpackChunkName: "counter" */),
  loading: Loading
});

const darkPalette = {
  primary: purple,
  secondary: green,
  error: red,
  type: 'dark'
};

const lightPalette = {
  primary: blueGrey,
  secondary: teal,
  error: red,
  type: 'light'
};

function setTheme(theme) {
  return createMuiTheme({
    palette: theme === 'dark' ? darkPalette : lightPalette
  });
}
export class App extends Component {
  render() {
    return (
      <Router history={history}>
        <MuiThemeProvider theme={setTheme(this.props.theme)}>
          <CssBaseline />
          <Header />
          <div style={{ marginTop: 70, height: '100%' }}>
            <Route path="/" exact component={Home} />
            <Route path="/counter" component={Counter} />
            <Route path="/movies" component={Movies} />
            <Route path="/noaccess" component={Unauthorized} />
            <Route path="/signin" component={signin} />
            <Route path="/signout" component={signout} />
            <Route path="/signup" component={signup} />
            <Route path="/faceregister" component={facesignup} />
            <Route path="/facesignin" component={facesignin} />
            <Route path="/movies-virtualized" component={moviesVirtualized} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

App.propTypes = {
  theme: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  theme: state.currentTheme
});

export default connect(mapStateToProps)(App);
