import React from 'react';
import ScrollText from './index';
import { shallow, mount } from 'enzyme';
import { isObject } from 'util';

describe('ScrollText Component', () => {
  let wrapper;
  let mockFilm;
  let mockFilmFetchCall;

  beforeEach(() => {
    wrapper = mount(<ScrollText />);
    mockFilm = {
      date: '1980-05-17',
      quote: 'It is a dark time for the Rebellion.',
      title: 'The Empire Strikes Back'
    };
    mockFilmFetchCall = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFilm)
      })
    );
  });

  it.skip('should update state when component is mounted', async () => {
    await wrapper.instance().componentDidMount();
    wrapper.update();
    expect(wrapper.state().quote).not.toEqual('');
  });

  it('should match the snapshot', () => {
    const { title, date, quote } = mockFilmFetchCall;
    wrapper.setState({ title, date, quote });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
