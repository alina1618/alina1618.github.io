const navLinks = document.querySelectorAll('nav ul li a');
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].style.color = (i % 2 === 0) ? "#ffffff" : "#21c191";
}

const competitors = ["TechFlow", "GreenData", "SkyNet"];
const compStatus = competitors.map(name => `Моделювання для: ${name}`);
console.log(compStatus);

const marketGrid = document.querySelector('#market .grid-3');
const toggleBtn = document.createElement('button');
toggleBtn.textContent = "Показати / Приховати ринок";
toggleBtn.className = "btn-green";
toggleBtn.style.margin = "20px 0";
marketGrid.parentNode.insertBefore(toggleBtn, marketGrid);

toggleBtn.addEventListener('click', function() {
    if (marketGrid.style.display === "none") {
        marketGrid.style.display = "grid";
    } else {
        marketGrid.style.display = "none";
    }
});

const modelBtn = document.getElementById('modelBtn');
const resultDiv = document.getElementById('simulationResult');

if (modelBtn) {
    modelBtn.addEventListener('click', function() {
        const name = document.getElementById('nameInput').value;
        const profit = parseFloat(document.getElementById('profitInput').value);
        const expenses = parseFloat(document.getElementById('expenseInput').value);
        const staff = parseInt(document.getElementById('staffInput').value);

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

        const modeledProfit = profit * 1.2;
        const modeledStaff = Math.round(staff * 1.1);

        resultDiv.style.display = "block";
        resultDiv.style.borderColor = statusColor;
        
        resultDiv.innerHTML = `
            <h3 style="color: ${statusColor}">Статус: ${statusText}</h3>
            <p>Результати моделювання для стартапу <strong>${name}</strong>:</p>
            
            <table style="width:100%; border-collapse: collapse; margin: 10px 0;">
                <tr style="background: #f1f5f9;">
                    <th style="border: 1px solid #ddd; padding: 5px;">Параметр</th>
                    <th style="border: 1px solid #ddd; padding: 5px;">Реальні</th>
                    <th style="border: 1px solid #ddd; padding: 5px;">Модель (+20%)</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 5px;">Прибуток</td>
                    <td style="border: 1px solid #ddd; padding: 5px;">$${profit}</td>
                    <td style="border: 1px solid #ddd; padding: 5px; font-weight: bold;">$${modeledProfit.toFixed(0)}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 5px;">Штат</td>
                    <td style="border: 1px solid #ddd; padding: 5px;">${staff}</td>
                    <td style="border: 1px solid #ddd; padding: 5px;">${modeledStaff}</td>
                </tr>
            </table>

            <div style="display: flex; align-items: flex-end; gap: 10px; height: 100px; padding: 10px; background: #fafafa; border-bottom: 2px solid #333;">
                <div style="flex: 1; background: #94a3b8; height: ${(profit/modeledProfit)*100}%; text-align: center; font-size: 10px;">Поточний</div>
                <div style="flex: 1; background: ${statusColor}; height: 100%; text-align: center; font-size: 10px;">Прогноз</div>
            </div>
        `;
    });
}