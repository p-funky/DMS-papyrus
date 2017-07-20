import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { EditModal }
  from '../../../../client/components/common/EditModal';

const editDocumentAction = sinon.spy(() => Promise.resolve());
const props = {
  editDocumentAction,
  document: {
    title: '',
    content: '',
    accessId: '',
    password: '',
  },
  onChange: () => {},
  handleAdd: () => {},
  handleAccessChange: () => {},
};

function setup() {
  return shallow(<EditModal {...props} />);
}

describe('EditModal', () => {
  it('renders the Modal', () => {
    const wrapper = setup();
    expect(wrapper.find('Modal').length).toEqual(1);
  });
  it('renders a Form', () => {
    const wrapper = setup();
    expect(wrapper.find('Form').length).toEqual(1);
  });
});
