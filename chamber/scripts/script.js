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

// Update current year and last modified date
const date = new Date();
document.getElementById("currentyear").textContent = date.getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
