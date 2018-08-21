import React, { Component } from 'react';
import { fetchData, peopleList, planetList } from '../../helpers';

class CategoryContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentData: []
    };
  }
  componentDidUpdate() {
    const { currentCategory } = this.props;
    if (currentCategory) {
      const url = `https://swapi.co/api/${currentCategory}/`;
      fetchData(url)
        .then(res => res.json())
        .then(data => {
          if (currentCategory === 'people') {
            peopleList(data).then(currentData =>
              this.setState({
                currentData
              })
            );
          }
          if (currentCategory === 'planets') {
            planetList(data).then(currentData =>
              this.setState({
                currentData
              })
            );
          }
        });
    }
  }

  render() {
    if (this.props.currentCategory) {
    }

    return (
      <div className="category-container">
        <h1>CategoryContainer</h1>
      </div>
    );
  }
}

export default CategoryContainer;
