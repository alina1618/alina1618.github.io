const navLinks = document.querySelectorAll('nav ul li a');

for (let i = 0; i < navLinks.length; i++) {
    if (i % 2 === 0) {
        navLinks[i].style.color =  "#ffffff";
    } else {
        navLinks[i].style.color = "#21c191";
    }
    navLinks[i].style.transition = "0.3s";
}

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


const tags = document.querySelectorAll('.tag');
for (let j = 0; j < tags.length; j++) {
    tags[j].addEventListener('click', function() {
        this.classList.toggle('on');
        if (this.classList.contains('on')) {
            alert("Ви обрали ринок: " + this.textContent);
        }
    });
}

const invCards = document.querySelectorAll('.inv-card');
invCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.border = "2px solid #21c191";
        this.style.transform = "translateY(-5px)";
    });
    card.addEventListener('mouseleave', function() {
        this.style.border = "1px solid #dce3eb";
        this.style.transform = "translateY(0)";
    });
});


const modelBtn = document.getElementById('modelBtn');
const resultDiv = document.getElementById('simulationResult');

if (modelBtn) {
    modelBtn.addEventListener('click', function() {
        const name = document.getElementById('nameInput').value;
        const profit = document.getElementById('profitInput').value;
        const expenses = document.getElementById('expenseInput').value;
        const staff = document.getElementById('staffInput').value;

        if (name === "" || profit === "" || expenses === "") {
            alert("Будь ласка, заповніть всі обов'язкові поля!");
            return;
        }

        const netIncome = parseFloat(profit) - parseFloat(expenses);
 
        resultDiv.style.display = "block";
        resultDiv.style.marginTop = "50px";
        resultDiv.style.padding = "20px";
        resultDiv.style.borderRadius = "12px";
        resultDiv.style.borderLeft = "5px solid";

        if (netIncome > 100000) {
        resultDiv.style.backgroundColor = "#dcfce7";
        resultDiv.style.color = "#15803d";
        resultDiv.style.borderColor = "#22c55e";
        resultDiv.innerHTML = `<strong>Статус: Лідер ринку.</strong> <br>Стартап ${name} демонструє вибухове зростання. Чистий прибуток: $${netIncome}.`;

        } else if (netIncome > 0) {
        resultDiv.style.backgroundColor = "#fef9c3";
        resultDiv.style.color = "#854d0e";
        resultDiv.style.borderColor = "#eab308";
        resultDiv.innerHTML = `<strong>Статус: Стабільність.</strong> <br>Компанія ${name} працює з позитивним балансом. Прибуток: $${netIncome}.`;

        } else if (netIncome > -20000) {
        resultDiv.style.backgroundColor = "#ffedd5";
        resultDiv.style.color = "#9a3412";
        resultDiv.style.borderColor = "#f97316";
        resultDiv.innerHTML = `<strong>Статус: Увага.</strong> <br>Зафіксовано незначний збиток $${Math.abs(netIncome)}. Потрібна оптимізація витрат на штат у ${staff} осіб.`;

        } else {
        resultDiv.style.backgroundColor = "#fee2e2";
        resultDiv.style.color = "#b91c1c";
        resultDiv.style.borderColor = "#ef4444";
        resultDiv.innerHTML = `<strong>Статус: Криза.</strong> Критичний збиток $${Math.abs(netIncome)}. Стартап ${name} потребує негайної реструктуризації.`;
        }

        const logSteps = ["Дані зібрано", "Розрахунок проведено", "Результат виведено"];
        for (let k = 0; k < logSteps.length; k++) {
            console.log("Етап " + (k + 1) + ": " + logSteps[k]);
        }
    });
}