import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../App';

describe('App component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it.skip('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
