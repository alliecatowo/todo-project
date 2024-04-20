import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleNewTodo = (e) => {
    e.preventDefault();
    if(newTodo === '') return;
    setTodos([...todos, {id: Date.now(), text: newTodo}]);
    setNewTodo('');
  };

  return (
    <div>
      <form onSubmit={handleNewTodo}>
        <input value={newTodo} onChange={handleNewTodoChange} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;