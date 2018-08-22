import React, { Component } from 'react';

import './App.css';

import ScrollText from '../ScrollText';
import CategoryContainer from '../CategoryContainer';

import { fetchData, peopleList, planetList, vehicleList } from '../../helpers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentData: [],
      currentCategory: ''
    };
  }

  componentDidMount() {
    this.setCurrentCategory('people');
  }

  setCurrentCategory = currentCategory => {
    if (currentCategory) {
      const url = `https://swapi.co/api/${currentCategory}/`;
      fetchData(url)
        .then(res => res.json())
        .then(data => {
          if (currentCategory === 'people') {
            peopleList(data).then(currentData =>
              this.setState({
                currentData,
                currentCategory
              })
            );
          }
          if (currentCategory === 'planets') {
            planetList(data).then(currentData =>
              this.setState({
                currentData,
                currentCategory
              })
            );
          }
          if (currentCategory === 'vehicles') {
            this.setState({
              currentData: vehicleList(data),
              currentCategory
            });
          }
        });
    }
  };

  handleNavClick = event => {
    this.setCurrentCategory(event.target.value);
  };

  render() {
    const { currentCategory } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SWAPIbox</h1>
        </header>
        <nav className="nav-btns">
          <button
            onClick={this.handleNavClick}
            className="people-btn"
            value="people"
          >
            People
          </button>
          <button
            onClick={this.handleNavClick}
            className="planets-btn"
            value="planets"
          >
            Planets
          </button>
          <button
            onClick={this.handleNavClick}
            className="vehicles-btn"
            value="vehicles"
          >
            Vehicles
          </button>
        </nav>
        <CategoryContainer currentCategory={currentCategory} />
        <ScrollText />
      </div>
    );
  }
}

export default App;
