import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies, setTitle } from "../actions";
import _ from "lodash";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import purple from "@material-ui/core/colors/purple";
import MoviesList from "../components/moviesList";

const style = {
  root: {
    flexGrow: 1
  },
  card: {
    width: 345
  },
  details: {
    display: "flex",
    marginTop: 15
  },
  content: {
    height: 200,
    overflow: "auto"
  },
  media: {
    height: 500
  },
  badge: {
    marginRight: 15
  }
};

class Movies extends Component {
  componentDidMount() {
    //if (this.props.authenticated)
    this.props.getMovies();
  }

  UNSAFE_componentWillMount() {
    //if (!this.props.authenticated)
    //  history.push('/noaccess')
    this.props.setTitle("Now Playing");
    document.title = "Movies";
  }

  renderMovies() {
    if (!_.isEmpty(this.props.movies)) {
      return this.props.movies[0].map(data => {
        return <MoviesList key={data.id} data={data} />;
      });
    } else {
      return <CircularProgress style={{ color: purple[500] }} thickness={7} size={100} />;
    }
  }

  render() {
    return (
      <div>
        <div style={style.root}>
          <Grid style={{ width: "100%", marginTop: 5 }} container justify="center">
            {this.renderMovies()}
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
    title: state.title,
    authenticated: state.authenticated.authenticated
  };
}

Movies.propTypes = {
  movies: PropTypes.array.isRequired,
  setTitle: PropTypes.string.isRequired,
  getMovies: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getMovies, setTitle }
)(Movies);
