const currentUrl = window.location.href;


const everything = currentUrl.split('?');


let formData = everything[1].split('&');

function show(cup) {
    
    
    formData.forEach((element) => {

        
        if (element.startsWith(cup)) {
            result = element.split('=')[1].replace("%40","@"); // Extract the value after '='
        }
    })
    return (result) // Return the extracted value
}

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
<p> Appointment for: ${show("first")} ${show("last")} </p>
<p> Membership Level : ${show('membership')} </p>
<p> Date: ${show('fecha')} </p>
<p> Location: ${show('location')}</p>
<p> Phone: ${show('phone')} </p>
<p> Email: ${show('email')} </p>`;
