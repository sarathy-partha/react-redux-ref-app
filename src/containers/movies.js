import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovies, setTitle } from '../actions';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import MoviesList from '../components/moviesList';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import InfiniteScroll from 'react-infinite-scroller';

const style = {
  root: {
    flexGrow: 1
  },
  card: {
    width: 345
  },
  details: {
    display: 'flex',
    marginTop: 15
  },
  content: {
    height: 200,
    overflow: 'auto'
  },
  media: {
    height: 500
  },
  badge: {
    marginRight: 15
  }
};
let transitionDelay = 500;
class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = { hasMore: true };
  }

  componentDidMount() {
    //if (this.props.authenticated)
    this.props.getMovies(1);
    this.props.setTitle('Top Rated');
    document.title = 'Movies';
  }

  renderMovies() {
    this.props.setTitle('Top Rated : ' + 'Scrolled to Page ' + this.props.totalPages);
    return (
      <TransitionGroup component={null}>
        {this.props.movies.map(data => {
          return (
            <CSSTransition
              appear={true}
              timeout={transitionDelay}
              classNames="movielist"
              key={data.id}
            >
              <MoviesList data={data} key={data.id} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
  }

  loadMoreMovies(page) {
    this.props.getMovies(page);
    if (this.props.totalPages === page) this.setState({ hasMore: false });
  }

  render() {
    if (!_.isEmpty(this.props.movies)) {
      return (
        <div style={style.root}>
          <InfiniteScroll
            pageStart={1}
            loadMore={this.loadMoreMovies.bind(this)}
            hasMore={this.state.hasMore}
            loader={
              <CircularProgress
                style={{ color: purple[500], marginLeft: '50%' }}
                thickness={7}
                size={100}
                key="1"
              />
            }
          >
            <Grid style={{ width: '100%', marginTop: 5 }} container justify="center">
              {this.renderMovies()}
            </Grid>
          </InfiniteScroll>
        </div>
      );
    } else {
      return (
        <CircularProgress
          style={{ color: purple[500], marginLeft: '50%' }}
          thickness={7}
          size={100}
        />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
    totalPages: state.totalPages,
    title: state.title,
    authenticated: state.authenticated.authenticated
  };
}

Movies.propTypes = {
  movies: PropTypes.array.isRequired,
  setTitle: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default connect(
  mapStateToProps,
  { getMovies, setTitle }
)(Movies);
