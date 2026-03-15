import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Startup from './Startup';
import Market from './Market';
import Investors from './Investors';

function App() {
  return (
    <Router>
      <header>
        <Link className="logo" to="/">Менеджер стартапів</Link>
        <nav>
          <ul>
            <li><Link to="/">Мій стартап</Link></li>
            <li><Link to="/market">Ринок</Link></li>
            <li><Link to="/investors">Інвестори</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Startup />} />
          <Route path="/market" element={<Market />} />
          <Route path="/investors" element={<Investors />} />
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