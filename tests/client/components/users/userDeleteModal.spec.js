import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { UserDeleteModal }
  from '../../../../client/components/users/UserDeleteModal';

const deleteUserAction = sinon.spy(() => Promise.resolve());

const props = {
  deleteUserAction,
  handleDelete: () => {},
  user: {
    id: '',
    userId: ''
  }
};

function setup() {
  return shallow(<UserDeleteModal {...props} />);
}

describe('UserDeleteModal', () => {
  it('renders the Modal', () => {
    const wrapper = setup();
    expect(wrapper.find('Modal').length).toEqual(1);
  });
  it('renders the icon tags', () => {
    const wrapper = setup();
    expect(wrapper.find('i').length).toBe(1);
  });
});
