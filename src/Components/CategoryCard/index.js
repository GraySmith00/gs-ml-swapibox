import React from 'react';
import PropTypes from 'prop-types';

const CategoryCard = props => {
  return (
    <div>
      <h1>{props.name}</h1>
      {Object.keys(props).map(propKey => {
        <p>{`${propKey}: ${props[propKey]}`}</p>;
      })}
    </div>
  );
};

export default CategoryCard;

// {
//   name,
//   planet,
//   population,
//   species,
//   favorite,
//   climate,
//   residents,
//   terrain,
//   model,
//   passengers,
//   vehicle_class
// }
