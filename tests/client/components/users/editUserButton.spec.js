import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { EditUserButton }
  from '../../../../client/components/users/editUserButton';

const editUserRoleAction = sinon.spy(() => Promise.resolve());
const props = {
  editUserRoleAction,
  user: {
    id: '',
    userId: '',
    roleId: ''
  },
  changeRole: () => {}
};

function setup() {
  return shallow(<EditUserButton {...props} />);
}

describe('EditUserButton', () => {
  it('renders the div', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toEqual(1);
  });
  it('renders a button', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toEqual(1);
  });
  it('does not render the icon tag when not admin', () => {
    const wrapper = setup();
    expect(wrapper.find('i').length).toBe(0);
  });
  it('does not render the h5 tag when not admin', () => {
    const wrapper = setup();
    expect(wrapper.find('h5').length).toBe(0);
  });
});
