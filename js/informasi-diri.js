document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    // Update elements with user information
    const profileUsernames = document.querySelectorAll('.profile-username .fw-bold');
    const userEmails = document.querySelectorAll('.u-text p.text-muted');
    const welcomeMessages = document.querySelectorAll('h5.mb-2 span');

    profileUsernames.forEach(element => element.textContent = userName);
    userEmails.forEach(element => element.textContent = userEmail);
    welcomeMessages.forEach(element => element.textContent = userName);
});