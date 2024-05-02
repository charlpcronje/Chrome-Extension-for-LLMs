// ext/pages/profile.js
document.addEventListener("DOMContentLoaded", () => {
    const profileInfo = document.getElementById("profile-info");
    const logoutButton = document.getElementById("logout-button");
  
    // Load user profile from local storage
    function loadProfile() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        profileInfo.innerHTML = `
          <p><strong>Username:</strong> ${user.username}</p>
          <p><strong>Email:</strong> ${user.email}</p>
        `;
      } else {
        window.location.href = "login.html";
      }
    }
  
    // Handle logout
    function handleLogout() {
      localStorage.removeItem("user");
      window.location.href = "login.html";
      if (config.debug) {
        console.log("Logout successful");
      }
    }
  
    // Event listeners
    logoutButton.addEventListener("click", handleLogout);
  
    // Initial load
    loadProfile();
  });