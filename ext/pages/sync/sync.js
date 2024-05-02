// ext/pages/sync.js
document.addEventListener("DOMContentLoaded", () => {
    const syncButton = document.getElementById("sync-button");
    const syncStatus = document.getElementById("sync-status");
  
    // Sync data with the server
    function syncData() {
      const folders = JSON.parse(localStorage.getItem("folders")) || [];
      const tags = JSON.parse(localStorage.getItem("tags")) || [];
      const chats = JSON.parse(localStorage.getItem("chats")) || [];
  
      const syncData = {
        folders,
        tags,
        chats,
      };
  
      fetch("https://api.example.com/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(syncData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            syncStatus.textContent = "Synchronization successful!";
            syncStatus.classList.remove("text-error");
            syncStatus.classList.add("text-success");
            if (config.debug) {
              console.log("Synchronization successful:", data);
            }
          } else {
            syncStatus.textContent = "Synchronization failed. Please try again.";
            syncStatus.classList.remove("text-success");
            syncStatus.classList.add("text-error");
            if (config.debug) {
              console.error("Synchronization failed:", data);
            }
          }
        })
        .catch((error) => {
          syncStatus.textContent = "An error occurred during synchronization.";
          syncStatus.classList.remove("text-success");
          syncStatus.classList.add("text-error");
          if (config.debug) {
            console.error("Synchronization error:", error);
          }
        });
    }
  
    // Event listeners
    syncButton.addEventListener("click", syncData);
  });