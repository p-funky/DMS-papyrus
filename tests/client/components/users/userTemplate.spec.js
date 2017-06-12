import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { UserTemplate }
  from '../../../../client/components/users/userTemplate';

const getAllUsersAction = sinon.spy(() => Promise.resolve());
const props = {
  users: {
    settings: '',
    users: ''
  },
  getAllUsersAction
};

function setup() {
  return shallow(<UserTemplate {...props} />);
}

describe('UserTemplate', () => {
  it('renders the h5 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h5').length).toEqual(1);
  });
  it('renders the divs', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toEqual(3);
  });
  it('renders the h2 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h2').length).toBe(1);
  });
});
