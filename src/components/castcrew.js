import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { config } from '../helper/config';

const style = {
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
};

class CastCrew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cast: [],
      crew: []
    };
  }

  componentDidMount() {
    const CASTCREW_URL = 'http://api.themoviedb.org/3/movie';
    const API_KEY = 'api_key=' + config.tmbAPIKey;
    axios.get(`${CASTCREW_URL}/${this.props.movie}/credits?${API_KEY}`).then(response => {
      this.setState({ cast: _.take(response.data.cast, 4) });
      this.setState({ crew: _.take(response.data.crew, 4) });
    });
  }

  renderCast() {
    const MOVIE_CAST_URL = 'http://image.tmdb.org/t/p/w154';
    if (!_.isEmpty(this.state)) {
      return (
        <TransitionGroup style={style.row}>
          {this.state.cast.map(cast => (
            <CSSTransition key={cast.cast_id} timeout={500} classNames="castcrew">
              <div>
                {cast.profile_path != null && (
                  <Tooltip
                    id="tooltip-icon"
                    title={cast.name + ' as ' + cast.character}
                    placement="bottom"
                  >
                    <Avatar
                      alt={cast.name + ' as ' + cast.character}
                      src={MOVIE_CAST_URL + cast.profile_path}
                      style={style.bigAvatar}
                    />
                  </Tooltip>
                )}
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      );
    } else {
      return <CircularProgress style={{ color: purple[500] }} thickness={7} size={100} />;
    }
  }

  renderCrew() {
    const MOVIE_CAST_URL = 'http://image.tmdb.org/t/p/w154';
    if (!_.isEmpty(this.state)) {
      return (
        <TransitionGroup style={style.row}>
          {this.state.crew.map(crew => (
            <CSSTransition key={crew.credit_id} timeout={500} classNames="castcrew">
              <div>
                {crew.profile_path != null && (
                  <Tooltip id="tooltip-icon" title={crew.job + ' : ' + crew.name} placement="top">
                    <Avatar
                      alt={crew.job + ' : ' + crew.name}
                      src={MOVIE_CAST_URL + crew.profile_path}
                      style={style.bigAvatar}
                    />
                  </Tooltip>
                )}
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      );
    } else {
      return <CircularProgress style={{ color: purple[500] }} thickness={7} size={100} />;
    }
  }

  render() {
    return (
      <div>
        {this.renderCast()}
        {this.renderCrew()}
      </div>
    );
  }
}

CastCrew.propTypes = {
  movie: PropTypes.object.isRequired
};

export default CastCrew;
