// 1. Стилізація меню
const navLinks = document.querySelectorAll('nav ul li a');
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].style.color = (i % 2 === 0) ? "#ffffff" : "#21c191";
}

// 2. Робота з масивом за варіантом №16
const competitors = ["TechFlow", "GreenData", "SkyNet"];
const compStatus = competitors.map(name => `Моделювання для: ${name}`);
console.log(compStatus);

// 3. Кнопка приховання ринку
const marketGrid = document.querySelector('#market .grid-3');
if (marketGrid) {
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = "Показати / Приховати ринок";
    toggleBtn.style.cssText = "margin: 20px 0; padding: 10px; cursor: pointer; background: #21c191; color: white; border: none; border-radius: 5px;";
    marketGrid.parentNode.insertBefore(toggleBtn, marketGrid);
    toggleBtn.addEventListener('click', () => {
        marketGrid.style.display = (marketGrid.style.display === "none") ? "grid" : "none";
    });
}

// 4. КНОПКА МОДЕЛЮВАННЯ ТА ГРАФІК
const modelBtn = document.getElementById('modelBtn');
const resultDiv = document.getElementById('simulationResult');

if (modelBtn) {
    modelBtn.addEventListener('click', function() {
        const name = document.getElementById('nameInput').value;
        const profit = parseFloat(document.getElementById('profitInput').value) || 0;
        const expenses = parseFloat(document.getElementById('expenseInput').value) || 0;
        const staff = parseInt(document.getElementById('staffInput').value) || 0;

        if (!name) { alert("Введіть назву!"); return; }

        const currentNetIncome = profit - expenses;
        let statusText, statusColor, baseHeight;

        // ЛОГІКА ВИСОТИ ТА КОЛЬОРУ
        if (currentNetIncome > 100000) {
            statusText = "Лідер ринку"; statusColor = "#22c55e"; baseHeight = 150; // Високий
        } else if (currentNetIncome > 0) {
            statusText = "Стабільність"; statusColor = "#eab308"; baseHeight = 80;  // Середній
        } else {
            statusText = "Криза"; statusColor = "#ef4444"; baseHeight = 40;        // Низький
        }

        const modeledProfit = profit * 1.2;
        const modeledStaff = Math.round(staff * 1.1);

        resultDiv.style.display = "block";
        resultDiv.style.border = `2px solid ${statusColor}`;
        resultDiv.style.padding = "15px";
        resultDiv.style.marginTop = "20px";
        
        resultDiv.innerHTML = `
            <h3 style="color: ${statusColor}; margin: 0;">Статус: ${statusText}</h3>
            <p>Стартап: <strong>${name}</strong></p>
            
            <table style="width:100%; border-collapse: collapse; margin: 10px 0; font-size: 14px;">
                <tr style="background: #f1f5f9;">
                    <th style="border: 1px solid #ddd; padding: 5px;">Параметр</th>
                    <th style="border: 1px solid #ddd; padding: 5px;">Зараз</th>
                    <th style="border: 1px solid #ddd; padding: 5px;">Модель</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 5px;">Прибуток</td>
                    <td style="border: 1px solid #ddd; padding: 5px;">$${profit}</td>
                    <td style="border: 1px solid #ddd; padding: 5px; font-weight: bold;">$${modeledProfit.toFixed(0)}</td>
                </tr>
            </table>

            <div style="margin-top: 15px; font-weight: bold; font-size: 12px;">Візуалізація рівня доходу:</div>
            
            <div style="display: flex; align-items: flex-end; gap: 15px; height: ${baseHeight}px; padding: 10px; background: #f8fafc; border-bottom: 2px solid #333; transition: all 0.5s ease;">
                
                <div style="flex: 1; background: #94a3b8; height: ${(profit/modeledProfit)*100}%; text-align: center; color: white; font-size: 10px; border-radius: 3px 3px 0 0;">
                    ${profit}
                </div>
                
                <div style="flex: 1; background: ${statusColor}; height: 100%; text-align: center; color: white; font-size: 10px; font-weight: bold; border-radius: 3px 3px 0 0;">
                    ${modeledProfit.toFixed(0)}
                </div>
                
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; margin-top: 5px;">
                <span style="flex: 1; text-align: center;">Поточний</span>
                <span style="flex: 1; text-align: center;">Прогноз</span>
            </div>
        `;
    });
}