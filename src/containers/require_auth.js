import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../helper/history";
import PropTypes from "prop-types";

export default function(AuthenticatedComponent) {
  class Authentication extends Component {
    UNSAFE_componentWilllMount() {
      console.log(this.props);
      if (!this.props.authenticated) history.push("/noaccess");
    }

    UNSAFE_componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) history.push("/");
    }

    render() {
      return <AuthenticatedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.authenticated };
  }

  Authentication.propTypes = {
    authenticated: PropTypes.bool.isRequired
  };

  return connect(mapStateToProps)(Authentication);
}
