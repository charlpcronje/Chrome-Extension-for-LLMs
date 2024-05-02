// ext/pages/tags.js
document.addEventListener("DOMContentLoaded", () => {
    const tagList = document.getElementById("tag-list");
    const createTagForm = document.getElementById("create-tag-form");
    const tagNameInput = document.getElementById("tag-name-input");
  
    // Load tags from local storage
    function loadTags() {
      const tags = JSON.parse(localStorage.getItem("tags")) || [];
      renderTags(tags);
    }
  
    // Save tags to local storage
    function saveTags(tags) {
      localStorage.setItem("tags", JSON.stringify(tags));
    }
  
    // Render tags
    function renderTags(tags) {
      tagList.innerHTML = "";
      tags.forEach((tag) => {
        const tagItem = document.createElement("div");
        tagItem.classList.add("badge", "badge-primary", "mr-2", "mb-2");
        tagItem.textContent = tag.name;
        tagList.appendChild(tagItem);
      });
    }
  
    // Create a new tag
    function createTag(event) {
      event.preventDefault();
      const tagName = tagNameInput.value.trim();
      if (tagName !== "") {
        const newTag = {
          id: Date.now().toString(),
          name: tagName,
        };
        const tags = JSON.parse(localStorage.getItem("tags")) || [];
        tags.push(newTag);
        saveTags(tags);
        renderTags(tags);
        tagNameInput.value = "";
        if (config.debug) {
          console.log("Tag created:", newTag);
        }
      }
    }
  
    // Event listeners
    createTagForm.addEventListener("submit", createTag);
  
    // Initial load
    loadTags();
  });