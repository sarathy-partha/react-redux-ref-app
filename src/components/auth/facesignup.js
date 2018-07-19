import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Webcam from 'react-webcam';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { config } from '../../helper/config';

// loader styling
const style = {
  container: {
    position: 'absolute'
  },
  refresh: {
    display: 'inline-block',
    position: 'absolute'
  },
  hide: {
    display: 'none',
    position: 'absolute'
  }
};

class faceSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      load: false
    };
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    if (this.state.username === '' || this.state.username === ' ') {
      alert('Username cannot be empty');
      return;
    }

    this.setState({
      load: true
    });

    const imageSrc = this.webcam.getScreenshot();

    axios
      .post(
        `https://api.kairos.com/enroll`,
        {
          gallery_name: 'ParthaGallery',
          image: imageSrc,
          subject_id: this.state.username
        },
        {
          headers: {
            app_id: 'c1c8ba1e',
            app_key: 'db950295f78bfe49ba073ae533f2fdb3'
          }
        }
      )
      .then(response => {
        console.log(response);
        //this.props.registerUser(response.data);
        this.setState({
          load: false
        });
      });
  };

  resetGallery = () => {
    this.setState({
      load: true
    });

    axios
      .post(
        `https://api.kairos.com/gallery/remove`,
        {
          gallery_name: 'ParthaGallery'
        },
        {
          headers: {
            app_id: config.appId,
            app_key: config.appKey
          }
        }
      )
      .then(response => {
        alert('Gallery has been reset. Feel free to register now' + response);
        this.setState({
          load: false
        });
      });
  };

  handleUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Grid fluid="true">
          <Grid container>
            <Grid item xs={12} md={4} mdoffset={4}>
              <div style={{ textAlign: 'center' }}>
                <h3>REGISTER FACE</h3>
                <Webcam
                  audio={false}
                  height={320}
                  ref={this.setRef}
                  screenshotFormat="image/png"
                  width={320}
                />
                <br />
                <div style={{ margin: '0 auto!important' }}>
                  <TextField
                    placeholder="provide identification name"
                    helperText="Username"
                    onChange={event => this.handleUsername(event)}
                  />
                </div>
                <br />
                <CircularProgress style={this.state.load === false ? style.hide : style.refresh} />
                <br />
                <Button raised onClick={this.capture} color="primary">
                  Register Face
                </Button>
                <Button raised onClick={this.resetGallery} color="secondary">
                  Reset
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default faceSignUp;
