import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import DocumentForm from '../../../../client/components/common/Form';

function setup() {
  const props = {
    title: 'Things fall apart',
    accessId: 1,
    onChange: () => {},
    content: 'When the center cannot hold',
    handleAccessChange: () => {},
    onSubmit: () => {},
    documentId: 2,
  };

  return shallow(<DocumentForm {...props} />);
}

describe('DocumentForm', () => {
  it('renders the document form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('renders text input', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toEqual(1);
  });
  it('renders select input', () => {
    const wrapper = setup();
    expect(wrapper.find('select').length).toEqual(1);
  });
  it('renders the content editor', () => {
    const wrapper = setup();
    expect(wrapper.find('textarea').length).toEqual(1);
  });
  it('populates input fields with initial data', () => {
    const wrapper = setup();
    expect(wrapper.find('input').prop('value')).toEqual('Things fall apart');
    expect(wrapper.find('select').prop('value')).toEqual(1);
  });
});
