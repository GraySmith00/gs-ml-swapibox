import React from 'react';
import PropTypes from 'prop-types';

const CategoryCard = ({ item }) => {
  const cards = Object.keys(item).map(
    (itemKey, index) =>
      itemKey === 'name' ? (
        <h3 key={`${itemKey}-${index}`}>{item[itemKey]}</h3>
      ) : (
        <p key={`${itemKey}-${index}`}>{`${itemKey}: ${item[itemKey]}`}</p>
      )
  );
  return <div>{cards}</div>;
};

CategoryCard.propTypes = {
  item: PropTypes.object.isRequired
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
