import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryCard from '../CategoryCard';
import { initialFetchCall } from '../../helpers';

class Vehicles extends Component {
  constructor() {
    super();
    this.state = {
      vehicleData: []
    };
  }

  async componentDidMount() {
    const vehicleData = await initialFetchCall('vehicles');
    this.setState({ vehicleData });
  }

  render() {
    const { vehicleData } = this.state;
    const displayVehicles = vehicleData.map((vehicle, index) => (
      <CategoryCard
        key={`${vehicle.name}-${index}`}
        item={vehicle}
        toggleFavorite={this.props.toggleFavorite}
      />
    ));

    return (
      <div>
        <h1>Vehicles</h1>
        {displayVehicles}
      </div>
    );
  }
}

Vehicles.propTypes = {
  toggleFavorite: PropTypes.func.isRequired
};

export default Vehicles;
