import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import SignInForm from '../../../client/components/signIn/signInForm';

function setup() {
  const props = {
    userDetails: { username: '', password: '' },
    onSubmit: () => {},
    onChange: () => {},
  };

  return shallow(<SignInForm {...props} />);
}

describe('SignInForm', () => {
  it('renders text inputs for both username and password', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toEqual(2);
    expect(wrapper.find('#credential').prop('className')).toBe('validate');
    expect(wrapper.find('input').last().prop('id')).toBe('password');
  });
  it('renders the login button', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toEqual(1);
  });
  it('renders the icons', () => {
    const wrapper = setup();
    expect(wrapper.find('i').length).toEqual(3);
  });
  it('renders divs', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(11);
  });
  it('renders a form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
  });
});

