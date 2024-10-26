

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookNowForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Clear any previous messages
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';

        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const phone = formData.get('phone').trim();
        const date = formData.get('date');
        const time = formData.get('time');
        const service = formData.get('services');
        const comments = formData.get('comments').trim();

        // Validate required fields
        if (!name || !email || !phone || !date || !time || !service) {
            errorMessage.style.display = 'block'; // Show error message
            return;
        }

        // Prepare query string
        const queryString = new URLSearchParams({
            first: name.split(' ')[0], // Assuming first name is the first word
            last: name.split(' ')[1] || '', // Assuming last name is the second word
            email: email,
            phone: phone,
            fecha: date,
            time: time,
            membership: service, // Assuming this is the service selected
            comments: comments
        }).toString();

        // Redirect to confirmation page with query string
        window.location.href = `confirmation.html?${queryString}`;
    });
});
