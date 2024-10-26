document.addEventListener("DOMContentLoaded", () => {
  // Update current year and last modified date
  const date = new Date();
  document.getElementById("currentyear").textContent = date.getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  // Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navbar = document.getElementById('navbar');

  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navbar.classList.toggle('active');
  });

  // FAQ Toggle Functionality
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(question => {
      question.addEventListener('click', () => {
          const answer = question.nextElementSibling;
          const isVisible = answer.style.display === 'block';

          // Hide all answers and reset icons
          document.querySelectorAll('.faq-answer').forEach(a => {
              a.style.display = 'none';
          });
          document.querySelectorAll('.toggle-icon').forEach(icon => {
              icon.textContent = '+';
          });

          // Show or hide the current answer
          answer.style.display = isVisible ? 'none' : 'block';
          question.querySelector('.toggle-icon').textContent = isVisible ? '+' : '-';
      });
  });

  // "See More" Button Toggle
  const seeMoreButtons = document.querySelectorAll('.see-more');
  seeMoreButtons.forEach(button => {
      button.addEventListener('click', () => {
          const infoId = button.getAttribute('data-info');
          const infoParagraph = document.getElementById(`${infoId}-info`);

          const isHidden = infoParagraph.style.display === 'none' || infoParagraph.style.display === '';
          infoParagraph.style.display = isHidden ? 'block' : 'none';
          button.textContent = isHidden ? 'See Less' : 'See More';
      });
  });

  // Rotating Comments Functionality
  const comments = document.querySelectorAll('.comment');
  let currentIndex = 0;

  function rotateComments() {
      comments.forEach((comment, index) => {
          comment.style.display = index === currentIndex ? 'block' : 'none';
      });
      currentIndex = (currentIndex + 1) % comments.length;
  }
  setInterval(rotateComments, 5000);
  rotateComments();

  // Comment Submission
  document.getElementById('submitComment').addEventListener('click', () => {
      const commentInput = document.getElementById('commentInput').value;
      const ratingInput = document.getElementById('ratingInput').value;

      if (commentInput && ratingInput) {
          const newComment = document.createElement('div');
          newComment.classList.add('comment');
          newComment.innerHTML = `<p><strong>You:</strong> ${commentInput}</p><p>Rating: ${'⭐'.repeat(ratingInput)}</p>`;

          document.querySelector('.comments-container').appendChild(newComment);
          document.getElementById('commentInput').value = '';
          document.getElementById('ratingInput').value = '';
      } else {
          alert('Please enter a comment and a rating.');
      }
  });

  // Book Now Form Validation
  const bookNowForm = document.getElementById('bookNowForm');
  const errorMessage = document.getElementById('errorMessage');
  const successMessage = document.getElementById('successMessage');

  bookNowForm.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const services = document.getElementById('services').value;

      if (!name || !email || !phone || !date || !time || !services) {
          errorMessage.style.display = 'block';
          successMessage.style.display = 'none';
      } else {
          errorMessage.style.display = 'none';
          successMessage.style.display = 'block';

          console.log({ name, email, phone, date, time, services });
      }
  });

  // Contact Form Validation
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  contactForm.addEventListener("submit", event => {
      clearErrors();

      let valid = true;

      if (nameInput.value.trim() === "") {
          showError(nameInput, "Name is required.");
          valid = false;
      }

      if (emailInput.value.trim() === "") {
          showError(emailInput, "Email is required.");
          valid = false;
      } else if (!validateEmail(emailInput.value)) {
          showError(emailInput, "Please enter a valid email address.");
          valid = false;
      }

      if (messageInput.value.trim() === "") {
          showError(messageInput, "Message is required.");
          valid = false;
      }

      if (!valid) {
          event.preventDefault();
      }
  });

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
});

