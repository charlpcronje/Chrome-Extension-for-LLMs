// ext/pages/folders.js
document.addEventListener("DOMContentLoaded", () => {
    const folderTree = document.getElementById("folder-tree");
    const createFolderForm = document.getElementById("create-folder-form");
    const folderNameInput = document.getElementById("folder-name-input");
  
    // Load folders from local storage
    function loadFolders() {
      const folders = JSON.parse(localStorage.getItem("folders")) || [];
      renderFolderTree(folders);
    }

    // Save folders to local storage
    function saveFolders(folders) {
      localStorage.setItem("folders", JSON.stringify(folders));
    }
  
    // Render folder tree
    function renderFolderTree(folders) {
      folderTree.innerHTML = "";
      const ul = document.createElement("ul");
      ul.classList.add("folder-tree");
      folders.forEach((folder) => {
        const li = document.createElement("li");
        li.textContent = folder.name;
        ul.appendChild(li);
        if (folder.subfolders && folder.subfolders.length > 0) {
          const subUl = document.createElement("ul");
          folder.subfolders.forEach((subfolder) => {
            const subLi = document.createElement("li");
            subLi.textContent = subfolder.name;
            subUl.appendChild(subLi);
          });
          li.appendChild(subUl);
        }
      });
      folderTree.appendChild(ul);
    }
  
    // Create a new folder
    function createFolder(event) {
      event.preventDefault();
      const folderName = folderNameInput.value.trim();
      if (folderName !== "") {
        const newFolder = {
          id: Date.now().toString(),
          name: folderName,
          subfolders: [],
        };
        const folders = JSON.parse(localStorage.getItem("folders")) || [];
        folders.push(newFolder);
        saveFolders(folders);
        renderFolderTree(folders);
        folderNameInput.value = "";
        if (config.debug) {
          console.log("Folder created:", newFolder);
        }
      }
    }
  
    // Event listeners
    createFolderForm.addEventListener("submit", createFolder);
  
    // Initial load
    loadFolders();
  });