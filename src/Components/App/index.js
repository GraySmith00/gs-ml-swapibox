import React, { Component } from 'react';

import './App.css';

import ScrollText from '../ScrollText';
import CategoryContainer from '../CategoryContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SWAPIbox</h1>
        </header>
        <nav className="nav-btns">
          <button className="people-btn">People</button>
          <button className="planets-btn">Planets</button>
          <button className="vehicles-btn">Vehicles</button>
        </nav>
        <CategoryContainer />
        <ScrollText />
      </div>
    );
  }
}

export default App;
