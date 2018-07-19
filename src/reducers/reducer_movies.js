import { FETCH_MOVIES } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_MOVIES: {
      return [action.payload.data.results];
    }
    default:
      return state;
  }
};
