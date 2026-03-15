import React from 'react';

function Investors() {
  const investors = [
    { name: "Silicon Ventures", sub: "AI · SaaS · DeepTech", portfolio: "$240M", img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=500&q=70" },
    { name: "EuroSeed Fund", sub: "FinTech · GreenTech", portfolio: "$85M", img: "https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?w=500&q=70" },
    { name: "UkrTech Capital", sub: "IT · AI", portfolio: "$32M", img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&q=70" }
  ];

  return (
    <section id="investors">
      <p className="eyebrow">Фінансування</p>
      <h2>Інвестори</h2>
      <p className="desc">Список потенційних інвесторів та обсяг їх інвестиційних портфелів.</p>
      <div className="grid-3">
        {investors.map((inv, i) => (
          <div className="inv-card" key={i}>
            <img src={inv.img} alt={inv.name} />
            <div className="inv-body">
              <h4>{inv.name}</h4>
              <p className="sub">{inv.sub}</p>
              <div className="row"><span>Портфель</span><span className="green">{inv.portfolio}</span></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Investors;