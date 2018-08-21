import React, { Component } from 'react';
import { fetchData, peopleList } from '../../helpers';

class CategoryContainer extends Component {
  componentDidUpdate() {
    const { currentCategory } = this.props;
    const url = `https://swapi.co/api/${currentCategory}/`;
    if (currentCategory) {
      fetchData(url)
        .then(res => res.json())
        .then(data => {
          console.log(peopleList(data));
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <div className="category-container">
        <h1>CategoryContainer</h1>
      </div>
    );
  }
}

export default CategoryContainer;
