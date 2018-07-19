import { TOGGLE_THEME } from '../actions/types';

export default (state = 'dark', action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return action.payload;
    default:
      return state;
  }
};
