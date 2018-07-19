import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class Unauthorized extends Component {
  render() {
    return (
      <div>
        <Typography variant="headline"> Please Sign In to have required access</Typography>
      </div>
    );
  }
}

export default Unauthorized;
