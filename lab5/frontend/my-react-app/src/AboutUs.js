import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <main>
     
      <div className="hero">
        <img 
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1400" 
          alt="Startup Simulator Workspace" 
        />
        <div className="hero-text">
          <p className="eyebrow" style={{ color: '#21c191' }}>Навчальна платформа</p>
          <h1 style={{ fontSize: '42px' }}>Симулятор стартапів</h1>
        </div>
      </div>


      <section className="card" style={{ 
        borderLeft: '8px solid #10b981', 
        marginTop: '40px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)' 
      }}>
        <p className="eyebrow">Симулятор стартапів</p>
        <h2>Побудуй імперію без ризиків</h2>
        <p className="desc" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
          Це інтерактивне середовище для моделювання життєвого циклу ІТ-компанії. 
          Тут ви можете спробувати себе в ролі CEO: від реєстрації назви до залучення мільйонних інвестицій. 
          Це ваш тренувальний майданчик перед виходом у реальний світ бізнесу.
        </p>
      </section>

     
      <div className="grid-3" style={{ marginTop: '30px' }}>
        <div className="comp-card">
          <img src="https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=400" alt="Finance" />
          <div className="comp-body">
            <div className="badge" style={{ background: '#1e293b', color: '#fff' }}>Simulation</div>
            <h4 className="green">Керування капіталом</h4>
            <p className="sub">Слідкуйте за доходами та витратами. Навчіться тримати баланс стартапу в плюсі.</p>
          </div>
        </div>

        <div className="comp-card">
          <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=400" alt="Strategy" />
          <div className="comp-body">
            <div className="badge" style={{ background: '#1e293b', color: '#fff' }}>Strategy</div>
            <h4 className="green">Пошук інвесторів</h4>
            <p className="sub">Обирайте найкращі пропозиції від віртуальних венчурних фондів та бізнес-ангелів.</p>
          </div>
        </div>

        <div className="comp-card">
          <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400" alt="Market" />
          <div className="comp-body">
            <div className="badge" style={{ background: '#1e293b', color: '#fff' }}>Analysis</div>
            <h4 className="green">Аналіз ринку</h4>
            <p className="sub">Аналізуйте конкурентів та ринкові ніші для запуску свого наступного продукту.</p>
          </div>
        </div>
      </div>

     
      <div className="card" style={{ 
        textAlign: 'center', 
        marginTop: '60px', 
        padding: '50px',
        background: '#f8fafc' 
      }}>
        <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>Готові стати найкращим менеджером?</h3>
        <p className="desc">Реєструйтеся та запустіть свій перший віртуальний стартап вже сьогодні!</p>
        <button 
          className="btn-green" 
          style={{ 
            padding: '18px 60px', 
            fontSize: '20px', 
            fontWeight: '700',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
          }} 
          onClick={() => navigate('/login')}
        >
          Запустити симуляцію
        </button>
      </div>

    </main>
  );
};

export default AboutUs;