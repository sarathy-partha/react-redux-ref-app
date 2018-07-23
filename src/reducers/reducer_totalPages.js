import { TOTAL_PAGES } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case TOTAL_PAGES:
      return { page: action.payload.page, totalPages: action.payload.total_pages };
    default:
      return state;
  }
};
