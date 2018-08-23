import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryCard from '../CategoryCard';

import { initialFetchCall } from '../../helpers';

class Planets extends Component {
  constructor() {
    super();
    this.state = {
      planetData: []
    };
  }

  async componentDidMount() {
    const planetData = await initialFetchCall('planets');
    this.setState({ planetData });
  }

  render() {
    const { planetData } = this.state;
    const displayPlanets = planetData.map((planet, index) => (
      <CategoryCard
        key={`${planet.name}=${index}`}
        item={planet}
        toggleFavorite={this.props.toggleFavorite}
      />
    ));
    return (
      <div>
        <h1>Planets</h1>
        {displayPlanets}
      </div>
    );
  }
}

Planets.propTypes = {
  toggleFavorite: PropTypes.func.isRequired
};

export default Planets;
