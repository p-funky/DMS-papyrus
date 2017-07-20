import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { DashboardTemplate }
  from '../../../../client/components/dashboard/DashboardTemplate';

const getAllDocumentsAction = sinon.spy(() => Promise.resolve());
const props = {
  id: '',
  authentication: {
    userInfo: '',
    id: '',
  },
  user: {
    userId: ''
  },
  location: '',
  documents: {
    settings: '',
    documents: ''
  },
  getAllDocumentsAction
};

function setup() {
  return shallow(<DashboardTemplate {...props} />);
}

describe('DashboardTemplate', () => {
  it('renders the h5 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h5').length).toEqual(1);
  });
  it('renders the divs', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toEqual(3);
  });
  it('renders the h2 tag', () => {
    const wrapper = setup();
    expect(wrapper.find('h2').length).toBe(1);
  });
});
