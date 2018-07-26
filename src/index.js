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
import reduxSearch from 'redux-search';

const createStoreWithMiddleware = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(reduxThunk),
    reduxSearch({
      resourceIndexes: {
        movies: ({ resources, indexDocument, state }) => {
          resources.forEach(movie => {
            indexDocument(movie.id, movie.movie.title);
          });
        }
      },
      resourceSelector: (resourceName, state) => {
        return state[resourceName];
      }
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
