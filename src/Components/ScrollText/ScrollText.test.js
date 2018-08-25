import React from 'react';
import ScrollText from './index';
import { shallow, mount } from 'enzyme';
import { isObject } from 'util';

describe('ScrollText Component', () => {
  let wrapper;
  let mockFilm;
  let mockFilmResponse;
  let mockFilmFetchCall;

  beforeEach(() => {
    wrapper = mount(<ScrollText />);
    mockFilmResponse = {
      results: [
        {
          release_date: '1980-05-17',
          title: 'The Empire Strikes Back',
          opening_crawl: 'It is a dark time for the Rebellion.'
        }
      ]
    };
    mockFilm = {
      title: 'The Empire Strikes Back',
      date: '1980-05-17',
      quote: 'It is a dark time for the Rebellion.'
    };
  });

  it('should set state of title, date, quote is the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFilmResponse)
      })
    );
    const expected = { ...mockFilm, errors: '' };
    await wrapper.instance().setScrollState();
    expect(wrapper.state()).toEqual(expected);
  });

  it('should set the error state if the response was not ok', async () => {
    const expected = new Error('failed to fetch');
    window.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error('failed to fetch')));
    await wrapper.instance().setScrollState();
    expect(wrapper.state().errors).toEqual(expected.message);
  });
});
