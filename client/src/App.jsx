import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Login from './components/Login';
import Register from './components/Register';
import UserList from './components/UserList';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-16"> {/* Add padding-top to avoid overlap with Navbar */}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/todos" element={<TodoList />} />
            <Route path="/create-todo" element={<TodoForm />} />
            <Route path="/users" element={<UserList />} />
          </Route>

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/todos" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;