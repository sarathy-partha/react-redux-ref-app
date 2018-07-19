import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

class SignOut extends Component {
  UNSAFE_componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <h1>Successfully logged out...hope to see you back soon :)</h1>;
  }
}

SignOut.propTypes = {
  signoutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  actions
)(SignOut);
