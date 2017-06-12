import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import DocumentCards from '../../../../client/components/dashboard/documentCards';

function setup() {
  const document = {
    id: '',
    title: '',
    content: '',
    User: {
      userName: '',
      roleId: '',
      accessId: ''
    }
  };
  return shallow(<DocumentCards {...document} />);
}

describe('Dashboard DocumentCards', () => {
  it('renders no span tag', () => {
    const wrapper = setup();
    expect(wrapper.find('span').length).toEqual(0);
  });
  it('renders paragrapghs', () => {
    const wrapper = setup();
    expect(wrapper.find('p').length).toEqual(3);
  });
  it('renders a break tag', () => {
    const wrapper = setup();
    expect(wrapper.find('br').length).toBe(1);
  });
  it('renders a h5 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h5').length).toBe(1);
  });
  it('renders divs', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(8);
  });
});
