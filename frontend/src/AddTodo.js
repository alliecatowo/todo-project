import React, { useState } from 'react';

const AddTodo = () => {
  const [text, setText] = useState('');

  const handleAddTodo = () => {
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
    .then(response => response.json())
    .then(data => {
      setText('');
      // Handle the new todo item here
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a new ToDo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
}

export default AddTodo;