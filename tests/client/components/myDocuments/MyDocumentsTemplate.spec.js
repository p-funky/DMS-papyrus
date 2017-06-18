import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { MyDocumentsTemplate }
  from '../../../../client/components/myDocuments/MyDocumentsTemplate';

const getmyDocumentsAction = sinon.spy(() => Promise.resolve());
const props = {
  user: {
    userId: ''
  },
  userId: '',
  state: {
    authentication: {
      userInfo: '',
      id: '',
    }
  },
  location: '',
  documents: {
    settings: '',
    documents: ''
  },
  getmyDocumentsAction
};

function setup() {
  return shallow(<MyDocumentsTemplate {...props} />);
}

describe('MyDocumentsTemplate', () => {
  it('renders the h3 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h3').length).toEqual(0);
  });
  it('renders the divs', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toEqual(3);
  });
  it('renders the h2 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('p').length).toBe(0);
  });
});

