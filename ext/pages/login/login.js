// ext/pages/login.js
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
  
    // Handle login form submission
    function handleLogin(event) {
      event.preventDefault();
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
  
      // Send login request to the server
      fetch("https://api.example.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Store user data in local storage
            localStorage.setItem("user", JSON.stringify(data.user));
            if (config.debug) {
              console.log("Login successful:", data.user);
            }
            // Redirect to the main page
            window.location.href = "../popup/popup.html";
          } else {
            alert("Invalid username or password. Please try again.");
            if (config.debug) {
              console.error("Login failed:", data);
            }
          }
        })
        .catch((error) => {
          alert("An error occurred during login.");
          if (config.debug) {
            console.error("Login error:", error);
          }
        });
    }
  
    // Event listeners
    loginForm.addEventListener("submit", handleLogin);
  });