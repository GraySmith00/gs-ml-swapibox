import React, { Component } from 'react';

import './App.css';

import ScrollText from '../ScrollText';
import CategoryContainer from '../CategoryContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentCategory: ''
    };
  }

  setCurrentCategory = event => {
    this.setState({
      currentCategory: event.target.value
    });
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
            onClick={this.setCurrentCategory}
            className="people-btn"
            value="people"
          >
            People
          </button>
          <button
            onClick={this.setCurrentCategory}
            className="planets-btn"
            value="planets"
          >
            Planets
          </button>
          <button
            onClick={this.setCurrentCategory}
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
