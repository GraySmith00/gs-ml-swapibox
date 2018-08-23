import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import ScrollText from '../ScrollText';
import Landing from '../Landing';
import People from '../People';
import Planets from '../Planets';
import Vehicles from '../Vehicles';

// import { initialFetchCall } from '../../helpers';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      favorites: []
    };
  }

  toggleFavorite = item => {
    const alreadyFavorite = this.state.favorites.find(
      favorite => favorite.name === item.name
    );
    if (alreadyFavorite) {
      const newFavorites = this.state.favorites.filter(
        favorite => favorite.name !== item.name
      );
      this.setState({
        favorites: newFavorites
      });
    } else {
      const newFavorites = [...this.state.favorites, item];
      this.setState({
        favorites: newFavorites
      });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SWAPIbox</h1>
          <nav className="nav-btns">
            <NavLink exact to="/people" className="nav-link">
              People
            </NavLink>
            <NavLink exact to="/planets" className="nav-link">
              Planets
            </NavLink>
            <NavLink exact to="/vehicles" className="nav-link">
              Vehicles
            </NavLink>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route
              path="/people"
              render={() => <People toggleFavorite={this.toggleFavorite} />}
            />
            <Route exact path="/planets" component={Planets} />
            <Route exact path="/vehicles" component={Vehicles} />
          </Switch>
        </main>
        <footer>
          <ScrollText />
        </footer>
      </div>
    );
  }
}

export default App;
