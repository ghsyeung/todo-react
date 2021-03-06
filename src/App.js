import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";

const ToDo = ({ item, toggleComplete, removeToDo }) => (
  <li>
    {item.title}
    <input
      type="checkbox"
      id={item.id}
      defaultChecked={item.complete}
      onChange={() => toggleComplete(item)}
    />
    <label htmlFor={item.id} />
    <button onClick={() => removeToDo(item)}>
      <i className="fa fa-trash" />
    </button>
  </li>
);
ToDo.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  }),
  toggleComplete: PropTypes.func.isRequired
};

const ToDoCount = ({ number }) => (
  <span>
    {number} {number === 1 ? "todo" : "todos"}
  </span>
);
ToDoCount.defaultProps = {
  number: 0
};
ToDoCount.propTypes = {
  number: PropTypes.number
};

const ClearButton = ({ removeCompleted }) => (
  <button onClick={removeCompleted}>Remove Completed</button>
);
ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

class App extends Component {
  constructor(props) {
    super(props);
    this.toDoInput = React.createRef();
    this.state = {
      todos: [
        { id: 0, title: "Send mail to mom", complete: true },
        { id: 1, title: "Learn React 🤓", complete: false },
        { id: 2, title: "Eat pray love", complete: false },
        { id: 3, title: "🌞💅🌚🍵", complete: false }
      ],
      lastId: 3
    };
  }

  addToDo = event => {
    event.preventDefault();
    const toDoInput = this.toDoInput.current;
    if (toDoInput.value) {
      const id = this.state.lastId + 1; // update id
      const newTodos = [
        ...this.state.todos,
        { id, title: toDoInput.value, complete: false }
      ];
      this.setState({
        todos: newTodos,
        lastId: id
      });
      toDoInput.value = "";
    }
  };

  removeCompleted = () => {
    let todos = this.state.todos.filter(todo => !todo.complete);
    this.setState({ todos });
  };

  toggleComplete = item => {
    const todos = this.state.todos.map(todo => {
      if (todo.id === item.id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    this.setState({ todos });
  };

  removeToDo = item => {
    const todos = this.state.todos.filter(todo => todo.id !== item.id);
    this.setState({ todos });
  };

  hasCompleted = () => {
    const todos = this.state.todos.filter(todo => todo.complete);
    return todos.length > 0;
  };

  render() {
    return (
      <div className="todo-list">
        <h1>So Much To Do</h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
            <input type="text" ref={this.toDoInput} />
            <span>(press enter to add)</span>
          </form>
        </div>
        <ul className="todo-list">
          {this.state.todos.map(todo => (
            <ToDo
              item={todo}
              key={todo.id}
              toggleComplete={this.toggleComplete}
              removeToDo={this.removeToDo}
            />
          ))}
        </ul>
        <div className="todo-admin">
          <ToDoCount number={this.state.todos.length} />
          {this.hasCompleted() && (
            <ClearButton removeCompleted={this.removeCompleted} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
