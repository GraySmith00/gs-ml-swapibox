import React, { Component } from 'react';

import './App.css';

import ScrollText from '../ScrollText';
import CategoryContainer from '../CategoryContainer';

import { initialFetchCall } from '../../helpers';

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

  setCurrentCategory = async currentCategory => {
    if (currentCategory) {
      this.setState({
        currentData: await initialFetchCall(currentCategory),
        currentCategory
      });
    }
  };

  handleNavClick = event => {
    this.setCurrentCategory(event.target.value);
  };

  render() {
    const { currentData } = this.state;
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
        <CategoryContainer currentData={currentData} />
        <ScrollText />
      </div>
    );
  }
}

export default App;
