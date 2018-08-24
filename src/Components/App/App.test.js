import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

describe('App component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
