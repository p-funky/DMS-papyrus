import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { EditProfileModal }
  from '../../../../client/components/profile/EditProfileModal';

const editProfileAction = sinon.spy(() => Promise.resolve());
const props = {
  editProfileAction,
  profile: {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  },
  onChange: () => {},
  handleUpdate: () => {},
  onClick: () => {},
};

function setup() {
  return shallow(<EditProfileModal {...props} />);
}

describe('EditProfileTemplate', () => {
  it('renders the Modal', () => {
    const wrapper = setup();
    expect(wrapper.find('Modal').length).toEqual(1);
  });
  it('renders a form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('renders paragraph tags', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toBe(5);
  });
  it('renders the icon tags', () => {
    const wrapper = setup();
    expect(wrapper.find('i').length).toBe(6);
  });
  it('renders a button', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toBe(1);
  });
});
