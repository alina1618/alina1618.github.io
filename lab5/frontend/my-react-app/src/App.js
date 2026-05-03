import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { auth } from './firebase'; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import './App.css';

import Startup from './Startup';
import Market from './Market';
import Investors from './Investors';
import AuthPage from './AuthPage'; 
import AboutUs from './AboutUs'; // Імпортуємо нову сторінку

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
    <Router basename="/lab_5">
      {/* Хедер тепер відображається завжди, але з різним меню */}
      <header>
        <Link className="logo" to="/">NovaTech</Link>
        <nav>
          <ul>
            {!user ? (
              <>
                <li><Link to="/">Про нас</Link></li>
                <li><Link to="/login">Увійти</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/dashboard">Мій стартап</Link></li>
                <li><Link to="/market">Ринок</Link></li>
                <li><Link to="/investors">Інвестори</Link></li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="tag" 
                    style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '500' }}
                  >
                    Вийти
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          {/* Публічні маршрути */}
          <Route path="/" element={<AboutUs />} />
          <Route path="/login" element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} />
          
          {/* Захищені маршрути (тільки для авторизованих) */}
          <Route path="/dashboard" element={user ? <Startup /> : <Navigate to="/login" />} />
          <Route path="/market" element={user ? <Market /> : <Navigate to="/login" />} />
          <Route path="/investors" element={user ? <Investors /> : <Navigate to="/login" />} />
          
          {/* Редирект для невідомих сторінок */}
          <Route path="*" element={<Navigate to="/" />} />
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