import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryCard from '../CategoryCard';

class People extends Component {
  render() {
    const displayPeople = this.props.peopleData.map((person, index) => (
      <CategoryCard
        key={`${person.name}-${index}`}
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

People.propTypes = {
  toggleFavorite: PropTypes.func.isRequired
};

export default People;
