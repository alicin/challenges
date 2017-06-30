import React, { Component } from 'react';
import logo from './assets/logo.png';
import './App.css';
import TodoList from './components/TodoList/TodoList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-logo-wrapper">
          <img src={logo} className="App-logo" alt="Bunny Todos" />
        </div>
        <TodoList />
      </div>
    );
  }
}

export default App;
