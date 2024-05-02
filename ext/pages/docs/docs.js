// ext/docs/docs.js
document.addEventListener("DOMContentLoaded", () => {
    const documentationContent = document.getElementById("documentation-content");
  
    // Fetch and render documentation
    function fetchAndRenderDocumentation() {
      fetch("../../docs/user-documentation.md")
        .then((response) => response.text())
        .then((markdown) => {
          const html = marked(markdown);
          documentationContent.innerHTML = html;
        })
        .catch((error) => {
          console.error("Error fetching documentation:", error);
        });
    }
  
    // Initial load
    fetchAndRenderDocumentation();
  });