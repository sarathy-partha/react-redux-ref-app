import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
class Home extends Component {
  defaultState = { data: null, error: null };

  constructor(props) {
    super(props);
    // Set the default state immediately
    this.state = this.defaultState;
  }

  render() {
    return (
      <div>
        <Typography align="center" variant="display4" color="secondary">
          Welcome to React Redux Demo
        </Typography>
      </div>
    );
  }
}

export default Home;
