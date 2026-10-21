const list = document.getElementById("myReports");
const message = document.getElementById("pageMessage");
async function loadMyReports() {
  try {
    const meResponse = await fetch("/api/auth/me");
    if (!meResponse.ok) {
      list.textContent = "Please log in to view your reports.";
      message.innerHTML = ' <a href="/login.html">Go to login →</a>';
      return;
    }
    const me = await meResponse.json();
    const reportsResponse = await fetch("/api/food-reports");
    if (!reportsResponse.ok) throw new Error();
    const reports = await reportsResponse.json();
    const mine = reports.filter(r => r.providerEmail === me.email);
    list.replaceChildren();
    if (!mine.length) { list.textContent = "You have not submitted any reports yet."; return; }
    mine.forEach(r => {
      const card = document.createElement("article"); card.className = "report-card";
      const tag = document.createElement("span"); tag.className = "report-tag"; tag.textContent = r.providerType || "Food donation";
      const title = document.createElement("h3"); title.textContent = r.foodName;
      const qty = document.createElement("p"); qty.textContent = `Quantity: ${r.quantityKg} kg`;
      const address = document.createElement("p"); address.textContent = `Pickup: ${r.pickupAddress}`;
      const deadline = document.createElement("p"); deadline.textContent = `Deadline: ${String(r.pickupDeadline || "").replace("T", " ")}`;
      card.append(tag, title, qty, address, deadline); list.appendChild(card);
    });
  } catch (_) { list.textContent = "Could not load reports. Please try again."; }
}
loadMyReports();
