import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';
import { Router, Route } from 'react-router-dom';
import history from '../helper/history';
import { storiesOf } from '@storybook/react';

import Header from '../components/header';
import { AUTH_USER, UNAUTH_USER } from '../actions/types';
import { MuiThemeProvider, createMuiTheme } from '../../node_modules/@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';

const createStoreWithMiddleware = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

function setTheme() {
  return createMuiTheme({
    palette: {
      primary: {
        main: purple[500],
        dark: green[100],
        light: purple[900]
      },
      secondary: {
        main: green[200],
        dark: purple[100],
        light: green[900]
      },
      error: {
        main: red[300],
        dark: red[100],
        light: red[900]
      },
      type: 'dark'
    }
  });
}

storiesOf('Header Component', module)
  .addDecorator(story => (
    <Provider store={createStoreWithMiddleware}>
      <Router history={history}>
        <MuiThemeProvider theme={setTheme()}>
          <CssBaseline />
          <div style={{ textAlign: 'center' }}>{story()}</div>
        </MuiThemeProvider>
      </Router>
    </Provider>
  ))
  .add('when signed in', () => {
    createStoreWithMiddleware.dispatch({ type: AUTH_USER });
    return <Header />;
  })

  .add('when not signed in', () => {
    createStoreWithMiddleware.dispatch({ type: UNAUTH_USER });
    return <Header />;
  });
