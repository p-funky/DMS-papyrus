import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import MyDocumentsCards from '../../../../client/components/myDocuments/MyDocumentsCards';

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
  return shallow(<MyDocumentsCards {...document} />);
}

describe('MyDocumentsCards', () => {
  it('renders the span tag', () => {
    const wrapper = setup();
    expect(wrapper.find('span').length).toEqual(1);
  });
  it('renders paragrapghs', () => {
    const wrapper = setup();
    expect(wrapper.find('p').length).toEqual(3);
  });
  it('renders a break tag', () => {
    const wrapper = setup();
    expect(wrapper.find('br').length).toBe(1);
  });
  it('renders a h4 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h4').length).toBe(1);
  });
  it('renders divs', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(7);
  });
});

