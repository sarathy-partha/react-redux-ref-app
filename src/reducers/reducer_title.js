import { UPDATE_TITLE } from '../actions/types';

export default (state = 'Home', action) => {
  switch (action.type) {
    case UPDATE_TITLE:
      return action.payload;
    default:
      return state;
  }
};
