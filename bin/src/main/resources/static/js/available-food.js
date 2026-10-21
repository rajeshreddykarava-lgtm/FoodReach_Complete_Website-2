const reportList = document.getElementById("reportList");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
let allReports = [];

function renderReports() {
  const search = searchInput.value.trim().toLowerCase();
  const type = typeFilter.value;
  const matches = allReports.filter(r => {
    const text = `${r.foodName || ""} ${r.pickupAddress || ""} ${r.providerType || ""}`.toLowerCase();
    return text.includes(search) && (!type || r.providerType === type);
  });
  reportList.replaceChildren();
  if (!matches.length) {
    reportList.textContent = "No matching food reports found.";
    return;
  }
  matches.forEach(r => {
    const card = document.createElement("article"); card.className = "report-card";
    const tag = document.createElement("span"); tag.className = "report-tag"; tag.textContent = r.providerType || "Food donation";
    const title = document.createElement("h3"); title.textContent = r.foodName;
    const quantity = document.createElement("p"); quantity.textContent = `Quantity: ${r.quantityKg} kg`;
    const address = document.createElement("p"); address.textContent = `Pickup: ${r.pickupAddress}`;
    const deadline = document.createElement("p"); deadline.textContent = `Deadline: ${String(r.pickupDeadline || "").replace("T", " ")}`;
    card.append(tag, title, quantity, address, deadline); reportList.appendChild(card);
  });
}
async function loadReports() {
  reportList.textContent = "Loading food reports…";
  try {
    const response = await fetch("/api/food-reports");
    if (!response.ok) throw new Error();
    allReports = await response.json();
    renderReports();
  } catch (_) { reportList.textContent = "Could not load reports. Check the Spring Boot application and database."; }
}
searchInput.addEventListener("input", renderReports);
typeFilter.addEventListener("change", renderReports);
document.getElementById("refreshButton").addEventListener("click", loadReports);
loadReports();
