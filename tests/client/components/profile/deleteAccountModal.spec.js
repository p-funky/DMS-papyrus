import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { DeleteAccountModal }
  from '../../../../client/components/profile/DeleteAccountModal';

const deleteSelfAction = sinon.spy(() => Promise.resolve());
const props = {
  deleteSelfAction,
  handleDelete: () => {},
  profile: { id: '' }
};

function setup() {
  return shallow(<DeleteAccountModal {...props} />);
}

describe('DeleteAccountModal', () => {
  it('renders the Modal', () => {
    const wrapper = setup();
    expect(wrapper.find('Modal').length).toEqual(1);
  });
  it('renders the icon tags', () => {
    const wrapper = setup();
    expect(wrapper.find('i').length).toBe(1);
  });
});
