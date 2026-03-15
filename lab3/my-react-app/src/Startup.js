import React, { useState } from 'react';

function Startup() {
  const [formData, setFormData] = useState({
    name: "NovaTech",
    sector: "Штучний інтелект",
    staff: 47,
    offices: 2,
    profit: 124000,
    expenses: 89000
  });

  const [result, setResult] = useState(null);

  const handleModel = () => {
    const { profit, expenses, staff, name } = formData;
    
    if (!name || isNaN(profit) || isNaN(expenses)) {
      alert("Заповніть всі поля!");
      return;
    }

    const currentNetIncome = profit - expenses;
    let statusText = "";
    let statusColor = "";

    if (currentNetIncome > 100000) {
      statusText = "Лідер ринку"; statusColor = "#22c55e";
    } else if (currentNetIncome > 0) {
      statusText = "Стабільність"; statusColor = "#eab308";
    } else {
      statusText = "Криза"; statusColor = "#ef4444";
    }

    setResult({
      statusText,
      statusColor,
      modeledProfit: profit * 1.2,
      modeledStaff: Math.round(staff * 1.1),
      currentProfit: profit
    });
  };

  return (
    <section id="startup">
      <p className="eyebrow">Панель управління</p>
      <h2>Мій стартап</h2>
      <p className="desc">Створення компанії, вибір сфери діяльності та керування параметрами бізнесу.</p>

      <div className="hero">
        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80" alt="Офіс" />
        <div className="hero-text">
          <h3>{formData.name}</h3>
          <p>{formData.sector} · Львів · 2026</p>
        </div>
      </div>

      <div className="card">
        <h3>Налаштування компанії</h3>
        <div className="form-grid">
          <div className="field">
            <label>Назва компанії</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="field">
            <label>Сфера діяльності</label>
            <select value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})}>
              <option>Штучний інтелект</option>
              <option>FinTech</option>
              <option>HealthTech</option>
              <option>E-commerce</option>
            </select>
          </div>
          <div className="field">
            <label>Працівники</label>
            <input type="number" value={formData.staff} onChange={e => setFormData({...formData, staff: Number(e.target.value)})} />
          </div>
          <div className="field">
            <label>Офіси</label>
            <input type="number" value={formData.offices} onChange={e => setFormData({...formData, offices: Number(e.target.value)})} />
          </div>
          <div className="field">
            <label>Прибуток ($/міс)</label>
            <input type="number" value={formData.profit} onChange={e => setFormData({...formData, profit: Number(e.target.value)})} />
          </div>
          <div className="field">
            <label>Витрати ($/міс)</label>
            <input type="number" value={formData.expenses} onChange={e => setFormData({...formData, expenses: Number(e.target.value)})} />
          </div>
        </div>
        <button className="btn btn-green" onClick={handleModel}>Зберегти та моделювати</button>

        {result && (
          <div id="simulationResult" style={{ display: 'block', borderColor: result.statusColor, marginTop: '20px' }}>
            <h3 style={{ color: result.statusColor }}>Статус: {result.statusText}</h3>
            <p>Результати моделювання для стартапу <strong>{formData.name}</strong>:</p>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '10px 0' }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th style={{ border: '1px solid #ddd', padding: '5px' }}>Параметр</th>
                  <th style={{ border: '1px solid #ddd', padding: '5px' }}>Реальні</th>
                  <th style={{ border: '1px solid #ddd', padding: '5px' }}>Модель (+20%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '5px' }}>Прибуток</td>
                  <td style={{ border: '1px solid #ddd', padding: '5px' }}>${formData.profit}</td>
                  <td style={{ border: '1px solid #ddd', padding: '5px', fontWeight: 'bold' }}>${result.modeledProfit.toFixed(0)}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: '5px' }}>Штат</td>
                  <td style={{ border: '1px solid #ddd', padding: '5px' }}>{formData.staff}</td>
                  <td style={{ border: '1px solid #ddd', padding: '5px' }}>{result.modeledStaff}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '100px', padding: '10px', background: '#fafafa', borderBottom: '2px solid #333' }}>
              <div style={{ flex: 1, background: '#94a3b8', height: `${(result.currentProfit / result.modeledProfit) * 100}%`, textAlign: 'center', fontSize: '10px' }}>Поточний</div>
              <div style={{ flex: 1, background: result.statusColor, height: '100%', textAlign: 'center', fontSize: '10px' }}>Прогноз</div>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Ринки збуту</h3>
        <div className="tags">
          <span className="tag on">Україна</span>
          <span className="tag on">Німеччина</span>
          <span className="tag on">Польща</span>
          <span className="tag">США</span>
          <span className="tag">Франція</span>
        </div>
      </div>
    </section>
  );
}

export default Startup;