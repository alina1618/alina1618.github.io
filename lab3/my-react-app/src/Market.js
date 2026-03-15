import React, { useState } from 'react';

function Market() {
  const competitors = [
    { name: "AlphaCore Inc.", industry: "AI", threat: "red", threatText: "Висока загроза", region: "США, ЄС", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=70" },
    { name: "BrightLoop", industry: "SaaS", threat: "yellow", threatText: "Середня загроза", region: "Польща", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=70" },
    { name: "NexWave", industry: "Automation", threat: "green", threatText: "Низька загроза", region: "Україна", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=70" }
  ];

  const [filter, setFilter] = useState('Всі');
  const filtered = filter === 'Всі' ? competitors : competitors.filter(c => c.industry === filter);

  return (
    <section id="market">
      <p className="eyebrow">Конкурентний аналіз</p>
      <h2>Ринок</h2>
      <div className="filter-buttons" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button className={`tag ${filter === 'Всі' ? 'on' : ''}`} onClick={() => setFilter('Всі')}>Всі</button>
        <button className={`tag ${filter === 'AI' ? 'on' : ''}`} onClick={() => setFilter('AI')}>AI</button>
        <button className={`tag ${filter === 'SaaS' ? 'on' : ''}`} onClick={() => setFilter('SaaS')}>SaaS</button>
      </div>
      <div className="grid-3">
        {filtered.map((comp, index) => (
          <div className="comp-card" key={index}>
            <img src={comp.img} alt={comp.name} />
            <div className="comp-body">
              <span className={`badge ${comp.threat}`}>{comp.threatText}</span>
              <h4>{comp.name}</h4>
              <p className="sub">{comp.industry} · {comp.region}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Market;