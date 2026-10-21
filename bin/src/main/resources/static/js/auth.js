const authMessage = document.getElementById("authMessage");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

async function sendAuth(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    credentials: "same-origin",
    body: JSON.stringify(body)
  });
  let data = {};
  try { data = await response.json(); } catch (_) {}
  if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    authMessage.textContent = "Creating your account…";
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
      authMessage.textContent = "The passwords do not match.";
      return;
    }
    try {
      await sendAuth("/api/auth/register", {
        fullName: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        password
      });
      authMessage.textContent = "Account created! Taking you to login…";
      setTimeout(() => window.location.href = "/login.html", 900);
    } catch (error) {
      authMessage.textContent = error.message;
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    authMessage.textContent = "Logging in…";
    try {
      await sendAuth("/api/auth/login", {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value
      });
      window.location.href = "/index.html";
    } catch (error) {
      authMessage.textContent = error.message;
    }
  });
}
