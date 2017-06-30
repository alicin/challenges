import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Prompt.css';

class Prompt extends Component {
  constructor(props) {
    super(props);
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {todoText: ''};
  }

  /*
  ** Handles the submit event of add todo form and notifies
  ** the parent module about the newly added todo
  ** @param e as Event: handled event details.
  */
  onSubmit(e) {
    e.preventDefault()
    if (this.state.todoText.length === 0) return;
    this.props.addTodo(this.state.todoText);
    this.setState({todoText: ''});
  }

  /*
  ** Handles the keystrokes and changes the todoText state
  ** @param e as Event: handled event details.
  */
  onTextChange(e) {
    this.setState({todoText: e.target.value});
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} 
      className="Prompt cf">
        <input type="text" 
        className="block left"
        placeholder="Add a todo..."
        onChange={this.onTextChange} 
        value={this.state.todoText} />
        <button className="block right"
        disabled={this.state.todoText.length === 0}>Add</button>
      </form>
    );
  }
  
}

Prompt.propTypes = {
  addTodo: PropTypes.func
};

export default Prompt;
