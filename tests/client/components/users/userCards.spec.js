import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import UserCards from '../../../../client/components/users/UserCards';

function setup() {
  const user = {
    id: '',
    userName: '',
    firstName: '',
    lastName: '',
    roleId: ''
  };
  return shallow(<UserCards {...user} />);
}

describe('UserCards', () => {
  it('renders no span tag', () => {
    const wrapper = setup();
    expect(wrapper.find('span').length).toEqual(0);
  });
  it('renders paragrapghs', () => {
    const wrapper = setup();
    expect(wrapper.find('p').length).toEqual(2);
  });
  it('renders no break tag', () => {
    const wrapper = setup();
    expect(wrapper.find('br').length).toBe(0);
  });
  it('renders a h5 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h5').length).toBe(1);
  });
  it('renders divs', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(7);
  });
});
