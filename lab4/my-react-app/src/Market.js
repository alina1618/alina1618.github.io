import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  Timestamp 
} from "firebase/firestore";

function Market() {
  const [marketHistory, setMarketHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('Всі');

  const competitors = [
    { name: "AlphaCore Inc.", industry: "AI", threat: "red", threatText: "Висока загроза", region: "США, ЄС", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=70" },
    { name: "BrightLoop", industry: "SaaS", threat: "yellow", threatText: "Середня загроза", region: "Польща", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=70" },
    { name: "NexWave", industry: "Automation", threat: "green", threatText: "Низька загроза", region: "Україна", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=70" },
    { name: "DataFlow", industry: "AI", threat: "red", threatText: "Висока загроза", region: "Німеччина", img: "https://st4.depositphotos.com/10325396/29038/i/450/depositphotos_290384304-stock-photo-programming-code-abstract-technology-background.jpg" },
    { name: "CloudScale", industry: "SaaS", threat: "yellow", threatText: "Середня загроза", region: "Канада", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=70" },
    { name: "EcoLogic", industry: "Automation", threat: "green", threatText: "Низька загроза", region: "Франція", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&q=70" }
  ];

  const fetchMarketData = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      const q = query(collection(db, "startups"), where("userId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      setMarketHistory(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchMarketData(); }, []);

  const handleSelectCompetitor = async (comp) => {
    try {
      await addDoc(collection(db, "startups"), {
        userId: auth.currentUser.uid,
        itemName: comp.name,
        itemType: "Market Analysis",
        threatLevel: comp.threatText,
        isAnalyzed: true,
        createdAt: Timestamp.now()
      });
      alert(`Дані про ${comp.name} додано до аналізу в Firebase!`);
      fetchMarketData(); 
    } catch (e) { alert(e.message); }
  };

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
          <div className="comp-card" key={index} onClick={() => handleSelectCompetitor(comp)} style={{cursor: 'pointer'}}>
            <img src={comp.img} alt={comp.name} />
            <div className="comp-body">
              <span className={`badge ${comp.threat}`}>{comp.threatText}</span>
              <h4>{comp.name}</h4>
              <p className="sub">{comp.industry} · {comp.region}</p>
              <button className="btn-green" style={{width: '100%', marginTop: '10px', fontSize: '12px'}}>Додати в аналіз</button>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <div className="card" style={{marginTop: '40px'}}>
        <p className="eyebrow">База Даних Firestore</p>
        <h3>Результати аналізу ринку</h3>
        {loading ? <p>Оновлення...</p> : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Компанія (String)</th>
                <th>Загроза (String)</th>
                <th>Статус (Boolean)</th>
                <th>Дата (Timestamp)</th>
              </tr>
            </thead>
            <tbody>
              {marketHistory.filter(item => item.itemType === "Market Analysis").map((item) => (
                <tr key={item.id}>
                  <td>{item.itemName}</td>
                  <td>{item.threatLevel}</td>
                  <td className="green">{item.isAnalyzed ? "Проаналізовано" : "Ні"}</td>
                  <td>{item.createdAt?.toDate()?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default Market;