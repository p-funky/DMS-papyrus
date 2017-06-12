import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SearchDocuments }
  from '../../../../client/components/dashboard/searchDocuments';

const searchDocumentsAction = sinon.spy(() => Promise.resolve());
const props = {
  searchDocumentsAction,
  onChange: () => {},
  runSearch: () => {},
  profile: { id: '' }
};

function setup() {
  return shallow(<SearchDocuments {...props} />);
}

describe('SearchDocuments', () => {
  it('renders a form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('renders two divs', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toEqual(2);
  });
  it('renders an input', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toEqual(1);
  });
  it('renders the icon tags', () => {
    const wrapper = setup();
    expect(wrapper.find('i').length).toBe(2);
  });
});
