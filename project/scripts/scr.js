 function showError(input, message) {
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.innerText = message;
      input.parentNode.insertBefore(errorDiv, input.nextSibling);
      input.classList.add("error");
  }

  function clearErrors() {
      document.querySelectorAll(".error-message").forEach(error => error.remove());
      document.querySelectorAll(".error").forEach(input => input.classList.remove("error"));
  }

  function validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailPattern.test(email);
  }

  // Redirect on Submit
  document.getElementById('submit-btn').addEventListener('click', () => {
      alert("Form submitted successfully!");
      window.location.href = 'thankyou.html';
  });



