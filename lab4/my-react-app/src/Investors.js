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

function Investors() {
  const [investorsFromDb, setInvestorsFromDb] = useState([]);
  const [loading, setLoading] = useState(false);

  const staticInvestors = [
    { name: "Silicon Ventures", sub: "AI · SaaS · DeepTech", portfolio: "$240M", img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=500&q=70", isVip: true },
    { name: "EuroSeed Fund", sub: "FinTech · GreenTech", portfolio: "$85M", img: "https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?w=500&q=70", isVip: false },
    { name: "UkrTech Capital", sub: "IT · AI", portfolio: "$32M", img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&q=70", isVip: false },
    { name: "Global Growth", sub: "E-commerce · Logistics", portfolio: "$150M", img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=500&q=70", isVip: true },
    { name: "Nordic Alpha", sub: "Clean Energy · Robotics", portfolio: "$110M", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=70", isVip: true },
    { name: "Horizon Partners", sub: "HealthTech · BioTech", portfolio: "$45M", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=70", isVip: false }
  ];

  const readDataFromFirestore = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, "startups"), 
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInvestorsFromDb(docs);
    } catch (e) {
      console.error("Помилка читання: ", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    readDataFromFirestore();
  }, []);

  const saveInvestorToFirestore = async (inv) => {
    try {
      await addDoc(collection(db, "startups"), {
        userId: auth.currentUser.uid,
        investorName: inv.name,
        portfolioValue: inv.portfolio,
        isVipPartner: inv.isVip,
        createdAt: Timestamp.now()
      });
      alert(`Дані про ${inv.name} успішно записано в базу!`);
      
      readDataFromFirestore(); 
    } catch (e) {
      alert("Помилка запису: " + e.message);
    }
  };

  return (
    <section id="investors">
      <p class="eyebrow">Фінансування</p>
      <h2>Інвестори</h2>
      <p class="desc">
        Список потенційних інвесторів та обсяг їх інвестиційних портфелів.
      </p>
      
      <div className="grid-3">
        {staticInvestors.map((inv, i) => (
          <div className="inv-card" key={i} onClick={() => saveInvestorToFirestore(inv)} style={{cursor: 'pointer'}}>
            <img src={inv.img} alt={inv.name} />
            <div className="inv-body">
              <h4>{inv.name}</h4>
              <p className="sub">{inv.sub}</p>
              <div className="row">
                <span>Портфель</span>
                <span className="green">{inv.portfolio}</span>
              </div>
              <button className="btn-green" style={{width: '100%', marginTop: '10px'}}>Обрати (Запис у БД)</button>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <div className="card">
        <h3>Отримані дані з бази (Firestore Read)</h3>
        {loading ? <p>Завантаження...</p> : (
          <table className="history-table" style={{width: '100%', marginTop: '20px'}}>
            <thead>
              <tr>
                <th>Назва</th>
                <th>Портфель</th>
                <th>VIP статус</th>
                <th>Час запису</th>
              </tr>
            </thead>
            <tbody>
              {investorsFromDb.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.investorName}</td>
                  <td>{doc.portfolioValue}</td>
                  <td>{doc.isVipPartner ? "Так" : "Ні"}</td>
                  <td>{doc.createdAt?.toDate().toLocaleString()}</td>
                </tr>
              ))}
              {investorsFromDb.length === 0 && (
                <tr><td colSpan="4" style={{textAlign: 'center'}}>База порожня. Натисніть "Обрати" на картці вище.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default Investors;