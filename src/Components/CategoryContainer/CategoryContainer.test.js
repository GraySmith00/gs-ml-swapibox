import React from 'react';
import { shallow } from 'enzyme';

import CategoryContainer from '../CategoryContainer';

describe('CategoryContainer component', () => {
  let wrapper;
  let mockCurrentData;

  beforeEach(() => {
    mockCurrentData = [
      {
        favorite: false,
        name: 'Luke Skywalker',
        planet: 'Tatooine',
        population: '200000',
        species: 'Human'
      },
      {
        favorite: false,
        name: 'C-3PO',
        planet: 'Tatooine',
        population: '200000',
        species: 'Droid'
      }
    ];
    wrapper = shallow(<CategoryContainer currentData={mockCurrentData} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
