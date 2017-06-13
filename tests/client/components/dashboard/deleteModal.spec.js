import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { DeleteModal }
  from '../../../../client/components/dashboard/DeleteModal';

const deleteDocumentAction = sinon.spy(() => Promise.resolve());
const props = {
  deleteDocumentAction,
  document: { id: '' },
  handleDelete: () => {},
};

function setup() {
  return shallow(<DeleteModal {...props} />);
}

describe('DeleteModal', () => {
  it('renders the Modal', () => {
    const wrapper = setup();
    expect(wrapper.find('Modal').length).toEqual(1);
  });
  it('renders the icon tag', () => {
    const wrapper = setup();
    expect(wrapper.find('i').length).toBe(1);
  });
});
