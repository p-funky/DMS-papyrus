import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { ProfileTemplate }
  from '../../../../client/components/profile/profileTemplate';

const getProfileAction = sinon.spy(() => Promise.resolve());
const props = {
  getProfileAction,
  profile: {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    roleId: ''
  }
};

function setup() {
  return shallow(<ProfileTemplate {...props} />);
}

describe('ProfileTemplate', () => {
  it('renders the h3 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h3').length).toEqual(1);
  });
  it('renders the divs', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toEqual(6);
  });
  it('renders paragraph tags', () => {
    const wrapper = setup();
    expect(wrapper.find('p').length).toBe(5);
  });
  it('renders the icon tags', () => {
    const wrapper = setup();
    expect(wrapper.find('i').length).toBe(6);
  });
});

