import React, { Component } from "react";

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
        <h1>Welcome to React Redux Demo</h1>
      </div>
    );
  }
}

export default Home;
