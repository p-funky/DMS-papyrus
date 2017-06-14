import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { NavigationBar } from '../../../client/components/navigationBar';

function setup() {
  const props = {
    loggedOut: false
  };
  return shallow(<NavigationBar {...props} />);
}

describe('Navigation Bar when not logged in', () => {
  it('renders two divs', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
  });
  it('renders a nav', () => {
    const wrapper = setup();
    expect(wrapper.find('nav').length).toBe(1);
  });
  it('renders Links', () => {
    const wrapper = setup();
    expect(wrapper.find('Link').length).toBe(6);
  });
  it('renders a ul', () => {
    const wrapper = setup();
    expect(wrapper.find('ul').first().prop('id')).toBe('mobile-demo');
    expect(wrapper.find('ul').last().prop('id')).toBe('nav-mobile');
  });

  it('renders li', () => {
    const wrapper = setup();
    expect(wrapper.find('li').length).toBe(4);
  });
});

