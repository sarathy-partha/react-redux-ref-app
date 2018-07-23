import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increaseCounter, decreaseCounter, setTitle } from '../actions/index';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Typography } from '../../node_modules/@material-ui/core';

class Counter extends Component {
  counter() {
    return this.props.counter;
  }

  UNSAFE_componentWillMount() {
    this.props.setTitle('Simple Counter');
    document.title = 'Counter';
  }

  render() {
    return (
      <div>
        <Typography align="center" variant="display2" color="secondary" id="counterValue">
          {this.counter()}
        </Typography>
        <Button onClick={() => this.props.increaseCounter(this.counter())} id="increase">
          Increase
        </Button>
        <Button onClick={() => this.props.decreaseCounter(this.counter())} id="decrease">
          Decrease
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.currentCounter,
    title: state.title
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      increaseCounter: increaseCounter,
      decreaseCounter: decreaseCounter,
      setTitle: setTitle
    },
    dispatch
  );
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  increaseCounter: PropTypes.func.isRequired,
  decreaseCounter: PropTypes.func.isRequired,
  setTitle: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
