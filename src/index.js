import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Provider } from "react-redux";
import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

import { Router, Route } from "react-router-dom";
import history from "./helper/history";

//import requireAuth from "./containers/require_auth";
import Movies from "./containers/movies";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Counter from "./containers/counter";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Unauthorized from "./components/unauthorized";

import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./components/home";
import signin from "./containers/auth/signin";
import signout from "./components/auth/signout";
import signup from "./containers/auth/signup";
import facesignup from "./components/auth/facesignup";
import facesignin from "./components/auth/facesignin";

const createStoreWithMiddleware = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

const palette = {
  primary: purple,
  secondary: {
    ...green,
    A400: "#00e677"
  },
  error: red
};

function setTheme() {
  return createMuiTheme({
    palette: palette
  });
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <Router history={history}>
      <div>
        <CssBaseline />
        <MuiThemeProvider theme={setTheme()}>
          <App />
          <div style={{ marginTop: 70 }}>
            <Route path="/" exact component={Home} />
            <Route path="/counter" component={Counter} />
            <Route path="/movies" component={Movies} />
            <Route path="/noaccess" component={Unauthorized} />
            <Route path="/signin" component={signin} />
            <Route path="/signout" component={signout} />
            <Route path="/signup" component={signup} />
            <Route path="/faceregister" component={facesignup} />
            <Route path="/facesignin" component={facesignin} />
          </div>
        </MuiThemeProvider>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
