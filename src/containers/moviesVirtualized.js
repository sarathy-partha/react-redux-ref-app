import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovies, setTitle } from '../actions';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '@material-ui/core/Badge';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import LinearProgress from '@material-ui/core/LinearProgress';
import CastCrew from '../components/castcrew';
import purple from '@material-ui/core/colors/purple';
import { WindowScroller, List, AutoSizer } from 'react-virtualized';

const MOVIE_POSTER_URL = 'http://image.tmdb.org/t/p/w500';

class MoviesVirtualized extends Component {
  componentDidMount() {
    //if (this.props.authenticated)
    this.props.getMovies(1);
    this.props.getMovies(2);
    this.props.getMovies(3);
    this.props.getMovies(4);
    document.title = 'Movies Virtualized';
  }

  render() {
    if (!_.isEmpty(this.props.movies)) {
      return (
        <WindowScroller>
          {({ height, isScrolling, scrollTop }) => (
            <AutoSizer>
              {({ width }) => {
                const itemsPerRow = Math.floor(width / 340);
                const rowCount = Math.ceil(this.props.movies.length / itemsPerRow);
                return (
                  <List
                    isScrolling={isScrolling}
                    scrollTop={scrollTop}
                    autoHeight
                    width={width}
                    height={height}
                    rowCount={rowCount}
                    rowHeight={820}
                    rowRenderer={({ index, key, style }) => {
                      const movies = [];
                      const fromIndex = index * itemsPerRow;
                      const toIndex = Math.min(fromIndex + itemsPerRow, this.props.movies.length);

                      for (let i = fromIndex; i < toIndex; i++) {
                        const movie = this.props.movies[i];
                        movies.push(
                          <Card className="movieCard" key={movie.id}>
                            <CardMedia
                              className="media"
                              image={MOVIE_POSTER_URL + movie.poster_path}
                            />
                            <Typography variant="subheading" className="mediaText">
                              {movie.overview}
                            </Typography>
                            <CardContent>
                              <Typography variant="headline">{movie.title}</Typography>
                              <LinearProgress
                                color="secondary"
                                variant="determinate"
                                value={movie.popularity}
                              />
                              <div>
                                <Badge badgeContent={movie.vote_count} color="primary">
                                  <FavoriteBorder />
                                </Badge>
                                <Typography variant="body2">Date : {movie.release_date}</Typography>
                              </div>
                              <CastCrew movie={movie.id} />
                            </CardContent>
                          </Card>
                        );
                      }

                      return (
                        <div key={key} style={style} className="moviesRow">
                          {movies}
                        </div>
                      );
                    }}
                  />
                );
              }}
            </AutoSizer>
          )}
        </WindowScroller>
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

MoviesVirtualized.propTypes = {
  movies: PropTypes.array.isRequired,
  setTitle: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  totalPages: PropTypes.any.isRequired
};

export default connect(
  mapStateToProps,
  { getMovies, setTitle }
)(MoviesVirtualized);
