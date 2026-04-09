let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

//accessing HTML elements by their id
      const textInput = document.getElementById("text");
      const amountInput = document.getElementById("amount");
      const typeInput = document.getElementById("type");
      const addBtn = document.getElementById("addBtn");
      const list = document.getElementById("list");
      const totalIncome = document.getElementById("income");
      const totalExpense = document.getElementById("expense");
      const totalBalance = document.getElementById("balance");

      const filterButtons = document.querySelectorAll(".filter button");

      addBtn.addEventListener("click", addTransaction);

      function saveData(){
        localStorage.setItem("transactions",JSON.stringify(transactions));
      }

      // Render Transactions
      function renderTransaction(data) {
        list.innerHTML = "";

        data.forEach((item) => {
          const li = document.createElement("li");
          li.classList.add("item");

          if (item.type === "income") {
            li.classList.add("income-item");
          } else {
            li.classList.add("expense-item");
          }

          li.innerHTML = `
            <span>${item.text}</span>
            <div>
                <span>${item.amount > 0 ? "+" : ""}${item.amount}</span>
                <button onclick="deleteTransaction(${item.id})">X</button>
            </div>
        `;

          list.appendChild(li);
        });
      }

      //  Add Transaction
      function addTransaction() {
        let text = textInput.value.trim();
        let amount = Number(amountInput.value);
        let type = typeInput.value;

        if (text === "" || amount === 0) {
          alert("Please enter valid data");
          return;
        }

        if (type === "expense") {
          amount = -amount;
        }

        let newTransaction = {
          id: Date.now(),
          text: text,
          amount: amount,
          type: type,
        };

        transactions.push(newTransaction);
         saveData();

        textInput.value = "";
        amountInput.value = "";

        renderTransaction(transactions);
        updateSummary();
      }

      // ✅ Update Summary (Income, Expense, Balance)
      function updateSummary() {
        let income = 0;
        let expense = 0;

        transactions.forEach((t) => {
          if (t.type === "income") {
            income += t.amount;
          } else {
            expense += t.amount;
          }
        });

        totalIncome.innerHTML = income;
        totalExpense.innerHTML = Math.abs(expense);

        const balance = income + expense;
        totalBalance.innerHTML = balance;
      }

      // filtering out the data
      

      filterButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const filterType = btn.dataset.filter;
    let filteredData = [];

    if (filterType === "income") {
      filteredData = transactions.filter((item) => item.type === "income");
    } else if (filterType === "expense") {
      filteredData = transactions.filter((item) => item.type === "expense");
    } else {
      
      filteredData = transactions;
    }

    renderTransaction(filteredData);
  });
});

      // ✅ Delete Transaction
      function deleteTransaction(id) {
        transactions = transactions.filter((item) => item.id !== id);
        saveData();
        renderTransaction(transactions);
        updateSummary();
      }

      renderTransaction(transactions);
      updateSummary();
