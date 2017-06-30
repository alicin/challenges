import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.onProgressChange = this.onProgressChange.bind(this);
  }

  /*
  ** Handles the change event of the checkbox and notifies
  ** the parent module about the todo that changed status
  ** @param e as Event: handled event details.
  */
  onProgressChange(e) {
    this.props.modifyProgress(this.props.todo.id, e.target.checked)
  }

  render() {
    return (
      <li className={this.props.todo.complete ? 'Todo-item done' : 'Todo-item'}>
        <label>
          <input type="checkbox" 
          onChange={this.onProgressChange}
          checked={this.props.todo.complete} />
          {this.props.todo.text}
        </label>
      </li>
    );
  }

}

Todo.propTypes = {
  todo: PropTypes.object,
  modifyProgress: PropTypes.func
};

export default Todo;
