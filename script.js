
const transactions = [
  { date: "2026-04-01", amount: 5000, category: "Salary", type: "income" },
  { date: "2026-04-02", amount: 1500, category: "Food", type: "expense" },
  { date: "2026-04-03", amount: 2000, category: "Shopping", type: "expense" }
];

const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");
const role = document.getElementById("role");
const addBtn = document.getElementById("addBtn");

function render(data) {
  tableBody.innerHTML = "";

  let income = 0, expense = 0;

  data.forEach(t => {
    const row = `
      <tr>
        <td>${t.date}</td>
        <td>₹${t.amount}</td>
        <td>${t.category}</td>
        <td class="${t.type}">${t.type}</td>
      </tr>
    `;
    tableBody.innerHTML += row;

    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });
  if (data.length === 0) {
  tableBody.innerHTML = "<tr><td colspan='4'>No transactions found</td></tr>";
}

  document.getElementById("income").innerText = "₹ " + income;
  document.getElementById("expense").innerText = "₹ " + expense;
  document.getElementById("balance").innerText = "₹ " + (income - expense);

  // Insight
  document.getElementById("insight").innerText =
    expense > income ? "⚠️ You are overspending" : "✅ Good financial health";
}

render(transactions);

// 🔍 Search
search.addEventListener("input", () => {
  const value = search.value.toLowerCase();

  const filtered = transactions.filter(t =>
    t.category.toLowerCase().includes(value) ||
    t.type.toLowerCase().includes(value)
  );

  render(filtered);
});



// 🔐 Role
role.addEventListener("change", () => {
  if (role.value === "admin") {
    addBtn.style.display = "block";
  } else {
    addBtn.style.display = "none";
  }
});

// ➕ Add Transaction
addBtn.addEventListener("click", () => {
  const amount = prompt("Enter amount:");
  const category = prompt("Enter category:");
  const type = prompt("income or expense:");

  if (!amount || !category || !type) {
    alert("All fields are required!");
    return;
  }

  if (type !== "income" && type !== "expense") {
    alert("Type must be income or expense");
    return;
  }

  transactions.push({
    date: new Date().toISOString().split("T")[0],
    amount: Number(amount),
    category,
    type
  });
  alert("✅ Transaction added successfully!");

  render(transactions);
});
