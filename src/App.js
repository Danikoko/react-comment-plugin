import { useMemo, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Post from './pages/Post';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const loggedIn = useMemo(() => {
      return user ? true : false;
  }, [user]);

  useEffect(() => {
      if (user) {
        console.log('Logged In');
      } else {
        console.log('Logged Out');
      }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={loggedIn ? <Post setUser={setUser} user={user} /> : <Navigate to="/login" replace />} />
      <Route path="login" element={loggedIn ? <Navigate to="/" replace /> : <Login setUser={setUser} />} />
    </Routes>
  )
}

export default App;
