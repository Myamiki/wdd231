// Update current year and last modified date
const date = new Date();
document.getElementById("currentyear").textContent = date.getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// JavaScript to display the form results
const currentUrl = window.location.href;
const everything = currentUrl.split('?');

if (everything.length > 1) {
    let formData = everything[1].split('&');

    // Function to extract query parameter value
    function show(cup) {
        let result = ''; 
        formData.forEach((element) => {
            if (element.startsWith(cup)) {
                result = decodeURIComponent(element.split('=')[1]); 
            }
        });
        return result;
    }

    // Extract the phone number and clean it
    let phoneNumber = show('phone');
    phoneNumber = phoneNumber.replace(/[^\d]/g, ''); // Remove non-numeric characters

    // Display the form data
    const showInfo = document.querySelector('#results');
    showInfo.innerHTML = `
        <p>Appointment for: ${show("first")} ${show("last")}</p>
        <p>Membership Level: ${show('membership')}</p>
        <p>Date: ${show('fecha')}</p>
        <p>Location: ${show('location')}</p>
        <p>Phone: ${phoneNumber}</p>
        <p>Email: ${show('email')}</p>
    `;
}


document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const populationEl = document.getElementById('population');
  const gdpEl = document.getElementById('gdp');
  const lifeExpectancyEl = document.getElementById('life-expectancy');
  const medianAgeEl = document.getElementById('median-age');
  const householdIncomeEl = document.getElementById('household-income');
  const majorIndustriesEl = document.getElementById('major-industries');
  const educationEl = document.getElementById('education');
  const messageElement = document.getElementById('message');

  // World Bank API URLs
  const populationAPI = 'https://api.worldbank.org/v2/country/ZA/indicator/SP.POP.TOTL?format=json';
  const gdpAPI = 'https://api.worldbank.org/v2/country/ZA/indicator/NY.GDP.MKTP.CD?format=json';

  // Fetch Population Data
  if (populationEl) {
      fetch(populationAPI)
      .then(response => response.json())
      .then(data => {
          const population = data[1][0].value.toLocaleString();
          populationEl.textContent = `Population: ${population}`;
      })
      .catch(error => {
          console.error('Error fetching population data:', error);
          populationEl.textContent = 'Population: Data not available';
      });
  }

  // Fetch GDP Data
  if (gdpEl) {
      fetch(gdpAPI)
      .then(response => response.json())
      .then(data => {
          const gdp = `$${data[1][0].value.toLocaleString()}`;
          gdpEl.textContent = `GDP: ${gdp}`;
      })
      .catch(error => {
          console.error('Error fetching GDP data:', error);
          gdpEl.textContent = 'GDP: Data not available';
      });
  }

  // Static Data for Other Statistics
  if (lifeExpectancyEl) lifeExpectancyEl.textContent = 'Life Expectancy: 64 years';
  if (medianAgeEl) medianAgeEl.textContent = 'Median Age: 28 years';
  if (householdIncomeEl) householdIncomeEl.textContent = 'Household Income: $9,800';
  if (majorIndustriesEl) majorIndustriesEl.textContent = 'Major Industries: Mining, Agriculture, Manufacturing, Services';
  if (educationEl) educationEl.textContent = 'Education: 94% Literacy Rate, 40% Tertiary Education Enrollment';

  // FAQ toggle functionality
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(question => {
      question.addEventListener('click', () => {
          // Toggle the display of the answer
          const answer = question.nextElementSibling;
          const isVisible = answer.style.display === 'block';

          // Hide all answers and reset all icons
          document.querySelectorAll('.faq-answer').forEach(a => {
              a.style.display = 'none';
          });
          document.querySelectorAll('.toggle-icon').forEach(icon => {
              icon.textContent = '+';
          });

          // Show or hide the current answer and update the icon
          if (isVisible) {
              answer.style.display = 'none';
              question.querySelector('.toggle-icon').textContent = '+';
          } else {
              answer.style.display = 'block';
              question.querySelector('.toggle-icon').textContent = '-';
          }
      });
  });

  // See More / See Less functionality
  document.querySelectorAll('.see-more').forEach(button => {
      button.addEventListener('click', function (event) {
          event.preventDefault();
          const moreText = this.previousElementSibling;
          if (moreText.style.display === 'inline') {
              moreText.style.display = 'none';
              this.textContent = 'See More';
          } else {
              moreText.style.display = 'inline';
              this.textContent = 'See Less';
          }
      });
  });

  // Function to get the difference in days between two dates
  function getDifferenceInDays(date1, date2) {
      const oneDay = 24 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds
      return Math.floor((date2 - date1) / oneDay);
  }

  // Get current date
  const now = new Date();

  // Check if the user has visited before by looking for the 'lastVisit' in localStorage
  const lastVisit = localStorage.getItem('lastVisit');
  
  if (!lastVisit && messageElement) {
      // If no last visit is stored, it's the user's first visit
      messageElement.innerHTML = "<p>Welcome! Let us know if you have any questions.</p>";
  } else if (lastVisit) {
      // If the user has visited before, calculate the difference in days
      const lastVisitDate = new Date(lastVisit);
      const daysDifference = getDifferenceInDays(lastVisitDate, now);

      if (daysDifference < 1) {
          messageElement.innerHTML = "<p>Back so soon! Awesome!</p>";
      } else if (daysDifference === 1) {
          messageElement.innerHTML = "<p>You last visited 1 day ago.</p>";
      } else {
          messageElement.innerHTML = `<p>You last visited ${daysDifference} days ago.</p>`;
      }
  }

  // Update the last visit date to the current date for future visits
  localStorage.setItem('lastVisit', now);
});
