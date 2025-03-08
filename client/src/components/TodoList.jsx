import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos for the authenticated user
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/todos/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTodos();
  }, []);

  // Function to update the completed status of a todo
  const toggleCompleted = async (id, completed) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/todos/${id}`,
        { completed: !completed }, // Toggle the completed status
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the local state to reflect the change
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="bg-white p-4 rounded shadow mb-2 flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo._id, todo.completed)}
              className="mr-4"
            />
            <span className={todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;