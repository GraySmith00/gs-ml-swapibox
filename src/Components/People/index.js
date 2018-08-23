import React, { Component } from 'react';

import CategoryCard from '../CategoryCard';

import { initialFetchCall } from '../../helpers';

class People extends Component {
  constructor() {
    super();
    this.state = {
      peopleData: []
    };
  }

  async componentDidMount() {
    const peopleData = await initialFetchCall('people');
    this.setState({ peopleData });
  }

  render() {
    const { peopleData } = this.state;
    const displayPeople = peopleData.map((person, index) => (
      <CategoryCard
        key={`${person}-${index}`}
        item={person}
        toggleFavorite={this.props.toggleFavorite}
      />
    ));
    return (
      <div>
        <h1>People</h1>
        {displayPeople}
      </div>
    );
  }
}

export default People;
