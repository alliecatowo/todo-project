import React from 'react';
import './App.css';
import TodoList from './TodoList'; // Update this path if necessary

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
        <TodoList />
      </header>
    </div>
  );
}

export default App;