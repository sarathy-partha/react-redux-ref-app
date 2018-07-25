import { combineReducers } from 'redux';
import CounterReducer from './reducer_counter';
import MoviesReducer from './reducer_movies';
import authenticateReducer from './authenticate';
import titleReducer from './reducer_title';
import themeReducer from './reducer_theme';
import totalPagesReducer from './reducer_totalPages';
import castcrewReducer from './reducer_castcrew';
import { reducer as form } from 'redux-form';
import { reducer as searchReducer } from 'redux-search';
import { createSelector } from 'reselect';

const rootReducer = combineReducers({
  search: searchReducer,
  currentCounter: CounterReducer,
  movies: MoviesReducer,
  authenticated: authenticateReducer,
  title: titleReducer,
  currentTheme: themeReducer,
  totalPages: totalPagesReducer,
  castCrew: castcrewReducer,
  form
});

const movieList = state => state.movies;
const castCrew = state => state.castCrew;
const title = state => state.title;
const currentTheme = state => state.currentTheme;
const pageDetails = state => state.totalPages;

/* eslint-disable no-shadow */
export const getMovieList = createSelector([movieList], movieList => movieList);
export const getCastCrew = createSelector([castCrew], castCrew => castCrew);
export const getTitle = createSelector([title], title => title);
export const getCurrentTheme = createSelector([currentTheme], currentTheme => currentTheme);
export const getPageDetails = createSelector([pageDetails], pageDetails => pageDetails);
/* eslint-enable no-shadow */

export default rootReducer;
