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

