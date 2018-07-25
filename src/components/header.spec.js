import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '@material-ui/core/Button';

import { Header } from './header';
import { Link } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const store = configureStore([thunk])();

configure({ adapter: new Adapter() });

describe('Header with Navigation', () => {
  let classes = {};
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Header authenticated={false} classes={classes} title="Title" store={store} />
    );
  });

  it('should render navigation items when not authenticated', () => {
    wrapper.setProps({ authenticated: false });
    expect(wrapper.find(Button)).toHaveLength(7);
  });

  it('should render navigation items when authenticated', () => {
    wrapper.setProps({ authenticated: true });
    expect(wrapper.find(Button)).toHaveLength(6);
  });

  it('should have Signout button only if authenticated', () => {
    wrapper.setProps({ authenticated: true });
    expect(
      wrapper.contains(
        <Button component={Link} to="/signout" color="secondary">
          Sign Out
        </Button>
      )
    );
  });
});
