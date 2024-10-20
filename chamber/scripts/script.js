
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

// Update current year and last modified date
const date = new Date();
document.getElementById("currentyear").textContent = date.getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;


document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.querySelector(".fa-circle-half-stroke"); // Theme toggle button
    const hamburger = document.getElementById('hamburger'); // Hamburger menu button
    const menu = document.getElementById('menu'); // Menu container

    // Event listener for hamburger button click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active'); // Toggle active class on hamburger
        menu.classList.toggle('active'); // Toggle active class on menu
    });

    // Event listener for theme toggle button click
    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode"); // Toggle dark mode class
        toggleButton.classList.toggle("dark-mode"); // Toggle dark mode class on toggle button

        // Save theme preference to localStorage
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark"); // Save dark mode preference
        } else {
            localStorage.setItem("theme", "light"); // Save light mode preference
        }
    });

    // Load saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode"); // Apply dark mode
        toggleButton.classList.add("dark-mode"); // Style toggle button for dark mode
    }

    // Fetch directory data and handle grid/list view
    const gridButton = document.querySelector("#grid"); // Grid view button
    const listButton = document.querySelector("#list"); // List view button
    const directory = document.querySelector("#directory-cards"); // Directory section

    async function fetchDirectory() {
        try {
            const response = await fetch('data/members.json'); // Fetch directory data
            const data = await response.json(); // Parse JSON response
            displayDirectory(data); // Call display function with data
        } catch (error) {
            console.error('Error fetching directory:', error); // Log any errors
        }
    }

    function displayDirectory(data) {
        directory.innerHTML = ''; // Clear previous directory content

        data.forEach(member => { // Loop through each member
            const section = document.createElement('section'); // Create a section for each member
            section.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}"> <!-- Use correct property -->
                <h3>${member.name}</h3>
                <p>${member.year}</p>
                <a href="${member.url}" target="_blank">Details</a> <!-- Use correct property -->
            `;
            directory.appendChild(section); // Append section to directory
        });
    }

    // Event listener for grid view button
    gridButton.addEventListener('click', () => {
        directory.classList.remove('list'); // Remove list class
        directory.classList.add('grid'); // Add grid class
    });

    // Event listener for list view button
    listButton.addEventListener('click', () => {
        directory.classList.remove('grid'); // Remove grid class
        directory.classList.add('list'); // Add list class
    });

    fetchDirectory(); // Fetch directory data on page load
});

const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

const myKey = "a69f5f881167f04dbc4fdaccfe77e852";
const myLat = "-25.731340";
const myLong = "28.218370";

const myUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

async function apiFetch() {
    try {
        const response = await fetch(myUrl);
        if (response.ok) {
            const data = await response.json();
            displayResults(data); // Now this function will run
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    myTown.innerHTML = data.name;
    myDescription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;C`
    const iconsrc =  `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    myGraphic.setAttribute('SRC',iconsrc)
    myGraphic.setAttribute('alt',data.weather[0].description)
}

apiFetch();

document.addEventListener('DOMContentLoaded', () => {
    fetch('data/response.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('company-container');
            
            // Filtered companies on membership level (Gold or Silver)
            const eligibleCompanies = data.filter(company => company.membership === 'Gold' || company.membership === 'Silver');
            
            // Function to shuffle the array and select 2-3 random companies
            const getRandomCompanies = (companies, num) => {
                const shuffled = companies.sort(() => 0.5 - Math.random());
                return shuffled.slice(0, num);  // Select 2 or 3 companies
            };

            // Get 2 or 3 random companies
            const randomCompanies = getRandomCompanies(eligibleCompanies, Math.floor(Math.random() * 2) + 2);

            randomCompanies.forEach(company => {
                //card for each company
                const companyCard = document.createElement('div');
                companyCard.classList.add('member');

                // Populate the card with company details
                companyCard.innerHTML = `
                <h3>${company.name}</h3>
                <p><strong>Membership:</strong> ${company.membership}</p>
                    <img src="${company.image}" alt="${company.name} logo">
                    <p>${company.description}</p>
                    <p><strong>Email:</strong> <a href="mailto:${company.EMAIL}">${company.EMAIL}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:${company.PHONE}">${company.PHONE}</a></p>
                    <a href="${company.URL}" target="_blank" class="cta-button">Visit Website</a>
                `;
                
                // Append the card to the container
                container.appendChild(companyCard);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

const openButton = document.querySelector("#openButton");
const dialogBox = document.querySelector("#dialogBox"); 
const closeButton = document.querySelector("#closeButton"); 
const dialogBoxText = document.querySelector("#dialogBox div"); 


//show the dialog button opens the dialog modally

openButton1.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `
    <p><strong>Cost:</strong>Free</p>
      <p><strong>Non Profit Organization Membership Benefits:</strong></p>
    <ul>
        <li><strong>Access to General Chamber Events:</strong> Invitation to standard events like monthly mixers, seminars, and community gatherings.</li>
        <li><strong>Basic Directory Listing:</strong> Your business is listed in the Chamber's online and printed directory with contact details.</li>
        <li><strong>Networking Opportunities:</strong> Connect with other business owners and community leaders.</li>
        <li><strong>Business Newsletter:</strong> Subscription to the Chamber’s newsletter with community news and business updates.</li>
        <li><strong>Use of Chamber Logo:</strong> Permission to use the Chamber’s logo on your website and promotional materials, showing your membership and credibility.</li>
    </ul>`
    ;
});


openButton2.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `
      
    <p><strong>Cost:</strong> R1000/year</p>
      <p><strong>Bronze Membership Benefits:</strong></p>
    <ul>
        <li><strong>All Non Profit Organization Membership Benefits.</strong></li>
        <li><strong>Discounts on Event Tickets:</strong> Receive 10-20% discounts on tickets for major Chamber events, such as conferences, expos, and workshops.</li>
        <li><strong>Special Member-Only Events:</strong> Invitations to exclusive networking events designed for Silver members and above, where you can meet influential community members.</li>
        <li><strong>Enhanced Directory Listing:</strong> Your listing in the directory includes a business description, links to your social media accounts, and website.</li>
        <li><strong>Training and Workshops:</strong> Access to business skill workshops and webinars at discounted rates to help you grow your business.</li>
        <li><strong>Certificate of Membership:</strong> A physical certificate to display at your place of business, recognizing your support of the Chamber.</li>
    </ul>`
    ;
});


//show the dialog button opens the dialog modally
openButton3.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `
    <p><strong>Cost:</strong> R2000/year</p>
    <p><strong>Silver Membership Benefits:</strong></p>
    <ul>
        <li><strong>All Bronze Membership Benefits.</strong></li>
        <li><strong>Spotlight Advertising on Chamber Homepage:</strong> Featured placement of your business on the Chamber’s homepage in the "Business Spotlight" section, allowing for greater visibility.</li>
        <li><strong>Priority Placement in Chamber Newsletters:</strong> Your business will be mentioned or featured in Chamber newsletters, which are sent to all members and community partners.</li>
        <li><strong>Extended Event Discounts:</strong> Get 25-30% discounts on major Chamber events and training sessions.</li>
        <li><strong>Dedicated Social Media Mentions:</strong> The Chamber will feature your business in posts across its social media channels, increasing your exposure to the community.</li>
        <li><strong>Free Admission to Select Events:</strong> Complimentary tickets to a few of the Chamber’s premier events, such as the annual business gala or awards banquet.</li>
        <li><strong>Ribbon Cutting Ceremony:</strong> For new or expanding businesses, the Chamber will host a ribbon-cutting ceremony to celebrate your growth, including press coverage and photos for your promotional use.</li>
    </ul>`
    ;
});


//show the dialog button opens the dialog modally
openButton4.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `
    <p><strong>Cost:</strong> R3000/year</p>
    <p><strong>Gold Membership Benefits:</strong></p>
    <ul>
        <li><strong>All Silver Membership Benefits.</strong></li>
        <li><strong>VIP Access to Exclusive Networking Events:</strong> Invitation-only events for Gold members, where you can meet influential community leaders and key decision-makers.</li>
        <li><strong>Customized Advertising Packages:</strong> Gold members receive personalized advertising options, such as homepage banners, newsletter ads, and social media highlights.</li>
        <li><strong>Free Entry to Major Events:</strong> Complimentary tickets to top-tier Chamber events, including conferences, galas, and awards ceremonies.</li>
        <li><strong>Sponsorship Opportunities:</strong> Priority consideration for sponsorships at Chamber events, providing increased visibility for your business.</li>
        <li><strong>Priority Speaking Opportunities:</strong> Gold members are given first choice for speaking roles at Chamber-hosted events and workshops.</li>
        <li><strong>Custom Business Promotion Plan:</strong> Work with the Chamber’s marketing team to create a tailored plan for promoting your business through various Chamber platforms.</li>
        <li><strong>Chamber Leadership Invitation:</strong> Opportunity to serve on advisory boards or committees, allowing you to influence the direction of the Chamber and local economic development.</li>
    </ul>`
    ;
});

//close button closes the dialog
closeButton.addEventListener("click",() => {
    dialogBox.close();
});


