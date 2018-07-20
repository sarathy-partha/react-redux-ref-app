import { TOTAL_PAGES } from '../actions/types';

export default (state = 0, action) => {
  switch (action.type) {
    case TOTAL_PAGES:
      return action.payload;
    default:
      return state;
  }
};
