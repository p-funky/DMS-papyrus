import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { EditModal }
  from '../../../../client/components/dashboard/EditModal';

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

describe('AddModal', () => {
  it('renders the Modal', () => {
    const wrapper = setup();
    expect(wrapper.find('Modal').length).toEqual(1);
  });
  it('renders a form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('renders input', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toBe(1);
  });
  it('renders select', () => {
    const wrapper = setup();
    expect(wrapper.find('select').length).toBe(1);
  });
  it('renders the icon tags', () => {
    const wrapper = setup();
    expect(wrapper.find('i').length).toBe(3);
  });
  it('renders the option tags', () => {
    const wrapper = setup();
    expect(wrapper.find('option').length).toBe(3);
  });
  it('renders a button', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toBe(1);
  });
});
