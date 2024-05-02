// ext/popup/popup.js
document.addEventListener("DOMContentLoaded", () => {
    const folderList = document.getElementById("folder-list");
    const folderItems = document.getElementById("folder-items");
    const createFolderBtn = document.getElementById("create-folder-btn");
    const createFolderModal = document.getElementById("create-folder-modal");
    const folderNameInput = document.getElementById("folder-name-input");
    const createFolderSubmitBtn = document.getElementById("create-folder-submit-btn");
    const createFolderCancelBtn = document.getElementById("create-folder-cancel-btn");
   
    const tagList = document.getElementById("tag-list");
    const tagItems = document.getElementById("tag-items");
    const createTagBtn = document.getElementById("create-tag-btn");
    const createTagModal = document.getElementById("create-tag-modal");
    const tagNameInput = document.getElementById("tag-name-input");
    const createTagSubmitBtn = document.getElementById("create-tag-submit-btn");
    const createTagCancelBtn = document.getElementById("create-tag-cancel-btn");
   
    const chatList = document.getElementById("chat-list");
    const chatItems = document.getElementById("chat-items");
    const createChatBtn = document.getElementById("create-chat-btn");
    const createChatModal = document.getElementById("create-chat-modal");
    const chatContentInput = document.getElementById("chat-content-input");
    const chatFolderSelect = document.getElementById("chat-folder-select");
    const chatTagCheckboxes = document.getElementById("chat-tag-checkboxes");
    const createChatSubmitBtn = document.getElementById("create-chat-submit-btn");
    const createChatCancelBtn = document.getElementById("create-chat-cancel-btn");
   
    const syncBtn = document.getElementById("sync-btn");
   
    // Fetch folders and render them
    function fetchAndRenderFolders() {
      chrome.runtime.sendMessage({ action: "fetchFolders" }, (response) => {
        if (response.folders) {
          renderFolders(response.folders);
        } else {
          console.error("Error fetching folders:", response.error);
        }
      });
    }
   
    function renderFolders(folders) {
      folderItems.innerHTML = "";
      folders.forEach((folder) => {
        const folderItem = document.createElement("li");
        folderItem.textContent = folder.name;
        folderItem.dataset.folderId = folder.id;
        folderItem.classList.add("folder-item");
        folderItems.appendChild(folderItem);
      });
    }
   
    // Fetch tags and render them
    function fetchAndRenderTags() {
      chrome.runtime.sendMessage({ action: "fetchTags" }, (response) => {
        if (response.tags) {
          renderTags(response.tags);
        } else {
          console.error("Error fetching tags:", response.error);
        }
      });
    }
   
    function renderTags(tags) {
      tagItems.innerHTML = "";
      tags.forEach((tag) => {
        const tagItem = document.createElement("li");
        tagItem.textContent = tag.name;
        tagItem.dataset.tagId = tag.id;
        tagItem.classList.add("tag-item");
        tagItems.appendChild(tagItem);
      });
    }
   
    // Fetch chats and render them
    function fetchAndRenderChats() {
      chrome.runtime.sendMessage({ action: "fetchChats" }, (response) => {
        if (response.chats) {
          renderChats(response.chats);
        } else {
          console.error("Error fetching chats:", response.error);
        }
      });
    }
   
    function renderChats(chats) {
      chatItems.innerHTML = "";
      chats.forEach((chat) => {
        const chatItem = document.createElement("li");
        chatItem.textContent = chat.content;
        chatItem.dataset.chatId = chat.id;
        chatItem.classList.add("chat-item");
        chatItems.appendChild(chatItem);
      });
    }
   
    // Create folder
    function createFolder() {
      const folderName = folderNameInput.value.trim();
      if (folderName !== "") {
        chrome.runtime.sendMessage({ action: "createFolder", folderName }, (response) => {
          if (response.folder) {
            folderNameInput.value = "";
            createFolderModal.classList.remove("is-active");
            fetchAndRenderFolders();
          } else {
            console.error("Error creating folder:", response.error);
          }
        });
      }
    }
   
    // Create tag
    function createTag() {
      const tagName = tagNameInput.value.trim();
      if (tagName !== "") {
        chrome.runtime.sendMessage({ action: "createTag", tagName }, (response) => {
          if (response.tag) {
            tagNameInput.value = "";
            createTagModal.classList.remove("is-active");
            fetchAndRenderTags();
          } else {
            console.error("Error creating tag:", response.error);
          }
        });
      }
    }
   
    // Create chat
    function createChat() {
      const chatContent = chatContentInput.value.trim();
      const folderId = chatFolderSelect.value;
      const tagIds = Array.from(chatTagCheckboxes.querySelectorAll("input[type=checkbox]:checked")).map((checkbox) =>
        checkbox.value
      );
      if (chatContent !== "") {
        chrome.runtime.sendMessage(
          { action: "createChat", chatContent, folderId, tagIds },
          (response) => {
            if (response.chat) {
              chatContentInput.value = "";
              chatFolderSelect.value = "";
              chatTagCheckboxes.innerHTML = "";
              createChatModal.classList.remove("is-active");
              fetchAndRenderChats();
            } else {
              console.error("Error creating chat:", response.error);
            }
          }
        );
      }
    }
   
    // Sync data
    function syncData() {
      chrome.runtime.sendMessage({ action: "syncData" }, (response) => {
        if (response.success) {
          console.log("Data synced successfully");
        } else {
          console.error("Error syncing data:", response.error);
        }
      });
    }
   
    // Event listeners
    createFolderBtn.addEventListener("click", () => {
      createFolderModal.classList.add("is-active");
    });
   
    createFolderSubmitBtn.addEventListener("click", createFolder);
   
    createFolderCancelBtn.addEventListener("click", () => {
      folderNameInput.value = "";
      createFolderModal.classList.remove("is-active");
    });
   
    createTagBtn.addEventListener("click", () => {
      createTagModal.classList.add("is-active");
    });
   
    createTagSubmitBtn.addEventListener("click", createTag);
   
    createTagCancelBtn.addEventListener("click", () => {
      tagNameInput.value = "";
      createTagModal.classList.remove("is-active");
    });
   
    createChatBtn.addEventListener("click", () => {
      createChatModal.classList.add("is-active");
      chrome.runtime.sendMessage({ action: "fetchFolders" }, (response) => {
        if (response.folders) {
          chatFolderSelect.innerHTML = "";
          const defaultOption = document.createElement("option");
          defaultOption.value = "";
          defaultOption.textContent = "Select Folder";
          chatFolderSelect.appendChild(defaultOption);
          response.folders.forEach((folder) => {
            const option = document.createElement("option");
            option.value = folder.id;
            option.textContent = folder.name;
            chatFolderSelect.appendChild(option);
          });
        } else {
          console.error("Error fetching folders:", response.error);
        }
      });
      chrome.runtime.sendMessage({ action: "fetchTags" }, (response) => {
        if (response.tags) {
          chatTagCheckboxes.innerHTML = "";
          response.tags.forEach((tag) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = tag.id;
            checkbox.id = `tag-${tag.id}`;
            const label = document.createElement("label");
            label.htmlFor = `tag-${tag.id}`;
            label.textContent = tag.name;
            chatTagCheckboxes.appendChild(checkbox);
            chatTagCheckboxes.appendChild(label);
            chatTagCheckboxes.appendChild(document.createElement("br"));
          });
        } else {
          console.error("Error fetching tags:", response.error);
        }
      });
    });
   
    createChatSubmitBtn.addEventListener("click", createChat);
   
    createChatCancelBtn.addEventListener("click", () => {
      chatContentInput.value = "";
      chatFolderSelect.value = "";
      chatTagCheckboxes.innerHTML = "";
      createChatModal.classList.remove("is-active");
    });
   
    syncBtn.addEventListener("click", syncData);
   
    // Initial rendering
    fetchAndRenderFolders();
    fetchAndRenderTags();
    fetchAndRenderChats();
   });