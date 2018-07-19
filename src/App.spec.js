import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

configure({ adapter: new Adapter() });

const mockstore = configureStore();
let store, initialState;
beforeEach(() => {
  initialState = {
    authenticated: true,
    title: 'title'
  };
  store = mockstore(initialState);
});
it('renders without crashing', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
  expect(wrapper).toHaveLength(1);
});
