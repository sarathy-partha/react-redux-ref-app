import { FETCH_CASTCREW } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CASTCREW: {
      return [...state, action.payload];
    }
    default:
      return state;
  }
};
