import React, { useState, useMemo, useEffect } from 'react';
import './App.css';

function Startup() {
  const [formData, setFormData] = useState({
    name: "NovaTech",
    sector: "Штучний інтелект",
    staff: 47,
    offices: 2,
    profit: 124000,
    expenses: 89000
  });

  const [history, setHistory] = useState([]); 
  const [result, setResult] = useState(null); 
  
  const [activeMarkets, setActiveMarkets] = useState(["Україна", "Німеччина", "Польща"]);
  const allMarkets = ["Україна", "Німеччина", "Польща", "США", "Франція"];

  // Отримання даних з хмарного сервера
  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch("https://lab5-api-41ka.onrender.com/api/startup");
        const data = await response.json();
        
        const loadedHistory = data.map(doc => ({
          id: doc.id,
          name: doc.companyName,
          sector: doc.industry,
          staff: 0, offices: 0, profit: 0, expenses: 0,
          statusText: "Збережено в БД",
          statusColor: "#94a3b8",
          netIncome: 0,
          savedMarkets: [],
          modeledProfit: 0,
          modeledStaff: 0,
          date: "Архів"
        }));
        
        setHistory(loadedHistory);
      } catch (error) {
        console.error("Помилка завантаження даних з сервера:", error);
      }
    };
    fetchStartups();
  }, []);

  const maxNetIncome = useMemo(() => {
    const positiveValues = history.map(h => h.netIncome).filter(v => v > 0);
    if (positiveValues.length === 0) return 1000;
    return Math.max(...positiveValues, 1000); 
  }, [history]);

  const toggleMarket = (market) => {
    setActiveMarkets(prev => 
      prev.includes(market) ? prev.filter(m => m !== market) : [...prev, market]
    );
  };

  const handleModel = async () => {
    const { profit, expenses, staff, name, sector, offices } = formData;
    
    if (!name || isNaN(profit) || isNaN(expenses)) {
      alert("Заповніть всі поля!");
      return;
    }

    // Відправка даних на хмарний сервер Render
    try {
      const response = await fetch("https://lab5-api-41ka.onrender.com/api/startup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: name, industry: sector })
      });

      const serverResult = await response.json();

      if (!response.ok) {
        alert("Помилка від сервера: " + serverResult.error);
        return; 
      }
      
      alert(serverResult.message);
    } catch (error) {
      alert("Помилка з'єднання з сервером.");
      return;
    }

    const currentNetIncome = profit - expenses;
    let statusText = currentNetIncome > 100000 ? "Лідер ринку" : currentNetIncome > 0 ? "Стабільність" : "Криза";
    let statusColor = currentNetIncome > 100000 ? " #10b981" : currentNetIncome > 0 ? "#eab308" : "#ef4444";

    const newRecord = {
      id: Date.now(),
      name, sector, staff, offices, profit, expenses,
      statusText,
      statusColor,
      netIncome: currentNetIncome,
      savedMarkets: [...activeMarkets],
      modeledProfit: profit * 1.2,
      modeledStaff: Math.round(staff * 1.1),
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setResult(newRecord);
    setHistory(prev => [newRecord, ...prev]);
  };

  const total = formData.profit + formData.expenses;
  const profitWidth = total > 0 ? (formData.profit / total) * 100 : 0;
  const expenseWidth = total > 0 ? (formData.expenses / total) * 100 : 0;

  return (
    <main className="startup-container">
      <section id="startup">
        <p className="eyebrow">Панель управління</p>
        <h2>Мій стартап</h2>
        <p className="desc">Керування параметрами бізнесу та моделювання розвитку.</p>

        <div className="hero">
          <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80" alt="Офіс" />
          <div className="hero-text">
            <h3>{formData.name}</h3>
            <p>{formData.sector} · Офісів: {formData.offices} · Команда: {formData.staff}</p>
          </div>
        </div>

        <div className="card">
          <h3>Налаштування компанії</h3>
          <div className="form-grid">
            <div className="field">
              <label>Назва</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="field">
              <label>Сфера</label>
              <select value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})}>
                <option>Штучний інтелект</option>
                <option>FinTech</option>
                <option>HealthTech</option>
                <option>E-commerce</option>
              </select>
            </div>
            <div className="field"><label>Штат</label><input type="number" value={formData.staff} onChange={e => setFormData({...formData, staff: Number(e.target.value)})} /></div>
            <div className="field"><label>Офіси</label><input type="number" value={formData.offices} onChange={e => setFormData({...formData, offices: Number(e.target.value)})} /></div>
            <div className="field"><label>Прибуток ($)</label><input type="number" value={formData.profit} onChange={e => setFormData({...formData, profit: Number(e.target.value)})} /></div>
            <div className="field"><label>Витрати ($)</label><input type="number" value={formData.expenses} onChange={e => setFormData({...formData, expenses: Number(e.target.value)})} /></div>
          </div>

          <div style={{marginTop: '20px'}}>
            <label style={{fontSize: '13px', fontWeight: 'bold', color: '#64748b'}}>Ринки збуту:</label>
            <div className="tags" style={{marginTop: '10px'}}>
              {allMarkets.map(m => (
                <span key={m} className={`tag ${activeMarkets.includes(m) ? 'on' : ''}`} onClick={() => toggleMarket(m)}>{m}</span>
              ))}
            </div>
          </div>

          <button className="btn-save" onClick={handleModel} style={{marginTop: '20px'}}>Зберегти та моделювати</button>

          {result && (
            <div className="big-chart-container">
              <div style={{ borderLeft: `4px solid ${result.statusColor}`, paddingLeft: '15px', marginBottom: '20px' }}>
                <h3 style={{ color: result.statusColor }}>Статус: {result.statusText}</h3>
              </div>

              <table className="history-table" style={{width: '100%', borderCollapse: 'collapse', marginBottom: '20px'}}>
                <thead>
                  <tr style={{background: '#f8fafc'}}>
                    <th style={{padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left'}}>Параметр</th>
                    <th style={{padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left'}}>Поточні</th>
                    <th style={{padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left'}}>Модель (+20%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{padding: '12px', border: '1px solid #e2e8f0'}}>Прибуток моделі</td>
                    <td style={{padding: '12px', border: '1px solid #e2e8f0'}}>${result.profit}</td>
                    <td style={{padding: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold', color: ' #10b981'}}>${result.modeledProfit.toFixed(0)}</td>
                  </tr>
                  <tr>
                    <td style={{padding: '12px', border: '1px solid #e2e8f0'}}>Масштаб штату</td>
                    <td style={{padding: '12px', border: '1px solid #e2e8f0'}}>{result.staff} ос.</td>
                    <td style={{padding: '12px', border: '1px solid #e2e8f0'}}>{result.modeledStaff} ос.</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="progress-label">
                <span>Баланс (Дохід / Витрати)</span>
                <span>Чистий: {result.netIncome}</span>
              </div>
              <div className="full-width-bar">
                <div className="income-segment" style={{ width: `${profitWidth}%` }}>Дохід {profitWidth.toFixed(0)}%</div>
                <div className="expense-segment" style={{ width: `${expenseWidth}%` }}>Витрати {expenseWidth.toFixed(0)}%</div>
              </div>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="card">
            <h3>Загальна статистика</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px', height: '180px', padding: '20px', background: '#f8fafc', borderRadius: '12px', overflowX: 'auto', marginBottom: '20px' }}>
              {history.map(h => {
                const isLoss = h.netIncome < 0;
                const relH = isLoss ? 15 : (h.netIncome / maxNetIncome) * 100;
                return (
                  <div key={h.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: '0 0 70px', justifyContent: 'flex-end', height: '100%' }}>
                    <span style={{fontSize: '9px', fontWeight: 'bold', marginBottom: '5px', color: isLoss ? '#ef4444' : '#1e293b'}}>${h.netIncome}</span>
                    <div style={{ 
                      height: `${Math.max(relH, 5)}%`, 
                      background: h.statusColor, 
                      width: '35px', borderRadius: '4px 4px 0 0',
                      transition: 'height 0.4s ease',
                      opacity: isLoss ? 0.8 : 1
                    }}></div>
                    <span style={{fontSize: '9px', marginTop: '5px', fontWeight: 'bold'}}>{h.name}</span>
                  </div>
                );
              })}
            </div>

            <h3>Архів</h3>
            <table className="history-table" style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{background: '#f8fafc'}}>
                  <th style={{padding: '10px', border: '1px solid #e2e8f0'}}>Час</th>
                  <th style={{padding: '10px', border: '1px solid #e2e8f0'}}>Назва / Сфера</th>
                  <th style={{padding: '10px', border: '1px solid #e2e8f0'}}>Штат / Офіси</th>
                  <th style={{padding: '10px', border: '1px solid #e2e8f0'}}>Чистий ($)</th>
                  <th style={{padding: '10px', border: '1px solid #e2e8f0'}}>Баланс</th>
                </tr>
              </thead>
              <tbody>
                {history.map(h => {
                  const totalSum = h.profit + h.expenses;
                  return (
                  <tr key={h.id}>
                    <td style={{padding: '10px', border: '1px solid #e2e8f0'}}>{h.date}</td>
                    <td style={{padding: '10px', border: '1px solid #e2e8f0'}}><strong>{h.name}</strong> <br/> <small>{h.sector}</small></td>
                    <td style={{padding: '10px', border: '1px solid #e2e8f0'}}>{h.staff} ос. / {h.offices} оф.</td>
                    <td style={{padding: '10px', border: '1px solid #e2e8f0', fontWeight: 'bold', color: h.netIncome > 0 ? '#10b981' : '#ef4444'}}>${h.netIncome}</td>
                    <td style={{padding: '10px', border: '1px solid #e2e8f0'}}>
                      <div style={{display: 'flex', gap: '2px', height: '18px', alignItems: 'flex-end', background: '#eee', width: '45px', padding: '2px', borderRadius: '3px'}}>
                        <div style={{background: '#10b981', flex: 1, height: `${totalSum > 0 ? (h.profit/totalSum)*100 : 0}%`}}></div>
                        <div style={{background: '#ef4444', flex: 1, height: `${totalSum > 0 ? (h.expenses/totalSum)*100 : 0}%`}}></div>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default Startup;