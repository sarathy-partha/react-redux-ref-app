import axios from 'axios';
import {
  CHANGE_AUTH,
  FETCH_CASTCREW,
  FETCH_MOVIES,
  UPDATE_TITLE,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  TOGGLE_THEME,
  TOTAL_PAGES
} from './types';
import history from '../helper/history';
import { config } from '../helper/config';

const MOVIES_URL = config.tmbMoviesURL;
const CASTCREW_URL = config.tmpCastCrewURL;
const API_KEY = 'api_key=' + config.tmbAPIKey;

const API_ROOT_URL = config.apiURL;

let localStorage;

export function authenticate(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}

export function increaseCounter(counter) {
  return {
    type: 'INCREASE_COUNTER',
    payload: counter
  };
}

export function decreaseCounter(counter) {
  return {
    type: 'DECREASE_COUNTER',
    payload: counter
  };
}

function fetchMovies(page) {
  return axios.get(`${MOVIES_URL}${API_KEY}&page=${page}`);
}

export function getMovies(page) {
  return function(dispatch) {
    return fetchMovies(page).then(response => {
      dispatch({
        type: FETCH_MOVIES,
        payload: response.data
      });
      dispatch({
        type: TOTAL_PAGES,
        payload: response.data
      });
    });
  };
}

// Not used - Kept it to check possible solution to render nested components using Redux
export function getCastCrew(id) {
  const castcrew = axios.get(`${CASTCREW_URL}/${id}/credits?${API_KEY}`);

  return {
    type: FETCH_CASTCREW,
    payload: castcrew
  };
}

export function setTitle(title) {
  return {
    type: UPDATE_TITLE,
    payload: title
  };
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${API_ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/movies');
      })
      .catch(() => {
        //Handle error
        dispatch(handleAuthError('Invalid login, please try again'));
      });
  };
}

export function handleAuthError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function toggleTheme(theme) {
  return {
    type: TOGGLE_THEME,
    payload: theme
  };
}
