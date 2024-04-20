import React, { useState } from 'react';

const EditTodo = ({ todo }) => {
  const [text, setText] = useState(todo.text);

  const handleUpdateTodo = () => {
    fetch(`/api/todos/${todo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
    .then(response => response.json())
    .then(data => {
      setText('');
      // Handle the updated todo item here
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleUpdateTodo}>Update</button>
    </div>
  );
}

export default EditTodo;