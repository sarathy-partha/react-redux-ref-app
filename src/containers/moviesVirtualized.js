import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { getMovies, setTitle } from '../actions';
import _ from 'lodash';
import PropTypes from 'prop-types';
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
import { InfiniteLoader, WindowScroller, List, AutoSizer } from 'react-virtualized';

const MOVIE_POSTER_URL = 'http://image.tmdb.org/t/p/w500';
const STATUS_LOADING = 1;
const STATUS_LOADED = 2;
let itemsPerRow = 0;
class MoviesVirtualized extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loadedRowCount: 0,
      loadedRowsMap: {},
      loadingRowCount: 0,
      rowCount: 0
    };

    this.timeoutIdMap = {};
    this.rowRenderer = this.rowRenderer.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
  }
  componentDidMount() {
    //if (this.props.authenticated)
    this.props.getMovies(1);
    document.title = 'Movies Virtualized';
  }

  componentDidUpdate() {
    this.props.setTitle('Virtualized cards - Keep scrolling, you are at ' + this.props.totalPages);
  }

  componentWillUnmount() {
    Object.keys(this.timeoutIdMap).forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
  }

  loadMoreRows({ startIndex, stopIndex }) {
    const { loadedRowsMap, loadingRowCount } = this.state;
    const increment = stopIndex - startIndex + 1;

    for (var i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = STATUS_LOADING;
    }

    this.setState({
      loadingRowCount: loadingRowCount + increment
    });

    const timeoutId = setTimeout(() => {
      const { loadedRowCount, loadingRowCount } = this.state;

      delete this.timeoutIdMap[timeoutId];

      for (var i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = STATUS_LOADED;
      }

      this.setState({
        loadingRowCount: loadingRowCount - increment,
        loadedRowCount: loadedRowCount + increment
      });

      console.log(startIndex, stopIndex, this.props.movies.length, this.state.loadedRowCount);
      //   if (this.state.loadedRowCount <= this.props.movies.length)
      this.props.getMovies(Math.ceil(this.props.movies.length / 20) + 1);

      promiseResolver();
    }, 1000 + Math.round(Math.random() * 2000));

    this.timeoutIdMap[timeoutId] = true;

    let promiseResolver;

    return new Promise(resolve => {
      promiseResolver = resolve;
    });
  }

  isRowLoaded({ index }) {
    const { loadedRowsMap } = this.state;
    return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
  }

  rowRenderer({ index, key, style }) {
    const movies = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, this.props.movies.length);

    for (let i = fromIndex; i < toIndex; i++) {
      const movie = this.props.movies[i];
      movies.push(
        <Card className="movieCard" key={movie.id}>
          <CardMedia className="media" image={MOVIE_POSTER_URL + movie.poster_path} />
          <Typography variant="subheading" className="mediaText">
            {movie.overview}
          </Typography>
          <CardContent>
            <Typography variant="headline">{movie.title}</Typography>
            <LinearProgress color="secondary" variant="determinate" value={movie.popularity} />
            <div>
              <Badge badgeContent={movie.vote_count} color="primary">
                <FavoriteBorder />
              </Badge>
              <Typography variant="body2">Date : {movie.release_date}</Typography>
            </div>
            {/* <CastCrew movie={movie.id} /> */}
          </CardContent>
        </Card>
      );
    }

    return (
      <div key={key} style={style} className="moviesRow">
        {movies}
      </div>
    );
  }

  render() {
    if (!_.isEmpty(this.props.movies)) {
      console.log(this.props.movies.length);
      return (
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
          <div style={{ flex: '1 1 auto' }}>
            <InfiniteLoader
              isRowLoaded={this.isRowLoaded}
              loadMoreRows={this.loadMoreRows}
              rowCount={this.props.movies.length}
            >
              {({ onRowsRendered, registerChild }) => (
                <WindowScroller>
                  {({ height, isScrolling, scrollTop }) => (
                    <AutoSizer>
                      {({ width }) => {
                        itemsPerRow = Math.floor(width / 400);
                        const rowCount = Math.ceil(this.props.movies.length / itemsPerRow);
                        return (
                          <List
                            onRowsRendered={onRowsRendered}
                            ref={registerChild}
                            isScrolling={isScrolling}
                            scrollTop={scrollTop}
                            autoHeight
                            width={width}
                            height={height}
                            rowCount={rowCount}
                            rowHeight={710}
                            rowRenderer={this.rowRenderer}
                          />
                        );
                      }}
                    </AutoSizer>
                  )}
                </WindowScroller>
              )}
            </InfiniteLoader>
          </div>
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
