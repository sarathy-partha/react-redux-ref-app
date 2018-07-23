import React, { Component } from 'react';
import CastCrew from '../components/castcrew';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import LinearProgress from '@material-ui/core/LinearProgress';

const style = {
  root: {
    flexGrow: 1
  },
  card: {
    width: 400
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

const MOVIE_POSTER_URL = 'http://image.tmdb.org/t/p/w500';
class MoviesList extends Component {
  render() {
    return (
      <div key={this.props.data.id}>
        <Grid style={{ padding: 4 }} xs item>
          <Card style={style.card} className="card">
            <CardMedia
              style={style.media}
              className="media"
              image={MOVIE_POSTER_URL + this.props.data.poster_path}
            />
            <Typography variant="subheading" className="mediaText">
              {this.props.data.overview}
            </Typography>
            <CardContent>
              <Typography variant="headline">{this.props.data.title}</Typography>
              <LinearProgress
                color="secondary"
                variant="determinate"
                value={this.props.data.popularity}
              />
              <div style={style.details}>
                <Badge
                  style={style.badge}
                  badgeContent={this.props.data.vote_count}
                  color="primary"
                >
                  <FavoriteBorder />
                </Badge>
                <Typography variant="body2">Date : {this.props.data.release_date}</Typography>
              </div>
              <CastCrew movie={this.props.data.id} />
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

MoviesList.propTypes = {
  data: PropTypes.object.isRequired
};

export default MoviesList;
