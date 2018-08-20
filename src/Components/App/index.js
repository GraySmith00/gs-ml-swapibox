import React, { Component } from "react";
import "./App.css";
import ScrollText from "../ScrollText";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SWAPIbox</h1>
        </header>
        <ScrollText />
      </div>
    );
  }
}

export default App;
