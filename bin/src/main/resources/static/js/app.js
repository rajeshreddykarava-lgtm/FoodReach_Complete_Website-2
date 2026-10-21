const foodForm = document.getElementById("foodForm");
const formMessage = document.getElementById("formMessage");
const reportList = document.getElementById("reportList");
const accountLink = document.getElementById("accountLink");
const logoutButton = document.getElementById("logoutButton");

async function checkLogin() {
  try {
    const response = await fetch("/api/auth/me", {credentials: "same-origin"});
    if (!response.ok) throw new Error("Not logged in");
    const user = await response.json();
    accountLink.textContent = "Hi, " + user.fullName.split(" ")[0];
    accountLink.href = "#donate";
    logoutButton.classList.remove("hidden");
    return user;
  } catch (_) {
    accountLink.textContent = "Log in";
    accountLink.href = "/login.html";
    logoutButton.classList.add("hidden");
    return null;
  }
}

logoutButton.addEventListener("click", async () => {
  await fetch("/api/auth/logout", {method: "POST", credentials: "same-origin"});
  window.location.reload();
});

async function loadReports() {
  reportList.textContent = "Loading food reports…";
  try {
    const response = await fetch("/api/food-reports");
    if (!response.ok) throw new Error("Could not load reports");
    const reports = await response.json();
    reportList.replaceChildren();
    if (!reports.length) {
      reportList.textContent = "No food reports yet. Be the first to share surplus food.";
      return;
    }
    reports.forEach(report => {
      const card = document.createElement("article");
      card.className = "report-card";
      const tag = document.createElement("span");
      tag.className = "report-tag";
      tag.textContent = report.providerType || "Food donation";
      const title = document.createElement("h3");
      title.textContent = report.foodName;
      const quantity = document.createElement("p");
      quantity.textContent = "Quantity: " + report.quantityKg + " kg";
      const address = document.createElement("p");
      address.textContent = "Pickup: " + report.pickupAddress;
      const deadline = document.createElement("p");
      deadline.textContent = "Pickup deadline: " + String(report.pickupDeadline || "").replace("T", " ");
      card.append(tag, title, quantity, address, deadline);
      reportList.appendChild(card);
    });
  } catch (_) {
    reportList.textContent = "Could not load reports. Check that the Spring Boot app is running.";
  }
}

foodForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  const user = await checkLogin();
  if (!user) {
    formMessage.textContent = "Please log in before submitting a report. Opening login…";
    setTimeout(() => window.location.href = "/login.html", 1000);
    return;
  }
  const deadline = document.getElementById("pickupDeadline").value;
  if (new Date(deadline).getTime() < Date.now()) {
    formMessage.textContent = "Please choose a future pickup deadline.";
    return;
  }
  const report = {
    foodName: document.getElementById("foodName").value.trim(),
    quantityKg: Number(document.getElementById("quantityKg").value),
    providerType: document.getElementById("providerType").value,
    pickupDeadline: deadline,
    pickupAddress: document.getElementById("pickupAddress").value.trim(),
    storageDetails: document.getElementById("storageDetails").value.trim(),
    notes: document.getElementById("notes").value.trim()
  };
  formMessage.textContent = "Submitting your report…";
  try {
    const response = await fetch("/api/food-reports", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "same-origin",
      body: JSON.stringify(report)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Could not save report.");
    formMessage.textContent = "Your food report has been saved!";
    foodForm.reset();
    await loadReports();
  } catch (error) {
    formMessage.textContent = error.message;
  }
});

document.getElementById("refreshButton").addEventListener("click", loadReports);
checkLogin();
loadReports();
