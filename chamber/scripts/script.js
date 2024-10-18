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


