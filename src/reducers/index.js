import { combineReducers } from 'redux';
import CounterReducer from './reducer_counter';
import MoviesReducer from './reducer_movies';
import authenticateReducer from './authenticate';
import titleReducer from './reducer_title';
import themeReducer from './reducer_theme';
import totalPagesReducer from './reducer_totalPages';
import { reducer as form } from 'redux-form';
import { reducer as searchReducer, getSearchSelectors } from 'redux-search';
import { createSelector } from 'reselect';

const rootReducer = combineReducers({
  currentCounter: CounterReducer,
  movies: MoviesReducer,
  authenticated: authenticateReducer,
  title: titleReducer,
  currentTheme: themeReducer,
  totalPages: totalPagesReducer,
  form,
  search: searchReducer
});

const movieList = state => state.movies;
const title = state => state.title;
const currentTheme = state => state.currentTheme;
const pageDetails = state => state.totalPages;
const search = state => state.search.movies.result;

/* eslint-disable no-shadow */
export const getMovieList = createSelector([movieList], movieList => movieList);
export const getTitle = createSelector([title], title => title);
export const getCurrentTheme = createSelector([currentTheme], currentTheme => currentTheme);
export const getPageDetails = createSelector([pageDetails], pageDetails => pageDetails);
export const searchResults = createSelector([search], search => search);
/* eslint-enable no-shadow */

const selectors = getSearchSelectors({ resourceName: 'getMovieList', movieList });
export const dataSearchText = selectors.text;
export const filteredIdArray = selectors.result;

export default rootReducer;
