import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="bg-blue-600 p-4 text-white fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Todo App</Link>
        <div className="flex space-x-4">
          {/* Show Todos, Create Todo, and Users links only if logged in */}
          {token && (
            <>
              <Link to="/todos" className="hover:text-blue-200">Todos</Link>
              <Link to="/create-todo" className="hover:text-blue-200">Create Todo</Link>
              <Link to="/users" className="hover:text-blue-200">Users</Link>
            </>
          )}
          {/* Show Register and Login links only if not logged in */}
          {!token && (
            <>
              <Link to="/register" className="hover:text-blue-200">Register</Link>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
            </>
          )}
          {/* Show Logout button only if logged in */}
          {token && (
            <button onClick={handleLogout} className="hover:text-blue-200">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;