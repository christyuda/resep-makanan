document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.querySelector('.dropdown-item[href="#"]'); // Ensure this selector targets the logout link correctly

    logoutLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor link behavior

        // Clear local storage
        localStorage.removeItem('LOGIN');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');

        // Clear cookies
        document.cookie = 'LOGIN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Redirect to the login page or home page
        window.location.href = 'login.html'; // Adjust this to your login page URL
    });
});
