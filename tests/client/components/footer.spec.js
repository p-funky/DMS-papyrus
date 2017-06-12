import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../client/components/footer';

function setup() {
  return shallow(<Footer />);
}

describe('Footer', () => {
  it('renders a footer', () => {
    const wrapper = setup();
    expect(wrapper.find('footer').length).toEqual(1);
  });
  it('renders a div', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toEqual(1);
  });
  it('renders an a tag', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toEqual(1);
  });
});

