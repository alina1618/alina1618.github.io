import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { auth } from './firebase'; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import './App.css';

import Startup from './Startup';
import Market from './Market';
import Investors from './Investors';
import AuthPage from './AuthPage'; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  if (loading) {
    return (
      <div className="startup-container" style={{textAlign: 'center', marginTop: '100px'}}>
        <p className="eyebrow">Завантаження системи...</p>
      </div>
    );
  }

  return (
    <Router>
      {user && (
        <header>
          <Link className="logo" to="/">Менеджер стартапів</Link>
          <nav>
            <ul>
              <li><Link to="/">Мій стартап</Link></li>
              <li><Link to="/market">Ринок</Link></li>
              <li><Link to="/investors">Інвестори</Link></li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="tag" 
                  style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Вийти
                </button>
              </li>
            </ul>
          </nav>
        </header>
      )}

      <main>
        <Routes>\
          <Route path="/login" element={!user ? <AuthPage /> : <Navigate to="/" />} />
          
          <Route path="/" element={user ? <Startup /> : <Navigate to="/login" />} />
          <Route path="/market" element={user ? <Market /> : <Navigate to="/login" />} />
          <Route path="/investors" element={user ? <Investors /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </main>

      <footer>
        <p>Контакти: alina.slota.oi.2022@lpnu.ua | Тел: +380 98 388 06 78</p>
        <p>&copy; 2026 Аліна Слота, Національний університет "Львівська політехніка"</p>
      </footer>
    </Router>
  );
}

export default App;