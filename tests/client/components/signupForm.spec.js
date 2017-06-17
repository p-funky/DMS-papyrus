import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from '../../../client/components/signup/SignupForm';

function setup() {
  const props = {
    userDetails: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
    },
    onSubmit: () => {},
    onChange: () => {},
  };

  return shallow(<SignupForm {...props} />);
}

describe('SignupForm', () => {
  it('renders text inputs for both username and password', () => {
    const wrapper = setup();
    expect(wrapper.find('input').length).toEqual(5);
    expect(wrapper.find('input').first().prop('id')).toBe('firstName');
    expect(wrapper.find('input').last().prop('id')).toBe('password');
  });
  it('renders the login button', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toEqual(1);
  });
  it('renders the icons', () => {
    const wrapper = setup();
    expect(wrapper.find('i').length).toEqual(6);
  });
  it('renders a form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
  });
  it('renders a text input for the firstname', () => {
    const wrapper = setup();
    expect(wrapper.find('input').at(0).prop('id')).toBe('firstName');
  });

  it('renders a text input for the lastname', () => {
    const wrapper = setup();
    expect(wrapper.find('input').at(1).prop('id')).toBe('lastName');
  });

  it('renders a text input for the username', () => {
    const wrapper = setup();
    expect(wrapper.find('input').at(2).prop('id')).toBe('userName');
  });

  it('renders a text input for the email', () => {
    const wrapper = setup();
    expect(wrapper.find('input').at(3).prop('id')).toBe('email');
  });

  it('renders a text input for the password', () => {
    const wrapper = setup();
    expect(wrapper.find('input').at(4).prop('id')).toBe('password');
  });

  it('renders an image', () => {
    const wrapper = setup();
    expect(wrapper.find('img').length).toEqual(1);
  });

  it('renders the save button', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('populates field with initial data', () => {
    const wrapper = setup();
    expect(wrapper.find('input').at(0).prop('value')).toBe(undefined);
    expect(wrapper.find('input').at(1).prop('value')).toBe(undefined);
    expect(wrapper.find('input').at(2).prop('value')).toBe(undefined);
    expect(wrapper.find('input').at(3).prop('value')).toBe(undefined);
    expect(wrapper.find('input').at(4).prop('value')).toBe(undefined);
  });
});

