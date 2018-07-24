import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

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

  componentDidMount() {}

  renderCast() {
    const MOVIE_CAST_URL = 'https://image.tmdb.org/t/p/w154';
    if (!_.isEmpty(this.props.castCrew)) {
      return (
        <TransitionGroup style={style.row}>
          {this.props.castCrew.cast.map(cast => (
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
    const MOVIE_CAST_URL = 'https://image.tmdb.org/t/p/w154';
    if (!_.isEmpty(this.props.castCrew)) {
      return (
        <TransitionGroup style={style.row}>
          {this.props.castCrew.crew.map(crew => (
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
  castCrew: PropTypes.any
};

export default CastCrew;
