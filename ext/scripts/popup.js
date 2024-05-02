// ext/scripts/popup.js
document.addEventListener("DOMContentLoaded", () => {
    const debugButton = document.getElementById("debug-button");
    const loadingOverlay = document.getElementById("loading-overlay");
    const loadingText = document.getElementById("loading-text");
  
    // Toggle debug mode
    debugButton.addEventListener("click", () => {
      config.debug = !config.debug;
      if (config.debug) {
        console.log("Debug mode enabled");
      } else {
        console.log("Debug mode disabled");
      }
    });
  
    // Show loading overlay
    function showLoadingOverlay(text) {
      loadingText.textContent = text;
      loadingOverlay.classList.add("active");
    }
  
    // Hide loading overlay
    function hideLoadingOverlay() {
      loadingOverlay.classList.remove("active");
    }
  
    // Intercept HTMX requests
    htmx.on("htmx:beforeRequest", (event) => {
      showLoadingOverlay("Loading...");
    });
  
    htmx.on("htmx:afterRequest", (event) => {
      hideLoadingOverlay();
    });
  
    // Check authentication status
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "../pages/login/login.html";
    }
  });