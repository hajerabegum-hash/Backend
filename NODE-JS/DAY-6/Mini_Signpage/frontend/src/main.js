import "./style.css";

document.querySelector("#app").innerHTML = `
  <main class="login-page">
    <div class="login-card">
      <h1>Login</h1>

      <form class="login-form" id="loginForm">
        <input id="username" type="text" placeholder="Username" aria-label="Username" />
        <input id="password" type="password" placeholder="Password" aria-label="Password" />
        <button type="submit">Login</button>
        <p id="message" class="message"></p>
      </form>
    </div>
  </main>
`;

const loginForm = document.querySelector("#loginForm");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const messageBox = document.querySelector("#message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    messageBox.textContent = "Please enter username and password.";
    messageBox.className = "message error";
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "Login failed");
    }

    localStorage.setItem("token", data.token);
    messageBox.textContent = "Login successful!";
    messageBox.className = "message success";
    loginForm.reset();
  } catch (error) {
    messageBox.textContent = error.message;
    messageBox.className = "message error";
  }
});
