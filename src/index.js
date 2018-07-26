import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reduxSearch, { SearchApi, INDEX_MODES } from 'redux-search';

// prefix matching (eg "c", "ca", "cat" match "cat")
const prefixSearchApi = new SearchApi({
  indexMode: INDEX_MODES.PREFIXES
});

const createStoreWithMiddleware = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(reduxThunk),
    reduxSearch({
      resourceIndexes: {
        movies: ({ resources, indexDocument, state }) => {
          resources.forEach(movie => {
            indexDocument(movie.id, movie.movie.title);
            movie.castcrew.cast.forEach(cast => indexDocument(movie.id, cast.name));
            movie.castcrew.crew.forEach(crew => indexDocument(movie.id, crew.name));
          });
        }
      },
      resourceSelector: (resourceName, state) => {
        return state[resourceName];
      },
      searchApi: prefixSearchApi
    })
  )
);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
