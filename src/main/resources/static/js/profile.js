async function loadProfile() {
  const message = document.getElementById("profileMessage");
  try {
    const response = await fetch("/api/auth/me");
    if (!response.ok) { message.innerHTML = 'Please <a href="/login.html">log in</a> to view your profile.'; return; }
    const user = await response.json();
    document.getElementById("fullName").value = user.fullName || "";
    document.getElementById("email").value = user.email || "";
    document.getElementById("role").value = user.role || "USER";
    message.textContent = "You are logged in.";
  } catch (_) { message.textContent = "Could not load profile."; }
}
document.getElementById("logoutButton").addEventListener("click", async () => {
  await fetch("/api/auth/logout", {method: "POST"});
  window.location.href = "/login.html";
});
loadProfile();
