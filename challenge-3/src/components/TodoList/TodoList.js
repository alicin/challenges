import React, { Component } from 'react';
import './TodoList.css';
import Prompt from '../Prompt/Prompt'
import Todo from '../Todo/Todo'
import storage from '../../services/Storage'

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.state = {
      show: 0,
      todos: storage.getTodos()
    };
  }

  /*
  ** Adds a new todo object to state collection
  ** @param todoText as String: Text of the todo item
  */
  addTodo(todoText) {
    const todo = {
      id: Date.now(),
      complete: false,
      text: todoText
    };
    this.setState(prevState => ({
      todos: [todo, ...prevState.todos]
    }));
  }
  
  /*
  ** Modifies the complete status of the todo item
  ** @param id as Number: Id of the todo item
  ** @param is_complete as Boolean: complete status
  */
  modifyProgress(id, is_complete) {
    const _todos = this.state.todos
    let index

    if (Array.findIndex) {
      index = _todos.findIndex(t => {
        return t.id === id
      })  
    } else {
      // IE fix
      _todos.forEach((t, i) => {
        if (t.id === id) {
          index = i
        }
      })
    }
    
    _todos[index].complete = is_complete
    this.setState({
      todos: _todos
    })
  }

  /*
  ** Filters the todos collection and removes completed items.
  */
  clearComplete() {
    const _todos = this.state.todos.filter(t => {
      return t.complete === false
    })
    this.setState({
      todos: _todos
    })
  }
  
  /*
  ** Handles the change event of the filter selector
  ** @param e as Event: handled event details.
  */
  handleSelectChange(e) {
    this.setState({show: parseInt(e.target.value, 10)});
  }

  /*
  ** @return as Number: Total number of completed todo items.
  */
  completedCount() {
    return this.state.todos.filter(t => {return t.complete === true}).length
  }

  componentDidUpdate(prevProps, prevState) {
    storage.sync(this.state.todos)
  }

  render() {
    let renderable

    switch (this.state.show) {
      case 1:
        renderable = this.state.todos.filter(t => {
          return t.complete === false
        })
        break
      case 2:
        renderable = this.state.todos.filter(t => {
          return t.complete === true
        })
        break
      default:
        renderable = this.state.todos
    }

    return (
      <div className="TodoList">
        <Prompt addTodo={this.addTodo.bind(this)} />
        <ul className="TodoList-list">
          {renderable.map(todo => (
            <Todo key={todo.id} 
            todo={todo} 
            modifyProgress={this.modifyProgress.bind(this)} />
          ))}
        </ul>
        <div className="actions cf">
          <select className="block left" 
          value={this.state.show} 
          onChange={this.handleSelectChange}>
            <option value="0">All</option>
            <option value="1">Active</option>
            <option value="2">Completed</option>
          </select>
          <button className="block right" 
          onClick={this.clearComplete.bind(this)}
          disabled={this.completedCount() === 0}>Clear Complete</button>
        </div>
      </div>
    );
  }
}

export default TodoList;
