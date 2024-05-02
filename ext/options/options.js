// ext/options/options.js
document.addEventListener("DOMContentLoaded", () => {
    const apiUrlInput = document.getElementById("api-url");
    const syncIntervalInput = document.getElementById("sync-interval");
    const saveOptionsBtn = document.getElementById("save-options-btn");

    // Load saved options
    chrome.storage.sync.get(["apiUrl", "syncInterval"], (options) => {
        if (options.apiUrl) {
            apiUrlInput.value = options.apiUrl;
            updateApiUrl(options.apiUrl);
        }
        if (options.syncInterval) {
            syncIntervalInput.value = options.syncInterval;
        }
    });

    // Save options
    saveOptionsBtn.addEventListener("click", () => {
        const apiUrl = apiUrlInput.value.trim();
        const syncInterval = parseInt(syncIntervalInput.value.trim(), 10);
        if (apiUrl !== "") {
            chrome.storage.sync.set({
                apiUrl,
                syncInterval
            }, () => {
                console.log("Options saved");
                updateApiUrl(apiUrl);
            });
        }
    });

    // Update the API URL in background.js and content scripts
    function updateApiUrl(apiUrl) {
        chrome.runtime.sendMessage({
            action: "updateApiUrl",
            apiUrl
        });
    }
});