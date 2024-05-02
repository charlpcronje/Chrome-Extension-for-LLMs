// ext/scripts/sidebar.js
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");
    const sidebarNav = document.querySelector(".sidebar-nav");
    const sidebarContent = document.querySelector(".sidebar-content");
  
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      sidebarOverlay.classList.toggle("active");
    });
  
    sidebarOverlay.addEventListener("click", () => {
      sidebar.classList.remove("collapsed");
      sidebarOverlay.classList.remove("active");
    });
  
    sidebarNav.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        event.preventDefault();
        const url = event.target.getAttribute("href");
        sidebarContent.innerHTML = "Loading...";
        fetch(url)
          .then((response) => response.text())
          .then((html) => {
            sidebarContent.innerHTML = html;
          })
          .catch((error) => {
            console.error("Error loading content:", error);
            sidebarContent.innerHTML = "Error loading content.";
          });
      }
    });
  });