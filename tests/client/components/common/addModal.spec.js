import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { AddModal }
  from '../../../../client/components/common/AddModal';

const addDocumentAction = sinon.spy(() => Promise.resolve());
const props = {
  addDocumentAction,
  title: '',
  content: '',
  accessId: 1,
  documentId: '',
  onChange: () => {},
  handleAdd: () => {},
  handleAccessChange: () => {},
};

function setup() {
  return shallow(<AddModal {...props} />);
}

describe('AddModal', () => {
  it('renders the Modal', () => {
    const wrapper = setup();
    expect(wrapper.find('Modal').length).toEqual(1);
  });
  it('renders a Form', () => {
    const wrapper = setup();
    expect(wrapper.find('Form').length).toEqual(1);
  });
});
