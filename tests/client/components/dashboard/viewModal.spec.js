import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ViewModal
  from '../../../../client/components/dashboard/ViewModal';

const props = {
  document: {
    title: '',
    content: '',
    User: { userName: '' }
  }
};
function setup() {
  return shallow(<ViewModal {...props} />);
}

describe('ViewModal', () => {
  it('renders the Modal', () => {
    const wrapper = setup();
    expect(wrapper.find('Modal').length).toEqual(1);
  });
  it('renders a h4', () => {
    const wrapper = setup();
    expect(wrapper.find('h4').length).toEqual(1);
  });
  it('renders a break tag', () => {
    const wrapper = setup();
    expect(wrapper.find('br').length).toBe(1);
  });
  it('renders a paragraph tag', () => {
    const wrapper = setup();
    expect(wrapper.find('p').length).toBe(1);
  });
});
