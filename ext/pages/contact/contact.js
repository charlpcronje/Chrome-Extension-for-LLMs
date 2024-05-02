document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
  
    // Handle form submission
    function handleSubmit(event) {
      event.preventDefault();
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();
  
      if (name === "" || email === "" || subject === "" || message === "") {
        alert("Please fill in all fields.");
        return;
      }
  
      // Send contact details to the server
      fetch("https://api.example.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Your message has been sent successfully.");
            nameInput.value = "";
            emailInput.value = "";
            subjectInput.value = "";
            messageInput.value = "";
          } else {
            alert("An error occurred while sending your message. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error sending contact details:", error);
          alert("An error occurred while sending your message. Please try again.");
        });
    }
  
    // Event listeners
    contactForm.addEventListener("submit", handleSubmit);
  });