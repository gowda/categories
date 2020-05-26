import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from './app';

describe('App', () => {
  it('renders the message', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.text()).to.have.string('Hello, world');
  });
});
