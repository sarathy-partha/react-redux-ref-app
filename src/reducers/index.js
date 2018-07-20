import { combineReducers } from 'redux';
import CounterReducer from './reducer_counter';
import MoviesReducer from './reducer_movies';
import authenticateReducer from './authenticate';
import titleReducer from './reducer_title';
import themeReducer from './reducer_theme';
import totalPagesReducer from './reducer_totalPages';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  currentCounter: CounterReducer,
  movies: MoviesReducer,
  authenticated: authenticateReducer,
  title: titleReducer,
  currentTheme: themeReducer,
  totalPages: totalPagesReducer,
  form
});

export default rootReducer;
