import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <BookOpen className="mr-2" />
          DevLogger
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <li><Link to="/" className="hover:text-blue-200">Dashboard</Link></li>
                <li><Link to="/log-entry" className="hover:text-blue-200">New Entry</Link></li>
                <li><Link to="/chat" className="hover:text-blue-200">Chat</Link></li>
                <li>
                  <button onClick={logout} className="flex items-center hover:text-blue-200">
                    <LogOut className="mr-1" size={18} />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-blue-200">Login</Link></li>
                <li><Link to="/register" className="hover:text-blue-200">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;